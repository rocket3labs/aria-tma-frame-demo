# [aria-tma-demo](https://github.com/rocket3labs/aria-tma-frame-demo/ "aria-tma-demo")

## Run

```shell
yarn dev
```

## Build

```shell
yarn build
```

## SDK Usage

### 0.入口页面

**src/app/page.tsx**

### 1.Iframe标签入参解析

tgid=...&timestamp=...&token=...&uid=...&signature=...

**验证方法**

**src/utils/utils.ts**

```typescript
import { createSignature } from "@googlemaps/url-signature"
import base64url from "base64url"

//urlWithSign: 传入iframe页面的完整URL
export const verifyURLSign = (urlWithSign: string) => {
    try {
        if (urlWithSign) {
            const url = new URL(urlWithSign)
            const searchParams = url.searchParams
            const signature = searchParams.get('signature')
            const timestamp = searchParams.get('timestamp')
            const tgid = searchParams.get('tgid')
            const uid = searchParams.get('uid')
            const token = searchParams.get('token')
            const tokenJson = base64url.decode(token!)
            const tokenJsonObj = JSON.parse(tokenJson)
            const { secret } = tokenJsonObj
            if (signature && timestamp && token) {
                const paras = `tgid=${tgid}&timestamp=${timestamp}&token=${token}&uid=${uid}`
                const urls = urlWithSign.split('?')
                if (urls.length > 1) {
                    const url = urls[0]
                    const urlGen = `${url}?${paras}`
                    const sign = createSignature(urlGen, secret);
                    if (sign === signature) {
                        return true
                    }
                }
            }
        }
    } catch (error) {
        console.error('verifyURLSign params error==>', error)
    }
    return false
}
```

### 2.Iframe内外页面通过message进行数据传递

**数据通讯过程**

a) Iframe 通过 **postMessage** 向父页面传递Request数据

```typescript
    const request: requestIframeChild = {
      type: IframeBussinessType.GetUserInfo, target: "ton-wallet-iframe-parent", req: 1
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
```

b) Iframe 父页面收到请求data 并回传Response数据

c) Iframe页面进行message监听接收上一步的回传Response数据

```typescript
window.addEventListener("message", function (event: any) {
        // console.log('Iframe add window message event listener...')
        const data = event.data
        const { target, type } = data
        if (target === 'ton-wallet-iframe') {
          console.log('Iniframe recieve response data==>', data)
        }
}
```

d) 根据回传data的type进行相应的数据展示

## Iframe Event Type

```typescript
//Event Type-事件业务类型
export const enum IframeBussinessType {
    Connect = 0,
    ConnectAndTrade = 1,
    MyNftList = 2,
    MintNFT = 3,
    GetUserInfo = 4,
    BindTonWallet = 5,
    BindedWalletList = 6,
    BuyGameProps = 7,
    GetInviteCodeShareLink = 8,
    Task = 100,
    GetTonWalletAddress = 9999,
}

//任务事件增加action字段, 用于获取任务列表,绑定推特,执行任务,验证任务等
//Task Event Action Type
export const enum IframeBussinessTaskActionType {
    TaskList = 0,
    TaskTWBind = 3,
    TaskDo = 5,
    TaskVerify = 6,
}
```

## Iframe Event Data

### Common Response Data/通用数据字段

**success**

```json
{type: 0, error: null, success: true, target: "ton-wallet-iframe"}
```

**fail**

```json
{type: 0, error:{Error Obj}, success: false, target: "ton-wallet-iframe"}
```

### Connect/Get Wallet Address 0/9999 连接钱包/获取钱包地址

**request**

```json
{type: 0, target: "ton-wallet-iframe-parent"}
```

**response**

```json
{type: 0, userFriendlyAddress: "", rawAddress: "", target: "ton-wallet-iframe"}
```

### Connect & Pay 1 / 连接钱包并支付

**request**

```json
{type: 1, value:0.0001,token:"",orderid:"aaaaaa",item_id: 1111,item_name:'aaaa',item_category:"aaaa",payType: 0, target: "ton-wallet-iframe-parent"} //connect & mint
{type: 1, value:0.0001,token:"",orderid:"aaaaa",item_id: 1111,item_name:'aaaa',item_category:"aaaa",payType: 1, target: "ton-wallet-iframe-parent"} //connect & buygameprops
```

**参数说明**

**payType(number):** 0-mint, 1-购买游戏道具

**orderid(string):** 游戏侧生成的订单id

**item_id(string):** 游戏侧购买物品的唯一id

**item_name(string):** 游戏侧购买物品的名称

**item_category(string):** 游戏侧购买物品的类别

**response**

```json
{"type":1,success: true,error:null,target:"ton-wallet-iframe"}
```

### My NFT List 2 / 获取我的钱包地址对应的nft列表

**request**

```json
{type:2,target:"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":2,list:[],target:"ton-wallet-iframe"}
```

**my nft list data**

```json
//My NFT List
[
        {
            "address": "0:0277bd2e88d674e89b1cc056ef4734caefbf4bd76236719a0d400fac267e90d8",
            "index": 19,
            "owner": {
                "address": "0:f8090225223c62512c228d11e22ccc17fe97705be7e66b350869ffdb3a5a68cd",
                "is_scam": false,
                "is_wallet": true
            },
            "collection": {
                "address": "0:7e3514361c8fb6b62fd5eb513e1b8b1b9cd09af10f6cfc31fd59bef943026cbf",
                "name": "Aria Game #1",
                "description": "Aria NFT collection of unique NFTs created to showcase the TEP64 standard."
            },
            "verified": true,
            "metadata": {
                "attributes": [
                    {
                        "trait_type": "#",
                        "value": "20"
                    }
                ],
                "description": "Thodoric Aria is the SBT of Aria Theme Game Park with unique design, it is also the identity of citizen within Aria world. With Thodoric Aria, users can unlock gameplay and get additional rewards such as airdrop and in-game assets.",
                "id": 20,
                "name": "Thodoric Aria #20",
                "image": "https://assets.playariagame.com/aria-nft-assets/png/20.png"
            },
            "previews": [
                {
                    "resolution": "5x5",
                    "url": "https://cache.tonapi.io/imgproxy/qTqBZvQL9I48M6_q56QO9OmBMIIxK2kiN2r9GklTSsc/rs:fill:5:5:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzIwLnBuZw.webp"
                },
                {
                    "resolution": "100x100",
                    "url": "https://cache.tonapi.io/imgproxy/Lte0ZU8caWJ9uN9U8JiZf59zJ1Bvb8mLOmFG_GYxQRk/rs:fill:100:100:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzIwLnBuZw.webp"
                },
                {
                    "resolution": "500x500",
                    "url": "https://cache.tonapi.io/imgproxy/-WxlcAKQM7oFBMWsRvOqKjN5XC7eBt0bfUt-j7WcZh4/rs:fill:500:500:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzIwLnBuZw.webp"
                },
                {
                    "resolution": "1500x1500",
                    "url": "https://cache.tonapi.io/imgproxy/7FkkyBNBliwG17c47KyVB00SyDGRdU9gZxxWaGMu2Ig/rs:fill:1500:1500:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzIwLnBuZw.webp"
                }
            ],
            "approved_by": [],
            "trust": "none"
        },
        {
            "address": "0:570a0f842b405016aa901bf021a4654bf37a79c2a45fae55719ad59f4860a27b",
            "index": 16,
            "owner": {
                "address": "0:f8090225223c62512c228d11e22ccc17fe97705be7e66b350869ffdb3a5a68cd",
                "is_scam": false,
                "is_wallet": true
            },
            "collection": {
                "address": "0:7e3514361c8fb6b62fd5eb513e1b8b1b9cd09af10f6cfc31fd59bef943026cbf",
                "name": "Aria Game #1",
                "description": "Aria NFT collection of unique NFTs created to showcase the TEP64 standard."
            },
            "verified": true,
            "metadata": {
                "id": 17,
                "name": "Thodoric Aria #17",
                "image": "https://assets.playariagame.com/aria-nft-assets/png/17.png",
                "attributes": [
                    {
                        "trait_type": "#",
                        "value": "17"
                    }
                ],
                "description": "Thodoric Aria is the SBT of Aria Theme Game Park with unique design, it is also the identity of citizen within Aria world. With Thodoric Aria, users can unlock gameplay and get additional rewards such as airdrop and in-game assets."
            },
            "previews": [
                {
                    "resolution": "5x5",
                    "url": "https://cache.tonapi.io/imgproxy/IYy0Yi4R4POjSBFJUeVbCBlc_6G1PL5e_jvDd0wp4YI/rs:fill:5:5:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzE3LnBuZw.webp"
                },
                {
                    "resolution": "100x100",
                    "url": "https://cache.tonapi.io/imgproxy/POInk80QDUvQ35XhlcZMzLakDmUEEYaG2DHQlpNMk90/rs:fill:100:100:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzE3LnBuZw.webp"
                },
                {
                    "resolution": "500x500",
                    "url": "https://cache.tonapi.io/imgproxy/gCVzWQnYAUF0sqPb4a9FsnydnSUCQXDBSLL2fNYM4-Y/rs:fill:500:500:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzE3LnBuZw.webp"
                },
                {
                    "resolution": "1500x1500",
                    "url": "https://cache.tonapi.io/imgproxy/ph8jPW3NrQ0mjvslA1BXYeITt-IGGyjvO90urrMc2Y4/rs:fill:1500:1500:1/g:no/aHR0cHM6Ly9hc3NldHMucGxheWFyaWFnYW1lLmNvbS9hcmlhLW5mdC1hc3NldHMvcG5nLzE3LnBuZw.webp"
                }
            ],
            "approved_by": [],
            "trust": "none"
        },
        ...
    ]
```

### NFT Mint 3

**request**

```json
{type:3,address:"",target:"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":3,address:"",success:true,error:null,target:"ton-wallet-iframe"}
```

### Profile 4 / 用户信息

**request**

```json
{type:4,target:"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":4,success:true,error:null,profile:data,target:"ton-wallet-iframe"}
```

**profile data**

```json
//User Profile
{
        "uid": 4,
        "name": null,
        "screenName": null,
        "smallAvatar": null,
        "largeAvatar": null,
        "banner": null,
        "invitationCode": "aoi3",
        "pts": 0,
        "discord": null,
        "telegram": {
            "telegramUid": 368696677,
            "username": "peter201709",
            "firstname": "Peter",
            "lastname": ""
        },
        "walletAccountId": null
    }
```

### Web3 wallet bind 5 绑定ton的钱包地址

**request**

```json
{"type":5,"target":"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":5,address:"",success:true,error:null,"target":"ton-wallet-iframe"}
```

### TG Binded Wallet List 6 / tg用户的绑定钱包地址列表

request

```json
{type:6,target:"ton-wallet-iframe-parent"}
```

response

```json
{"type":6,list:[],target:"ton-wallet-iframe"}
```

### Buy Game Props 7 / 购买游戏道具


**request**

```json
{type:3,address:"",target:"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":3,address:"",success:true,error:null,target:"ton-wallet-iframe"}
```


### Share 8 / 分享

request

```json
{type:8,target:"ton-wallet-iframe-parent"}
```

response

```json
{"type":8,link:"http://t.me/.....",target:"ton-wallet-iframe"}
```

### Get Invite User ID List 9 / 获取邀请用户列表ID

**request**

```json
{type:9,target:"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":9,list:[1,2,3],target:"ton-wallet-iframe"}
```

**list**

[1,2,3]

### Mission 100 / 任务

#### mission list 0 / 任务列表

request

```json
{"type":100,action: 0,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":100,action: 0,list:[],"target":"ton-wallet-iframe"}
```

mission list data

```json
// Mission List
[
        {
            "missionGroupId": 1,
            "title": "None",
            "missionList": []
        },
        {
            "missionGroupId": 50,
            "title": "Media",
            "missionList": [
                {
                    "missionId": 1300,
                    "title": "Join Aria TG channel",
                    "brief": "简介a",
                    "description": "-",
                    "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
                    "type": null,
                    "kind": 400,
                    "payload": "{\"url\":\"https://t.me/playaria_group\",\"channel\":\"playaria_group\"}",
                    "pts": 10,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 1,
                    "title": "Follow \"@PlayAriaGame\" on X",
                    "brief": "简介a",
                    "description": "-",
                    "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
                    "type": null,
                    "kind": 201,
                    "payload": "{\"screenName\":\"PlayAriaGame\"}",
                    "pts": 2000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 4,
                    "title": "Call to Reply",
                    "brief": "简介a",
                    "description": "https://x.com/PlayAriaGame/status/1799463937299128576",
                    "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
                    "type": null,
                    "kind": 300,
                    "payload": "{\"url\":\"https://twitter.com/intent/post?in_reply_to=1799463937299128576\",\"tweetId\":\"1799463937299128576\"}",
                    "pts": 1000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 10,
                    "title": "Call to Reply",
                    "brief": "简介a",
                    "description": "https://x.com/PlayAriaGame/status/1787508236071145869",
                    "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
                    "type": null,
                    "kind": 300,
                    "payload": "{\"url\":\"https://twitter.com/intent/post?in_reply_to=1787508236071145869\",\"tweetId\":\"1787508236071145869\"}",
                    "pts": 1000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 5,
                    "title": "Call to Retweet",
                    "brief": "简介a",
                    "description": "https://x.com/PlayAriaGame/status/1799463937299128576",
                    "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
                    "type": null,
                    "kind": 301,
                    "payload": "{\"url\":\"https://twitter.com/intent/retweet?tweet_id=1799463937299128576\",\"tweetId\":\"1799463937299128576\"}",
                    "pts": 1000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 6,
                    "title": "Call to Like",
                    "brief": "简介a",
                    "description": "https://x.com/PlayAriaGame/status/1799463937299128576",
                    "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
                    "type": null,
                    "kind": 302,
                    "payload": "{\"url\":\"https://twitter.com/intent/like?tweet_id=1799463937299128576\",\"tweetId\":\"1799463937299128576\"}",
                    "pts": 1000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
            ]
        },
        {
            "missionGroupId": 51,
            "title": "Tutorial",
            "missionList": [
                {
                    "missionId": 2000,
                    "title": "注册",
                    "brief": "简介a",
                    "description": "-",
                    "icon": "-",
                    "type": null,
                    "kind": 200,
                    "payload": null,
                    "pts": 1000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 2101,
                    "title": "试玩游戏1",
                    "brief": "简介a",
                    "description": "-",
                    "icon": "-",
                    "type": null,
                    "kind": 200,
                    "payload": "{\"url\":\"tg://bot/game1\"}",
                    "pts": 2000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 2102,
                    "title": "试玩游戏2",
                    "brief": "简介a",
                    "description": "-",
                    "icon": "-",
                    "type": null,
                    "kind": 200,
                    "payload": "{\"url\":\"tg://bot/game1\"}",
                    "pts": 2000,
                    "ptsUnit": "PTS",
                    "finished": false
                },
                {
                    "missionId": 2103,
                    "title": "试玩游戏3",
                    "brief": "简介a",
                    "description": "-",
                    "icon": "-",
                    "type": null,
                    "kind": 200,
                    "payload": "{\"url\":\"tg://bot/game1\"}",
                    "pts": 2000,
                    "ptsUnit": "PTS",
                    "finished": false
                }
            ]
        },
    ]
```

#### web3 bind 1

**request**

```json
{"type":100,action: 1,"target":"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":100,action: 1,address:"",success:true,error:null,"target":"ton-wallet-iframe"}
```

#### web3 unbind 2

**request**

```json
{"type":100,action: 2,"target":"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":100,action: 2,success:true,error:null,"target":"ton-wallet-iframe"}
```

#### twitter bind 3

**request**

```json
{"type":100,action: 3,"target":"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":100,action: 3,success:true,error:null,data:{},"target":"ton-wallet-iframe"}
```

#### twitter unbind 4

**request**

```json
{"type":100,action: 4,"target":"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":100,action: 4,success:true,error:null,"target":"ton-wallet-iframe"}
```

#### mission do 5

**request**

```json
{"type":100,action: 5,missionInfo:{},"target":"ton-wallet-iframe-parent"}
```

#### mission verify 6

**request**

```json
{"type":100,action: 6,missionid:1,"target":"ton-wallet-iframe-parent"}
```

**response**

```json
{"type":100,action: 6,success:true,error:null,"target":"ton-wallet-iframe"}
```

### Pay Callback

cabackUrl: CP方提供的callback地址

#### **游戏内道具订单**

**GET **[http://cabackUrl?orderId=123&amp;gameOrderId](http://106.14.251.223:9098/order/pay-done?orderId=)=456

orderId: 内部订单号

[gameOrderId](http://106.14.251.223:9098/order/pay-done?orderId=%s&gameOrderId=%s): 游戏侧订单号

RequestHeader: 

{ApiKey: secret-abc}

// 游戏侧签发apikey

RequestBody: none

ResponseBody: {code: 0, msg: 'ok'}

// code为0表示游戏侧处理完成，否则会一直回调此接口

### API Docs

**[apifox](https://app.apifox.com/project/4143747)**

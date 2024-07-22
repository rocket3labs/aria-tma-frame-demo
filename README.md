# [aria-tma-demo](https://github.com/rocket3labs/aria-tma-frame-demo/ "aria-tma-demo")

## Run

```shell
yarn dev
```

## Build

```shell
yarn build
```

## Iframe Event

### Connect/Get Wallet Address 0/9999

request

```json
{type: 0, target: "ton-wallet-iframe-parent"}
```

response

```json
{type: 0, userFriendlyAddress: "", rawAddress: "", target: "ton-wallet-iframe"}
```

### Pay 1

request

```json
{type: 1, value:0.0001,token:"",payType: 0, target: "ton-wallet-iframe-parent"} //connect & mint
{type: 1, value:0.0001,token:"",payType: 1, target: "ton-wallet-iframe-parent"} //connect & buygameprops
```

response

```json
{"type":1,success: true,error:null,target:"ton-wallet-iframe"}
```

### NFT List 2

request

```json
{type:2,target:"ton-wallet-iframe-parent"}
```

response

```json
{"type":2,list:[],target:"ton-wallet-iframe"}
```

### NFT Mint 3

request

```json
{type:3,address:"",target:"ton-wallet-iframe-parent"}
```

response

```json
{"type":3,address:"",success:true,error:null,target:"ton-wallet-iframe"}
```

### Profile 4

request

```json
{type:4,target:"ton-wallet-iframe-parent"}
```

response

```json
{"type":4,success:true,error:null,profile:data,target:"ton-wallet-iframe"}
```

### Web3 wallet bind 5

request

```json
{"type":5,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":5,address:"",success:true,error:null,"target":"ton-wallet-iframe"}
```

### TG Binded Wallet List 6

request

```json
{type:6,target:"ton-wallet-iframe-parent"}
```

response

```json
{"type":6,list:[],target:"ton-wallet-iframe"}
```

### Mission 100

#### mission list 0

request

```json
{"type":100,action: 0,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":100,action: 0,list:[],"target":"ton-wallet-iframe"}
```

#### web3 bind 1

request

```json
{"type":100,action: 1,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":100,action: 1,address:"",success:true,error:null,"target":"ton-wallet-iframe"}
```

#### web3 unbind 2

request

```json
{"type":100,action: 2,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":100,action: 2,success:true,error:null,"target":"ton-wallet-iframe"}
```

#### twitter bind 3

request

```json
{"type":100,action: 3,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":100,action: 3,success:true,error:null,data:{},"target":"ton-wallet-iframe"}
```

#### twitter unbind 4

request

```json
{"type":100,action: 4,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":100,action: 4,success:true,error:null,"target":"ton-wallet-iframe"}
```

#### mission do 5

request

```json
{"type":100,action: 5,missionInfo:{},"target":"ton-wallet-iframe-parent"}
```

#### mission verify 6

request

```json
{"type":100,action: 6,missionid:1,"target":"ton-wallet-iframe-parent"}
```

response

```json
{"type":100,action: 6,success:true,error:null,"target":"ton-wallet-iframe"}
```

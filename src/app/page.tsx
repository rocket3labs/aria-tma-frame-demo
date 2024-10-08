'use client';

import { List, Box, Button, Card, Chip, CardContent } from '@mui/material';

import { IframeBussinessTaskActionType, IframeBussinessType } from '@/iframeParaType';
import _ from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { verifyURLSign } from '@/utils/utils';

const mockDataMissionList = [
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
        "missionId": 2,
        "title": "Follow \"@MrVeov\" on X",
        "brief": "简介a",
        "description": "-",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 201,
        "payload": "{\"screenName\":\"MrVeov\"}",
        "pts": 2000,
        "ptsUnit": "PTS",
        "finished": false
      },
      {
        "missionId": 3,
        "title": "Follow \"@MeepoBuilds\" on X",
        "brief": "简介a",
        "description": "-",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 201,
        "payload": "{\"screenName\":\"MeepoBuilds\"}",
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
        "missionId": 7,
        "title": "Call to Reply",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1793280560749855066",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 300,
        "payload": "{\"url\":\"https://twitter.com/intent/post?in_reply_to=1793280560749855066\",\"tweetId\":\"1793280560749855066\"}",
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
        "missionId": 13,
        "title": "Call to Reply",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1782447807292489919",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 300,
        "payload": "{\"url\":\"https://twitter.com/intent/post?in_reply_to=1782447807292489919\",\"tweetId\":\"1782447807292489919\"}",
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
        "missionId": 8,
        "title": "Call to Retweet",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1793280560749855066",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 301,
        "payload": "{\"url\":\"https://twitter.com/intent/retweet?tweet_id=1793280560749855066\",\"tweetId\":\"1793280560749855066\"}",
        "pts": 1000,
        "ptsUnit": "PTS",
        "finished": false
      },
      {
        "missionId": 11,
        "title": "Call to Retweet",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1787508236071145869",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 301,
        "payload": "{\"url\":\"https://twitter.com/intent/retweet?tweet_id=1787508236071145869\",\"tweetId\":\"1787508236071145869\"}",
        "pts": 1000,
        "ptsUnit": "PTS",
        "finished": false
      },
      {
        "missionId": 14,
        "title": "Call to Retweet",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1782447807292489919",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 301,
        "payload": "{\"url\":\"https://twitter.com/intent/retweet?tweet_id=1782447807292489919\",\"tweetId\":\"1782447807292489919\"}",
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
      {
        "missionId": 9,
        "title": "Call to Like",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1793280560749855066",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 302,
        "payload": "{\"url\":\"https://twitter.com/intent/like?tweet_id=1793280560749855066\",\"tweetId\":\"1793280560749855066\"}",
        "pts": 1000,
        "ptsUnit": "PTS",
        "finished": false
      },
      {
        "missionId": 12,
        "title": "Call to Like",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1787508236071145869",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 302,
        "payload": "{\"url\":\"https://twitter.com/intent/like?tweet_id=1787508236071145869\",\"tweetId\":\"1787508236071145869\"}",
        "pts": 1000,
        "ptsUnit": "PTS",
        "finished": false
      },
      {
        "missionId": 15,
        "title": "Call to Like",
        "brief": "简介a",
        "description": "https://x.com/PlayAriaGame/status/1782447807292489919",
        "icon": "https://abs.twimg.com/favicons/twitter.3.ico",
        "type": null,
        "kind": 302,
        "payload": "{\"url\":\"https://twitter.com/intent/like?tweet_id=1782447807292489919\",\"tweetId\":\"1782447807292489919\"}",
        "pts": 1000,
        "ptsUnit": "PTS",
        "finished": false
      }
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
  {
    "missionGroupId": 52,
    "title": "Daily",
    "missionList": []
  },
  {
    "missionGroupId": 53,
    "title": "Invite",
    "missionList": []
  }
]

const IframePage: React.FC = () => {
  interface requestIframeChild {
    type: number
    req: number
    target: "ton-wallet-iframe-parent",
    action?: number
    value?: number
    payType?: number
    payCurrency?: number
    token?: string
    orderid?: string
    item_id?: number
    item_name?: string
    item_category?: any
    missionInfo?: any
    missionid?: any
    message?: string
    url?: string
    text?: string
  }

  interface responseConnect {
    type: number
    req: number
    userFriendlyAddress: string
    rawAddress: string
    target: "ton-wallet-iframe"
  }

  interface responseBase {
    type: number
    req: number
    success: boolean
    error: any,
    target: "ton-wallet-iframe"
  }

  interface responseDataList {
    type: number
    req: number
    success: boolean
    error: any,
    target: "ton-wallet-iframe"
    list: any[]
  }

  interface responseDataUserInfo {
    type: number
    req: number
    success: boolean
    error: any,
    target: "ton-wallet-iframe"
    profile: any
  }

  // interface responseDataMissionList {
  //   type: number
  //   req: number
  //   success: boolean
  //   error: any,
  //   target: "ton-wallet-iframe"
  //   list: any
  // }

  interface responseDataShareLink {
    type: number
    req: number
    success: boolean
    error: any,
    target: "ton-wallet-iframe"
    link: any
  }

  const [responseDataConnect, setResponseDataConnect] = useState<responseConnect>({
    type: -1, req: -1, userFriendlyAddress: "", rawAddress: "", target: "ton-wallet-iframe"
  });

  const [responseDataTradeMint, setResponseDataTradeMint] = useState<responseBase>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe"
  });

  const [responseDataTradeBuyGameProps, setResponseDataTradeBuyGameProps] = useState<responseBase>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe"
  });

  const [responseDataMyNftList, setResponseDataMyNftList] = useState<responseDataList>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe", list: []
  });

  const [responseDataUserInfo, setResponseDataUserInfo] = useState<responseDataUserInfo>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe", profile: null
  });

  const [responseDataShareLink, setResponseDataShareLink] = useState<responseDataShareLink>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe", link: ""
  });

  const [responseDataMissionList, setResponseDataMissionList] = useState<responseDataList>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe", list: []
  });

  const [responseDataInviteUIDList, setResponseDataInviteUIDList] = useState<responseDataList>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe", list: []
  });

  const [responseDataSendTGBotMessage, setResponseSendTGBotMessage] = useState<responseBase>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe"
  });

  const [responseDataInviteUserList, setResponseDataInviteUserList] = useState<responseDataList>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe", list: []
  });

  const [responseDataCopyToClipboard, setResponseDataCopyToClipboard] = useState<responseBase>({
    type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe"
  });


  const connectWallet = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.Connect, target: "ton-wallet-iframe-parent", req: 1
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const getWalletAddress = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.GetTonWalletAddress, target: "ton-wallet-iframe-parent", req: 2
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const connectAndTrade = (payType: number) => {
    const request: requestIframeChild = {
      type: IframeBussinessType.ConnectAndTrade,
      target: "ton-wallet-iframe-parent",
      req: 3,
      token: payType === 0 ? "" : "kQAhnJ8w081DxUh9ov8wKE71juW6kbToQknbagBmjQ54Dl1C",
      payType: payType,
      payCurrency: 0,
      orderid: "123456",
      value: payType === 0 ? 0.3 : 0.1,
      item_id: 1000,
      item_name: payType === 0 ? "game nft" : "game props",
      item_category: payType === 0 ? "nft" : "props"
    }
    console.log('Iniframe connectAndTrade request==>', request)
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const getMyNftList = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.MyNftList, target: "ton-wallet-iframe-parent", req: 4
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const getUserProfile = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.GetUserInfo, target: "ton-wallet-iframe-parent", req: 5
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const getMissions = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.Task, target: "ton-wallet-iframe-parent", req: 6, action: IframeBussinessTaskActionType.TaskList
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const doMission = (missionInfo: any) => {
    const request: requestIframeChild = {
      type: IframeBussinessType.Task, target: "ton-wallet-iframe-parent", req: 7, action: IframeBussinessTaskActionType.TaskDo, missionInfo: missionInfo
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const verifyMission = (missionId: any) => {
    const request: requestIframeChild = {
      type: IframeBussinessType.Task, target: "ton-wallet-iframe-parent", req: 7, action: IframeBussinessTaskActionType.TaskVerify, missionid: missionId
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const getShareLink = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.GetInviteCodeShareLink, target: "ton-wallet-iframe-parent", req: 8
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const getInviteUserIDList = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.GetInviteUserIDList, target: "ton-wallet-iframe-parent", req: 9
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const sendTGBotMessage = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.SendTGBotMessage, target: "ton-wallet-iframe-parent", req: 10, message: "Hello, bot."
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const getInviteUserList = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.GetInviteUserList, target: "ton-wallet-iframe-parent", req: 11
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const openWebLink = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.OpenWebLink, target: "ton-wallet-iframe-parent", url: responseDataShareLink.link, req: 12, value: 0
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const copyToClipboard = () => {
    const request: requestIframeChild = {
      type: IframeBussinessType.CopyToClipboard, target: "ton-wallet-iframe-parent", text: 'text is copy', req: 13, value: 0
    }
    if (!_.isUndefined(window)) {
      window.parent.postMessage(request, "*");
    }
  }

  const verifyIframeURLSign = () => {
    const urlIframe = window.location.href
    const isVerify = verifyURLSign(urlIframe)
    console.log('verifyIframeURLSign==>', isVerify)
  }

  const renderNftTags = (attributes: any, nftIndex: number) => {
    const tags: any[] = []
    if (!_.isNil(attributes)) {
      attributes.forEach((itemArr: any) => {
        let i = 0;
        for (const key in itemArr) {
          tags.push(<Chip label={`${key}: ${itemArr[key]}`} key={'chip-' + nftIndex + '-' + i}></Chip>)
          i++
        }

      });
      return <div
        style={{
          display: 'flex',
          gap: 10,
          flexDirection: 'column',
          position: 'absolute',
          left: 10,
          top: 10
        }}
      >{tags}</div>
    }
    return null
  }

  useEffect(() => {
    verifyIframeURLSign()
    getWalletAddress()
    // setResponseDataMissionList({ type: -1, req: -1, success: false, error: null, target: "ton-wallet-iframe", list: mockDataMissionList })
    if (!_.isUndefined(window)) {
      window.addEventListener("message", function (event: any) {
        // console.log('Iframe add window message event listener...')
        const data = event.data
        const { target, type } = data
        console.log('Iniframe recieve response event==>', event)
        if (target === 'ton-wallet-iframe') {
          console.log('Iniframe recieve response data==>', data)
          switch (type) {
            case IframeBussinessType.Connect:
            case IframeBussinessType.GetTonWalletAddress:
              const dataRes: responseConnect = data
              setResponseDataConnect(dataRes)
              break;
            case IframeBussinessType.MintNFT:
              const dataResTradeMint: responseBase = data
              setResponseDataTradeMint(dataResTradeMint)
              break
            case IframeBussinessType.BuyGameProps:
              const dataResTradeBuyGameProps: responseBase = data
              setResponseDataTradeBuyGameProps(dataResTradeBuyGameProps)
              break;
            case IframeBussinessType.MyNftList:
              const dataResMyNftList: responseDataList = data
              setResponseDataMyNftList(dataResMyNftList)
              break;
            case IframeBussinessType.GetUserInfo:
              const dataResUserInfo: responseDataUserInfo = data
              setResponseDataUserInfo(dataResUserInfo)
              break;
            case IframeBussinessType.GetInviteCodeShareLink:
              const dataResShareLink: responseDataShareLink = data
              setResponseDataShareLink(dataResShareLink)
              break
            case IframeBussinessType.GetInviteUserIDList:
              const dataResInviteList: responseDataList = data
              setResponseDataInviteUIDList(dataResInviteList)
              break
            case IframeBussinessType.SendTGBotMessage:
              const dataResSendTGBotMessage: responseBase = data
              setResponseSendTGBotMessage(dataResSendTGBotMessage)
              break
            case IframeBussinessType.GetInviteUserList:
              const dataResInviteUserList: responseDataList = data
              setResponseDataInviteUserList(dataResInviteUserList)
              break
            case IframeBussinessType.CopyToClipboard:
              const dataResCopyToClipboard: responseBase = data
              setResponseDataCopyToClipboard(dataResCopyToClipboard)
              break
            case IframeBussinessType.Task:
              const { action } = data
              switch (action) {
                case IframeBussinessTaskActionType.TaskList:
                  const dataResMissionList: responseDataList = data
                  setResponseDataMissionList(dataResMissionList)
                  break;
              }
          }
        }
      })
    }
  }, [])

  return (
    <List style={{ minHeight: '100vh', height: 'auto' }}>
      <Box>
        <h1>Iframe Communication Demo</h1>
      </Box>
      <Box>
        <Button variant="contained" onClick={() => {
          copyToClipboard()
        }}
        >
          Copy Text to Clipboard
        </Button>
        <Box>
          Copied Text Result: {JSON.stringify(responseDataCopyToClipboard)}
        </Box>
      </Box>
      <Box>
        <List>
          <Button variant="contained" onClick={() => { sendTGBotMessage() }}>Send Bot Message</Button>
          <Box>
            {JSON.stringify(responseDataSendTGBotMessage)}
          </Box>
        </List>
      </Box>
      <Box>
        <List>
          <Button variant="contained" onClick={() => { openWebLink() }}>Open Web Link</Button>
          <Box>Share Link:<a style={{ color: 'white', marginLeft: '10px' }} href={responseDataShareLink.link} target='_blank'>{responseDataShareLink.link}</a></Box>
        </List>
      </Box>
      <Box>
        <List>
          <Button variant="contained" onClick={() => { getShareLink() }}>Get Share Link</Button>
          <Box>Share Link:<a style={{ color: 'white', marginLeft: '10px' }} href={responseDataShareLink.link} target='_blank'>{responseDataShareLink.link}</a></Box>
        </List>
      </Box>
      <Box>
        <List>
          <Button variant="contained" onClick={() => { getInviteUserIDList() }}>Get Invite User ID List</Button>
          <Box>
            {JSON.stringify(responseDataInviteUIDList)}
          </Box>
        </List>
      </Box>
      <Box>
        <List>
          <Button variant="contained" onClick={() => { getInviteUserList() }}>Get Invite User List</Button>
          <Box>
            {JSON.stringify(responseDataInviteUserList)}
          </Box>
        </List>
      </Box>
      <Box>
        <List>
          {(responseDataConnect!.rawAddress!.length === 0) ? <Button variant="contained" onClick={() => { connectWallet() }}>Connect Wallet</Button> : <h3>Connected</h3>}
          <Box>
            {JSON.stringify(responseDataConnect)}
          </Box>
        </List>
      </Box>
      <Box>
        <List>
          <Button variant="contained" onClick={() => { connectAndTrade(0) }}>Connect And Trade(Mint)</Button>
          <Box>
            {JSON.stringify(responseDataTradeMint)}
          </Box>
        </List>
        <List>
          <Button variant="contained" onClick={() => { connectAndTrade(1) }}>Connect And Trade(Buy game props)</Button>
          <Box>
            {JSON.stringify(responseDataTradeBuyGameProps)}
          </Box>
        </List>
        <List>
          <Button variant="contained" onClick={() => { getMyNftList() }}>My NFT List</Button>
          <Box>
            {JSON.stringify(responseDataMyNftList)}
          </Box>
          <h4>{'My NFT List' + '(' + responseDataMyNftList.list.length + ')'}</h4>
          <List style={{ display: 'flex', flexDirection: 'column' }}>
            {
              responseDataMyNftList.list.map((item, index) => {

                const myNftMetadata = item.metadata
                const attributes = myNftMetadata.attributes
                // console.log('my nft metadata==>', myNftMetadata)
                // console.log('my nft attrbuites==>', myNftMetadata.attributes)
                return (
                  <Card key={'mynft-' + index}>
                    <CardContent key={'mynft-fragment-' + index}>
                      {renderNftTags(attributes, index)}

                      <img
                        alt={myNftMetadata.name}
                        src={myNftMetadata.image}
                        style={{
                          display: 'block',
                          // height: 308,
                          objectFit: 'cover',
                          width: '98vw'
                        }}
                      />
                      <span>{myNftMetadata.name}</span>
                      <span style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        width: '90vw'
                      }}>{myNftMetadata.description}</span>
                    </CardContent>
                  </Card>
                )
              })
            }
          </List>
        </List>
        <List>
          <Button variant="contained" onClick={() => { getUserProfile() }}>Get User Profile</Button>
          <Box>
            <span style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>{JSON.stringify(responseDataUserInfo.profile)}</span>
          </Box>

        </List>
        <h2>Missions</h2>
        <List>
          <Button variant="contained" onClick={() => { getMissions() }}>Mission List</Button>
          <Box>
            <span style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>{JSON.stringify(responseDataMissionList.list)}</span>
          </Box>
        </List>
        <Box>
          <List style={{ display: 'flex', flexDirection: 'column' }}>
            {
              responseDataMissionList.list.map((item: any, index: number) => {
                return (
                  item.missionList.length > 0 &&
                  <Card key={'mission-group-' + index}>
                    <CardContent
                      style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        width: '90vw'
                      }}
                    >
                      <h3>{item.title}</h3>
                      <List style={{ display: 'flex', flexDirection: 'column' }}>
                        {
                          item.missionList.map((missionItem: any, missionIndex: number) => {
                            return (
                              <Card key={'mission-' + missionIndex} style={{ marginBottom: '10px' }}>
                                <CardContent
                                  style={{
                                    wordWrap: 'break-word',
                                    wordBreak: 'break-all',
                                    width: '90vw',
                                  }}
                                >
                                  <h4>{missionItem.title}</h4>
                                  <div>
                                    <span>missionId: {missionItem.missionId}</span>
                                  </div>
                                  <div>
                                    <span>brief: {missionItem.brief}</span>
                                  </div>
                                  <div>
                                    <span>description: {missionItem.description}</span>
                                  </div>
                                  <div>
                                    <span>icon: {missionItem.icon}</span>
                                  </div>
                                  <div>
                                    <span>kind: {missionItem.kind}</span>
                                  </div>
                                  <div>
                                    <span>payload: {missionItem.payload}</span>
                                  </div>
                                  <div>
                                    <span>pts: {missionItem.pts}</span>
                                  </div>
                                  <div>
                                    <span>ptsUnit: {missionItem.ptsUnit}</span>
                                  </div>
                                  <div>
                                    <span>finished: {missionItem.finished ? 'true' : 'false'}</span>
                                  </div>
                                  {item.missionGroupId === 50 && (<>
                                    <div style={{ marginBottom: '10px' }}>
                                      <Button variant="contained" onClick={() => { doMission(missionItem) }}>Do Mission</Button>
                                    </div>
                                    <div>
                                      <Button variant="contained" onClick={() => { verifyMission(missionItem.missionId) }}>Verify Mission</Button>
                                    </div>
                                  </>)}

                                </CardContent>
                              </Card>
                            )
                          })
                        }
                      </List>
                    </CardContent>
                  </Card>
                )
              })
            }
          </List>
        </Box>
      </Box>
    </List>

  );
};

export default IframePage
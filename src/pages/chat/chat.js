import resource from '../../resource'
import base from '../../base'
export default {
  name: 'Chat',
  data() {
    return {
      msg: 'Welcome to Chat',
      bindPatientInfo: {},
      userInfo: {},
      chatContent: '',
      contentList: []
    }
  },
  mounted() {
    let _this = this
    this.id = this.$route.query.id
    resource.bindPatientInfo({ patientUserGid: this.id }).then(res => {
      if (res.body.code == 0) {
        _this.bindPatientInfo = res.body.result
      }
    })
    resource.userInfo().then(res => {
      if (res.body.code == 0) {
        _this.userInfo = res.body.result
      }
    })
    resource.newtoken({ userGid: '7e78d0d0d17146cc86309555de96f473' }).then(res => {
      console.log(res)
      RongIMClient.getInstance().hasRemoteUnreadMessages(res.body.result.token, {
        onSuccess: function (hasMessage) {
          console.log(hasMessage)
          if (hasMessage) {
            // 有未读的消息
          } else {
            // 没有未读的消息
          }
        }, onError: function (err) {
          // 错误处理...
        }
      });
    })
  },
  methods: {
    getHistoryRecord() {
      //getHistoryMessages
      RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, this.$route.query.id, null, 20, {
        onSuccess: function (list, hasMsg) {
          console.log(list, 'list')
          // hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
          // list 为拉取到的历史消息列表
        },
        onError: function (error) {
          // APP未开启消息漫游或处理异常
          // throw new ERROR ......
        }
      });
    },
    onReceiveMessage() {
      let _this = this;
      // 消息监听器
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
          console.log(message)
          // 判断消息类型
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage:
              _this.contentList.push({
                headImg: _this.bindPatientInfo.headImg,
                content: message.content.content,
                type: 0
              })

              console.log(message.content.content);
              break;
            case RongIMClient.MessageType.VoiceMessage:
              // 对声音进行预加载                
              // message.content.content 格式为 AMR 格式的 base64 码
              RongIMLib.RongIMVoice.preLoaded(message.content.content);
              break;
            case RongIMClient.MessageType.ImageMessage:
              // do something...
              break;
            case RongIMClient.MessageType.UnknownMessage:
              // do something...
              break;
            default:
            // 自定义消息
            // do something...
          }
        }
      });
    },
    sendMsg() {
      let _this = this
      // 定义消息类型,文字消息使用 RongIMLib.TextMessage
      var msg = new RongIMLib.TextMessage({ content: this.chatContent, extra: "" });
      //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
      //var msg = RongIMLib.TextMessage.obtain("hello");
      var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
      var targetId = this.$route.query.id; // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
        // 发送消息成功
        onSuccess: function (message) {
          //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
          console.log("Send successfully");
          _this.contentList.push({
            content: _this.chatContent,
            headImg: _this.userInfo.headImg,
            type: '1'
          })
          _this.chatContent = ''
        },
        onError: function (errorCode, message) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = '未知错误';
              break;
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
              info = '在黑名单中，无法向对方发送消息';
              break;
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
              info = '不在讨论组中';
              break;
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
              info = '不在群组中';
              break;
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
              info = '不在聊天室中';
              break;
            default:
              info = x;
              break;
          }
          console.log('发送失败:' + info);
        }
      }
      );
    }
  }
}

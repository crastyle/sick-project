import resource from '../../resource'
import base from '../../base'
export default {
  name: 'Chat',
  data() {
    return {
      msg: 'Welcome to Chat',
      bindPatientInfo: {}
    }
  },
  mounted() {
    let _this = this
    this.id = this.$route.query.id
    resource.bindPatientInfo({ patientUserGid: this.id }).then(res => {
      if (res.body.code == 0) {

        _this.bindPatientInfo = res.body.result

        _this.bindPatientInfo.leaveTime = base.formatDate2(res.body.result.leaveTime * 1000)
      }
    })

    let userid = '7e78d0d0d17146cc86309555de96f473'
    resource.newtoken({ userGid: userid }).then(res => {
      if (res.body.code == 0) {
        base.watchIM()
        base.receiveMessage()
        base.connectIM(res.body.result.token)
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function (message) {
            // 判断消息类型
            console.log(message)
            switch (message.messageType) {
              case RongIMClient.MessageType.TextMessage:
                // 发送的消息内容将会被打印
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
      }
    })
  },
  methods: {
    sendMsg() {
      // 定义消息类型,文字消息使用 RongIMLib.TextMessage
      var msg = new RongIMLib.TextMessage({ content: "hello", extra: "附加信息" });
      //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
      //var msg = RongIMLib.TextMessage.obtain("hello");
      var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
      var targetId = this.$route.query.id; // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
        // 发送消息成功
        onSuccess: function (message) {
          //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
          console.log("Send successfully");
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

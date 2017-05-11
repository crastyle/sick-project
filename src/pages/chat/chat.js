import resource from '../../resource'
import base from '../../base'
import { bus } from '../../bus'
import { Toast } from 'mint-ui'
export default {
  name: 'Chat',
  data() {
    return {
      msg: 'Welcome to Chat',
      bindPatientInfo: {},
      userInfo: {},
      chatContent: '',
      contentList: [],
      msgType: true,
      isPreview: false,
      previewImage: '',
      isStartVoice: false,
      voiceId: '',
      isPlaying: false,
      isPlayId: ''
    }
  },
  created() {
    let _this = this
    this.id = this.$route.query.id
    //第一次进入需要事件通知加载完成
    let toast = Toast({
      message: '加载中...'
    })
    bus.$on('imLoad', function () {
      toast.close()
      resource.bindPatientInfo({ patientUserGid: _this.id }).then(res => {
        if (res.body.code == 0) {
          _this.bindPatientInfo = res.body.result
        }
        return resource.userInfo()
      }).then(res => {
        if (res.body.code == 0) {
          _this.userInfo = res.body.result
          _this.getHistoryRecord()

        }
      })
    })
    //第二次进入直接全局变量控制加载
    if (window.onLoadingIMStatus) {
      resource.bindPatientInfo({ patientUserGid: _this.id }).then(res => {
        if (res.body.code == 0) {
          _this.bindPatientInfo = res.body.result
        }
        return resource.userInfo()
      }).then(res => {
        if (res.body.code == 0) {
          _this.userInfo = res.body.result
          _this.getHistoryRecord()
        }
      })
    }
    bus.$on('receiveMsg', function (message) {
      if (message.senderUserId === _this.$route.query.id) {
        _this.contentList.push({
          content: message.content.content,
          type: 0,
          headImg: _this.bindPatientInfo.headImg,
          extra: message.content.extra
        })
      }
    })
    resource.jsApiConfig().then(res => {
      if (res.body.code == 0) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.body.result.appId, // 必填，公众号的唯一标识
          timestamp: res.body.result.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.body.result.nonceStr, // 必填，生成签名的随机串
          signature: res.body.result.signature,// 必填，签名，见附录1
          jsApiList: ['startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
              _this.voiceId = res.localId
            }
          });
        })
      }
    })
  },
  watch: {
    'contentList': function () {
      setTimeout(function () {
        document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight;
      }, 100)
    }
  },
  methods: {
    playVoice(serid) {
      let _this = this
      if (!this.isPlaying) {
        wx.downloadVoice({
          serverId: serid, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            _this.isPlayId = res.localId
            wx.playVoice({
              localId: res.localId
            })
          }
        });
      } else {
        wx.stopVoice({
          localId: _this.isPlayId
        })
      }
    },
    startVoice() {
      if (!this.isStartVoice) {
        this.isStartVoice = true
        wx.startRecord()
      }
    },
    stopVoice() {
      this.isStartVoice = false
      let _this = this
      console.log('stop')
      wx.stopRecord({
        success: function (res) {
          _this.voiceId = res.localId
          wx.uploadVoice({
            localId: _this.voiceId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              console.log(res)
              var serverId = res.serverId; // 返回音频的服务器端ID
              var msg = new RongIMLib.TextMessage({ content: serverId, extra: "voice" });
              //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
              //var msg = RongIMLib.TextMessage.obtain("hello");
              var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
              var targetId = _this.$route.query.id; // 目标 Id
              RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                // 发送消息成功
                onSuccess: function (message) {
                  //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                  _this.contentList.push({
                    content: serverId,
                    headImg: _this.userInfo.headImg,
                    type: '1',
                    extra: 'voice'
                  })
                  console.log('消息发送成功')
                }
              }
              );
            }
          });

        }
      });
    },

    closePreview() {
      this.isPreview = false
    },
    showPreview(url) {
      this.isPreview = true
      this.previewImage = url
    },
    sendImage(event) {
      let _this = this
      console.log(event.target.value)
      if (event.target.value) {
        let options = {
          image: event.target.files[0],
          bucket: 'doctor'
        }
        let toast = Toast({
          message: '图片发送中'
        })
        resource.uploadImageWithCrop(options).then(res => {
          if (res.body.code == 0) {
            toast.close()
            _this.chatContent = res.body.result.imageUrl
            // 定义消息类型,文字消息使用 RongIMLib.TextMessage
            var msg = new RongIMLib.TextMessage({ content: _this.chatContent, extra: "image" });
            //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
            //var msg = RongIMLib.TextMessage.obtain("hello");
            var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
            var targetId = this.$route.query.id; // 目标 Id
            RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
              // 发送消息成功
              onSuccess: function (message) {
                //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                _this.contentList.push({
                  content: _this.chatContent,
                  headImg: _this.userInfo.headImg,
                  type: '1',
                  extra: 'image'
                })
                _this.chatContent = ''
                console.log('消息发送成功')
              }
            }
            );
          }
        })
      }

    },
    getHistoryRecord() {
      let _this = this
      //getHistoryMessages
      RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, this.$route.query.id, 0, 20, {
        onSuccess: function (list, hasMsg) {
          console.log(list)
          for (let i = 0; i < list.length; i++) {
            if (list[i]['senderUserId'] === _this.$route.query.id) {
              _this.contentList.push({
                content: list[i].content.content,
                type: 0,
                headImg: _this.bindPatientInfo.headImg,
                extra: list[i].content.extra
              })
            } else if (list[i]['senderUserId'] === localStorage.getItem('userid')) {
              _this.contentList.push({
                content: list[i].content.content,
                type: 1,
                headImg: _this.userInfo.headImg,
                extra: list[i].content.extra
              })
            }
          }
          // hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
          // list 为拉取到的历史消息列表
        },
        onError: function (error) {
          // APP未开启消息漫游或处理异常
          // throw new ERROR ......
        }
      });
    },
    changeStatus() {
      this.msgType = !this.msgType
    },
    sendMsg() {
      if (!this.chatContent) {
        Toast({
          message: '说点儿什么吧？',
          duration: 1500
        })
        return false
      }

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
          _this.contentList.push({
            content: _this.chatContent,
            headImg: _this.userInfo.headImg,
            type: '1'
          })
          _this.chatContent = ''
          console.log('消息发送成功')
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

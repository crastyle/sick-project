// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// rem
import './flexble.js'
// mint-ui
import 'mint-ui/lib/style.css'
import "./styles/reset-ui.scss"
import resource from './resource'
import base from './base'
import "./styles/app.scss"
Vue.config.productionTip = false

resource.interceports()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted() {
    if (this.$route.name != 'Login') {
      base.getopenId()
    }
    resource.rongyunAppKey().then(res => {
      if (res.body.code == 0) {
        base.initIm(res.body.result.appKey)
      }
    })
  },
  created() {
    let _this = this
    let userid = '7e78d0d0d17146cc86309555de96f473'
    resource.newtoken({ userGid: userid }).then(res => {
      console.log("asd")
      if (res.body.code == 0) {
        base.watchIM()
        _this.receiveMsg()
        base.connectIM(res.body.result.token)
      }
    })
  },
  methods: {
    receiveMsg() {
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
      })
    }
  }

})

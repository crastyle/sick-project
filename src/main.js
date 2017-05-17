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
import { bus } from './bus'
import "./styles/app.scss"
import VueTouch from 'vue-touch'
// import 'vconsole';
Vue.config.productionTip = false
Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$footerShow = true
Vue.prototype.$static = 'http://localhost:8080/static/'
resource.interceports()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    let _this = this
    window.onLoadingIMStatus = false
    let route = this.$route.name
    console.log(route)
    if (route !== 'PatientCare' && route !== 'Register' && route !== 'Hello' && route !== 'RegisterExtra' && route !== 'RegisterExtra2') {
      resource.checkStatus().then(res => {
        if (res.body.code == 0) {
          if (res.body.result.auditStatus == 0 || res.body.result.auditStatus == 2) {
            _this.$router.replace('examine')
          }
        }
      })
      // 如果是在注册页面，让他授权登录
      resource.userInfo().then(res => {
        if (res.body.code == 0) {
          let userid = res.body.result.userGid
          let rongyunToken = res.body.result.rongyunToken
          resource.rongyunAppKey().then(res => {
            if (res.body.code == 0) {
              base.initIm(res.body.result.appKey)
              if (!rongyunToken) {
                base.watchIM()
                base.receiveMsg()
                base.connectIM(rongyunToken)
                bus.$emit('imLoad')
              } else {
                resource.newtoken({ userGid: userid }).then(res => {
                  if (res.body.code == 0) {
                    base.watchIM()
                    base.receiveMsg()
                    base.connectIM(res.body.result.token, function(){
                      window.onLoadingIMStatus = true
                      bus.$emit('imLoad')
                    })
                  }
                })
              }
            }
          })
        } else {
          _this.$router.replace('patientCare')
        }
      })
    }


    // resource.userInfo().then(res => {
    //     if (res.body.code == 0) {
    //       let userid = res.body.result.userGid
    //       let rongyunToken = res.body.result.rongyunToken
    //       resource.rongyunAppKey().then(res => {
    //         if (res.body.code == 0) {
    //           base.initIm(res.body.result.appKey)
    //           if (!rongyunToken) {
    //             base.watchIM()
    //             base.receiveMsg()
    //             base.connectIM(rongyunToken)
    //           } else {
    //             resource.newtoken({ userGid: userid }).then(res => {
    //               if (res.body.code == 0) {
    //                 base.watchIM()
    //                 base.receiveMsg()
    //                 base.connectIM(res.body.result.token)
    //               }
    //             })
    //           }
    //         }
    //       })
    //     } else {
    //       _this.$router.replace('patientCare')
    //     }
    //   })

  }
})

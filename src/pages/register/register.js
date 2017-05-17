import Vue from 'vue'
import { Field, Button, Toast } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
export default {
  name: 'Login',
  data() {
    return {
      validButtonText: '获取验证码',
      buttonStatus: false,
      userInfo: {
        mobile: '',
        smsCode: '',
        openId: ''
      }
    }
  },
  mounted() {
    if ((!localStorage.getItem('answerList') || !this.$route.query.openId) && base.isWechat()) {
      this.$router.replace('answer')
    }
    this.userInfo.openId = this.$route.query.openId
  },
  methods: {
    getCode: function () {
      let second = 60
      let _this = this
      if (!base.validate.isTelephone(this.userInfo.mobile)) {
        Toast({
          message: '请输入正确的手机号码',
          duration: 2000
        })
        return false
      }

      if (_this.buttonStatus) {
        return false
      }
      _this.buttonStatus = true
      this.validButtonText = `${second}重新获取`
      resource.smsCode({
        mobile: this.userInfo.mobile
      }).then(res => {
        Toast({
          message: '验证码发送成功',
          duration: 1500
        })
        let timer = setInterval(() => {
          second--
          _this.validButtonText = `${second}重新获取`
          if (second === 0) {
            _this.buttonStatus = false
            _this.validButtonText = '获取验证码'
            clearInterval(timer)
          }
        }, 1000)
      })
    },
    login() {
      let mobile = this.userInfo.mobile
      let code = this.userInfo.smsCode
      let _this = this
      if (!base.validate.isTelephone(mobile)) {
        Toast({
          message: '请输入正确的手机号码',
          duration: 2000
        })
        return false
      }
      if (!base.validate.isValicode(code)) {
        Toast({
          message: '验证码不正确',
          duration: 2000
        })
        return false
      }
      resource.checkMobile(this.userInfo).then(res => {
        if (res.body.code == 0) {
          window.localStorage.setItem('tempUserInfo', JSON.stringify(_this.userInfo))
          _this.$router.push('registerExtra')
        }
      })
    }
  }
}

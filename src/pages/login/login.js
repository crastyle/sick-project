import Vue from 'vue'
import { Actionsheet, Field, Button,Toast } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
export default {
  name: 'Login',
  data() {
    return {
      sheetVisible: true,
      validButtonText: '获取验证码',
      buttonStatus: false,
      userInfo: {
        mobile: '',
        smsCode: ''
      }
    }
  },
  methods: {
    getCode: function () {
      console.log(base)
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
      this.$router.push('/sicklist')
    }
  }
}

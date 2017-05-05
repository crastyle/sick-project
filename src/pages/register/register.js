import Vue from 'vue'
import { Actionsheet, Field, Button,Toast } from 'mint-ui'
import Panel from '../../components/Panel'
import resource from '../../resource'
import base from '../../base'
import { bus } from '../../bus'
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
export default {
  name: 'Login',
  data() {
    return {
      msg: 'Welcome to Login',
      sheetVisible: true,
      actions: [{
        name: '男',
        method: () => {

        }
      }, {
        name: '女',
        method: () => {

        }
      }],
      validButtonText: '获取验证码',
      buttonStatus: false,
      userInfo: {
        name: '',
        mobile: '',
        smsCode: '',
        headImg: '',
        openId: '',
        hospital: '',
        department: '',
        answerList: '',

      },
      visible: false,
      data: [1, 2, 3],
      type: ''
    }
  },

  mounted() {

    if(!localStorage.getItem('answerList') || !this.$route.query.openId) {
      this.$router.replace('patientCare')
    }
    if (this.$route.params.imgurl) {
      this.userInfo.headImg = this.$route.params.imgurl
    }
    this.userInfo.openId = this.$route.query.openId
    this.userInfo.answerList = localStorage.getItem('answerList').split('|')
  },
  methods: {
    
    showDepartment() {
      let _this = this
      this.type = 'department'
      resource.department().then(res => {
        if (res.body.code == 0) {
          _this.data = res.body.result
          this.visible = true
        }
      })
    },
    showHospital() {
      let _this = this
      this.type = 'hospital'
      resource.hospital({ namePrefix: '' }).then(res => {
        if (res.body.code == 0) {
          _this.data = res.body.result
          this.visible = true
        }
      })
    },
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
    upHeadImg() {
      this.$router.push({ name: 'Cropper', query: { redirect: 'Register',openId: this.$route.query.openId } })
    },
    register() {
      let name = this.userInfo.name
      let mobile = this.userInfo.mobile
      let code = this.userInfo.smsCode
      let _this = this
      if (!name) {
        Toast({
          message: '请输入正确的姓名',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.hospital) {
        Toast({
          message: '请选择医院',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.department) {
        Toast({
          message: '请选择科室',
          duration: 2000
        })
        return false
      }

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
      
      resource.register(this.userInfo).then(res => {
        if (res.body.code == 0) {
          Toast({
            message: '注册成功',
            duration: 2000,
            position: 'middle'
          })
          let token = res.body.result.t
          let userid = res.body.result.u
          window.localStorage.setItem('userid', userid)
          window.localStorage.setItem('token', token)
          resource.rongyunAppKey().then(res => {
            if (res.body.code == 0) {
              base.initIm(res.body.result.appKey)
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
          })
          setTimeout(() => {
            _this.$router.replace('imlist')
          }, 2000)
        }
      })
    }
  },
  components: {
    Panel
  }
}

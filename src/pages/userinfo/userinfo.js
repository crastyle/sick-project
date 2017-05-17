import resource from '../../resource'
import base from '../../base'
import { MessageBox,Toast } from 'mint-ui'
import Panel from '../../components/Panel'
import province from '../../province'
import city from '../../city'
export default {
  name: 'Userinfo',
  data() {
    return {
      msg: 'Welcome to Userinfo',
      userInfo: {
        headImg: '',
        name: '',
        hospital: '',
        department: '',
        identifyCode: '',
        identifyImg: '',
        rongyunToken: ''
      },
      data: [],
      visible: false,
      type: '',
      showMobile: false,
      buttonStatus: false,
      mobile: '',
      validButtonText: '获取验证码',
      province: province
    }
  },
  mounted: function () {
    let _this = this
    resource.userInfo().then(res => {
      if (res.body.code == 0) {
        _this.userInfo = res.body.result
        _this.mobile = JSON.parse(JSON.stringify(_this.userInfo))['mobile']
      }
    })
  },
  methods: {
    updateProvince() {
      this.visible = true
      this.data = []
      this.data = this.province
      this.type = 'updateProvince'
    },
    updateCity() {
      if (!this.userInfo.hospitalProvince) {
        Toast({
          message: '请先选择省份',
          duration: 2000
        })
        return false
      }
      let cityList = city[this.userInfo.hospitalProvince]
      this.data = cityList
      this.type = 'updateCity'
      this.visible = true
    },
    updateMobile() {
      this.showMobile = true
    },
    cancelDialog() {
      this.showMobile = false
    },
    validMobile() {
      let _this = this
      let mobile = this.mobile
      resource.updateUserInfo({
        mobile: mobile,
        smsCode: this.userInfo.smsCode

      }).then(res => {
        if (res.body.code == 0) {
          _this.showMobile = false
          _this.userInfo.mobile = mobile
        }
      })
    },
    getCode() {
      let second = 60
      let _this = this
      let mobile = this.mobile
      console.log(mobile, this.userInfo.mobile)
      if (mobile == this.userInfo.mobile) {
        Toast({
          message: '不能和原始号码相同',
          duration: 1500
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
      if (_this.buttonStatus) {
        return false
      }
      _this.buttonStatus = true
      this.validButtonText = `${second}重新获取`
      resource.smsCode({
        mobile: mobile
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
    updateName() {
      let _this = this
      MessageBox.prompt('请输入姓名').then((value, action) => {
        if (value.value) {
          resource.updateUserInfo({
            name: value.value
          }).then(res => {
            if (res.body.code == 0) {
              _this.userInfo.name = value.value
            }
          })
        }
      })
    },
    updateHead() {
      this.$router.push({
        name: 'Cropper',
        query: {
          redirect: 'Userinfo'
        }
      })
    },
    updateHospital() {
      let _this = this
      this.type = 'UpdateHospital'
      resource.hospital({ namePrefix: '' }).then(res => {
        if (res.body.code == 0) {
          _this.data = res.body.result
          _this.visible = true
        }
      })
    },
    updateDepartment() {
      let _this = this
      this.type = 'UpdateDepartment'
      resource.department().then(res => {
        if (res.body.code == 0) {
          _this.data = res.body.result
          _this.visible = true
        }
      })
    }
  },
  components: {
    Panel
  }
}
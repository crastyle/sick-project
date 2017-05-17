import Vue from 'vue'
import { Actionsheet, Field, Button, Toast } from 'mint-ui'
import Panel from '../../components/Panel'
import resource from '../../resource'
import base from '../../base'
import { bus } from '../../bus'
import province from '../../province'
import city from '../../city'
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
      cardTypeList: [{
        name: '身份证',
        method: () => {
          this.certificateTypeStr = '身份证'
          this.userInfo.certificateType = '1'
        }
      }, {
        name: '军官证',
        method: () => {
          this.certificateTypeStr = '军官证'
          this.userInfo.certificateType = '2'
        }
      }, {
        name: '台胞证',
        method: () => {
          this.certificateTypeStr = '台胞证'
          this.userInfo.certificateType = '3'
        }
      }],
      certificateTypeStr: '',
      userInfo: {
        name: '',
        headImg: '',
        certificateType: '',
        certificateCode: '',
        hospital: '',
        hospitalProvince: '',
        hospitalCity: '',
      },
      visible: false,
      data: [1, 2, 3],
      type: '',
      isFirstLogin: false,
      province: province,
      cardTypeVisiable: false,
      titlesVisiable: false,
      userProfesser: false
    }
  },

  mounted() {
    if (!localStorage.getItem('answerList') && base.isWechat()) {
      this.$router.replace('answer')
    }
    if (this.$route.query.action == "update") {
      let temp = JSON.parse(localStorage.getItem('tempUserInfo'))
      for (let key in temp) {
        for (let st in this.userInfo) {
          if (key == st) {
            this.userInfo[st] = temp[key]
          }
        }
      }
      if (this.userInfo.certificateType == 1) {
        this.certificateTypeStr = '身份证'
      }
      if (this.userInfo.certificateType == 2) {
        this.certificateTypeStr = '军官证'
      }
      if (this.userInfo.certificateType == 3) {
        this.certificateTypeStr = '台胞证'
      }
    } else if (this.$route.params.imgurl) {
      this.userInfo.headImg = this.$route.params.imgurl
    } else {
      this.userInfo.openId = JSON.parse(localStorage.getItem('tempUserInfo'))['openId']
      resource.checkBind({ openId: this.userInfo.openId }).then(res => {
        if (res.body.code == 0) {
          this.userInfo.headImg = res.body.result.wechatHeadImg
        }
      })
    }
  },
  methods: {
    showTitles() {
      this.titlesVisiable = true
    },
    showProvince() {
      this.visible = true
      this.data = this.province
      this.type = 'province'
    },
    showCity() {
      if (!this.userInfo.hospitalProvince) {
        Toast({
          message: '请先选择省份',
          duration: 2000
        })
        return false
      }
      let cityList = city[this.userInfo.hospitalProvince]
      this.data = cityList
      this.type = 'city'
      this.visible = true
    },
    showCardType() {
      this.cardTypeVisiable = true
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
    upHeadImg() {
      this.$router.push({ name: 'Cropper', query: { redirect: 'RegisterExtra', openId: this.$route.query.openId } })
    },
    register() {
      let _this = this
      let name = this.userInfo.name
      if (!this.userInfo.headImg) {
        Toast({
          message: '请先上传头像',
          duration: 2000
        })
        return false
      }
      if (!name) {
        Toast({
          message: '请输入正确的姓名',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.certificateType) {
        Toast({
          message: '请选择证件类型',
          duration: 2000
        })
        return false
      }
      if (!base.validate.certificateCode(this.certificateTypeStr, this.userInfo.certificateCode)) {
        Toast({
          message: '请输入正确的证件号码',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.hospitalProvince) {
        Toast({
          message: '请选择医院区域',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.hospitalCity) {
        Toast({
          message: '请选择医院区域',
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
      //  本地存储和当前页同步
      if (_this.$route.query.action === 'update') {
        let tempUserInfo = JSON.parse(localStorage.getItem('tempUserInfo'))
        let currentUserInfo = this.userInfo
        for (let key in tempUserInfo) {
          for (let st in currentUserInfo) {
            if (key == st) {
              tempUserInfo[key] = currentUserInfo[st]
            }
          }
        }
        localStorage.setItem('tempUserInfo', JSON.stringify(tempUserInfo))
        _this.$router.push({ name: 'RegisterExtra2', query: { action: 'update' } })
      } else {
        let tempUserInfo = JSON.parse(localStorage.getItem('tempUserInfo'))
        let currentUserInfo = this.userInfo
        for (let key in tempUserInfo) {
          currentUserInfo[key] = tempUserInfo[key]
        }
        localStorage.setItem('tempUserInfo', JSON.stringify(currentUserInfo))
        _this.$router.push('registerExtra2')
      }
    }
  },
  components: {
    Panel
  }
}

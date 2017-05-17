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
      titles: [{
        name: '主任医生',
        method: () => {
          this.userInfo.title = '主任医生'
        }
      }, {
        name: '副主任医生',
        method: () => {
          this.userInfo.title = '副主任医生'
        }
      }, {
        name: '主治医生',
        method: () => {
          this.userInfo.title = '主治医生'
        }
      }, {
        name: '住院医生',
        method: () => {
          this.userInfo.title = '住院医生'
        }
      }],
      userInfo: {
        department: '',
        titleImg: '',
        professionImg: '',
        answerList: '',
        title: '',
        extraPluses: ''
      },
      visible: false,
      data: [1, 2, 3],
      type: '',
      titlesVisiable: false,
    }
  },
  mounted() {
    if (!localStorage.getItem('answerList') && base.isWechat()) {
      this.$router.replace('anwser')
    }
    if (this.$route.query.action == "update") {
      let user = JSON.parse(localStorage.getItem('tempUserInfo'))
      this.userInfo = Object.assign(this.userInfo, user)
    }
  },
  methods: {
    choiceTitleImg(ev) {
      let val = ev.target.value
      let URL = window.URL || window.webkitURL;
      let _this = this
      if (val) {
        let src = URL.createObjectURL(ev.target.files[0])
        base.uglyImage(src, { width: 640 }, function (url) {
          return resource.uploadImageWithBase64Crop({
            bucket: 'doctor'
          }, url).then(res => {
            if (res.body.code == 0) {
              _this.userInfo.titleImg = res.body.result.imageUrl
            }
          })
        })
      }
    },
    choiceProfessionImg(ev) {
      console.log(this.userInfo)
      let val = ev.target.value
      let URL = window.URL || window.webkitURL;
      let _this = this
      if (val) {
        let src = URL.createObjectURL(ev.target.files[0])
        base.uglyImage(src, { width: 640 }, function (url) {
          return resource.uploadImageWithBase64Crop({
            bucket: 'doctor'
          }, url).then(res => {
            if (res.body.code == 0) {

              _this.userInfo.professionImg = res.body.result.imageUrl
              console.log(_this.userInfo.professionImg)
            }
          })
        })
      }
    },
    choiceExtraPluses(ev) {
      let val = ev.target.value
      let URL = window.URL || window.webkitURL;
      let _this = this
      if (val) {
        let src = URL.createObjectURL(ev.target.files[0])
        base.uglyImage(src, { width: 640 }, function (url) {
          return resource.uploadImageWithBase64Crop({
            bucket: 'doctor'
          }, url).then(res => {
            if (res.body.code == 0) {
              _this.userInfo.extraPluses = res.body.result.imageUrl
            }
          })
        })
      }
    },
    showTitles() {
      this.titlesVisiable = true
    },
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
    register() {
      let _this = this
      if (!this.userInfo.department) {
        Toast({
          message: '请选择科室',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.title) {
        Toast({
          message: '请选择职称',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.titleImg) {
        Toast({
          message: '请上传职业证书',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.professionImg) {
        Toast({
          message: '请上传专业职称',
          duration: 2000
        })
        return false
      }

      if (_this.$route.query.action == 'update') {
        localStorage.setItem('tempUserInfo', JSON.stringify(this.userInfo))
        resource.apply(this.userInfo).then(res => {
          if (res.body.code == 0) {
            Toast({
              message: '资料已提交',
              duration: 2000,
              position: 'middle'
            })
            setTimeout(() => {
              _this.$router.push('examine')
            }, 2000)
          }
        })
      } else {
        let tempUserInfo = JSON.parse(localStorage.getItem('tempUserInfo'))
        let currentUserInfo = this.userInfo
        for (let key in tempUserInfo) {
          currentUserInfo[key] = tempUserInfo[key]
        }
        currentUserInfo['answerList'] = localStorage.getItem('answerList').split('|')
        localStorage.setItem('tempUserInfo', JSON.stringify(currentUserInfo))
        resource.register(currentUserInfo).then(res => {
          if (res.body.code == 0) {
            Toast({
              message: '资料已提交',
              duration: 2000,
              position: 'middle'
            })
            let token = res.body.result.t
            let userid = res.body.result.u
            window.localStorage.setItem('userid', userid)
            window.localStorage.setItem('token', token)
            // resource.rongyunAppKey().then(res => {
            //   if (res.body.code == 0) {
            //     base.initIm(res.body.result.appKey)
            //     resource.newtoken({ userGid: userid }).then(res => {
            //       if (res.body.code == 0) {
            //         base.watchIM()
            //         base.receiveMsg()
            //         base.connectIM(res.body.result.token, function () {
            //           window.onLoadingIMStatus = true
            //           bus.$emit('imLoad')
            //         })
            //       }
            //     })
            //   }
            // })
            setTimeout(() => {
              _this.$router.push('examine')
            }, 2000)
          }
        })
      }

    }
  },
  components: {
    Panel
  }
}

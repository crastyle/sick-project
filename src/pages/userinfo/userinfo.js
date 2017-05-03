import resource from '../../resource'
import base from '../../base'
import { MessageBox } from 'mint-ui'
import Panel from '../../components/Panel'
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
      type: ''
    }
  },
  mounted: function () {
    let _this = this
    resource.userInfo().then(res => {
      if (res.body.code == 0) {
        _this.userInfo = res.body.result
      }
    })
  },
  methods: {
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
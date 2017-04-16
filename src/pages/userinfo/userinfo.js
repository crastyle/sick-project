import resource from '../../resource'
import base from '../../base'
export default {
  name: 'Userinfo',
  data () {
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
      }
    }
  },
  mounted: function() {
    let _this = this
    resource.userInfo().then(res => {
      if (res.body.code == 0) {
        _this.userInfo = res.body.result
      }
    })
  }
}
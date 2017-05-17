import Vue from 'vue'
import { Button } from 'mint-ui'
import resource from  '../../resource'
Vue.component(Button.name, Button)
export default {
  name: 'Examine',
  data() {
    return {
      status: false,
      msg: ''
    }
  },
  mounted() {
    let _this = this
    resource.checkStatus().then(res => {
      if (res.body.code == 0) {
        if (res.body.result.auditStatus == 0) {
          _this.status = false
        }
        if (res.body.result.auditStatus == 1) {
          _this.$router.replace('imlist')
        }
        if (res.body.result.auditStatus == 2) {
          _this.status = true
          _this.msg = res.body.result.auditMsg
        }
      }
    })
  },
  methods: {
    updateUserInfo() {
      this.$router.push({name: 'RegisterExtra', query: {action: 'update'}})
    }
  }
}
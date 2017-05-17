import Vue from 'vue'
import {Cell,Button,MessageBox, Toast} from 'mint-ui'
import resource from  '../../resource'
Vue.component(Cell.name, Cell)
Vue.component(Button.name, Button)
export default {
  name: 'Groups',
  data () {
    return {
      msg: 'Welcome to Groups',
      total: 0,
      groups: []
    }
  },
  mounted() {
    resource.getGroupList().then(res => {
      if (res.body.code == 0) {
        this.groups = res.body.result.groupList
        this.total = res.body.result.total
      }
    })
  },
  methods: {
    group(item) {
      this.$router.push({name: 'Sicklist', query: {id: item.gid, name: item.name}})
    },
    create() {
      MessageBox.prompt('请输入组名', '').then((res) => {
        let groupName = res.value
        if (res.action === 'confirm') {
          if (!res.value) {
            Toast({
              message: '分组名不能为空',
              duration: 2000
            })
            return false
          }
          resource.addGroup({name: groupName}).then(res => {
            if (res.body.code == 0) {
              this.groups.push({
                name: groupName,
                gid: res.body.result.gid,
                patientNum: 0
              })
            }
          })
        }
      })
    }
  }
}
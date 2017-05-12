import Vue from 'vue'
import {Cell,Button,MessageBox, Toast} from 'mint-ui'
Vue.component(Cell.name, Cell)
Vue.component(Button.name, Button)
export default {
  name: 'Groups',
  data () {
    return {
      msg: 'Welcome to Groups',
      groups: [{
        id: 'sdfsdfsdf',
        name: '默认分组',
        num: 300
      }, {
        id: 'sdfeg',
        name: '糖尿病',
        num: 12
      }, {
        id: 'dfgdf',
        name: '高血糖',
        num: 15
      }]
    }
  },
  methods: {
    group(item) {
      this.$router.push({name: 'Sicklist', query: {id: item.id}})
    },
    create() {
      MessageBox.prompt('请输入组名', '').then((res) => {
        console.log(res)
        if (res.action === 'confirm') {
          if (!res.value) {
            Toast({
              message: '小组名不能为空',
              duration: 2000
            })
            return false
          }
          this.groups.push({
            id: parseInt(Math.random()*9999) + 1,
            name: res.value,
            num: 0
          })
        }
      })
    }
  }
}
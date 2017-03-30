import Vue from 'vue'
import { Swipe, SwipeItem, Radio } from 'mint-ui'

Vue.component(Radio.name, Radio)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  name: 'PatientCare',
  data () {
    return {
      msg: 'Welcome to PatientCare',
      value: '先快后慢'
    }
  },
  methods: {
    go () {
      this.$router.push('/login')
    }
  }
}

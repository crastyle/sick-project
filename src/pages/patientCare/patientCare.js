import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  name: 'PatientCare',
  data () {
    return {
      msg: 'Welcome to PatientCare'
    }
  }
}

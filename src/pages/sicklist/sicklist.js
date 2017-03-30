import Vue from 'vue'
import { Search } from 'mint-ui';
Vue.component(Search.name, Search);

export default {
  name: 'Sicklist',
  data () {
    return {
      msg: 'Welcome to Sicklist',
      keyword: '搜索关键字'
    }
  },
  methods: {
    sicker: function() {
      this.$router.push('sicker')
    }
  }
}

import base from '../../base'
import resource from '../../resource'
export default {
  name: 'Imlist',
  data () {
    return {
      msg: 'Welcome to Imlist'
    }
  },
  methods: {
    chat: function() {
      this.$router.push('/chat')
    }
  }
}

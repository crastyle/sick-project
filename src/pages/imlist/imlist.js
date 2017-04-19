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
  },
  mounted() {

  },
  created() {
    // let userid = localStorage.getItem('u_uid')
    let userid = '7e78d0d0d17146cc86309555de96f473'
    resource.rongyunAppKey().then(res => {
      if (res.body.code == 0) {
        base.initIm(res.body.result.appKey)
        base.watchIM()
        return resource.newtoken({userGid: userid})
      }
    }).then(res => {
      if(res.body.code ==0) {
        base.receiveMessage()
        base.connectIM(res.body.result.token)
        base.getUnReceiveMessage(res.body.result.token, function(res){
          console.log(res)
        })
      } 
    })
  }
}

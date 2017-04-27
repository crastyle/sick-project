import base from '../../base'
import resource from '../../resource'
import {Toast} from 'mint-ui'
import { bus } from '../../bus'
export default {
  name: 'Imlist',
  data() {
    return {
      msg: 'Welcome to Imlist',
      chatList: [],
      corrent: false,
      enter: false,
      userInfo: {}
    }
  },
  created() {
    const _this = this
    const toast = Toast({
      message: '数据获取中...'
    })
    bus.$on('imLoad', function() {
      _this.getChatList()
      toast.close()
    })
  },
  methods: {
    chat: function () {
      this.$router.push('/chat')
    },
    getChatList() {
      let _this = this
      RongIMClient.getInstance().getConversationList({
        onSuccess: function (list) {
          console.log(list)
          // list => 会话列表集合。
        },
        onError: function (error) {
          // do something...
        }
      }, null);
    }
  }
}

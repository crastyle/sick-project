import base from '../../base'
import resource from '../../resource'
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
  mounted() {
    let _this = this
    _this.getChatList()
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
          resource.userInfo().then(res => {

            if (res.body.code == 0) {
              let pushArr = []
              _this.userInfo  = res.body.result
              for(let i = 0; i < list.length ; i++) {
                if (list[i]['targetId'] == _this.userInfo.userGid) {
                  pushArr.push(list[i]['senderUserId'])
                }
              }
            }
          })

          _this.enter = true
          _this.chatList = list
          
          // list => 会话列表集合。
        },
        onError: function (error) {
          // do something...
        }
      }, null);
    }
  }
}

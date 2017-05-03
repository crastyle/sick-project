import base from '../../base'
import resource from '../../resource'
import { Toast } from 'mint-ui'
import { bus } from '../../bus'
export default {
  name: 'Imlist',
  data() {
    return {
      msg: 'Welcome to Imlist',
      chatList: [],
      corrent: false,
      enter: false,
      userInfo: {},
      unReceiveList: []
    }
  },
  mounted() {
    const _this = this
    this.toast = Toast({
      message: '数据获取中...'
    })
    bus.$on('imLoad', function () {
      _this.getChatList()
    })
    if (window.onLoadingIMStatus) {
      _this.getChatList()
    }
    bus.$on('receiveMsg', function (message) {
      if (_this.unReceiveList.indexOf(message.targetId) < 0) {
        _this.unReceiveList.push(message.targetId)
      }
      _this.getChatList(_this.unReceiveList)
    })
  },
  methods: {
    goChat: function (item) {
      this.$router.push({ name: 'chat', query: { id: item.userInfo.patientUserGid } })
    },
    getChatList(unlist) {
      console.log(unlist)
      let _this = this
      RongIMClient.getInstance().getConversationList({
        onSuccess: function (list) {
          console.log(list)
          _this.toast.close()
          let myId = localStorage.getItem('userid')
          if (list && list.length > 0) {
            let resultList = []
            for (let i = 0; i < list.length; i++) {
              resultList.push(list[i]['targetId'])
            }
            resource.getPatientListByIds({ patientUserGidList: resultList }).then(res => {
              if (res.body.code == 0) {
                let users = res.body.result
                let temp = []
                for (let i = 0; i < list.length; i++) {
                  for (let j = 0; j < users.length; j++) {
                    if (list[i]['targetId'] == users[j]['patientUserGid']) {
                      temp.push({
                        userInfo: users[j],
                        sendTime: base.formatDate2(list[i]['latestMessage']['sentTime']),
                        content: list[i]['latestMessage']['content']['content'],
                        isNewMessage: false
                      })
                    }
                  }
                }
                if (unlist && unlist.length > 0) {
                  for (let i = 0; i < temp.length; i++) {
                    for (let j = 0; j < unlist.length; j++) {
                      if (temp[i]['userInfo']['targetId'] == unlist[j]) {
                        temp[i]['isNewMessage'] = true
                      }
                    }
                  }
                }
                _this.chatList = temp
              }
            })
          }

          // list => 会话列表集合。
        },
        onError: function (error) {
          // do something...
        }
      }, null);
    }
  }
}

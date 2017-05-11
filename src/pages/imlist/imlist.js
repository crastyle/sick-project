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
      if (!localStorage.getItem('unlist')) {
        localStorage.setItem('unlist', message.targetId)
      } else {
        let unlist = localStorage.getItem('unlist').split(',')
        if (unlist.indexOf(message.targetId) < 0) {
          unlist.push(message.targetId)
          localStorage.setItem('unlist', unlist)
        }
        _this.getChatList()
      }
    })
    
  },
  methods: {
    goChat: function (item) {
      if (localStorage.getItem('unlist')) {
        let unlist = localStorage.getItem('unlist').split(',')
        unlist.splice(item.userInfo.patientUserGid, 1)
        localStorage.setItem('unlist', unlist)
      }
      this.$router.push({ name: 'chat', query: { id: item.userInfo.patientUserGid } })
    },
    getChatList(unlist) {
      console.log(unlist)
      let _this = this
      RongIMClient.getInstance().getConversationList({
        onSuccess: function (list) {
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
                if (localStorage.getItem('unlist')) {
                  let unlist = localStorage.getItem('unlist').split(',')
                  if (unlist && unlist.length > 0) {
                    console.log('newMessage', unlist)
                    for (let i = 0; i < temp.length; i++) {
                      for (let j = 0; j < unlist.length; j++) {
                        if (temp[i]['userInfo']['patientUserGid'] == unlist[j]) {
                          console.log('I am in')
                          temp[i]['isNewMessage'] = true
                        }
                      }
                    }
                  }
                }

                _this.chatList = temp
                console.log(_this.chatList, 'chatList')
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

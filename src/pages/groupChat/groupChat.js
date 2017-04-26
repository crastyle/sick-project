import resource from '../../resource'
import base from '../../base'
export default {
  name: 'GroupChat',
  data() {
    return {
      msg: 'Welcome to GroupChat',
      contentList: [],
      chatContent: '',
      msgType: true,
      chatUserList: [],
      headImg: '',
      type: 1
    }
  },
  mounted() {
    this.ids = this.$route.params.ids
    this.type = this.$route.query.type
    let _this = this
    if (this.type == 0) {
      if (!this.ids) {
        this.$router.replace('sicklist')
      } else {
        
        resource.getPatientListByIds({ patientUserGidList: this.ids }).then(res => {
          if (res.body.code == 0) {
            console.log(res)
            _this.chatUserList = res.body.result
          }
        })
      }

    }
    resource.userInfo().then(res => {
      if (res.body.code == 0) {
        _this.headImg = res.body.result.headImg
      }
    })
  },
  methods: {
    sendMsg() {
      let _this = this
      if (this.type == 0) {
        resource.sendToSpecifiedPatient({ patientUserGidList: this.ids, content: this.chatContent }).then(res => {
          if (res.body.code == 0) {
            _this.contentList.push({
              type: 1,
              headImg: _this.headImg,
              content: _this.chatContent
            })
            _this.chatContent = ''
          }
        })
      }
      if (this.type == 1) {
        resource.sendToAllPatient({ content: this.chatContent }).then(res => {
          if (res.body.code == 0) {
            _this.contentList.push({
              type: 1,
              headImg: _this.headImg,
              content: _this.chatContent
            })
            _this.chatContent = ''
          }
        })
      }
    }
  }
}
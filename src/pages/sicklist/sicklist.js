import Vue from 'vue'
import { Search, InfiniteScroll, CellSwipe } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
import $ from 'jquery'
Vue.component(Search.name, Search);
Vue.component(CellSwipe.name, CellSwipe);
Vue.use(InfiniteScroll)
export default {
  name: 'Sicklist',
  data() {
    return {
      msg: 'Welcome to Sicklist',
      keyword: '搜索关键字',
      patientList: [],
      namePrefix: '',
      pageSize: 50,
      pageNumber: 1,
      load: true,
      gid: '',
      groupName: '',
      searchPageSize: 50,
      searchPageNumber: 1,
      searchLoad: true,
      searchPatientList: [],
      searchLocalData: [],
      isSearch: false,
      isActiveGroup: false,
      activeList: [{
        isActive: false
      }],
      groupIds: [],
      selected: false,
      selectedUsers: [],
      name: '心脑血管患者',
      isDrag: false,
      dragDistance: 0,
      initPosition: 0

    }
  },
  mounted: function () {
    this.gid = this.$route.query.id
    this.groupName = this.$route.query.name
    resource.getGroupDetail({
      groupGid: this.gid
    }).then((res) => {
      if (res.body.code == 0) {
        for (let i = 0; i < res.body.result.length; i++) {
          res.body.result[i].isActive = false
          res.body.result[i]['group'] = res.body.result[i]['namepy'].charAt(0).toUpperCase()
        }
        this.searchLocalData = base.groupBy(res.body.result, ['group'])
      }
    })
  },
  methods: {
    goMember() {
      this.$router.push({name: 'Member', query: {id: this.gid, groupName: this.groupName}})
    },
    deleteItem(user) {
      resource.removePatientFromGroup({
        patientUserGid: user.patientUserGid,
        groupGid: this.gid
      }).then(res => {
        if (res.body.code == 0) {
          location.reload()
        }
      })
    },
    sicker: function () {
      this.$router.push('sicker')
    },
    patientCalendar(user, event) {
      if (this.isActiveGroup) {
        if (!user.isActive) {
          user.isActive = true
          this.selectedUsers.push(user.patientUserGid)
        } else {
          user.isActive = false
          this.selectedUsers.splice(user.patientUserGid, 1)
        }
        if (this.selectedUsers.length > 0) {
          this.selected = true
        } else {
          this.selected = false
        }
      } else {
        this.$router.push({ name: 'Sicker', query: { id: user.patientUserGid } })
      }
    },
    search(e) {
      this.searchPatientList = []
      this.searchLocalData = []
      this.searchPageNumber = 1
      this.paginationSearch()
    },
    sendAll() {
      this.$router.push({ name: 'GroupChat', query: { type: 1, gid: this.gid, groupName: this.groupName } })
    },
    deletePatient() {

    }
  }
}

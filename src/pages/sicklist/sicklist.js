import Vue from 'vue'
import { Search, InfiniteScroll } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
Vue.component(Search.name, Search);
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
      localData: [],
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
      selectedUsers: []
    }
  },
  methods: {
    sicker: function () {
      this.$router.push('sicker')
    },
    patientCalendar(user, event) {
      console.log(user)
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
    paginationSearch() {
      let _this = this
      let val = this.namePrefix
      if (!val) {
        _this.isSearch = false
      } else {
        _this.isSearch = true
        resource.bindPatientList({
          pageSize: this.searchPageSize,
          pageNumber: this.searchPageNumber,
          namePrefix: this.namePrefix
        }).then((res) => {
          if (res.body.code == 0) {
            if (res.body.result.rows.length == 0) {
              _this.searchLoad = false
            } else {
              for (let i = 0; i < res.body.result.rows.length; i++) {
                res.body.result.rows[i].isActive = false
              }
              _this.searchPatientList = _this.searchPatientList.concat(res.body.result.rows)
              for (let i = 0; i < _this.searchPatientList.length; i++) {
                _this.searchPatientList[i]['group'] = _this.searchPatientList[i]['namepy'].charAt(0).toUpperCase()
              }
              _this.searchPageNumber++
              _this.searchLocalData = base.groupBy(_this.searchPatientList, ['group'])
            }
          }
        })
      }

    },
    userInfo(user) {
      console.log(user)
    },
    search(e) {
      this.searchPatientList = []
      this.searchLocalData = []
      this.searchPageNumber = 1
      this.paginationSearch()
    },
    paginationData() {

      let _this = this
      resource.bindPatientList({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then((res) => {
        if (res.body.code == 0) {
          if (res.body.result.rows.length == 0) {
            _this.load = false
          } else {
            for (let i = 0; i < res.body.result.rows.length; i++) {
              res.body.result.rows[i].isActive = false
            }
            console.log(res.body.result.rows)
            _this.patientList = _this.patientList.concat(res.body.result.rows)
            for (let i = 0; i < _this.patientList.length; i++) {
              _this.patientList[i]['group'] = _this.patientList[i]['namepy'].charAt(0).toUpperCase()
            }
            _this.pageNumber++
            _this.localData = base.groupBy(_this.patientList, ['group'])
          }
        }
      })
    },
    showGroup() {
      console.log(this.$route)
      this.isActiveGroup = true
      this.$route.meta.menuShow = false
    },
    sendAll() {
      this.$router.push({ name: 'GroupChat', query: { type: 1 } })
    },
    sendInfoGroup() {

      this.$router.push({ name: 'GroupChat', query: { type: 0 }, params: { ids: this.selectedUsers } })
    },
    cancelActiveGroup() {
      this.isActiveGroup = false
      this.$route.meta.menuShow = true
    }
  }
}

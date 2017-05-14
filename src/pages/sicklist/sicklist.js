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
      localData: [{
        item: 'W',
        list: [{
          name: '吴恩宇',
          isActive: false

        }, {
          name: '恩宇',
          isActive: false

        }]
      }, {
        item: 'Z',
        list: [{
          name: '吴恩宇',
          isActive: false

        }, {
          name: '恩宇',
          isActive: false

        }]
      }],
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
    sendAll() {
      this.$router.push({ name: 'GroupChat', query: { type: 1 } })
    },

    dragIn(event) {
      console.log(event)
      let node = $(event.target.parentNode)
      $('div.item').css("transform", `translateX(0px)`)
      this.isDrag = true
      this.initPosition = event.touches[0].clientX
    },
    dragMove(event) {
      if (this.isDrag) {
        let node = $(event.target.parentNode)
        let dragPoint = event.touches[0].clientX
        if (this.initPosition - dragPoint > 0) {
          this.dragDistance = this.initPosition - dragPoint
          node.css('transform', `translateX(-${this.dragDistance}px)`)
        }
        if (this.initPosition - dragPoint >= 120) {
          this.isDrag = false
          node.css("transform", `translateX(-120px)`)
        }
      }
    },
    dragStop(event) {
      this.isDrag = false
      let node = $(event.target.parentNode)
      console.log(this.dragDistance)
      if (this.dragDistance > 50) {
        node.css('transform', `translateX(-120px)`)
      } else {
        node.css('transform', `translateX(0px)`)
      }
      this.dragDistance = 0
    },
    deletePatient() {

    }
  },
  mounted: function () {
    $.fn.showMenu = function () {
      var that = $(this)
      var isTouchstart = false
      var initX = 0
      var moveTarget = null
      var moveX = 0
      
      that.each(function (i, n) {
        var hideMenu = $(n).find(".hide-button")
        hideMenu.css("right", 0 - hideMenu.width())
      })

      $('.item').on("click", function (e) {
        console.log('x')
        
        isTouchstart = true
        initX = e.touches[0]["pageX"]
        moveTarget = $(this)
        that.not(moveTarget).css("transform", "translateX(0px)")

      }, false)

      that.on("touchmove", function (e) {

        if (isTouchstart) {
          moveX = e.touches[0]["pageX"]
          if (initX - moveX > 0) {
            var distance = moveX - initX
            moveTarget.css("transform", `translateX(${distance}px)`)
          }
          var currentMenuWidth = moveTarget.find(".hide-button").width()
          if (initX - moveX >= currentMenuWidth) {
            isTouchstart = false
            moveTarget.css("transform", `translateX(-${currentMenuWidth}px)`)
          }
        }

      })

      that.on("touchend", function (e) {

        var target = e.target
        isTouchstart = false
        if (target.nodeName.toLowerCase() == "li") {
          var currentMenuWidth = moveTarget.find(".hide-button").width()
          console.log(initX, moveX)
          if (initX - moveX >= 50 && moveX) {

            moveTarget.css("transform", `translateX(-${currentMenuWidth}px)`)
          } else {
            moveTarget.css("transform", `translateX(0px)`)
          }
          moveX = 0
          initX = 0
        }
      })
    }
    $('.item').showMenu()
  }
}

import Vue from 'vue'
import { Header, MessageBox } from 'mint-ui';
import resource from '../../resource'
import base from '../../base'
import vueEventCalendar from '../../components/calendar/'
Vue.use(vueEventCalendar, { locale: 'zh', color: '#1D8CDC' })
Vue.component(Header.name, Header);
export default {
  name: 'Sicker',
  data() {
    return {
      bindPatientInfo: {
        headImg: '',
        name: '',
        sex: '',
        age: '',
        leaveTime: ''
      },
      isTake: true,
      demoEvents: [],
      calendarTransform: true,
      leaveDay: 7,
      leaveMessage: '要记得吃药哦',
      medicineList: [],
      remindTime: '',
      checkInStatus: true,
      dateValue: '',
      doctorInfo: {},
      currentTime: '',
      checklistOpt: [{
        label: '他汀（阿托伐他汀）',
        value: '他汀（阿托伐他汀）',
        disabled: true
      }, {
        label: '长效降压（氨氯地平)',
        value: '长效降压（氨氯地平)',
        disabled: true
      }, {
        label: '其他',
        value: '其他',
        disabled: true
      }],
      defaultChecklist: [],
      medicineList: [],
      currentDayMedicineList: [],
      unbind: false,
      isDetail: false
    }
  },
  mounted: function () {
    let _this = this
    this.id = this.$route.query.id
    resource.bindPatientInfo({ patientUserGid: this.id }).then(res => {
      if (res.body.code == 0) {
        _this.bindPatientInfo = res.body.result
        _this.bindPatientInfo.leaveTime = base.formatDate2(res.body.result.leaveTime * 1000)
      }
    })
    resource.getTimestamp().then(res => {
      var date = new Date(res.body.result.timestamp * 1000)
      _this.loadMonthData(date.getFullYear(), date.getMonth() + 1)
    })
  },
  methods: {
    loadMonthData(year, month) {
      let _this = this
      resource.patientMonthDiary({ patientUserGid: this.$route.query.id, year: year, month: month }).then(res => {
        if (res.body.code == 0) {
          let list = res.body.result
          for (let i = 0; i < list.length; i++) {
            _this.demoEvents.push({
              date: base.formatEventDate(list[i]['checkInTime'] * 1000),
              title: 'xxx'
            })
          }
        }
      })
    },
    clickDay(date) {
      let _this = this
      _this.medicineList = []
      _this.remindTime = base.formatDate(date)
      resource.patientDiaryInfo({ patientUserGid: this.$route.query.id, diaryTime: parseInt(new Date(date).getTime() / 1000) }).then(res => {
        _this.calendarTransform = false
        setTimeout(() => {
          _this.isTake = false
          _this.checkInStatus = false
          _this.isDetail = true
        }, 350)
        if (res.body.code == 0 && res.body.result.checkInTime) {
        _this.medicineList = res.body.result.medicine.split(',')
        }
      })
    },
    changeMonth(month) {
      this.loadMonthData(month.split('-')[0], month.split('-')[1])
    },
    deleteItem: function () {
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      }).then(res => {
        if (res === "confirm") {
          resource.unBindPatient({ patientUserGid: this.id }).then(res => {
            if (res.body.code == 0) {
              this.$router.replace({ name: 'Sicklist' })
            }
          })
        }
      });

    },
    
    sendInfo() {
      this.$router.push({ name: 'chat', query: { id: this.id } })
    },
    backMonthDiary() {
      if (this.isDetail) {
        this.isTake = true
        setTimeout(() => {
          this.checkInStatus = true
        }, 300)
        setTimeout(() => {
          this.calendarTransform = true
        }, 350)
      }
    }
  }
}

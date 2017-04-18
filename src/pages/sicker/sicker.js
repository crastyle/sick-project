import Vue from 'vue'
import { Header } from 'mint-ui';
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css'
import resource from '../../resource'
import base from '../../base'

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
      msg: 'Welcome to PlanCalendar',
      demoEvents: [{
        date: '2017/4/18',
        title: 'Foo',
        desc: 'longlonglong description'
      }, {
        date: '2016/11/12',
        title: 'Bar'
      }]
    }
  },
  mounted: function() {
    let _this = this
    this.id = this.$route.query.id
    resource.bindPatientInfo({patientUserGid:this.id}).then(res => {
      if (res.body.code == 0) {
        _this.bindPatientInfo = res.body.result
      }
    })
  },
  methods: {
    deleteItem : function() {
      resource.bindPatientList({patientUserGid:this.id}).then(res => {
        console.log(res)
        this.$router.replace({name: 'Sicklist'})
      })
    },
    sendInfo () {
      this.$router.push({name: 'chat'})
    }
  }
}

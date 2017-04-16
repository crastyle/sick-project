import Vue from 'vue'
import { Radio, Checklist } from 'mint-ui'
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
export default {
  name: 'PatientCare',
  data() {
    return {
      msg: 'Welcome to PatientCare',
      value1: '',
      value2: [],
      value3: '',
      value4: '',
      defaultIndex: 0,
      answerList: [],
      bindAnswerList: [],
      q1: {
        q: '1.对于缺血性卒中的患者，您会在何时启动他汀？',
        a: [{
          label: '24小时内',
          value: 'A'
        }, {
          label: '24-48小时内',
          value: 'B'
        }, {
          label: '48小时后',
          value: 'C'
        }, {
          label: '出院期间',
          value: 'D'
        }]
      },


      q2: {
        q: '2.您认为急性期使用他汀，患者会有哪些获益？（多选）',
        a: [{
          label: '降脂',
          value: 'A'
        }, {
          label: '改善预后',
          value: 'B'
        }, {
          label: '降低死亡',
          value: 'C'
        }, {
          label: '降低残疾',
          value: 'D'
        }]
      },

      q3: {
        q: '3.对缺血性卒中急性期的患者，他汀的使用剂量？',
        a: [{
          label: '高强度',
          value: 'A'
        }, {
          label: '患者之前是什么剂量，还采用什么剂量',
          value: 'B'
        }, {
          label: '中等强度',
          value: 'C'
        }, {
          label: '中高强度都可以',
          value: 'D'
        }]
      },
      q4: {
        q: '4.对于缺血性卒中患者，您认为急性期降压有害还是有利？',
        a: [{
          label: '有害',
          value: 'A'
        }, {
          label: '有利',
          value: 'B'
        }, {
          label: '中性',
          value: 'C'
        }, {
          label: '视情况而定',
          value: 'D'
        }]

      }
    }
  },
  mounted() {
    console.log('change')
  },
  methods: {
    prevAnswer() {
      this.defaultIndex--
    },
    nextAnswer() {
      if (this.defaultIndex < 3) {
        this.defaultIndex++
      }
   
    },
    done() {
      this.answerList.push(this.value1)
      this.answerList.push(this.value2.join(','))
      this.answerList.push(this.value3)
      this.answerList.push(this.value4)
      window.localStorage.setItem('answerList', this.answerList.join('|'))
      this.$router.push({ name: 'Register'})
    }
  }
}

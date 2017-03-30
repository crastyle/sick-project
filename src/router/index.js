import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Login from '../pages/login/login.vue'
import Register from '../pages/register/register.vue'
import PatientCare from '../pages/patientCare/patientCare.vue'
//@import
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Hello',component: Hello},
    {path: '/login',name: 'Login',component: Login},
    {path: '/register',name: 'Register',component: Register},
    {path: '/patientCare',name: 'PatientCare',component: PatientCare}//@register

  ]
})

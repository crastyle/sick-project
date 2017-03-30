import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Sicker from '../pages/sicker/sicker.vue'
import Sicklist from '../pages/sicklist/sicklist.vue'
import Imlist from '../pages/imlist/imlist.vue'
import Userinfo from '../pages/userinfo/userinfo.vue'
import Register from '../pages/register/register.vue'
import PatientCare from '../pages/patientCare/patientCare.vue'
import Login from '../pages/login/login.vue'
//@import
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Hello',component: Hello},
    {path: '/register',name: 'Register',component: Register},
    {path: '/patientCare',name: 'PatientCare',component: PatientCare},
    {path: '/sicker',name: 'Sicker',component: Sicker},
    {path: '/sicklist',name: 'Sicklist',component: Sicklist},
    {path: '/imlist',name: 'Imlist',component: Imlist},
    {path: '/userinfo',name: 'Userinfo',component: Userinfo},
    {path: '/login',name: 'Login',component: Login}//@register

  ]
})

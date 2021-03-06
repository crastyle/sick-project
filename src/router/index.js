import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Sicker from '../pages/sicker/sicker.vue'
import Sicklist from '../pages/sicklist/sicklist.vue'
import Imlist from '../pages/imlist/imlist.vue'
import Userinfo from '../pages/userinfo/userinfo.vue'
import Register from '../pages/register/register.vue'
import PatientCare from '../pages/patientCare/patientCare.vue'
import Chat from '../pages/chat/chat.vue'
import Login from '../pages/login/login.vue'
import Cropper from '../pages/cropper/cropper.vue'
import GroupChat from '../pages/groupChat/groupChat.vue'
import Answer from '../pages/answer/answer.vue'
import Groups from '../pages/groups/groups.vue'
import Member from '../pages/member/member.vue'
import Examine from '../pages/examine/examine.vue'
import RegisterExtra from '../pages/registerExtra/registerExtra.vue'
import RegisterExtra2 from '../pages/registerExtra2/registerExtra2.vue'
//@import
Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'Hello', component: PatientCare },
        { path: '/register', name: 'Register', component: Register },
        { path: '/patientCare', name: 'PatientCare', component: PatientCare },
        { path: '/sicker', name: 'Sicker', component: Sicker },
        { path: '/sicklist', name: 'Sicklist', component: Sicklist },
        { path: '/imlist', name: 'Imlist', component: Imlist, meta: { menuShow: true } },
        { path: '/chat', name: 'chat', component: Chat },
        { path: '/userinfo', name: 'Userinfo', component: Userinfo, meta: { menuShow: true } },
        { path: '/login', name: 'Login', component: Login },
        { path: '/cropper', name: 'Cropper', component: Cropper },
        { path: '/groupChat', name: 'GroupChat', component: GroupChat },
        { path: '/answer', name: 'Answer', component: Answer },
        { path: '/groups', name: 'Groups', component: Groups, meta: { menuShow: true } },
    {path: '/member',name: 'Member',component: Member},
    {path: '/examine',name: 'Examine',component: Examine},
    {path: '/registerExtra',name: 'RegisterExtra',component: RegisterExtra},
    {path: '/registerExtra2',name: 'RegisterExtra2',component: RegisterExtra2}//@register

    ]
})

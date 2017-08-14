import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import chuzilist from  '../pages/chuzi/chuzilist.vue'
import message from  '../pages/message/message.vue'
import team from  '../pages/team/team.vue'
import teaminfo from  '../pages/team/teaminfo.vue'
import teamall from  '../pages/team/team_all.vue'
import teammessage from  '../pages/team/team_message.vue'
import my from  '../pages/my/my.vue'


export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {name:'chuzilist', path: '/chuzilist', component: chuzilist},
    { path: '/message', component: message},
    { path: '/teaminfo', component: teaminfo},
    { name:'teamall', path: '/teamall', component: teamall},
    { name:'teammessage' , path: '/teammessage', component: teammessage},
    { path: '/team', component: team},
    { path: '/my', component: my},
    { path: '*', redirect: '/my'}
  ]
})

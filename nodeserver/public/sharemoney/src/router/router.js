import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import message from  '../pages/message/message.vue'
import team from  '../pages/team/team.vue'
import teaminfo from  '../pages/team/teaminfo.vue'
import my from  '../pages/my/my.vue'


export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/message'      , component: message       },
    { path: '/teaminfo'      , component: teaminfo       },
    { path: '/team'      , component: team       },
    { path: '/my'      , component: my       },
    { path: '*'          , redirect: '/my'     }
  ]
})

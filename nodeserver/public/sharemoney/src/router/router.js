import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import team from  '../pages/team/team.list.vue'


export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/team'      , component: team       },
    { path: '*'          , redirect: '/team'     }
  ]
})

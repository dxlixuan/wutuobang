
import Vue from 'vue'
import App from './app.vue'
import Element from 'element-ui'
import axios from 'axios'
import router from './router/router.js'
import 'element-ui/lib/theme-default/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//console.log(window.Promise)
//window.Promise || (
// window.Promise = require("bluebird")
//)
Vue.use(Element)
Vue.use(MintUI)
//testMode || (window.console = {
//  error(){return},
//  log(){return},
//  warn(){return},
//  info(){return},
//  trace(){return}
//})
//vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    book: 0,
    userInfo: null,
    isLogin: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    update (state, obj){
      Object.assign(state, obj)
    }
  },
  action:{}
})

const app = new Vue({
  store,
  router,
  ...App
}).$mount('#app')
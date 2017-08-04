import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import group from  '../pages/group/group.list.vue'
import team from  '../pages/team/team.list.vue'
import doc from  '../pages/doc/doc.list.vue'
import schedule from  '../pages/schedule/schedule.list.vue'
import consulting from  '../pages/consulting/consulting.list.vue'
import media from  '../pages/media/media.list.vue'
import relation from  '../pages/relation/relation.list.vue'
import message from  '../pages/message/message.list.vue'
import feedback from  '../pages/feedback/feedback.list.vue'
import stat from  '../pages/stat/stat.list.vue'
import comment from  '../pages/comment/comment.list.vue'
import article from  '../pages/article/article.list.vue'
import evaluate from  '../pages/evaluate/evaluate.list.vue'

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/evaluate'  , component: evaluate   },
    { path: '/group'     , component: group      },
    { path: '/team'      , component: team       },
    { path: '/doc'       , component: doc        },
    { path: '/schedule'  , component: schedule   },
    { path: '/consulting', component: consulting },
    { path: '/media'     , component: media      },
    { path: '/relation'  , component: relation   },
    { path: '/message'   , component: message    },
    { path: '/feedback'  , component: feedback   },
    { path: '/article'   , component: article    },
    { path: '/stat'      , component: stat       },
    { path: '/evaluate'  , component: evaluate   },
    { path: '*'          , redirect: '/team'     }
  ]
})

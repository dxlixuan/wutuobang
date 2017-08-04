<template lang="jade">
  - var commonSrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487921349088&di=81fc34e25815456ab6cb55067c67a190&imgtype=0&src=http%3A%2F%2Fm.qqzhi.com%2Fupload%2Fimg_0_983533175D1458781333_23.jpg'
  .tabs.border
    //- router-link.tab( v-if="allowMenu.group && loginLevel === 'ADMIN'",:class="{'active':currentTab==='group'}",to="/group")
    //-   .f4.button
    //-     img.selected(src="../assets/team-true.png" )
    //-     img.un-selected(src="../assets/team.png" )
    //-     div 集团管理
    //- router-link.tab( v-if="allowMenu.team",:class="{'active':currentTab==='team'}",to="/team")
    //-   .f4.button
    //-     img.selected(src="../assets/team-true.png" )
    //-     img.un-selected(src="../assets/team.png" )
    //-     div 团队管理
    //- router-link.tab( v-if="allowMenu.doc",:class="{'active':currentTab==='doc'}",to="/doc")
    //-   .f4.button
    //-     img.selected(src="../assets/doc-true.png" )
    //-     img.un-selected(src="../assets/doc.png" )
    //-     div 医生管理
    //- router-link.tab( v-if="allowMenu.schedule",:class="{'active':currentTab==='schedule'}",to="/schedule")
    //-   .f4.button
    //-     img.selected(src="../assets/schedule-true.png" )
    //-     img.un-selected(src="../assets/schedule.png" )
    //-     div 排班管理
    //- router-link.tab( v-if="allowMenu.consulting",:class="{'active':currentTab==='consulting'}",to="/consulting")
    //-   .f4.button
    //-     img.selected(src="../assets/consulting-true.png" )
    //-     img.un-selected(src="../assets/consulting.png" )
    //-     div 咨询管理
    //- router-link.tab( v-if="allowMenu.media && (currentLoginUserGroupId === 7 || loginLevel === 'ADMIN')",:class="{'active':currentTab==='media'}",to="/media")
    //-   .f4.button
    //-     img.selected(src="../assets/media-true.png" )
    //-     img.un-selected(src="../assets/media.png" )
    //-     div 微课管理
    //- router-link.tab( v-if="allowMenu.stat",:class="{'active':currentTab==='stat'}",to="/stat")
    //-   .f4.button
    //-     img.selected(src="../assets/media-true.png" )
    //-     img.un-selected(src="../assets/media.png" )
    //-     div 数据统计
    //- router-link.tab( v-if="allowMenu.relation", :class="{'active':currentTab==='relation'}",to="/relation")
    //-   .f4.button
    //-     img.selected(src="../assets/media-true.png" )
    //-     img.un-selected(src="../assets/media.png" )
    //-     div 签约管理
    //- router-link.tab( v-if="allowMenu.message", :class="{'active':currentTab==='message'}",to="/message")
    //-   .f4.button
    //-     img.selected(src="../assets/media-true.png" )
    //-     img.un-selected(src="../assets/media.png" )
    //-     div 消息管理
    //- router-link.tab( v-if="allowMenu.article", :class="{'active':currentTab==='article'}",to="/article")
    //-   .f4.button
    //-     img.selected(src="../assets/media-true.png" )
    //-     img.un-selected(src="../assets/media.png" )
    //-     div 文章管理
    //- router-link.tab( v-if="allowMenu.evaluate", :class="{'active':currentTab==='evaluate'}",to="/evaluate")
    //-   .f4.button
    //-     img.selected(src="../assets/media-true.png" )
    //-     img.un-selected(:src="'../assets/media.png'" )
    //-    currentTab div 点评管理
    router-link.tab( v-for="i in allowMenu", v-if="i.visable", :class="{'active':currentTab===i.module}", :to="'/'+i.module")
      .f4.button
        img.selected(:src="i.iconSelected" )
        img.un-selected(:src="i.icon" )
        div {{i.title}}

    .clear( style="width:1px; height:25px;")
    .clear( style="width:1px; height:25px;")
    .clear( style="width:1px; height:25px;")
</template>


<!--suppress JSUnresolvedFunction -->
<script>

import config from '../utils/config'
export default {
  name: 'Tabs',
  components: {
  },
  data(){
    return {
      allowMenu:[
        {module:        'group',
          visable:      false,
          title:        '集团管理',
          icon:         require('../assets/team.png'),
          iconSelected: require('../assets/team-true.png'),
          allow:        {loginLevel: ['platform', 'operator']},
        },
        {module:        'team',
          visable:      false,
          title:        '团队管理',
          icon:         require('../assets/team.png'),
          iconSelected: require('../assets/team-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group']}
        },
        {module:        'doc',
          visable:      false,
          title:        '医生管理',
          icon:         require('../assets/doc.png'),
          iconSelected: require('../assets/doc-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
        {module:        'schedule',
          visable:      false,
          title:        '每周排班',
          icon:         require('../assets/schedule.png'),
          iconSelected: require('../assets/team-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
        {module:        'consulting',
          visable:      false,
          title:        '咨询管理',
          icon:         require('../assets/consulting.png'),
          iconSelected: require('../assets/consulting-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
        {module:        'article',
          visable:      false,
          title:        '医生文章',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team', 'member']}
        },
        {module:        'comment',
          visable:      false,
          title:        '管理管理',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {}
        },
        {module:        'evaluate',
          visable:      false,
          title:        '医生评价',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
        {module:        'message',
          visable:      false,
          title:        '消息记录',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
        {module:        'relation',
          visable:      false,
          title:        '关注关系',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
        {module:        'media',
          visable:      false,
          title:        '微课管理',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team'], group: [config.testMode ? 6 : 7 ]}
        },
        {module:        'stat',
          visable:      false,
          title:        '数据统计',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
        {module:        'feedback',
          visable:      false,
          title:        '意见反馈',
          icon:         require('../assets/media.png'),
          iconSelected: require('../assets/media-true.png'),
          allow:        {loginLevel: ['platform', 'operator', 'group', 'team']}
        },
      ],
      loginLevel: null,
      currentLoginUserGroupId: null
    }
  },
  props: [
    'currentTab'
  ],
  mounted(){
    let loginLevel = ''
    let allowMenu  = ''
    let isGroupPass = false
    let isLoginLevelPass = false
    let checkLoginLevel = (loginLevel, loginLevelList) =>{
      return loginLevelList.indexOf(loginLevel) > -1
    }
    let checkGroup = (groupId, groupIdList) =>{
      return loginLevelList.indexOf(loginLevel) > -1
    }

    this.$set( this.$data, 'loginLevel', this.$store.state.userInfo.obj.loginLevel)
    this.$set( this.$data, 'currentLoginUserGroupId', this.$store.state.userInfo.obj.groupId)

    loginLevel = loginLevel || this.loginLevel
    allowMenu = allowMenu || this.allowMenu

    this.loginLevel === 'ADMIN' &&  (loginLevel = 'operator')
    this.loginLevel === 'GROUP' &&  (loginLevel = 'group')
    this.loginLevel === 'MEN'   &&  (loginLevel = 'member')
    for(i in allowMenu){
      isGroupPass = false
      isLoginLevelPass = false

      allowMenu[i] &&
        allowMenu[i].allow &&
        allowMenu[i].allow.group &&
        allowMenu[i].allow.group.indexOf( this.$store.state.userInfo.obj.groupId ) > -1 &&
        (isGroupPass = true)
      allowMenu[i].allow.group ||
        (isGroupPass = true)

      allowMenu[i] &&
        allowMenu[i].allow &&
        allowMenu[i].allow.loginLevel &&
        allowMenu[i].allow.loginLevel.indexOf(loginLevel ) >-1 &&
        (isLoginLevelPass = true)

      isGroupPass && isLoginLevelPass &&
        this.$set( this.$data.allowMenu[i], 'visable', true)

      loginLevel === 'platform' &&
        this.$set( this.$data.allowMenu[i], 'visable', true)
    }
  }
}
</script>


<style lang="stylus">
@import '../app_variables'
.top
  z-index 10001
  position fixed
  background default_bg_color
  top 0
  left 0
  right 0
  width 100%
  height default_header_height
  box-sizing border-box
  .container
    width 100%
    height default_header_height - 10px
    margin-bottom 10px
    background #fff
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid default_border_color
  .logo-font
    font-weight 700
    font-style normal
    font-size 24px
    color #666
.tabs
  position fixed
  width default_left_width
  height 100%
  left 0
  top 0
  padding-top default_header_height
  background #fff
  /*background default_panel_color
  border 1px solid #ddd*/
.tab
  m4
  &.active
    /*color #2ECC40*/
    .button
      color #fff
      background-color #20a0ff
      border-color #20a0ff
    img.selected
      display block
    img.un-selected
      display none
  .button
    width 100%
    font-size 16px
    padding-left 20px
    padding-top 10px
    padding-bottom 10px
    img
      height 20px
      width 20px
      margin auto
    &:hover
      background-color #eff8ff
      color color_primary
  img.selected
    display none
  img.un-selected
    display block
/*@media screen and (min-width: 768px)*/
.tabs
  overflow auto
.tab
  img
    float left
    margin-left 20px !important
    margin-right 10px !important
/*
@media screen and (max-width: 767px)
  .top
    height 30px
    font-size 12px
    color #fff
    .container
      background color_primary
      height 50px
      color #fff
      .logo-font
        font-size 14px
        color #fff
      .primary
        color #fff        
      .p4 
        color #fff
  .panel_center
    padding-left 0
    padding-top 50px
  .tabs
    overflow-x scroll
    display flex
    top auto
    bottom 0
    width 100%
    height auto
    padding-top 0
  .tab
    margin auto
    .button
      border 0
      flex 1
      margin auto
      padding 5px
      font-size 14px
      width 57px
      img
        height 20px
        margin auto
  .el-select, .el-date-editor
    width 120px !important
  .box-card
    padding-bottom 70px
  .el-message-box
    width 240px !important
  .el-form-item__label
    width 100% !important
    clear both
    float none !important
    padding 10px !important
  .el-form-item__content
    margin-left 0 !important
    margin-top 10px
  img
    max-width 100%
  ul,li,.el-card__body
    margin 0 !important
    padding 0 !important
  ul>div
    border 0 !important
  .el-card__body>ul>li
    border-bottom 0 !important
    border-left 0 !important
    border-right 0 !important
    border-top-width 1px !important
  .el-card__body>ul>li:last-child
    border-bottom 1px solid default_border_color !important
  .login-ui .box-card
    width 90%
    .el-form-item__content
      text-align center
  .el-select-dropdown__item
    padding 8px 10px !important
  *
    font-size 14px !important
*/
</style>
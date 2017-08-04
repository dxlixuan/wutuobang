<template lang="jade">
  div
    router-view( v-if="userInfo" )
    .top
      .container
        .logo-font.p4.fl {{productInfo.prefix}}{{productInfo.name}}{{productInfo.suffix}}
          span.small(v-if="testMode", style="color: #f66") [测试数据]
        .p4.fr
          span 欢迎您,
          span.primary {{(userInfo && userInfo.obj) ? userInfo.obj.userNickname : ""}}&nbsp;
          span.primary.hand(v-if="userInfo", @click="logout") 退出
          span.primary(v-if="!userInfo",@click="login(loginButtonClick)") 登录
    .login-ui.xy-center(v-if="!userInfo")
      el-card.box-card.mx-auto( )
        div(slot="header" class="clearfix")
          span {{productInfo.prefix}}{{productInfo.name}}{{productInfo.suffix}}
        el-form( ref="form", :model="form", label-width="80px")
          br
          el-form-item( label="帐号" )
            el-input( v-model="form.userName" )
          el-form-item( label="密码" )
            el-input( v-model="form.pwd",type="password" )
          el-form-item
            el-button( type="primary", @click="login") 登录
            el-button( @click="clear") 清空
            //- el-button( style="background:#ccc;border-radius:0;color:#999;") 验证码
</template>

<script>
  import config from './utils/config'
  import ajax from './utils/ajax.js'
  //import localStorageTest from  './utils/localStorageTest'
export default {
  data () {
    return {
      productInfo: config.productInfo,
      testMode: config.testMode,
      form:{
        userName : '',
        pwd : ''
      },
      userInfo : null
    }
  },
  preFetch: () =>{
  },
  mounted () {
    this.login()
  },
  methods:{
    login(loginButtonClick){
      if (window.localStorage.FemyTeamAdmin_userInfo){
        this.loadUserInfo( JSON.parse(localStorage.FemyTeamAdmin_userInfo) )
        return
      }
      if (!this.form.userName || !this.form.pwd || !loginButtonClick) return
      ajax('ddyy.team.user.login.account', {
        userLoginname: this.form.userName,
        userPassword: this.form.pwd
      }).then((res) => {
        res = typeof res === 'string' ? JSON.stringify(res) : res
        console.log(res, typeof res)
        if ( res.data.succ){
          if (!res.data.obj.groupId) {return this.$alert('您不属于任何集团, 无法登录!')}
          if ( res.data.obj.loginLevel !== 'ADMIN' && res.data.obj.loginLevel !== 'GROUP' ) {return this.$alert('权限不足, 无法登录!')}
          localStorage.FemyTeamAdmin_userInfo = JSON.stringify(res.data)
          this.loadUserInfo( res.data )
          window.location.reload() // this.$router.go(0) safari下不会刷新
        }else{
          res.data.msg && this.$alert( res.data.msg )
        }
      })
    },
    logout(){
      this.$set( this.$data, 'userInfo', null )
      this.$store.commit('update', null)
      localStorage.FemyTeamAdmin_userInfo = ''
      window.location.reload()
    },
    loadUserInfo(userInfo){
      this.$set( this.$data, 'userInfo', userInfo )
      this.$store.commit('update', {userInfo: userInfo})
    },
    clear(){
      this.form = {
        userName : '',
        pwd : ''
      }
    }
  }
}
setInterval(function(){
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  let heads = document.getElementsByClassName('el-card__header')
  let placeheaders = document.getElementsByClassName('el-card__body')
  if(!heads || !heads[0] || !placeheaders || !placeheaders[0]) return
  let head = heads[0]
  let placeheader = placeheaders[0]
  var offsetWidth = head.offsetWidth
  var offsetHeight = head.offsetHeight
  //console.dir(head)
  //if (heads[0].scrollTop)
  //console.log(heads[0].offsetWidth)
  //console.log(scrollTop)
  //head.style.offsetWidth = offsetWidth
  head.style.width = placeheader.offsetWidth -1 + 'px'
  placeheader.style.paddingTop = offsetHeight -1 + 'px'
}, 100)

</script>


<style lang='stylus'>
@import './app.styl'
.login-ui
  display flex
  position fixed
  background #c2e9ec/*default_bg_color*/
  width 100%
  height 100%
  z-index 10002
  background-image url('http://img.diandianys.com/I_lKD+5Ff_19SBxe.jpg')/*http://img.diandianys.com/I_lKv7KMK_1uclUv.png*/ 
  .box-card
    width 420px
    height 310px
    opacity 0.7
  .el-card__header
    z-index 998
    width 420px
</style>
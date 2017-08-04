<template lang="jade" src="./team.list.jade"></template>


<script>
import Tabs from '../../component/tabs.vue'
import Headers from '../../component/headers.vue'
import ajax from '../../utils/ajax.js'
import GBdept from '../../mock/GBdept'

export default {
  components: {
    Tabs,
    Headers
  },
  data () {
    return {
      ajaxLoading: false,
      userInfo: { obj: {}},
      GBdept: GBdept,
      isEditorOpen: false,
      currentGroupId: '',
      form: {
        teamName        : '',
        teamResume      : '',
        teamPhone       : '',
        teamAddress     : '',
        teamAvatar      : '',
        teamLogo        : '',
        ivtLeadQrcodeUrl: '',
        ivtMemQrcodeUrl : '',
        deptName        : GBdept[0] || '',
        teamDept        : ''
      },
      list: [],
      groupList: [],
      uploadInfo: {},
      form_teamAvatar: [],
      form_teamLogo: []
    }
  },
  mounted (){// TODO: mounted中部分方法需改用Promise
    setTimeout(()=>{
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getList()
      this.refreshUploadInfo()
    },0)
      console.log(this.$store)
  },
  computed: {
  },

  methods: {
    getList(){ // 获取团队列表
      this.currentGroupId && this.$set( this.$data, 'ajaxLoading', true ) &&
        ajax('ddyy.team.list',{ groupId: this.currentGroupId, token: this.$store.state.userInfo.token})
          .then( res =>{
            this.$set( this.$data, 'ajaxLoading', false )
            this.$set( this.$data, 'list', res.data.list )
          })
    },
    getGroupList(){
      this.currentGroupId && this.$set( this.$data, 'ajaxLoading', true ) &&
        ajax('ddyy.team.group.list',{backGroupId: this.currentGroupId, token: this.$store.state.userInfo.token})
          .then( res =>{
            this.$set( this.$data, 'ajaxLoading', false )
            this.$set( this.$data, 'groupList', res.data.list )
          })
    },
    getDetail(id){
      this.$set(this.$data, 'form', {deptName:GBdept[0] || ''})
      this.$set(this.$data, 'form_teamAvatar', [])
      this.$set(this.$data, 'form_teamLogo', [])
      if ( id ){
        this.$set( this.$data, 'ajaxLoading', true )
        ajax('ddyy.team.info.get.simple', {teamId: id, token: this.$store.state.userInfo.token})
          .then(res => {
            this.$set( this.$data, 'ajaxLoading', false )
            res.data.obj.deptName = res.data.obj.deptName || GBdept[0] || ''
            this.$set(this.$data, 'form', res.data.obj)
            res.data.obj.teamAvatar && this.$set(this.$data, 'form_teamAvatar', [{name: '1.jpg', url: res.data.obj.teamAvatar}])
            res.data.obj.teamLogo && this.$set(this.$data, 'form_teamLogo', [{name: '1.jpg', url: res.data.obj.teamLogo}])
          })
      }
      this.switchEditorPanel()
    },
    submit() { //提交团队修改
      let service = this.form.teamId ? 'ddyy.team.info.modify' : 'ddyy.team.sys.create'
      let raw = {
        token: this.$store.state.userInfo.token ,
        userId: this.$store.state.userInfo.obj.userId,
        groupId: this.currentGroupId,
        teamId: this.form.teamId,
        backTeamId: this.form.teamId,
        teamName:         this.form.teamName        ,
        teamResume:       this.form.teamResume      ,
        teamHos:          this.form.teamHos         ,
        teamDept:         this.form.teamDept        ,
        teamPhone:        this.form.teamPhone       ,
        teamAddress:      this.form.teamAddress     ,
        ivtLeadQrcodeUrl: this.form.ivtLeadQrcodeUrl,
        ivtMemQrcodeUrl:  this.form.ivtMemQrcodeUrl,
        deptName: this.form.deptName
      }
      this.form_teamAvatar && this.form_teamAvatar[0] && this.form_teamAvatar[0].url && ( raw.teamAvatar = this.form_teamAvatar[0].url )
      this.form_teamLogo && this.form_teamLogo[0]   && this.form_teamLogo[0].url   && ( raw.teamLogo   = this.form_teamLogo[0].url )
      this.form_teamLogo && this.form_teamLogo[0]   && this.form_teamLogo[0].url   && ( raw.logoUrl    = this.form_teamLogo[0].url ) //这个参数提交的时候叫做logoUrl,其他地方都叫做teamLogo,如列表和详情里
      this.$set( this.$data, 'ajaxLoading', true )
      ajax(service, raw)
        .then(res => {
          this.$set( this.$data, 'ajaxLoading', false )
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.switchEditorPanel()
            this.getList()
            if (service === 'ddyy.team.sys.create')
              ajax('ddyy.team.sys.init',{teamId: res.data.obj.teamId, groupId: res.data.obj.groupId}).then( res2 => {
                this.getDetail(res.data.obj.teamId)
              })
          } else {
            this.$alert(res.data.msg)
          }
        })
    },
    switchEditorPanel(){ //切换页面
      this.$set(this.$data, 'isEditorOpen', !this.isEditorOpen)
    },
    upTeamAvatarSuccess(res){
      this.$set(this.$data, 'form_teamAvatar', [{name: '1.jpg', url: res.obj}])
      this.refreshUploadInfo()
    },
    upTeamLogoSuccess(res){
      this.$set(this.$data, 'form_teamLogo', [{name: '1.jpg', url: res.obj}])
      this.refreshUploadInfo()
    },
    refreshUploadInfo(){  //重新获取上传基本参数
      let raw = {}
      raw.spid    = ajax.basePostData.spid
      raw.channel = ajax.basePostData.channel
      raw.sign    = ajax.basePostData.sign
      raw.format  = ajax.basePostData.format
      raw.random  = ajax.basePostData.random
      raw.oper    = ajax.basePostData.oper
      raw.service = 'ddyy.system.file.upload'
      this.$set(this.$data, 'uploadInfo', {host: ajax.host, basePostData: raw })
    },
    beforePicUpload(e){
      if (e.size > 1024 * 1024 * 2 ){
        this.$alert('图片大小不能超过2M!')
        return false
      }
    },
    refreshTeamQrcode(){ // 刷新团队二维码
      ajax('ddyy.team.qrcode.team.refresh',{userId: this.$store.state.userInfo.obj.userId, teamId: this.$store.state.userInfo.obj.teamId, backTeamId: this.form.teamId})
        .then( res => {
          if (res.data.succ){
            this.$alert( '刷新成功!' )
            this.switchEditorPanel()
          }else
            this.$alert( res.data.msg )
        })
    }
  }
}
</script>


<style lang="stylus">
  @import '../../app_variables.styl'
</style>
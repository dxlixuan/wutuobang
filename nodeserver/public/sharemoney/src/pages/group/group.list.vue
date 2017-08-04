<template lang="jade" src="./group.list.jade"></template>


<script>
import Tabs from '../../component/tabs.vue'
import Headers from '../../component/headers.vue'
import ajax from '../../utils/ajax.js'
import GBdept from '../../mock/GBdept'
import {date} from '../../utils/filter.js'

export default {
  components: {
    Tabs,
    Headers
  },
  data () {
    return {
      ajaxLoading: false,
      userInfo: { obj: {}},
      currentGroupId: null,
      GBdept:GBdept,
      isEditorOpen: false,
      form: {
        //groupArea:GBdept[0] || '',
        teamDept:'',
        groupName:'',
        groupTelephone:'',
        groupAddress:'',
        groupArea:'',
        groupResume:'',
        teamId:''
      },
      list: [],
      uploadInfo: {},
      form_groupLogo: []
    }
  },
  mounted (){// TODO: mounted中部分方法需改用Promise
    setTimeout(()=>{
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getData()
      this.refreshUploadInfo()
    },0)
  },
  computed: {
  },
  filters:{date},
  methods: {
    getData(){ //获取集团列表
      this.$set( this.$data, 'ajaxLoading', true )
      ajax('ddyy.team.group.list', {backGroupId: this.currentGroupId, token: this.$store.state.userInfo.token})
        .then( res =>{
          this.$set( this.$data, 'ajaxLoading', false )
          res.data.succ && this.$set( this.$data, 'list', res.data.list )
          res.data.succ || this.$alert(res.data.msg)
        })
    },
    getDetail(id){
      this.$set(this.$data, 'form', {groupArea:/*GBdept[0] || */''})
      this.$set(this.$data, 'form_groupLogo', [])
      if ( id ){
        this.$set( this.$data, 'ajaxLoading', true )
        ajax('ddyy.team.group.info', {backGroupId: this.currentGroupId, groupId: id, token: this.$store.state.userInfo.token})
          .then(res => {
            this.$set( this.$data, 'ajaxLoading', false )
            this.$set(this.$data, 'form', res.data.obj)
            res.data.obj.groupLogo && this.$set(this.$data, 'form_groupLogo', [{name: '1.jpg', url: res.data.obj.groupLogo}])
          })
      }
      this.switchEditorPanel()
    },
    submit() { //提交集团修改
      let service = this.form.groupId ? 'ddyy.team.group.modify' : 'ddyy.team.group.create.simple'
      let raw = {
        token: this.$store.state.userInfo.token ,
        userId: this.$store.state.userInfo.obj.userId,
        backGroupId:    this.form.groupId/*this.currentGroupId*/,
        groupName:      this.form.groupName,
        groupTelephone: this.form.groupTelephone,
        groupAddress:   this.form.groupAddress,
        groupArea:      this.form.groupArea,
        groupResume:    this.form.groupResume,
        groupLogo:      this.form.groupLogo     
      }
      this.$set( this.$data, 'ajaxLoading', true )
      this.form_groupLogo && this.form_groupLogo[0] && this.form_groupLogo[0].url && ( raw.groupLogo = this.form_groupLogo[0].url )
      ajax(service, raw)
        .then(res => {
          this.$set( this.$data, 'ajaxLoading', false )
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.switchEditorPanel()
            this.getData()
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
    upGroupLogoSuccess(res){
      this.$set(this.$data, 'form_groupLogo', [{name: '1.jpg', url: res.obj}])
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
    refreshTeamQrcode(){
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
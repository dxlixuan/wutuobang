<template src="./doc.list.jade" lang="jade"></template>


<script type="text/ecmascript-6">
import Tabs from '../../component/tabs.vue'
import ajax from '../../utils/ajax.js'
import docTitle from '../../mock/docTitle'

export default {
  components: {Tabs},
  data () {
    return {
      ajaxLoading: false,
      userInfo: { obj: {}},
      isSubmiting: false,
      isDocMoving: false,
      isEditorOpen: false,
      isMovingUnSave: false,
      form: {
        memSex: '0',
        isSpecialist : false,
        memTitle: ''
      },
      currentDocTitle: '',
      docTitle: docTitle,
      form_memTitle: docTitle[0] || '',
      form_memAvatar: [],
      list: [],
      deletedList: [],
      temporaryList: [],
      uploadInfo: {},
      teamList: [],
      teamListForModifyUserTeam: [],
      groupList: [],
      currentTeamId: null,
      currentTeamIdForModifyUserTeam: null,
      currentGroupId: null
    }
  },
  mounted () {// TODO: mounted中部分方法需改用Promise
    setTimeout(()=>{
      //this.$set(this.$data, 'currentTeamId', this.$store.state.userInfo.teamInfo.teamId)
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getTeamList()
      //this.getList() 服务端返回错误的列表
      this.refreshUploadInfo()
    },0)
    setTimeout(()=>{
      if (this.teamList && this.teamList[0]){
        this.$set(this.$data, 'currentTeamId', this.teamList[0].teamId)
        this.getList()
      }
    },1400)
  },
  methods: {
    getList(){ //获取医生列表
      //if(!this.currentTeamId) return
      this.$set( this.$data, 'list', [] )
      this.$set( this.$data, 'deletedList', [] )
      this.$set( this.$data, 'temporaryList', [] )
      let raw = {
        groupId: this.currentGroupId,
        teamId : 1 || this.$store.state.userInfo.teamId,
        backTeamId: this.currentTeamId,
        userId : this.$store.state.userInfo.obj.userId,
        token  : this.$store.state.userInfo.token
      }
      this.$set( this.$data, 'ajaxLoading', true )
      ajax('ddyy.team.member.list', raw)
        .then( res => {
          this.$set( this.$data, 'ajaxLoading', false )
          if (res.data.succ && res.data.list){
            for(let i=0; i< res.data.list.length; i++ ){
              res.data.list[i].index = i
            }
            this.$set( this.$data, 'list', res.data.list )
          }
        })
      ajax('ddyy.team.member.delete.list', raw)
        .then( res => { res.data.succ && this.$set( this.$data, 'deletedList', res.data.list )} )
      ajax('ddyy.team.member.temporary.list', raw)
        .then( res => { res.data.succ && this.$set( this.$data, 'temporaryList', res.data.list )} )
    },
    getDetail(id,teamId){
      this.$set(this.$data, 'form', {memSex: 0, isSpecialist: false,memTitle: ''})
      this.$set(this.$data, 'form_memTitle', {memSex: 0, isSpecialist: false,})
      this.$set(this.$data, 'form_memAvatar', [])
      let raw = {
        userId: this.$store.state.userInfo.obj.userId,
        memberId: id,
        backUserId: id,
        teamId: teamId,
        token: this.$store.state.userInfo.token
      }
      this.switchEditorPanel()
      id && this.$set( this.$data, 'ajaxLoading', true ) &&
      ajax('ddyy.team.member.info', raw)
          .then( res => {
            this.$set( this.$data, 'ajaxLoading', false )
            if (!res.data.succ) {
              this.switchEditorPanel()
              return this.$alert( '获取医生信息失败!' )
            }
            if ( res.data.succ ){
              this.$set( this.$data, 'ajaxLoading', true )
              res.data.obj.isSpecialist = !!res.data.obj.isSpecialist
              res.data.obj.memberId = res.data.obj.userId
              this.$set( this.$data, 'form', res.data.obj )
              this.$set( this.$data, 'form_memAvatar', [{name: '1.jpg', url: res.data.obj.memAvatar }])
              this.$set( this.$data, 'form_memTitle',res.data.obj.memTitle||'')
              ajax('ddyy.team.user.info', raw)
                .then( res => {
                  this.$set( this.$data, 'ajaxLoading', false )
                  if (!res.data.succ) return this.$alert( '获取用户帐号失败!' )
                  let form = JSON.parse(JSON.stringify(this.form))
                  form.userLoginname = res.data.obj.userLoginname || ''
                  this.$set( this.$data, 'form', form)
                })
            }
        })
    },
    getTempDocDetail(id){
      let raw = {
        groupId: this.currentGroupId,
        teamId : this.currentTeamId || '',
        backTeamId: this.currentTeamId || '',
        id: id,
      }
      this.$set(this.$data, 'form', {memSex: 0, isSpecialist: false})
      this.$set(this.$data, 'form_memTitle', [])
      this.$set(this.$data, 'form_memAvatar', [])
      id && this.$set( this.$data, 'ajaxLoading', true ) &&
      ajax('ddyy.team.member.temporary.info', raw)
        .then( res => {
          this.$set( this.$data, 'ajaxLoading', false )
          if ( res.data.succ ){
            res.data.obj.isSpecialist = !!res.data.obj.isSpecialist
            res.data.obj.memberId = res.data.obj.userId
            res.data.obj.memNickname && ( res.data.obj.memName = res.data.obj.memNickname )
            this.$set( this.$data, 'form', res.data.obj )
            this.$set( this.$data, 'form_memAvatar', [{name: '1.jpg', url: res.data.obj.memAvatar }])
            this.$set( this.$data, 'form_memTitle', res.data.obj.memTitle)
          }
        })
      this.switchEditorPanel()
    },
    getTeamList(){
      this.currentGroupId && this.$set( this.$data, 'ajaxLoading', true ) &&
      ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
          .then( res =>{
            this.$set( this.$data, 'ajaxLoading', false )
            this.$set( this.$data, 'teamList', res.data.list )
            this.$set( this.$data, 'teamListForModifyUserTeam', res.data.list )
          })
    },
    getTeamListForModifyUserTeam(){
      this.currentGroupId && this.$set( this.$data, 'ajaxLoading', true ) &&
      ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
          .then( res =>{
            this.$set( this.$data, 'ajaxLoading', false )
            this.$set( this.$data, 'teamListForModifyUserTeam', res.data.list )
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
    submit() { //提交医生修改
      if ( !this.form.memName || !this.form.memHos || !this.form.memDept || !this.form_memTitle || !this.form_memAvatar.length || !this.form.memSex )
        return this.$alert('医生姓名,医院名称,所属科室,职称,头像,性别需要填写!')
      //this.$set(this.$data, 'isSubmiting', true)
      let service = 'ddyy.team.member.temporary.add' //后台新增的都是临时医生
      this.form.id       && ( service = 'ddyy.team.member.temporary.modify' ) // 有id则已存在临时医生列表中
      this.form.memberId && ( service = 'ddyy.team.member.modify' ) // 有memberId则已存在正式医生列表中
      this.$set( this.$data, 'ajaxLoading', true )
      ajax(service, {
        groupId: this.currentGroupId,
        teamId : this.currentTeamId || '',
        backTeamId : this.currentTeamId || '',
        token: this.$store.state.userInfo.token ,
        userId: this.$store.state.userInfo.obj.userId,
        memberId    : this.form.memberId,
        id          : this.form.id,
        userLoginname: this.form.userLoginname,
        userPassword: this.form.userPassword,
        memName     : this.form.memName    ,
        memNickname : this.form.memName    ,
        memHos      : this.form.memHos     ,
        memDept     : this.form.memDept    ,
        memTitle    : this.form_memTitle   ,
        memSex      : this.form.memSex     ,
        isSpecialist: this.form.isSpecialist,
        memResume   : this.form.memResume  ,
        memWorktime : this.form.memWorktime,
        memAvatar   : this.form_memAvatar.length > 0 ? this.form_memAvatar[0].url : ''
      })
        .then(res => {
          this.$set( this.$data, 'ajaxLoading', false )
          //this.$set(this.$data, 'isSubmiting', false)
          //建医生成功后要自己去调创建医生二维码接口, 有失败率
          if (res.data.succ) {
            this.$alert('操作成功!')
            service === 'ddyy.team.member.temporary.add' &&
              ajax ('ddyy.team.qrcode.member.temporary.add',{id: res.data.obj.id}).then(res => {
                  this.getList()
                  res.data.succ || this.$alert(res.data.msg)
              })
              || this.getList()
            this.switchEditorPanel()
          } else {
            this.$alert(res.data.msg)
          }
        })
    },
    switchEditorPanel(){ //切换页面
      this.$set(this.$data, 'isEditorOpen', !this.isEditorOpen)
    },
    beforeAvatarUpload(e){
    },
    handleAvatarScucess(res){
      this.$set(this.$data, 'form_memAvatar', [{name: '1.jpg', url: res.obj}])
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
    switchDocEnable(userId, teamId, enable){
      this.$set(this.$data, 'isEditorOpen', false)
      ajax( enable ? 'ddyy.team.member.delete' : 'ddyy.team.member.start', {
        memberId: userId ,
        teamId: this.currentTeamId || ''
      }).then( res => {
        if( res.data.succ ){
          this.$alert('操作成功!')
          this.getList()
        }
      })
      this.$set(this.$data, 'isEditorOpen', false)
    },
    onDocMove(index, dir){
      index = parseInt(index)
      let list = JSON.parse(JSON.stringify(this.list))
      let increment = dir === 'up' ? -1 : 1
      if (index + increment > list.length - 1 || index + increment < 0) return this.$alert('已经到' + ( increment > 0 ? '底' : '顶' ) + '了, 不能再移了!')
      let tempItem = list[index]
      list[index] = list[index + increment]
      list[index + increment] = tempItem
      for(let i=0; i< list.length; i++ ){
        list[i].index = i
      }
      this.$set(this.$data, 'list', list)
      this.$set(this.$data, 'isMovingUnSave', true)
    },
    onSaveDocMove(){
      if (this.list.length === 0 ) return this.$alert('至少要有一个医生!')
      let memOrderList = JSON.parse(JSON.stringify(this.list))
      for(let i=0; i< memOrderList.length; i++ ){
        memOrderList[i]={showIndex: i, userId: memOrderList[i].userId }
      }
      ajax('ddyy.team.member.order.modify', {teamId: this.currentTeamId, memOrderList: memOrderList })
        .then( res=>{
          res.data.succ && this.$alert('保存成功!')
          res.data.succ || this.$alert( res.data.msg )
          if (res.data.succ ) {
            for(let i=0; i< res.data.list.length; i++ ){
              res.data.list[i].index = i
            }
            this.$set(this.$data, 'list', res.data.list)
          }
          this.$set(this.$data, 'isMovingUnSave', false)
        })
    },
    onBindAccount(){
      if( !this.form.userId) return this.$alert('用户不存在!')
      if( !this.form.userLoginname || !this.form.userPassword) return this.$alert('用户名 密码 必须填入!')
      ajax('ddyy.team.user.bind.account', {userId: this.form .userId, userLoginname: this.form.userLoginname, userPassword: this.form.userPassword  })
        .then( res =>{
          res.data.succ && this.$alert('保存成功!')
          res.data.succ || this.$alert( res.data.msg )
        })
    },
    onModifyUserTeam(){
      if( !this.form.userId) return this.$alert('用户不存在!')
      ajax('ddyy.team.member.team.change', {backMemberId: this.form.userId, backTeamId: this.currentTeamIdForModifyUserTeam })
        .then( res =>{
          res.data.succ && this.$alert('修改成功, 1分钟内生效!')
          res.data.succ || this.$alert( res.data.msg )
          res.data.succ && this.getList()
        })
    },
    beforePicUpload(e){
      if (e.size > 1024 * 1024 * 2 ){
        this.$alert('图片大小不能超过2M!')
        return false
      }
    },
    refreshMemberQrcode(){
      ajax('ddyy.team.qrcode.member.refresh',{userId: this.$store.state.userInfo.obj.userId, backUserId: this.form.userId})
        .then( res => {
          if (res.data.succ){
            this.$alert( '刷新成功!' )
            this.switchEditorPanel()
            //let form = JSON.parse(JSON.stringify(this.form))
            //form.avatarQrcodeUrl = res.data.obj
            //this.$set(this.$data, 'form', res.data.form)
          }else
            this.$alert( res.data.msg )
        })
    }
  }
}
</script>
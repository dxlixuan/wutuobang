<template lang="jade" src="./consulting.list.jade"></template>


<script>
import Tabs from '../../component/tabs.vue'
import ajax from '../../utils/ajax.js'
import {goodTime} from '../../utils/filter.js'

export default {
  components: {Tabs},
  data () {
    return {
      userInfo: { obj: {}},
      timeNow: null,
      today: null,
      beginTime: null,
      endTime: null,
      isEditorOpen: false,
      isGettingDetail: false,
      groupList: [],
      teamList: [],
      docList: [],
      currentGroupId: null,
      currentTeamId: null,
      currentDocId: null,
      form: {},
      form_consultReplyImg: [],
      list: [],
      uploadInfo: {},
      isListLoading: false,
      isGrade: false,
      paginator:{
        page: 1,
        limit: 10,
        totalCount: 0,
      },
      scrollTop: 0,
      countTimePickerOptions: {disabledDate(unixTime) { return unixTime.getTime() > Date.now()}}  
    }
  },
  mounted () {// TODO: mounted中部分方法需改用Promise
    setTimeout(()=>{
      //this.$set(this.$data, 'currentTeamId', this.$store.state.userInfo.teamInfo.teamId)
      let beginTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime() - 3600 * 24 * 1000 * 30
      let today = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
      let timeNow = new Date().getTime()
      this.$set( this.$data, 'beginTime'     , beginTime ) //30天前
      this.$set( this.$data, 'endTime'       , today )
      this.$set( this.$data, 'timeNow'       , timeNow )
      this.$set( this.$data, 'userInfo'      , this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getTeamList()
      this.getList()
      this.refreshUploadInfo()
    },0)
  },
  filters:{goodTime},
  methods: {
    getList(targetPageNo){ //获取咨询列表
      if ( !this.currentGroupId ) return this.$alert( '请选择一个集团!' )
      if ( !this.beginTime      ) return this.$alert( '请选择开始日期!' )
      if ( !this.endTime        ) return this.$alert( '请选择结束日期!' )
      if (this.beginTime > this.endTime) return this.$alert('开始时间应该要比结束时间早!')
      this.$set( this.$data, 'isListLoading', true )
      this.$set( this.$data, 'list', [] )
      let raw  = {
        //groupId: this.currentGroupId,
        //teamId: this.currentTeamId || '',
        //userId: this.$store.state.userInfo.obj.userId,
        beginTime  : new Date(this.beginTime).getTime(),
        endTime    : new Date(this.endTime  ).getTime() + 3600 * 24 * 1000 * 1 - 1,
        token: this.$store.state.userInfo.token,
        consultListType: this.currentDocId ? 'MINE' : 'ALL',
        pageNo     : targetPageNo || 1,
        limit      : 10,
        pageSize   : 10
      }
      this.currentGroupId && (raw.backGroupId = this.currentGroupId)
      this.currentTeamId && (raw.backTeamId = this.currentTeamId)
      this.currentDocId && (raw.backUserId = this.currentDocId)
      this.isGrade === true && (raw.consultListType = 'GRADE')
      ajax('ddyy.team.consult.list', raw)
        .then( res => {
          this.$set( this.$data, 'isListLoading', false )
          if(res.data.succ){
            this.$set( this.$data, 'paginator', res.data.paginator )
            this.$set( this.$data, 'list', res.data.list )
          }
        })
    },
    getDetail(consultId){
      this.$set( this.$data, 'isGettingDetail', true )
      this.$set(this.$data, 'form', {})
      this.$set( this.$data, 'form_consultReplyImg', [])
      consultId &&
        ajax('ddyy.team.consult.info', {userId: this.$store.state.userInfo.obj.userId, consultId: consultId, token: this.$store.state.userInfo.token})
          .then( res => {
            this.$set( this.$data, 'isGettingDetail', false )
            if ( res.data.succ && ( !res.data.obj.creator || !res.data.obj.teamConsult ) ) return this.$alert('这条咨询出了一点小问题, 暂时无法查看和回复!')
            res.data.succ && this.$set(this.$data, 'form', res.data.obj)
            res.data.succ && this.setScrollTop()
            res.data.succ && this.switchEditorPanel()
          })
    },
    getTeamList(){
      this.currentGroupId &&
      ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
        .then( res =>{
          this.$set( this.$data, 'teamList', res.data.list )
        })
    },
    getGroupList(){
      this.currentGroupId &&
      ajax('ddyy.team.group.list',{backGroupId: this.currentGroupId, token: this.$store.state.userInfo.token})
        .then( res =>{
        this.$set( this.$data, 'groupList', res.data.list )
      })
    },
    getDocList(currentTeamId){
      let raw = {
        groupId: this.currentGroupId,
        teamId : currentTeamId || this.currentTeamId || null,
        backTeamId: this.currentTeamId,
        userId : this.$store.state.userInfo.obj.userId,
        token  : this.$store.state.userInfo.token
      }
      ajax('ddyy.team.member.list', raw)
        .then( res => {
          if (res.data.succ){
            res.data.list.forEach( i => {i.selected = false} )
            this.$set( this.$data, 'docList', res.data.list )
          }
        })
    },

    submit() { //提交咨询修改
      let raw = {
        token: this.$store.state.userInfo.token ,
        userId: this.form.consultTarget.userId || this.$store.state.userInfo.obj.userId,
        consultId: this.form.teamConsult.consultId,
        memberId: this.form.consultTarget.userId,
        replyContent: this.form.replyContent
      }
      this.form_consultReplyImg && this.form_consultReplyImg[0] && this.form_consultReplyImg[0].url && (raw.consultReplyImg = this.form_consultReplyImg[0].url)
      ajax('ddyy.team.consult.reply.add', raw)
        .then(res => {
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.form.replyContent = ''
            this.getDetail(this.form.teamConsult.consultId)
            this.switchEditorPanel()
            this.getList(targetPageNo)
            this.$set( this.$data, 'form', {replyContent:''})
          } else {
            this.$alert(res.data.msg)
          }
        })
    },
    submitConsulRemark() { //提交咨询备注更新
      let raw = {
        //token: this.$store.state.userInfo.token ,
        //userId: this.form.consultTarget.userId || this.$store.state.userInfo.obj.userId,
        consultId: this.form.teamConsult.consultId,
        //memberId: this.form.consultTarget.userId,
        consultRemark: this.form.teamConsult.consultRemark
      }
      ajax('ddyy.team.consult.remark.modify', raw)
        .then(res => {
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.getDetail(this.form.teamConsult.consultId)
            this.switchEditorPanel()
            this.getList(this.targetPageNo)
          } else {
            this.$alert(res.data.msg)
          }
        })
    },
    switchEssence(consultId){
      ajax('ddyy.team.consult.grade.modify', {
        token       : this.$store.state.userInfo.token,
        userId      : this.form.consultTarget.userId || this.$store.state.userInfo.obj.userId,
        consultId   : this.form.teamConsult.consultId,
        memberId    : this.form.consultTarget.userId,
        isGrade     : !this.form.teamConsult.isGrade
      })
        .then(res => {
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.getList(this.paginator.page)
            this.switchEditorPanel()
          } else {
            this.$alert(res.data.msg)
          }
        })
    },
    switchEditorPanel(args){ //切换页面
      let scrollTop = 0
      args && args.scrollTop > 0 && (scrollTop = args.scrollTop) && console.log(args.scrollTop)
      this.$set(this.$data, 'isEditorOpen', !this.isEditorOpen)
      setTimeout(function(){
        window.scroll(0, scrollTop)
        // if(document.documentElement.scrollTop)
        //   document.documentElement.scrollTop = scrollTop
        // else if(window.pageYOffset)
        //   window.pageYOffset = scrollTop
        // else if(document.body.scrollTop)
        //   document.body.scrollTop = scrollTop
      }, 10)
    },
    setScrollTop(){
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$set(this.$data, 'scrollTop', scrollTop)
    },
    beforeAvatarUpload(e){
    },
    handleAvatarScucess(res){
      this.$set(this.$data, 'form_consultReplyImg', [{name: '1.jpg', url: res.obj}])
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
  }
}

</script>
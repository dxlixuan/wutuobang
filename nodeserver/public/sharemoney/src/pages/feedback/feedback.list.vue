<template lang="jade">
  .container
    .panel_center
      .main
        .panel_max-width.mx-auto

          //- 意见反馈列表
          el-card.box-card(v-if="!isEditorOpen")
            div(slot="header" class="clearfix")
              span( style="line-height: 36px;") 意见反馈 <br/>
              el-select( v-if="userInfo.obj.loginLevel === 'ADMIN'", slot="prepend", v-model="currentGroupId", filterable=true, placeholder="选择集团(支持搜索)", @change="getTeamList()" )
                el-option(v-for='i in groupList', :label="i.groupName", :value="i.groupId" )
              //- el-select( v-model="currentTeamId", filterable=true, clearable=true, placeholder="选择团队(支持搜索)", @change="getDocList()" )
              //-   el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
              //- el-select( v-model="currentDocId", filterable=true, clearable=true, placeholder="选择医生(支持搜索)", @change="" )
              //-   el-option(v-for='i in docList', :label="i.memName", :value="i.userId" )
              //- el-button( v-loading.body="ajaxProcessing", style="border-color: #fff", type="primary", @click="getList()") 查询
              //- el-button( style="float: right;", type="primary", @click="getDetail()") 添 加
            ul(v-loading.body="isListLoading")
              li.m1.flex.border.justify-between.item(v-for="i in list", data-index="i",  @click="getDetail(i.videoId)")
                //-img.m2.border-box.bg.cycle(style="width:40px;height:40px", v-bind:src="i.follower.userAvatar+'!40'")
                .justify-around.self-center.flex1.p2
                  span( v-if="i.teamUser") {{ i.teamUser.userName|| i.teamUser.userNickname || '未知用户'}}：
                    span( v-if="i.teamFeedback")  {{i.teamFeedback.feedbackContent | removeTag }}
                  .gray.text-right( v-if="i.teamFeedback")
                  .gray.small.text-right( v-if="i.teamFeedback")  {{i.teamFeedback.userContact||"未填写联系方式"}} {{i.teamFeedback.createTime | goodTime}}
                  //.gray {{ i.follower.userAreaname || '未知地区' }}&nbsp;{{ ['未知性别', '男', '女'][i.follower.userSex] || '未知性别' }}
              .text-center.gray.p4(v-if="list && list.length==0 ") 暂无消息
              .text-right
                el-pagination( @current-change="getList", :current-page="paginator.page", :page-size="paginator.limit", layout="total, prev, pager, next", :total="paginator.totalCount")
          //- el-card.box-card(v-if="isEditorOpen")
          //-   div(slot="header" class="clearfix")
          //-     span( style="line-height: 36px;") 编辑微课
          //-     el-button.mr2( style="float: right;", @click="switchEditorPanel") 返 回
          //-     el-button.mr2( style="float: right;margin-right: 20px;", type="primary", @click="submit()") 确 定
          //-   el-form( ref="form", :model="form", label-width="120px" )
          //-     br
          //-     el-form-item( label="课程标题" )
          //-       el-input( v-model="form.videoTitle" )
          //-     el-form-item( label="医生姓名" )
          //-       el-input( v-model="form.docName" )
          //-     el-form-item( label="医生职称" )
          //-       el-select( v-model="form.docTitle", placeholder="职称", style="margin-left:10px;")
          //-         el-option(v-for='i in docTitle', :label="i", :value="i" )
          //-     el-form-item( label="医院" )
          //-       el-input( v-model="form.hosName" )
          //-     el-form-item( label="科室" )
          //-       el-input( v-model="form.deptName" )
          //-     //- el-form-item( label="所属团队" )
          //-     //-   el-select( v-model="currentTeamId", placeholder="选择团队", style="margin-left:10px;", @change="getDocList(currentTeamId)" )
          //-     //-     el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
          //-     //- el-form-item( label="所属医生" )
          //-     //-   el-select( v-model="form.docTitle", placeholder="选择医生", style="margin-left:10px;" )
          //-     //-     el-option(v-for='i in docList', :label="i.memName", :value="i.userId" )
          //-     el-form-item( label="课程简介" )
          //-       el-input( v-model="form.videoIntroduce", type="textarea", :autosize="{ minRows: 4, maxRows: 10}" )
          //-     el-form-item( label="视频封面" )
          //-       el-upload.avatar-uploader( v-bind:action="uploadInfo.host", :data="uploadInfo.basePostData", :show-file-list="false", :on-success="upVideoLogoSuccess", :before-upload="beforePicUpload")
          //-         img.avatar( style="width:256px ; height:144px;", v-if="form_videoLogo && form_videoLogo[0]", :src="form_videoLogo[0].url")
          //-         i.el-icon-plus.avatar-uploader-icon(v-else)
          //-     el-form-item( label="简介图片" )
          //-       el-upload.avatar-uploader( v-bind:action="uploadInfo.host", :data="uploadInfo.basePostData", :show-file-list="false", :on-success="upVideoImgSuccess", :before-upload="beforePicUpload")
          //-         img.avatar( style="width:256px ; height:144px;", v-if="form_videoLogo && form_videoImg[0]", :src="form_videoImg[0].url")
          //-         i.el-icon-plus.avatar-uploader-icon(v-else)
          //-     el-form-item( label="视频链接",v-loading.body="uploadingVideo", element-loading-text="拼命上传中..." )
          //-       .p2
          //-         video.border.w10.round( v-if="form_videoUrl && form_videoUrl[0]", :src="form_videoUrl[0].url", :poster="form.videoLogo", controls="controls", style="width:100%;" )
          //-         video.border.w10.round( v-else, :poster="form.videoLogo", style="background-color:#f5f5f5;" )
          //-       el-input( v-model="form.videoUrl", style="padding:0", placeholder="选择文件或直接粘帖视频地址" )
          //-         el-button( slot="append" )
          //-           el-upload( v-bind:action="uploadInfo.host", :data="uploadInfo.basePostData", :show-file-list="false", :on-success="upVideoSuccess", :before-upload="beforeUpVideo") 选择文件
          //-     el-form-item( label="二维码",v-if="form.videoQrcodeUrl" )
          //-       img( v-if="form.videoQrcodeUrl", :src="form.videoQrcodeUrl" )
          Copyright
    Tabs(currentTab="feedback")
</template>


<script>
import Tabs from '../../component/tabs.vue'
import Headers from '../../component/headers.vue'
import ajax from '../../utils/ajax.js'
import docTitle from '../../mock/docTitle'
import {removeTag, goodTime} from '../../utils/filter'

export default {
  components: {
    Tabs,
    Headers
  },
  data () {
    return {
      userInfo: { obj: {}},
      isEditorOpen: false,
      docTitle: docTitle,
      form: {
        teamName: '',
        teamResume: '',
        teamPhone: '',
        teamAddress: '',
        videoImg: '',
        videoLogo: '',
        docTitle: '主任医师'
      },
      list: [],
      docList: [],
      teamList: [],
      groupList: [],
      currentGroupId: '',
      currentTeamId: '',
      currentDocId: '',
      uploadInfo: {},
      form_videoImg: [],
      form_videoLogo: [],
      form_videoUrl: [],
      uploadingVideo: false,
      form_docTitle: docTitle[0] || '',
      isListLoading: false,
      paginator:{
        page: 1,
        limit: 10,
        totalCount: 0,
      },

    }
  },
  mounted (){// TODO: mounted中部分方法需改用Promise
    setTimeout(()=>{
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getList()
      this.getTeamList()
      this.refreshUploadInfo()
    },0)
  },
  computed: {
  },
  filters:{removeTag, goodTime},
  methods: {
    getList(targetPageNo){ //获取反馈列表
      //this.currentDocId &&
        this.$set( this.$data, 'isListLoading', true )
        ajax('ddyy.team.feedback.list', {
          //userId: this.currentDocId,
          //backMemberId: this.currentDocId,
          //backTeamId: this.currentTeamId,
          backGroupId: this.currentGroupId,
          token: this.$store.state.userInfo.token,
          pageNo: targetPageNo || 1,
          pageSize: 10
        })
          .then( res =>{
            this.$set( this.$data, 'isListLoading', false )
            this.$set( this.$data, 'paginator', res.data.paginator )
            this.$set( this.$data, 'list', res.data.list )
          })
    },
    getDetail(id){
      return
      this.$set(this.$data, 'form', {docTitle:'主任医师'})
      this.$set(this.$data, 'form_videoImg', [])
      this.$set(this.$data, 'form_videoLogo', [])
      this.$set(this.$data, 'form_videoUrl', [])
      this.$set(this.$data, 'currentTeamId', null)
      this.$set(this.$data, 'currentDocId', null)
      this.$set(this.$data, 'form_docTitle', '')
      id &&
        ajax('ddyy.team.micro.video.info', {videoId: id, token: this.$store.state.userInfo.token})
          .then(res => {
            this.$set(this.$data, 'form', res.data.obj)
            this.$set(this.$data, 'form_videoImg',  [{name: '1.jpg', url: res.data.obj.videoImg  || ""}])
            this.$set(this.$data, 'form_videoLogo', [{name: '1.jpg', url: res.data.obj.videoLogo || ""}])
            this.$set(this.$data, 'form_videoUrl',  [{name: '1.mp4', url: res.data.obj.videoUrl  || ""}])
            this.$set(this.$data, 'form_docTitle', res.data.obj.docTitle)
            //res.data.obj.userId    && this.$set(this.$data, 'currentDocId' , res.data.obj.userId)
            //res.data.obj.teamId    && this.$set(this.$data, 'currentTeamId', res.data.obj.teamId)
            //res.data.obj.teamId    && this.getDocList(id)
          })
      this.switchEditorPanel()
    },
    getTeamList(id){
      ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
        .then( res =>{
          this.$set( this.$data, 'teamList', res.data.list )
        })
    },
    getGroupList(){
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
    submit() {
      let service = this.form.videoId ? 'ddyy.team.micro.video.modify' : 'ddyy.team.micro.video.add'
      if (!this.form_videoLogo || !this.form_videoLogo[0] || !this.form_videoLogo[0].url) {
        this.$alert('视频封面不能为空!')
        return
      }
      let raw = {
        token: this.$store.state.userInfo.token ,
        userId: this.$store.state.userInfo.obj.userId,
        groupId: this.currentGroupId,
        teamId: this.currentTeamId || null,
        videoId:        this.form.videoId,
        backTeamId:     this.form.teamId,
        memberId:       this.currentDocId || this.form.memberId || this.$store.state.userInfo.obj.userId,
        videoUrl:       this.form.videoUrl,
        videoTitle:     this.form.videoTitle,
        docName:  this.form.docName,
        docTitle: this.form.docTitle,
        hosName:  this.form.hosName,
        deptName: this.form.deptName,
        videoIntroduce: this.form.videoIntroduce,
        videoImg:       this.form_videoImg[0] && this.form_videoImg[0].url || '',//todo ?
        videoLogo:      this.form_videoLogo[0] && this.form_videoLogo[0].url || '',
      }
      this.form_videoImg && this.form_videoImg[0] && this.form_videoImg[0].url && ( raw.videoImg = this.form_videoImg[0].url )
      this.form_videoLogo && this.form_videoLogo[0]   && this.form_videoLogo[0].url   && ( raw.videoLogo   = this.form_videoLogo[0].url )
      ajax(service, raw)
        .then(res => {
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.switchEditorPanel()
            this.getList()
            service === 'ddyy.team.micro.video.add' && ajax('ddyy.team.qrcode.micro.video.add', {videoId: res.data.obj.videoId,groupId:this.currentGroupId })
          } else {
            this.$alert(res.data.msg)
          }
        })
    },
    switchEditorPanel(){ //切换页面
      this.$set(this.$data, 'isEditorOpen', !this.isEditorOpen)
    },
    upVideoSuccess(res){
      let form = this.form
      form.videoUrl = res.obj
      this.$set(this.$data, 'form', form )
      this.$set(this.$data, 'form_videoUrl', [{name: '1.mp4', url: res.obj}])
      this.$set(this.$data, 'uploadingVideo', false)
      this.refreshUploadInfo()
    },
    upVideoLogoSuccess(res){
      this.$set(this.$data, 'form_videoLogo', [{name: '1.jpg', url: res.obj}])
      this.refreshUploadInfo()
    },
    upVideoImgSuccess(res){
      this.$set(this.$data, 'form_videoImg', [{name: '1.jpg', url: res.obj}])
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
    beforeUpVideo(e){
      this.$set(this.$data, 'uploadingVideo', true)
    },
    beforePicUpload(e){
      if (e.size > 1024 * 1024 * 2 ){
        this.$alert('图片大小不能超过2M!')
        return false
      }
    }
  }
}
</script>


<style lang="stylus">
  @import '../../app_variables.styl'
</style>
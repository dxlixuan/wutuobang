<template lang="jade">
  .container
    .panel_center
      .main
        .panel_max-width.mx-auto( v-loading.body="ajaxProcessing" )
          //- 文章列表
          el-card.box-card(v-if="!isEditorOpen")
            div(slot="header" class="clearfix")
              span( style="line-height: 36px;") 医生文章
              el-select( v-if="userInfo.obj.loginLevel === 'ADMIN'", slot="prepend", v-model="currentGroupId", filterable=true, placeholder="选择集团(支持搜索)", @change="getTeamList()" )
                el-option(v-for='i in groupList', :label="i.groupName", :value="i.groupId" )
              el-select( v-model="currentTeamId", filterable=true, clearable=true, placeholder="选择团队(支持搜索)", @change="getDocList()" )
                el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
              el-select( v-model="currentDocId", filterable=true, clearable=true, placeholder="选择医生(支持搜索)", @change="" )
                el-option(v-for='i in docList', :label="i.memName", :value="i.userId" )
              | &nbsp;
              el-checkbox( v-model="isGrade") 精选　
              el-button( style="border-color: #fff", type="primary", @click="getList()") 查询
              //- el-button( style="float: right;", type="primary", @click="getDetail()") 添 加
            ul()
              li.m1.flex.border.justify-between.item.hand(v-for="i in list", data-index="i",  @click="getDetail(i.teamArticle.articleId)")
                //-img.m2.border-box.bg.cycle(style="width:40px;height:40px", v-bind:src="i.follower.userAvatar+'!40'")
                .justify-around.self-center.flex1.p2
                  span.keyword.keyword-primary(v-if="i.teamArticle.isGrade") 精选
                  span {{ i.teamArticle.title || '未知'}}
                  .gray.small.text-right {{i.authorName || "未知"}}　{{i.teamArticle.createTime | goodTime}}
              .text-center.gray.p4(v-if="list && list.length==0 ") 暂无消息
              .text-right
                el-pagination( @current-change="getList", :current-page="paginator.page", :page-size="paginator.limit", layout="total, prev, pager, next", :total="paginator.totalCount")
          
          //- 文章详情
          el-card.box-card(v-if="isEditorOpen")
            div(slot="header" class="clearfix")
              span( style="line-height: 36px;") 文章详情
              el-button.mr2( style="float: right;", @click="switchEditorPanel({scrollTop: scrollTop})") 返 回
              //- el-button.mr2( style="float: right;margin-right: 20px;", type="primary", @click="submit()", disabled) 确 定
              el-button( v-if="form.teamArticle", style="float: right;margin-right:20px;", type="primary", @click="switchEssence") {{form.teamArticle.isGrade === true ? '取消加精' : '加精'}}
            el-form(ref="form", :model="form", label-width="120px" )
              div(v-if="form.teamArticle")
                .p4.f2.text-center {{form.teamArticle.title || "无标题文章"}}
                .p2.text-center
                  span(v-if="form.teamMember") 作者：{{form.teamMember.memName||"未知"}}　
                  span 发布时间: {{form.teamArticle.createTime | goodTime}}　
                  //- span.p2 修改时间：{{form.teamArticle.modifyTime | goodTime}}
                  span 阅读数：{{ form.teamArticle.readTimes}}
                .p2.content(v-html="form.teamArticle.content")
              .p2.text-center(v-else)
                span(v-if="!ajaxLoading") 加载失败!
          Copyright
    Tabs(currentTab="article")
</template>


<script type="text/ecmascript-6">
import Tabs from '../../component/tabs.vue'
import Headers from '../../component/headers.vue'
import ajax from '../../utils/ajax.js'
import docTitle from '../../mock/docTitle'
import {removeTag, goodTime, htmlFilter} from '../../utils/filter'
var pageTimer;

export default {
  components: {
    Tabs,
    Headers
  },
  data () {
    return {
      ajaxProcessing: false,
      ajaxLoading: false,
      userInfo: { obj: {}},
      isEditorOpen: false,
      docTitle: docTitle,
      form: {
        teamArticle: {}
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
      isGrade: false,
      paginator:{
        page: 1,
        limit: 10,
        totalCount: 0,
      },
      scrollTop: 0

    }
  },
  mounted (){// TODO: mounted中部分方法需改用Promise
    console.log(this.$store.state)
    setTimeout(()=>{
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getList()
      this.getTeamList()
      this.refreshUploadInfo()
    },0)
    //pageTimer =  setInterval(function(){console.log(1)}, 1000)
  },
  destroyed(){
    //clearInterval(pageTimer)
  },
  computed: {
  },
  filters:{removeTag, goodTime},
  methods: {
    getList(targetPageNo){// 获取文章列表
      let raw = {
        userId: this.currentDocId,
        backMemberId: this.currentDocId,
        backTeamId: this.currentTeamId,
        groupId: this.currentGroupId,
        backGroupId: this.currentGroupId,
        orderType: 'CREAT',
        token: this.$store.state.userInfo.token,
        pageIndex: targetPageNo || 1,
        pageNo: targetPageNo || 1,
        pageSize: 10,

      }
      this.isGrade && (raw.isGrade = this.isGrade)
      //this.currentDocId &&
        this.$set( this.$data, 'ajaxProcessing', true )
        ajax('ddyy.team.article.list.group', raw)
          .then( res =>{
            this.$set( this.$data, 'ajaxProcessing', false )
            this.$set( this.$data, 'paginator', res.data.paginator )
            this.$set( this.$data, 'list', res.data.list )
          })
    },
    getDetail(id){
      this.$set(this.$data, 'form', {docTitle:'主任医师'})
      this.$set(this.$data, 'form_videoImg', [])
      this.$set(this.$data, 'form_videoLogo', [])
      this.$set(this.$data, 'form_videoUrl', [])
      this.$set(this.$data, 'currentTeamId', null)
      this.$set(this.$data, 'currentDocId', null)
      this.$set(this.$data, 'form_docTitle', '')
      this.$set(this.$data, 'ajaxLoading', true)
      id &&
        this.$set( this.$data, 'ajaxProcessing', true ) &&
        ajax('ddyy.team.article.info', {articleId: id, token: this.$store.state.userInfo.token})
          .then(res => {
            this.$set(this.$data, 'ajaxLoading', false)
            if(res.data.succ){
              res.data.obj &&
                res.data.obj.teamArticle &&
                res.data.obj.teamArticle.content &&
                (res.data.obj.teamArticle.content = htmlFilter({
                  str: res.data.obj.teamArticle.content,
                  removeJS: true,
                  //removeATags: true,
                  removeCss: true,
                  //replaceProductsName: true
                }))
              this.$set(this.$data, 'ajaxProcessing', false )
              this.$set(this.$data, 'form', res.data.obj)
              this.$set(this.$data, 'form_videoLogo', [{name: '1.jpg', url: res.data.obj.videoLogo || ""}])
              this.$set(this.$data, 'form_videoUrl', [{name: '1.mp4', url: res.data.obj.videoUrl || ""}])
              this.$set(this.$data, 'form_docTitle', res.data.obj.docTitle)
              //res.data.obj.userId    && this.$set(this.$data, 'currentDocId' , res.data.obj.userId)
              //res.data.obj.teamId    && this.$set(this.$data, 'currentTeamId', res.data.obj.teamId)
              //res.data.obj.teamId    && this.getDocList(id)
            }
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
    switchEssence(articleId){
      ajax('ddyy.team.article.grade.modify', {
        token     : this.$store.state.userInfo.token,
        userId    : this.form.teamArticle.userId || this.$store.state.userInfo.obj.userId,
        articleId : this.form.teamArticle.articleId,
        teamId    : this.form.teamArticle.teamId,
        memberId  : this.form.teamArticle.userId,
        isGrade   : !this.form.teamArticle.isGrade
      })
        .then(res => {
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.$set( this.$data.form, 'teamArticle', res.data.obj )
            this.getList(this.paginator.page)
          } else {
            this.$alert(res.data.msg)
          }
        })
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
    },
  }
}
</script>


<style lang="stylus">
  @import '../../app_variables.styl'
  @import '../../css/style.css'
  .content
    [style*="fixed"]
      display none !important
      left -99999px !important
      top -99999px !important
      z-index -99999 !important
      visibility hidden !important
    table
      overflow-x scroll
    img,iframe,video
      max-width 100%
</style>
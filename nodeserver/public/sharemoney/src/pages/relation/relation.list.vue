<template lang="jade">
  .container
    .panel_center
      .main
        .panel_max-width.mx-auto

          //- 关注关系列表
          el-card.box-card(v-if="!isEditorOpen")
            div(slot="header", class="clearfix", fixed)
              span( style="line-height: 36px;") 关注关系
              el-select( v-if="userInfo.obj.loginLevel === 'ADMIN'", slot="prepend", v-model="currentGroupId", filterable=true, placeholder="选择集团(支持搜索)", @change="getTeamList()" )
                el-option(v-for='i in groupList', :label="i.groupName", :value="i.groupId" )
              el-select( v-model="currentTeamId", filterable=true, clearable=true, placeholder="选择团队(支持搜索)", style="margin-left:10px;", @change="getDocList()" )
                el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
              el-select( v-model="currentDocId", filterable=true, clearable=true, placeholder="选择医生(支持搜索)", style="margin-left:10px;", @change="" )
                el-option(v-for='i in docList', :label="i.memName", :value="i.userId" )
              el-button( v-loading.body="ajaxProcessing", style="border-color: #fff", type="primary", @click="getList()") 查询
              //- el-button( style="float: right;", type="primary", @click="getDetail()") 添 加
            ul(v-loading.body="isListLoading")
              li.m1.flex.border.justify-between.item(v-for="i in list", data-index="i", @click="getDetail(i.videoId)")
                .fl
                  img.m2.border-box.bg.cycle(style="width:40px;height:40px", v-bind:src="i.follower.userAvatar+'!40'")
                .fl.p1.justify-around.self-center.flex1 {{ i.follower.userNickname || '未知用户'}}
                  span.gray
                    svg(width="12px", height="12px", viewBox="0 0 100 100")
                      path( d="M88.552,50c0,0.466-0.216,0.905-0.585,1.189l-36.77,28.27c-0.27,0.207-0.592,0.311-0.915,0.311  c-0.318,0-0.635-0.101-0.903-0.302c-0.538-0.406-0.74-1.122-0.492-1.749l7.394-18.718H12.948c-0.829,0-1.5-0.672-1.5-1.5l0-15   c0-0.829,0.671-1.5,1.5-1.5h43.333l-7.394-18.719c-0.248-0.627-0.046-1.343,0.493-1.749c0.538-0.406,1.282-0.404,1.817,0.009  l36.77,28.27C88.336,49.095,88.552,49.534,88.552,50z")
                  | {{ i.followee.memName || '未知用户'}}
                  .gray.small {{ i.follower.userAreaname || '未知地区' }}&nbsp;{{ ['未知性别', '男', '女'][i.follower.userSex] || '未知性别' }}
                .p2.gray.text-right
                  .fr.small( v-if="i.teamFollow.createTime") 　{{ i.teamFollow.createTime | goodTime }}关注
                //- .self-center.p4 已签约医生: {{ i.teamFollow.followeeId || '未知医生'}}
                .clear
              .text-center.gray.p4(v-if="list && list.length==0 ") 暂无签约关系
            .text-right
              el-pagination( @current-change="getList", :current-page="paginator.page", :page-size="paginator.limit", layout="total, prev, pager, next", :total="paginator.totalCount")
          Copyright
    Tabs(currentTab="relation")
</template>


<script>
import Tabs from '../../component/tabs.vue'
import Headers from '../../component/headers.vue'
import ajax from '../../utils/ajax.js'
import docTitle from '../../mock/docTitle'
import {goodTime} from '../../utils/filter'

export default {
  components: {
    Tabs,
    Headers
  },
  data () {
    return {
      userInfo    : {obj: {}},
      isEditorOpen: false,
      docTitle    : docTitle,
      form: {
        teamName: '', teamResume: '', teamPhone: '', teamAddress: '', videoImg: '', videoLogo: '', docTitle: '主任医师'
      },
      paginator: {},
      list          : [],
      docList       : [],
      teamList      : [],
      groupList     : [],
      currentGroupId: null,
      currentTeamId : '',
      currentDocId  : '',
      userId        : '',
      uploadInfo    : {},
      form_videoImg : [],
      form_videoLogo: [],
      form_videoUrl : [],
      uploadingVideo: false,
      isListLoading: false,
      form_docTitle : docTitle[0] || '',
      a:{b:1}
    }
  },
  mounted (){// TODO: mounted中部分方法需改用Promise
    // todo this.$alert('签约列表接口不能用')
    setTimeout(()=>{
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.getList()
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getTeamList()
    },0)
  },
  computed: {
  },
  filters:{goodTime},
  methods: {
    getList(targetPageNo){ //获取关注关系列表
      this.$set( this.$data, 'isListLoading', true )
      let raw = {
        token: this.$store.state.userInfo.token,
        backGroupId: this.currentGroupId,
        pageNo   : targetPageNo || 1,
        pageIndex: targetPageNo || 1,
        pageSize: 10
      }
      this.currentTeamId && (raw.backTeamId   = this.currentTeamId)
      this.currentDocId  && (raw.backMemberId = this.currentDocId )
      ajax('ddyy.team.follow.list.group', raw)
        .then( res =>{
          this.$set( this.$data, 'list', res.data.list )
          this.$set( this.$data, 'paginator', res.data.paginator )
          this.$set( this.$data, 'isListLoading', false )
          this.$set( this.$data.a, 'b', this.$data.a.b+1 )
        })
    },
    getDetail(id){
      return
      this.$set(this.$data, 'form', {docTitle: '主任医师'})
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
    getDocList(){
      let raw = {
        groupId   : this.currentGroupId,
        teamId    : this.currentTeamId || null,
        backTeamId: this.currentTeamId,
        userId    : this.$store.state.userInfo.obj.userId,
//        userId    : this.currentDocId,
//        backUserId: this.currentDocId,
        token     : this.$store.state.userInfo.token
      }
      this.$set( this.$data, 'docList', [] )
      ajax('ddyy.team.member.list', raw)
        .then( res => {
          if (res.data.succ){
            res.data.list.forEach( i => {i.selected = false} )
            this.$set( this.$data, 'docList', res.data.list )
          }
        })
    },
    switchEditorPanel(){ //切换页面
      this.$set(this.$data, 'isEditorOpen', !this.isEditorOpen)
    }
  }
}
</script>


<style lang="stylus">
  @import '../../app_variables.styl'
</style>
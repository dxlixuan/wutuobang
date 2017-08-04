<template lang="jade">
  .container
    .panel_center
      .main
        .panel_max-width.mx-auto

          //- 数据统计页
          el-card.box-card(v-if="!isEditorOpen")
            div(slot="header" class="clearfix")
              span( style="line-height: 36px;") 数据统计
              el-select( v-if="userInfo.obj.loginLevel === 'ADMIN'", slot="prepend", v-model="currentGroupId", filterable=true, placeholder="选择集团(支持搜索)", @change="getTeamList()" )
                el-option(v-for='i in groupList', :label="i.groupName", :value="i.groupId" )
              el-select( slot="prepend", v-model="currentTeamId", filterable=true, clearable=true, placeholder="选择团队(支持搜索)", @change="getDocList()" )
                el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
              el-select( v-model="currentDocId", filterable=true, clearable=true, placeholder="选择医生(支持搜索)", @change="" )
                el-option(v-for='i in docList', :label="i.memName", :value="i.userId" )
              div( style="display:inline-block;")
                | 从&nbsp;
                el-date-picker(v-model="beginTime", type="date", placeholder="开始时间", :picker-options="countTimePickerOptions", style="width:120px;")
                | &nbsp;到&nbsp;
                el-date-picker(v-model="endTime", type="date", placeholder="结束时间", :picker-options="countTimePickerOptions", style="width:120px;")
              el-button( v-loading.body="ajaxProcessing", style="border-color: #fff", type="primary", @click="getDataCountAll()") 查询
              //- el-button( style="float: right;", type="primary", @click="getDetail()") 添 加
            //- .mb2(v-if="using")
            //-   .p2.bg-primary.white 　每月咨询统计 ( 按天 )<br/>
            //-   el-select( slot="prepend", v-model="currentTeamId", filterable=true, placeholder="选择团队(支持搜索)", @change="getDocList()" )
            //-     el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
            //-   el-date-picker(v-model="countTime", type="month", clearable=false, placeholder="选择月份", :picker-options="countTimePickerOptions")
            //-   el-button( v-loading.body="ajaxProcessing", style="border-color: #fff", type="primary", @click="getConsultCount()") 查询
            //-   //- el-button( type="primary", @click="to('hash')") to
            //-   el-table.w10( :data="consultCount", max-height="300")
            //-     el-table-column( prop="date", label="日期")
            //-       template( scope="scope")
            //-         el-icon.px2( name="time")
            //-         span.px2 {{ scope.row.date|date }}
            //-     el-table-column( prop="count", label="咨询总数")
            .mb2
              //- .p2.bg-primary.white 　全部统计<br/>
              .p2
                span {{ "新增文章数 " }}
                span {{ allCount.articlerCountAll || 0 }}
              .p2
                span {{ "新增咨询数 " }}
                span {{ allCount.consultCountAll || 0 }}
              .p2
                span {{ "新增消息数 " }}
                span {{ allCount.messageCountAll || 0 }}
              .p2
                span {{ "新增关注数 " }}
                span {{ allCount.followCountAll || 0 }}
              hr
              .p2(v-if="beginTimeSuccess")
                | 从
                span.primary {{beginTimeSuccess | date}}
                | 到
                span.primary {{endTimeSuccess | date}}
              .p2
                span {{ "集团新增充值数(心意) " }}
                span {{ allCount.topupCountAdded || 0 }}
              .p2
                span {{ "集团新增用户数 " }}
                span {{ allCount.userCountAll || 0 }}
          Copyright
    Tabs(currentTab="stat")
</template>


<script>
import Tabs from '../../component/tabs.vue'
import Headers from '../../component/headers.vue'
import ajax from '../../utils/ajax.js'
import docTitle from '../../mock/docTitle'
import {date} from '../../utils/filter.js'

export default {
  components: {
    Tabs,
    Headers
  },
  data () {
    return {
      userInfo: { obj: {}},
      ajaxProcessing: false,
      currentGroupId: null,
      userId        : '',
      currentTeamId: null,
      currentDocId: null,
      countTime: null,
      beginTime: null,
      endTime: null,
      beginTimeSuccess: null,
      endTimeSuccess: null,
      groupList: [],
      teamList: [],
      docList: [],
      consultCount: [],
      allCount: {},
      countTimePickerOptions: {disabledDate(unixTime) { return unixTime.getTime() > Date.now()}}
    }
  },
  mounted (){// TODO: mounted中部分方法需改用Promise
    setTimeout(()=>{
      this.$set( this.$data, 'beginTime', new Date(new Date().setHours(0, 0, 0, 0)).getTime() - 3600 * 24 * 1000 * 30 ) //30天前
      this.$set( this.$data, 'endTime'  , new Date(new Date().setHours(0, 0, 0, 0)).getTime())
      this.$set( this.$data, 'countTime', new Date(new Date().setHours(0, 0, 0, 0)).getTime())
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getTeamList()
      this.getDataCountAll()
      //this.getConsultCount()
      //this.refreshUploadInfo()
    },0)
    //- setTimeout(()=>{
    //-   if (this.teamList && this.teamList[0]){
    //-     this.$set(this.$data, 'currentTeamId', this.teamList[0].teamId)
    //-     this.getConsultCount()
    //-   }
    //- },1400)
  },
  computed: {
  },
  filters: {date},
  methods: {
    getConsultCount(){
      if( !this.currentTeamId) return this.$alert('请先选择团队!')
      if( !this.countTime) return this.$alert('请先选择日期!')
      this.$set( this.$data, 'ajaxProcessing', true )
      let raw = {token: this.$store.state.userInfo.token, groupId: this.currentGroupId}
      this.currentTeamId && (raw.teamId = this.currentTeamId)
      this.countTime && (raw.countTime = this.countTime)
      this.memberId && (raw.memberId = this.memberId)
      ajax('ddyy.team.data.consult.count', raw)
        .then( res =>{
          this.$set( this.$data, 'ajaxProcessing', false )
          res.data.succ || this.$alert(res.data.msg)
          res.data.list && res.data.list[0] && this.$set( this.$data, 'consultCount', res.data.list )
        })
    },
    getDataCountAll(){
      if ( !this.currentGroupId ) return this.$alert( '请选择一个集团!' )
      if ( !this.beginTime      ) return this.$alert( '请选择开始日期!' )
      if ( !this.endTime        ) return this.$alert( '请选择结束日期!' )
      //if( !this.currentTeamId2) return this.$alert('请先选择团队!')
      this.$set( this.$data, 'ajaxProcessing', true )
      let raw = {
        token: this.$store.state.userInfo.token,
        groupId: this.currentGroupId,
        backGroupId: this.currentGroupId,
        //backTeamId: this.currentTeamId,
        //backMemberId: this.currentDocId,
        beginTime  : new Date(this.beginTime).getTime(),
        endTime    : new Date(this.endTime  ).getTime() + 3600 * 24 * 1000 * 1 - 1
      }
      this.currentTeamId && (raw.backTeamId = this.currentTeamId)
      //this.countTime && (raw.countTime = this.countTime)
      this.currentDocId && (raw.backMemberId = this.currentDocId)
      console.log(this.currentDocId)
      let service = /*this.currentTeamId ? 'ddyy.team.data.count.all' :*/ 'ddyy.team.data.count.platform'
      ajax(service, raw)
        .then( res =>{
          this.$set( this.$data, 'ajaxProcessing', false )
          res.data.succ || this.$alert(res.data.msg)
          res.data.obj && this.$set( this.$data, 'allCount', res.data.obj )
          res.data.obj && this.$set( this.$data, 'beginTimeSuccess', this.beginTime)
          res.data.obj && this.$set( this.$data, 'endTimeSuccess', this.endTime)
        })
    },
    getTeamList(){
      this.currentGroupId &&
      ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
        .then( res =>{
          this.$set( this.$data, 'teamList', res.data.list )
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
    getGroupList(){
      ajax('ddyy.team.group.list',{backGroupId: this.currentGroupId, token: this.$store.state.userInfo.token})
        .then( res =>{
        this.$set( this.$data, 'groupList', res.data.list )
      })
    },
    to(hash){
      this.$router.push({path:'/team'})
    }
  }
}
</script>


<style lang="stylus">
  @import '../../app_variables.styl'
</style>
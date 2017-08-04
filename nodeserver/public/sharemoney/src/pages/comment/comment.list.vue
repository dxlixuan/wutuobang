<template lang="jade">
  .container
    .panel_center
      .main
        .panel_max-width.mx-auto
          //- 医生评价列表
          el-card.box-card(v-if="!isEditorOpen")
            div(slot="header" class="clearfix")
              span( style="line-height: 36px;") 医生评价
              el-button( style="float: right;", type="primary", @click="getDetail()") 添 加
            .mb2
              .p2.bg-primary.white 
                .mb2 每月咨询统计 ( 按天 )<br/>
                el-select(v-if="userInfo.obj.loginLevel === 'ADMIN'", slot="prepend", v-model="currentTeamId", filterable=true, placeholder="选择团队(支持搜索)", @change="" )
                  el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
                el-date-picker(v-model="countTime", type="date", placeholder="选择日期", :picker-options="countTimePickerOptions")
                el-button( v-loading.body="ajaxProcessing", style="border-color: #fff", type="primary", @click="getConsultCount()") 查询
                //- el-button( type="primary", @click="to('hash')") to
              el-table.w10( style="max-height: 300px; overflow-x: hidden; overflow-y: auto;", :data="consultCount",)
                el-table-column( prop="date", label="日期")
                  template( scope="scope")
                    el-icon.px2( name="time")
                    span.px2 {{ scope.row.date|date }}
                el-table-column( prop="count", label="咨询总数")
            .mb2
              .p2.bg-primary.white
                .mb2 全部统计<br/>
                el-select( slot="prepend", v-model="currentTeamId", filterable=true, placeholder="选择团队(支持搜索)", @change="" )
                  el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
                el-button( v-loading.body="ajaxProcessing", style="border-color: #fff", type="primary", @click="getDataCountAll()") 查询
              .p2
                span {{ "文章阅读总数 " }}
                span {{ allCount.articlerReadCountAll }}
              .p2
                span {{ "咨询总数 " }}
                span {{ allCount.consultCountAll }}
              .p2
                span {{ "消息总数 " }}
                span {{ allCount.messageCountAll }}
              .p2
                span {{ "用户总数 " }}
                span {{ allCount.userCountAll }}
          Copyright
    Tabs(currentTab="comment")
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
      ajaxProcessing: false,
      currentTeamId: null,
      countTime: null,
      teamList: [],
      consultCount: [],
      allCount: {},
      countTimePickerOptions: {disabledDate(unixTime) { return unixTime.getTime() > Date.now()}}
    }
  },
  mounted (){// TODO: mounted中部分方法需改用Promise
    this.$set( this.$data, 'countTime', new Date(new Date().toLocaleDateString()).getTime())
    setTimeout(()=>{
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getTeamList()
      //this.getConsultCount()
      //this.refreshUploadInfo()
    },0)
  },
  computed: {
  },
  filters: {date},
  methods: {
    getConsultCount(){ // 停用
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
    getDataCountAll(){ //全部统计
      if( !this.currentTeamId) return this.$alert('请先选择团队!')
      this.$set( this.$data, 'ajaxProcessing', true )
      let raw = {token: this.$store.state.userInfo.token, groupId: this.currentGroupId}
      this.currentTeamId && (raw.teamId = this.currentTeamId)
      //this.countTime && (raw.countTime = this.countTime)
      this.memberId && (raw.memberId = this.memberId)
      ajax('ddyy.team.data.count.all', raw)
        .then( res =>{
          this.$set( this.$data, 'ajaxProcessing', false )
          res.data.succ || this.$alert(res.data.msg)
          res.data.obj && this.$set( this.$data, 'allCount', res.data.obj )
        })
    },
    getTeamList(){
      this.currentGroupId &&
        ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
          .then( res =>{
            res.data.succ || this.$alert(res.data.msg)
            res.data.succ && this.$set( this.$data, 'teamList', res.data.list )
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
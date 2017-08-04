<template>
  <div class="container">
    <div class="panel_center">
      <div class="main">
        <div class="panel_max-width mx-auto bg-white">
          <div class="bg-white">
            <div class="border-top border-bottom avatar-uploader flex">
              <div class="flex p3 justify-start">医生评价</div>
                <div class="flex py2">
                  <el-select v-if="userInfo.obj.loginLevel==='ADMIN'" v-model="currentGroupId" filterable placeholder="请选择集团(支持搜索)" @change="getTeamList()">
                    <el-option
                      v-for="item in groupList"
                      :label="item.groupName"
                      :value="item.groupId">
                    </el-option>
                  </el-select>
                  <el-select v-model="currentTeamId" filterable clearable placeholder="请选择团队(支持搜索)" @change="getDocList()">
                    <el-option
                      v-for="item in teamList"
                      :label="item.teamName"
                      :value="item.teamId">
                    </el-option>
                  </el-select>
                  <el-select v-model="currentDocId" filterable clearable placeholder="请选择医生(支持搜索)">
                    <el-option
                      v-for="item in docList"
                      :label="item.memName"
                      :value="item.userId">
                    </el-option>
                  </el-select>
                  <el-button v-loading.body="ajaxProcessing" style="border-color: #fff" type="primary" @click="getList()">查询</el-button>
                </div>
            </div>
            <!--div class="p4">医生综合评分:<span class="averageCol">{{obj}}</span></div-->
            <ul class="avatar-uploader p2" v-loading.body="ajaxLoading">
              <li class="border avatar-uploader p1 mt1 mb1" v-for="item in list">
                <div class="avatar-uploader flex">
                  <img :src="item.commenter.userAvatar+'!40'" alt="" class="circle p1">
                  <div class="pl3 py1" style="line-height: 40px;">
                    <span>{{item.commenter.userNickname}}</span>&nbsp&nbsp&nbsp
                    <span>{{item.commenter.userSex==1? "男":"女"}}</span>&nbsp&nbsp&nbsp
                    <span>{{item.commenter.userAreaname}}</span>
                  </div>
                </div>
                <div class="px2">
                  <span>评价了医生
                    <span class="primary">{{item.teamMember.memName}}</span>
                    <span>: 　{{item.teamComment.content || "未填写评价内容"}}</span></span> <br>
                  <p class="block gray" style="float: right;">
                    <span>评分:{{item.teamComment.score}}</span>&nbsp&nbsp&nbsp
                    <span>点评时间: {{item.teamComment.createTime|goodTime}}</span>
                  </p>
                </div>
              </li>
              <div class="page text-right">
                <el-pagination
                  @current-change="getList"
                  :current-page="paginator.page"
                  :page-size="paginator.limit"
                  layout="total, prev, pager, next"
                  :total="paginator.totalCount">
                </el-pagination>
              </div>
            </ul>
          </div>
          <Copyright/>
        </div>
      </div>
    </div>
    <Tabs currentTab="evaluate"></Tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import Tabs from '../../component/tabs.vue'
  import ajax from '../../utils/ajax.js'
  import {goodTime} from '../../utils/filter'
  export default {
    components: {
      Tabs
    },
    data () {
      return {
        ajaxLoading: false,
        userInfo: {obj:{}},
        list:[],
        groupList:[],
        teamList:[],
        docList:[],
        currentGroupId:'',
        currentTeamId:'',
        currentDocId:'',
        paginator:{
          page:1,
          limit:10,
          totalCount:0,
        },
        time:''
      }
    },
    mounted (){
      setTimeout(()=>{
        this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
        this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
        this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
        this.getTeamList()
        this.getList()
      },0)
    },
    filters:{goodTime},
    methods: {
      //获取集团
      getGroupList(){
        this.$set( this.$data, 'ajaxLoading', true )
        ajax('ddyy.team.group.list',{backGroupId: this.currentGroupId, token: this.$store.state.userInfo.token})
          .then( res =>{
            this.$set( this.$data, 'ajaxLoading', false )
            this.$set( this.$data, 'groupList', res.data.list )
          })
      },
      //获取团队
      getTeamList(id){
        this.$set( this.$data, 'ajaxLoading', true )
        ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
          .then( res =>{
            this.$set( this.$data, 'ajaxLoading', false )
            this.$set( this.$data, 'teamList', res.data.list )
          })
      },
      //获取医生
      getDocList(currentTeamId){
        this.$set( this.$data, 'ajaxLoading', true )
        let raw = {
          groupId: this.currentGroupId,
          teamId : currentTeamId || this.currentTeamId || null,
          backTeamId: this.currentTeamId,
          userId : this.$store.state.userInfo.obj.userId,
          token  : this.$store.state.userInfo.token
        }
        ajax('ddyy.team.member.list', raw)
          .then( res => {
            this.$set( this.$data, 'ajaxLoading', false )
            if (res.data.succ){
              this.$set( this.$data, 'docList', res.data.list )
            }
          })
      },
      //转换时间函数
       getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
          },
      //获取医生评价列表
      getList(pageNo){
        var obj = {
          backGroupId : this.currentGroupId,
          token   : this.$store.state.userInfo.token,
          pageNo  : pageNo || 1,
          pageSize: 10
        }
        this.currentTeamId && (obj.backTeamId = this.currentTeamId)
        this.currentDocId && (obj.backMemberId = this.currentDocId)
        this.$set( this.$data, 'ajaxLoading', true )
        ajax('ddyy.team.comment.list.group',obj)
          .then( res =>{
            this.$set( this.$data, 'ajaxLoading', false )
            if (res.data.succ){
              var docList = res.data.list
//            if(docList){
//              for(var i=0;i<docList.length;i++){
//                var date = new Date(docList[i].teamComment.createTime)
//                  docList[i].teamComment.createTime = date.format('yyyy-MM-dd');
//              }
//            }
              this.$set( this.$data, 'list', res.data.list )
              this.$set( this.$data, 'paginator', res.data.paginator )
            }
            res.data.msg && this.$alert(res.data.msg)
          })
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../app_variables.styl';
</style>

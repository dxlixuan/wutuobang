<template lang="jade">
  .container
    .panel_center
      .main
        .panel_max-width.mx-auto

          //- 每周排班列表
          el-card.box-card(v-if="!isEditorOpen")
            div(slot="header" class="clearfix")
              span( style="line-height: 36px;") 每周排班
              el-select( v-if="userInfo.obj.loginLevel === 'ADMIN'", slot="prepend", v-model="currentGroupId", filterable=true, placeholder="选择集团(支持搜索)", @change="getTeamList()" )
                el-option(v-for='i in groupList', :label="i.groupName", :value="i.groupId" )
              el-select( v-model="currentTeamId", filterable=true, placeholder="选择团队(支持搜索)", style="margin-left:10px;", @change="getList" )
                el-option(v-for='i in teamList', :label="i.teamName", :value="i.teamId" )
              //- el-button( style="float: right;", type="primary", @click="getDetail()") 添 加
            ul(v-loading.body="ajaxLoading" )
              li.m1.flex.border.justify-between.hand( v-for="i in 7", class="item", @click="getDetail(i)")
                .fl.justify-around.self-center.flex1.p4.flex(style="justify-content: space-between;")
                  .fl(style="min-width:70px") {{ '星期'+['日','一','二','三','四','五','六','日'][i]}}
                  .fr(v-if="lists[i-1].length>0")
                    span(v-for='j in lists[i-1]') {{ ' ' + j.memName }}
                  .fr.gray(v-else) 暂无安排医生
                .fr.self-center.p4.gray >
                .clear

          //- 单天排班设置        
          el-card.box-card(v-if="isEditorOpen")
            div(slot="header" class="clearfix")
              span( style="line-height: 36px;") 编辑排班
              el-button( style="float: right;", @click="switchEditorPanel") 返 回
              el-button( style="float: right;margin-right:20px;", type="primary", @click="submit()") 确 定
            ul(v-loading.body="ajaxLoading" )
              li.m1.flex.border.justify-between(v-for="(i, index) in docList", class="item", :for="'doc'+i.userId||i.id")
                .justify-around.self-center.flex1.p4.flex(style="justify-content: space-between;")
                  .fl.flex1 {{i.memName || i.memNickname || "医生姓名"}}
                    span.gray(v-if="i.id")  ( 临时医生 )
                  input.fr( type="checkbox", :name="'doc'+i.userId||i.id", :value="i.userId||i.id",:id="'doc'+i.userId||i.id")
                  //-el-checkbox( v-model="i.selected", @change="bindCheckBoxChange(i.userId||i.id)")
                  .clear
          Copyright
    Tabs(currentTab="schedule")
</template>


<script>
import Tabs from '../../component/tabs.vue'
import ajax from '../../utils/ajax.js'
let checkList =[];
export default {
  components: {Tabs},
  data () {
    return {
      ajaxLoading: false,
      userInfo: { obj: {}},
      isEditorOpen: false,
      lists:[
        [], [], [], [], [], [], []
      ],
      list: [],
      docList: [],
      teamList: [],
      groupList: [],
      currentTeamId: null,
      currentGroupId: null,
      currentDay: 0,
      checkList: [false],
      i: 0
    }
  },
  mounted () {// TODO: mounted中部分方法需改用Promise
    setTimeout(()=>{
      this.$set( this.$data, 'userInfo', this.$store.state.userInfo )
      this.$set( this.$data, 'currentGroupId', this.$store.state.userInfo.obj.groupId )
      this.$store.state.userInfo.obj.loginLevel === 'ADMIN' && this.getGroupList()
      this.getTeamList()
    },0)
    setTimeout(()=>{
      if (this.teamList && this.teamList[0]) {
        this.$set(this.$data, 'currentTeamId', this.teamList[0].teamId)
        this.getList()
        this.getDocList()
      }
    },1400)
  },
  methods: {
    getList(){ // 获取排班列表
      if(!this.currentTeamId) return
      let raw = {
        groupId: this.currentGroupId,
        teamId : this.currentTeamId || '',
        backTeamId: this.currentTeamId || '',
        userId : this.$store.state.userInfo.obj.userId,
        token  : this.$store.state.userInfo.token
      }
      this.$set(this.$data, 'lists', [
        [],[],[],[],[],[],[]
      ])
      this.$set( this.$data, 'ajaxLoading', true )
      ajax('ddyy.team.config.get', raw )
        .then( res => {
          this.$set( this.$data, 'ajaxLoading', false )
          if (res.data.succ ) {
            let lists=[
              [], [], [], [], [], [], []
            ]
            res.data.obj && res.data.obj.callList && res.data.obj.callList.forEach( i => {
              i.memName || (i.memName = '[未知医生]')
              lists[i.teamConsultCall.consultWeekNo-1].push(i)
              this.$set(this.$data, 'lists', lists)
            })
          }
        })
      this.getDocList()
    },
    getDocList(){
      let raw = {
        groupId: this.currentGroupId,
        teamId : this.currentTeamId || null,
        backTeamId: this.currentTeamId,
        userId : this.$store.state.userInfo.obj.userId,
        token  : this.$store.state.userInfo.token
      }
      this.$set( this.$data, 'ajaxLoading', true )
      ajax('ddyy.team.member.list', raw)
        .then( res => {
          this.$set( this.$data, 'ajaxLoading', false )
          if (res.data.succ){
            res.data.list.forEach( i => {i.selected = false} )
            this.$set( this.$data, 'docList', res.data.list )
          }
        })
    },
    getDetail(day){
      this.$set( this.$data, 'currentDay', day-1 )
      for (let i =0; i < this.docList.length; i++)
        this.docList[i].selected = false
      setTimeout( () => { // TODO: 改用组件
      for (let i =0; i < this.docList.length; i++)
        for(let j = 0; j < this.lists[this.currentDay].length; j++){
          if ( (!this.docList[i]) || !this.docList[i].selected ) {
            this.docList[i].selected = (this.docList[i].userId === this.lists[this.currentDay][j].teamConsultCall.userId)
            document.getElementById('doc' + this.docList[i].userId).checked = (this.docList[i].userId === this.lists[this.currentDay][j].teamConsultCall.userId)
          }
        }
      },100)
      this.switchEditorPanel()
    },
    getTeamList(){
      this.currentGroupId && this.$set( this.$data, 'ajaxLoading', true ) &&
      ajax('ddyy.team.list', {groupId: this.currentGroupId, token: this.$store.state.userInfo.token })
        .then( res =>{
          this.$set( this.$data, 'ajaxLoading', false )
          this.$set( this.$data, 'teamList', res.data.list )
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
    submit() { //提交单天排班修改
      let userList =[]
      for(let i=0; i < this.docList.length; i++){
        //if( document.getElementById('doc' + this.docList[i].userId ).checked && this.docList[i].id ) return this.$alert('暂时不允许将临时医生添加到排班!')
        document.getElementById('doc' + this.docList[i].userId ).checked && userList.push(this.docList[i].userId)
      }
      this.$set( this.$data, 'ajaxLoading', true )
      ajax('ddyy.team.config.call.modify.day', {
        token: this.$store.state.userInfo.token ,
        userId: this.$store.state.userInfo.obj.userId,
        teamId : this.currentTeamId || '',
        enableConsultCall: userList && userList.length > 0 ? 1 : 0,
        userList: userList,
        consultWeekNo: this.currentDay + 1,
      })
        .then(res => {
          this.$set( this.$data, 'ajaxLoading', false )
          if (res.data.succ) {
            this.$alert('操作成功!')
            this.getList()
            this.switchEditorPanel()
          } else {
            this.$alert(res.data.msg)
          }
        })
    },
    switchEditorPanel(){ //切换页面
      this.$set(this.$data, 'isEditorOpen', !this.isEditorOpen)
    },
    bindCheckBoxChange(id){
      document.getElementById('doc' + id ).checked = !document.getElementById('doc' + id).checked
      //this.docList[i].selected  = !this.docList[i].selected
    }
  }
}
</script>
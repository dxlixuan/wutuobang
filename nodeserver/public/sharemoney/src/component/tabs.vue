<template>
  <mt-tabbar :selected.sync="selected">
    <mt-tab-item id="消息" v-bind:class="{is_this:currentTab == 1}">
      <div @click="go_go(1)" class="el-icon-message" style="display: block; font-size: .7rem">

      </div>
      <span>消息</span>
    </mt-tab-item>
    <mt-tab-item id="宿舍" v-bind:class="{is_this:currentTab == 2}">
      <div @click="go_go(2)" class="el-icon-menu" style="display: block; font-size: .7rem">

      </div>
      <span>群组</span>
    </mt-tab-item>
    <mt-tab-item id="主页" v-bind:class="{is_this:currentTab == 3}">
      <div @click="go_go(3)" class="el-icon-setting" style="display: block; font-size: .7rem">

      </div>
      <span>个人</span>
    </mt-tab-item>
  </mt-tabbar>
</template>


<!--suppress JSUnresolvedFunction -->
<script>

import { Tabbar, TabItem } from 'mint-ui';
export default {
  name: 'Tabs',
  components: {
  },
  data(){
    return {}
  },
  props: [
    'currentTab'
  ],
  mounted(){

  },
  methods:{
      go_go(val){
          switch (val){
              case 1 :
                  this.$router.push('message');
                  break;
              case 2 :
                  this.$router.push( 'team');
                  break;
              case 3 :
                  this.$router.push( 'my');
                  break;
          }
      }
    }
}
</script>


<style>
  .mint-tab-item .mint-tab-item-label{
    color: #555555;
  }
  .is_this .mint-tab-item-label{
    color: #ff5000;

  }
</style>
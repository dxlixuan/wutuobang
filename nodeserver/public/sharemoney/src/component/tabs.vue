<template>
  <mt-tabbar :selected.sync="selected">
    <mt-tab-item id="消息" v-bind:class="{is_this:currentTab == 1}">
      <div class="el-icon-message" style="display: block; font-size: .7rem">

      </div>
      <span>消息</span>
    </mt-tab-item>
    <mt-tab-item id="宿舍" v-bind:class="{is_this:currentTab == 2}">
      <div class="el-icon-message" style="display: block; font-size: .7rem">

      </div>
      <span>群组</span>
    </mt-tab-item>
    <mt-tab-item id="主页" v-bind:class="{is_this:currentTab == 3}">
      <div class="el-icon-message" style="display: block; font-size: .7rem">

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

  }
}
</script>


<style>
  .mint-tab-item .mint-tab-item-label{
    color: rgb(32, 160, 255);
  }
  .is_this .mint-tab-item-label{
    color: #ff5000;

  }
</style>
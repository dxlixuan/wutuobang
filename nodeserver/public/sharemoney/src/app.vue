<template>
  <div>
    <div class="index_warp">
      <img src="./assets/login_banner.jpg" alt="">
      <div>
        <!--登录-->
        <div class="login_warp" v-if="!is_registe">
          <div class="am-list">
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="number" class="am-input-required" maxlength="11" name="TPL_username" placeholder="手机号" value="">
              </div>
              <div class="am-list-action" @click.capture="clear_input()"><i class="am-icon-clear"></i></div>
            </div>
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="password" class="am-input-required am-input-required-password" name="TPL_password" placeholder="请输入密码" value="" >
              </div>
              <div class="am-list-action am-list-action-password"><i class="am-icon-clear"></i></div>
              <div class="pwd-show iconfont"></div>
            </div>
          </div>
          <div class="other-link">
            <div class="am-field am-footer">
              <span class="f-left" @click="go_registe">免费注册</span>
              <span class="f-right">忘记密码</span>
            </div>
          </div>
          <div class="am-field am-fieldBottom">
            <button type="submit" class="am-button am-button-submit">登 录</button>
          </div>
        </div>
        <!--注册-->
        <div class="login_warp" v-if="is_registe">
          <div class="am-list">
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="number" class="am-input-required" maxlength="11" name="TPL_username" placeholder="手机号" value="">
              </div>
              <div class="am-list-action"><i class="am-icon-clear"></i></div>
            </div>
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="password" class="am-input-required am-input-required-password" name="TPL_password" placeholder="输入密码" value="" >
              </div>
              <div class="am-list-action am-list-action-password"><i class="am-icon-clear"></i></div>
              <div class="pwd-show iconfont"></div>
            </div>
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="password" class="am-input-required am-input-required-password" name="TPL_password" placeholder="确认密码" value="">
              </div>
              <div class="am-list-action am-list-action-password"><i class="am-icon-clear"></i></div>
              <div class="pwd-show iconfont"></div>
            </div>
          </div>
          <div class="am-field am-fieldBottom">
            <button type="submit" class="am-button am-button-submit">登 录</button>
          </div>
        </div>
      </div>
    </div>
    <router-view>

    </router-view>
  </div>
</template>

<script>


export default {
  data () {
    return {
        is_registe : false,

    }
  },
  mounted () {
      var html = document.querySelector("html");
      var width = html.getBoundingClientRect().width;
      html.style.fontSize=width/10+"px";
  },
  methods:{
      go_registe(){
          this.is_registe = true;
      },
      login() {
        
      },
      clear_input (){

      }
  }
}

</script>
<style lang='stylus'>
  @import './css/index.css';
</style>

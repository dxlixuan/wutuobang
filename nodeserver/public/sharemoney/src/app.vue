<template>
  <div>
    <div class="index_warp" v-if="is_login">
      <img src="./assets/login_banner.jpg" alt="">
      <div>
        <!--登录-->
        <div class="login_warp" v-if="!is_registe">
          <div class="am-list">
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="number" v-model="phone" class="am-input-required" maxlength="11" name="TPL_username" placeholder="手机号" value="">
              </div>
              <div class="am-list-action" @click.capture="clear_input()"><i class="am-icon-clear"></i></div>
            </div>
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="password" v-model="password" class="am-input-required am-input-required-password" name="TPL_password" placeholder="请输入密码" value="" >
              </div>
              <div class="am-list-action am-list-action-password"><i class="am-icon-clear"></i></div>
              <div class="pwd-show iconfont"></div>
            </div>
          </div>
          <div class="other-link">
            <div class="am-field am-footer">
              <span class="f-left" @click="go_registe(false)">免费注册</span>
              <span class="f-right">忘记密码</span>
            </div>
          </div>
          <div class="am-field am-fieldBottom">
            <button @click="login" type="submit" class="am-button am-button-submit">登 录</button>
          </div>
        </div>
        <!--注册-->
        <div class="login_warp" v-if="is_registe">
          <div class="am-list">
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="number" v-model="registephone" class="am-input-required" maxlength="11" name="TPL_username" placeholder="手机号" value="">
              </div>
              <div class="am-list-action"><i class="am-icon-clear"></i></div>
            </div>
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="password" v-model="registepassword" class="am-input-required am-input-required-password" name="TPL_password" placeholder="输入密码" value="" >
              </div>
              <div class="am-list-action am-list-action-password"><i class="am-icon-clear"></i></div>
              <div class="pwd-show iconfont"></div>
            </div>
            <div class="am-list-item">
              <div class="am-list-control">
                <input type="password" v-model="isregistepassword" class="am-input-required am-input-required-password" name="TPL_password" placeholder="确认密码" value="">
              </div>
              <div class="am-list-action am-list-action-password"><i class="am-icon-clear"></i></div>
              <div class="pwd-show iconfont"></div>
            </div>
          </div>
          <div class="other-link">
            <div class="am-field am-footer">
              <span class="f-left" @click="go_registe(true)">登录</span>
              <span class="f-right">忘记密码</span>
            </div>
          </div>
          <div class="am-field am-fieldBottom">
            <button type="submit" @click="registe" class="am-button am-button-submit">登 录</button>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="!is_login">

    </router-view>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui';

export default {
  data () {
    return {
        is_registe : false,
        phone : "",
        password : "",
        registephone : "",
        registepassword : "",
        isregistepassword : "",
        is_login :false


    }
  },
  mounted () {
      var html = document.querySelector("html");
      var width = html.getBoundingClientRect().width;
      html.style.fontSize=width/10+"px";
      if(localStorage.wutuobang_user){
          this.is_login = false;
          return
      }
  },
  methods:{
      go_registe(togole_bar){
          if(togole_bar){
              this.is_registe = false;
          }else {
              this.is_registe = true;
          }

      },
      login() {
          var self = this;
          if(self.phone.length != 11){
              Toast({
                  message: "请输入11位正确手机号",
                  position: 'bottom',
                  duration: 3000,
                  className : "redtoast"
              });
              return
          }
          axios.post('/login', {
              userphone: self.phone,
              password: self.password
          })
              .then(function (response) {
                  if(response.status == 200){
                      localStorage.setItem("wutuobang_user",response.phone)
                      Toast({
                          message: '登录成功',
                          position: 'bottom',
                          duration: 3000,
                          className : "chengtoast"
                      });
                      setTimeout(function () {
                          window.location.reload();
                      },2000)
                  }else {
                      Toast({
                          message: response.data,
                          position: 'bottom',
                          duration: 3000,
                          className : "redtoast"
                      });
                  }

              })
              .catch(function (error) {
                  console.log(error);
              });
      },
      registe (){
          var self = this;
          if(self.registephone.length != 11){
              Toast({
                  message: "请输入11位正确手机号",
                  position: 'bottom',
                  duration: 3000,
                  className : "redtoast"
              });
              return
          }
          if(self.registepassword.length < 6 || self.registepassword.length > 12){
              Toast({
                  message: "请输入6-12位标准密码",
                  position: 'bottom',
                  duration: 3000,
                  className : "redtoast"
              });
              return
          }
          if(self.isregistepassword != self.registepassword){
              Toast({
                  message: "输入密码不一致",
                  position: 'bottom',
                  duration: 3000,
                  className : "redtoast"
              });
              return
          }
          axios.post('/register', {
              registephone: self.registephone,
              password: self.registepassword
          })
              .then(function (response) {
                  if(response.status == 200){
                      localStorage.setItem("wutuobang_user",response.phone)
                      Toast({
                          message: '注册成功',
                          position: 'bottom',
                          duration: 3000,
                          className : "chengtoast"
                      });
                      setTimeout(function () {
                          window.location.reload();
                      },2000)
                  }else {
                      Toast({
                          message: response.data,
                          position: 'bottom',
                          duration: 3000,
                          className : "redtoast"
                      });
                  }

              })
              .catch(function (error) {
                  console.log(error);
              });
      }
  }
}

</script>
<style lang='stylus'>
  @import './css/index.css';
  body , html{
    margin: 0;
    padding: 0;
  }
  .chengtoast{
    background: #ff5000!important;
  }
  .redtoast{
    background: #ef4f4f!important;
  }
  .redtoast span{
    color: #ffffff;
  }
</style>

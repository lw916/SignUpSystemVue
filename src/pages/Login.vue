<template>
  <div class="Login">
    <div class="contain">
      <h1>欢迎使用签到系统</h1>
      <van-form style="margin-top:50px">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          style="margin: 20px 20px 45px;width:auto"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          style="margin: 16px 16px 45px;width:auto"
          placeholder="请输入密码"
        />
        <div style="margin: 40px;">
          <van-button round block type="info" native-type="submit" @click="login">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Form, field, button, Toast} from 'vant'
import axios from "axios";
Vue.use(Form).use(button).use(field).use(Toast)
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const that = this
      axios.get('http://localhost:8000/login',{
          params:{
            username:this.username,
            password:this.password
          }
      }).then(function (r){
        if(r.data.status === 1){
          Toast(r.data.msg);
          that.$router.push('/control')
        }else{
          Toast(r.data.msg);
        }
      })
    }
  }
}
</script>

<style scoped>
.Login {
  width: 50%;
  height: 50%;
  position: fixed;
  top: 25%;
  left: 25%;
}
</style>

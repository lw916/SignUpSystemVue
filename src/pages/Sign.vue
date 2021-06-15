<template>
  <div class="Login">
    <div class="contain">
      <h1>欢迎使用签到系统</h1>
      <van-form style="margin-top:50px">
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          style="margin: 20px;margin-bottom:45px;width:auto"
          placeholder="请输入您的名字"
        />
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
        <div style="margin: 40px;">
          <van-button round block type="info" native-type="submit" @click="Sign">
            签到
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Form, field, button, Toast, DropdownMenu, DropdownItem} from 'vant'
import axios from "axios";
Vue.use(Form).use(button).use(field).use(Toast).use(DropdownMenu).use(DropdownItem)
export default {
  name: 'Sign',
  data () {
    return {
      username: '',
      value1: 1,
      option1: [
        { text: '到场', value: 1 },
        { text: '事假', value: 2 },
        { text: '病假', value: 3 },
      ],
    }
  },
  methods: {
    Sign () {
      const that = this
      console.log(this.value1)
      axios.get('http://localhost:8000/sign',{
          params:{
            name:this.username,
            status:this.value1
          }
      }).then(function (r){
        if(r.data.status === 1){
          Toast(r.data.msg);
          that.$router.push('/success')
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
  width: 100%;
  height: 100%;
  position: fixed;
  top: 25%;
  left: 0%;
}
</style>

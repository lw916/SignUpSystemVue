<template>
  <div>
    <van-row>
      <van-col span="8">
        <h1>未签到人：</h1>
        <div style="height:50%;border:1px solid #000000;overflow-y: scroll;">
          <van-cell-group>
            <van-cell v-for="item in UnSignList" :key="item" :title="item" />
          </van-cell-group>
        </div>
        <h1>统计图表（签到与未签到人数饼图）</h1>
        <div id="main" style="width: 400px;height: 400px;margin-top: 40px"></div>
      </van-col>
      <van-col span="8">
        <h1>签到二维码：</h1>
        <van-image :src="PicUrl" class="pic"/>
      </van-col>
      <van-col span="8">
        <h1>控制中心</h1>
        <van-uploader accept=".xls" :after-read="UploadFile">
          <van-button icon="plus" type="info" style="margin:20px 0px">上传文件</van-button>
        </van-uploader>
        <van-button type="info" native-type="submit" size="large" style="margin:20px 0px" @click="start">开始签到</van-button>
        <van-button type="info" native-type="submit" size="large" style="margin:20px 0px" @click="stop">停止签到</van-button>
        <van-button type="info" native-type="submit" size="large" style="margin:20px 0px" @click="download">下载签到记录</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Vue from 'vue';
import {Col, Row, button, Uploader, Toast, Image as VanImage, List, Cell } from 'vant';
import axios from "axios";
Vue.use(Col).use(Row).use(button).use(Uploader).use(VanImage).use(List).use(Cell);
export default {
  name: "Control",
  data () {
    return {
      PicUrl:'https://img01.yzcdn.cn/vant/cat.jpeg',
      Data:[0,0],
      UnSignList:[]
    }
  },
  mounted() {
    this.getData();
    this.setPie();
    this.timer = window.setInterval(() => {
      setTimeout(() => {
        this.getData()
      },0)
    },3000);
  },
  methods: {
    getData() {
      const that = this
      axios.get('http://localhost:8000/status', {}).then(function (r) {
        if (r.data.status === 1) {
          that.Data = [
            r.data.UnSign,
            r.data.SignNum - r.data.UnSign,
          ]
          that.UnSignList = r.data.list
          that.setPie()
        }
      })
    },
    UploadFile(file) {
      let param = new FormData(); // 创建form对象
      param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: {"Content-Type": "multipart/form-data"}
      };
      axios.post("http://localhost:8000/upload", param, config).then(function (r) {
        if (r.data.status === 1) {
          Toast(r.data.msg);
        } else {
          Toast(r.data.msg);
        }
      })
    },
    stop() {
      const that = this
      axios.get('http://localhost:8000/stop').then(function (r) {
        if (r.data.status === 1) {
          that.PicUrl = r.data.url
          Toast(r.data.msg);
        } else {
          Toast(r.data.msg);
        }
      })
    },
    start() {
      const that = this
      axios.get('http://localhost:8000/start').then(function (r) {
        if (r.data.status === 1) {
          that.PicUrl = r.data.url
          Toast(r.data.msg);
        } else {
          Toast(r.data.msg);
        }
      })
    },
    download() {
      let a = document.createElement("a")
      a.href = "http://localhost:8000/download"
      a.click()
    },
    setPie(){

      this.charts = echarts.init(document.getElementById("main"))

      this.charts.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data:["已签到","未签到"]
        },
        series: [
          {
            name:'未签到',
            type:'pie',
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:this.Data
          }
        ]
      })
    }
  },
  destroyed() {
    window.clearInterval(this.timer)
  }
}
</script>

<style scoped>
.pic {
  width: 80%;
  margin: 40% auto;
}
</style>

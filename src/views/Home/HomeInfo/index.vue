<template>
  <div class="homee">
  <el-page-header :content="info.Title" @back="goBack" />
    <h2>{{ info.Title }}</h2>
    <div class="author">发布者：{{info.AdminID}} &nbsp;&nbsp;  发布时间：{{info.CreatedAt}}</div>
    <el-scrollbar class="content">
      <editor v-model="info.Content" previewOnly></editor>
      <div class="img">
      <img style="margin: auto;height: 170px;" :src="'http://114.132.236.147:8001/onlinejudge' + info.PictureUrl" alt="">

      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { getNoticeInfo, getAdmin } from "@/api/NoticeInfo";
import { defineComponent } from 'vue';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import moment from 'moment'

export default defineComponent({
  data() {
    return {
      title: "111",
      // sdata:"# 乔虎虎 \n ## 1234 \n > demo1  \n ```c++ \n #include<iostream> \n ```\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1",
      id: this.$route.query.id,
      Content: '',
      info: {},
    };
  },
  components: {
    Editor
  },
  created(){
    // this.log();
    this.getUnitInfo();
  },
  methods:{
    // log(e){
    //   console.log(e);
    // },
    
    getUnitInfo() {
      console.log(this.id);
      getNoticeInfo(this.id)
        .then((res) => {
          this.info = res.data;
          this.info.CreatedAt = moment(this.info.CreatedAt).format('YYYY-MM-DD HH:MM:SS')
          getAdmin(this.info.AdminID).then(res => {
            this.info.AdminID = res.data.admin_name
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.push({
        path: '/home/index',
      })
    }

    

  }
});
</script>

<style>
.homee{
  background-color: #fff;
  width: 90%;
  height: 100%;
  margin: 40px auto;
}
.homee h2{
  padding-top: 40px;
  text-align: center;
}
.author {
  width: 80%;
  height: 30px;
  line-height: 30px;
  background-color: rgb(240, 240, 240);
  text-align: center;
  margin: 20px auto;
  border-bottom: 1px rgb(189, 187, 187) solid;
}
.content{
  margin: 20px 20px;
  width: 80%;
  height: 100%;
  padding: 20px;
  /* float: left; */
  line-height: 30px;
  /* text-align: center; */
  margin: 0 auto;
}
.img{
  width: 100%;
  height: 100%;
  text-align: center;

}
</style>
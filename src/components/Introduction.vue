<template>
  <div class="Introduction">
    <h3>SUSE JUDGE 网站简介</h3>
    <hr />
    <p v-for="item of introduction" :key="item">
      {{ item }}
    </p>
    <!-- <div>
      <img src="http://114.132.236.147:8001/onlinejudge/file/logo.jpg" alt="" style="height: 120px; margin-right: 10px;">
      <img src="http://114.132.236.147:8001/onlinejudge/file/yinchuan.jpg" alt="" style="height: 120px; margin-right: 10px;">
      <img src="http://114.132.236.147:8001/onlinejudge/file/acm.jpg" alt="" style="height: 120px; margin-right: 10px;">
    </div> -->
    <!-- <div class="content">
      <marquee style="margin-top: 5px; color: rgb(0, 140, 255);" direction="right">我爱算法 算法爱我</marquee> 
      <marquee style="margin-top: 5px; color: pink;" direction="right">算法是哥哥 我是弟弟</marquee> 
      <marquee style="margin-top: 5px; color: purple;" direction="right">算法我爱你</marquee> 
    </div>
    <div class="danmu">
      <button>发送弹幕</button>
    </div> -->
  </div>
</template>

<script>
export default {
  name:"Introduction",
  data() {
    return {
      introduction: ["我们是一个供四川轻化工大学算法竞赛部使用的OJ平台", "执着算法", "热爱算法"],
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
.Introduction {
  background-color: #fff;
  width: 35%;
  height: 300px;
  text-align: center;
  padding: 20px;
  overflow: hidden;
}

.Introduction p {
  text-align: left;
}
.content{
  position: relative;
  margin-bottom: 10px;
}
.danmu{
  position: relative;
  margin-bottom: 10px;
}
</style>
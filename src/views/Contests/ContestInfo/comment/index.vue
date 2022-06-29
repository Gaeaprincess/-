<template>
  <div class="title">
    <h2>搜索练习题解</h2>
    <span>发布者：yuqing</span>
  </div>
  <div class="content1" v-for="item of problem" :key="item">
    <div style="text-align: center;">
      <span>{{item}}</span>
    </div>
      <editor v-model="content"  previewOnly></editor>
  </div>
</template>

<script>
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
export default {
  data(){
    return{
      problem:['A','B','C','D'],
      problem_len:5,
      content:'    #include<iostream>\n    #include<algorithm>\n    #include<cstring>',
    }
  },
  components:{Editor},
}
</script>

<style scoped>
.title{
  height: 70px;
  border-bottom: 1px rgb(238,238,238) solid;
  text-align: center;
  padding-bottom: 20px;
}
.content1{
  margin: 20px;
}
</style>
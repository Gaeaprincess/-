<template>
<div class="divv">
  <el-card class="leader">
    <template #header>
      <div class="card-header">
        <h2 style="font-weight: bolder">WELCOME TO SUSE JUDGE</h2>
      </div>
    </template>
    <p>前台用户界面</p>
  <el-link href="http://114.132.236.147:9101">http://114.132.236.147:9101</el-link>
  <p>后台管理员界面</p>
  <a href="http://114.132.236.147:9100">http://114.132.236.147:9100</a>
    <p>账号：admin</p>
  <p>密码：admin</p>
  <span style="font-size: 13px">因为时间有一点点赶，因此在判题端还存在问题，还在解决，然后前台有些数据有点小问题，还在修改中。</span>
  <p>请注意：在查看公告时可能因为网络延迟，布局会出现小问题，刷新一次就可以了。排行的数据可视化有点小问题，因为来不及改了，后面会改的。</p>
  </el-card>
</div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.divv{
  text-align: center;
}
.leader{
  margin: auto;
  width: 50%;
}
</style>
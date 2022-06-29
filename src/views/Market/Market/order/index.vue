<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    router
  >
    <el-menu-item index="/market/order/all">全部订单</el-menu-item>
    <el-menu-item index="/market/order/wait">待收货</el-menu-item>
    <el-menu-item index="/market/order/got">已取货</el-menu-item>
  </el-menu>
  <div class="display">
    <router-view />
  </div>
</template>

<script>
  
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const activeIndex = ref('1')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      handleSelect,
    }
  },
})
</script>

<style scoped>
.el-menu-demo{
  margin-left: 100px;
  width: 400px;
}
</style>

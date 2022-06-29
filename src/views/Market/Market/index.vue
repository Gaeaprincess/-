<template>
  <div class="overall">
    <div style="margin-left: 5%; margin-top: 30px;">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="/market/home">
          <el-icon><icon-menu /></el-icon>
          <template #title>商城首页</template>
        </el-menu-item>
        <el-menu-item index="/market/order">
          <el-icon><shopping-bag /></el-icon>
          <template #title>我的订单</template>
        </el-menu-item>
        <el-menu-item index="/market/paylist">
          <el-icon><ticket /></el-icon>
          <template #title>我的积分</template>
        </el-menu-item>
        <el-menu-item index="/market/bill">
          <el-icon><List /></el-icon>
          <template #title>我的账单</template>
        </el-menu-item>
      </el-menu>
    </div>
    <el-radio-group v-model="isCollapse" style="margin-top: 30px">
      <el-radio-button :label="false" v-if="isCollapse"><el-icon><expand /></el-icon></el-radio-button>
      <el-radio-button :label="true" v-if="!isCollapse"><el-icon><fold /></el-icon></el-radio-button>
    </el-radio-group>
    <div class="displayss" style="display: block;">
      <router-view />
    </div>
  </div>
  
</template>

<script>
import { defineComponent, ref} from 'vue'
import {
  ShoppingBag,
  Menu as IconMenu,
  Expand,
  Fold,
  Ticket,
  List
} from '@element-plus/icons'

export default defineComponent({
  components: {
    ShoppingBag,
    Ticket,
    IconMenu,
    Expand,
    Fold,
    List
  },
  setup() {
    const isCollapse = ref(false)
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      isCollapse,
      handleOpen,
      handleClose,
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
})
</script>

<style scoped>
  .overall {
  margin: 40px;
  background-color: rgb(238, 238, 238);
  display: flex;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 200px;
}
.displayss{
  margin-top: 30px;
  margin-left: 30px;
  display: block;
}
</style>

<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group> -->
  <div class="overall">
    <div style="margin-left: 5%; margin-top: 50px;">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="/market">
          <el-icon><icon-menu /></el-icon>
          <template #title>商城首页</template>
        </el-menu-item>
        <el-menu-item index="/rank">
          <el-icon><shopping-bag /></el-icon>
          <template #title>我的订单</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><ticket /></el-icon>
          <template #title>我的账单</template>
        </el-menu-item>
      </el-menu>
    </div>
    <el-radio-group v-model="isCollapse" style="margin-top: 50px">
      <el-radio-button :label="false" v-if="isCollapse"><el-icon><expand /></el-icon></el-radio-button>
      <el-radio-button :label="true" v-if="!isCollapse"><el-icon><fold /></el-icon></el-radio-button>
    </el-radio-group>
    <div class="display">
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
} from '@element-plus/icons'

export default defineComponent({
  components: {
    ShoppingBag,
    Ticket,
    IconMenu,
    Expand,
    Fold
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

<style>
  .overall {
  margin: 40px;
  background-color: rgb(238, 238, 238);
  display: flex;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 200px;
}
.display{
  float: left;
  margin: 30px;
}
</style>

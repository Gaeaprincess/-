<template>
  <div class="filter">
    <el-menu :default-active="idx" class="option">
      <el-menu-item index="0" @click="log('0')">All</el-menu-item>
      <el-menu-item index="1" @click="log('1')">Mine</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data(){
    return{
      idx: '0',
    }
  },
  // created(){
  //   this.$emit('idx',this.idx);
  // },
  methods: {
    log(index){
      this.idx = index;
      this.$emit('item-click',this.idx);
      // console.log(this.idx);
    }
  }
}
</script>

<style>
.filter{
  width: 200px;
  height: 100%;
}
.option{
  border-radius: 10px;
}
</style>
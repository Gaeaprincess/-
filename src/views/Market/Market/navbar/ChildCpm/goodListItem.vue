<template>
  <el-card 
    class="card"
  >
    <img
      style="width: 230px; height: 170px;"
      :src="'http://114.132.236.147:8001/onlinejudge' + item.goods_photo_url"
      alt="地址错误"
      @click="itemClick"
    >
    <p class="integral">￥<span style="font-size: 20px;">{{ item.goods_value}}</span> 积分</p>
    <!-- <p style="font-size: 15px;"> {{ item.goods_description}}</p> -->
    <!-- <el-tag type="warning"><span class="count"> <el-icon :size="25"><shopping-cart /></el-icon>{{10}}</span></el-tag> -->
    <!-- <p
      style="width: 100%; text-align: center; position: inherit; bottom: 10px;"
      type="text"
      @click="itemClick"
    >{{ item.goods_description}}</p> -->
    <el-link :underline="false" @click="itemClick">{{ item.goods_description}}</el-link>
  </el-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    // console.log(this.item);
  },
  methods: {
    itemClick() {
      console.log('111')
      this.$emit('itemClick', this.item)
    }
  }
}
</script>

<style scoped>
.card{
    width: 270px;
    height: 350px;
    margin: 20px;
    float: left;
    padding: 0px;
  }
  .count{
    font-size: 15px;
    margin-left: 10px;
  }
  .integral{
    color: red;
  }
</style>
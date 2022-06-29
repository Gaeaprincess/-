<template>
  <div class="Carousel">
    

    <el-carousel :interval="5000" type="card"  height="340px">
      <el-carousel-item v-for="item in dataList" :key="item">
        <img :src="'http://114.132.236.147:8001/onlinejudge' + item.url" class="image">
      </el-carousel-item>
    </el-carousel> 


  </div>
</template>

<script>
// import { app } from "../main";
import { getCarousel } from "../api/Carousel";
export default {
  data() {
    return {
      dataList: [],
      currentIndex: 0, //默认显示图片
      froms:[],
    };
  },
  created(){
    this.getCrc();
  },

  methods: {
    getCrc(){
      getCarousel().then(res =>{
        this.dataList = res.data
        console.log(this.dataList);
      }).catch(err =>{
        console.log(err);
      })
    }

  },
};
</script>

<style scoped>

.Carousel {
  width: 50%;
  height: 340px;
  margin: 0 auto;
   /* position: absolute; */
      z-index: -1;
  /* position: relative; */
}
/* .Carousel img {
  width: 100%;
  height: 100%;
  /* display: block; 
} */
.image {
      width: 100%;
      height: 100%;
     
  }
</style>
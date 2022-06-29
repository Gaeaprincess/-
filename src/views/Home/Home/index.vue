<template>
  <div class="home">
    <div class="top">
      <Introduction></Introduction>
      <Carousel></Carousel>
    </div>
    <div class="bottom">
      <Notice></Notice>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Introduction from "@/components/Introduction.vue";
import Carousel from "@/components/Carousel.vue";
import Notice from "@/components/Notice.vue";
export default {
  name: 'Home',
  components: {
    Introduction,
    Carousel,
    Notice,
  },
};
</script>
<style scoped>
.home {
  width: 90%;
  margin: 40px auto;
  
}
.top{
  display: flex;
}
</style>
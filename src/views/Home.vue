<template>
  <div class="home">
    <div class="Introduction">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { app } from "../main";
export default {
  name: "Home",
  components: {},
  data(){
    return{
      data:{}
    }
  },
  methods:{
    handle_query(){
      app.axios.get("api/cats/lv2/statistics").then((res) => {
          console.log(res.data)
          this.data =res.data
      })
    }
  }
};
</script>
<style scoped>
.Introduction{
  background-color: #fff;
  width: 350px;
  height: 250px;
  text-align: center;
}
</style>
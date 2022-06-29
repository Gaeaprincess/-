<template>
  <div class="good">
      <notReceive
        v-for="item in list"
        :key="item"
        :orderlist="item"
      />
  </div>
</template>

<script>
  import notReceive from './notReceive.vue'
  export default {
    components: {
      notReceive
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
    return {
    }
  }
  }
</script>

<style>
  .good{
    float: left;
    margin: 30px;
  }
  .card{
    width: 800px;
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
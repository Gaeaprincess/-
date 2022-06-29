<template>
  <div class="good">
    <!-- <div
      v-for="i in list"
      :key="i"
    > -->
      <!-- <h2>{{ i.title }}</h2> -->
      <good-list-item
        v-for="item in list"
        @itemClick="itemClick"
        :key="item"
        :item="item"
      />
    <!-- </div> -->
    <pay
      ref="payMoney"
      :show="showItem"
    />
  </div>
</template>

<script>
  import goodListItem from './goodListItem.vue'
  // import { ShoppingCart } from '@element-plus/icons'
  import Pay from './pay.vue'
  export default {
    components: {
      // ShoppingCart
      Pay,
      goodListItem
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        showItem: null
      }
    },
    methods: {
      // exchange() {
      //   this.$refs.payMoney.dialogFormVisible = true
      // },
      itemClick(item) {
        this.$refs.payMoney.dialogFormVisible = true
        this.showItem = item
      }
    }
  }
</script>

<style>
  .good{
    width: 100%;
    float: left;
    margin-top: 30px;
  }
  
</style>
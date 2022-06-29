<template>
  <div class="main">
    <order-list :list="showList" @search="search" />
    <pages :total-pages="totalPages" @pageChange="pageChange" />
  </div>
</template>

<script>
  import OrderList from './ChildCpm/orderlist.vue'
  import Pages from './ChildCpm/pages'
  import { getOrderList, getGoodsList } from '@/api/goods'
  export default {
    components: {
      OrderList,
      Pages
    },
    data() {
      return {
        activePage: 1, // 当前页码
        totalPages: 0, // 总页数
        everyPageShowItemNumber: 2,
        searchList: [],
        allOrderList: [],
        activeNumber: 0
      }
    },
    computed: {
      showList() { // 展示的数据（最多只有20条）
        return this.searchList.slice(
          (this.activePage - 1) * this.everyPageShowItemNumber, // 开始位置
          (this.activePage - 1) * this.everyPageShowItemNumber + this.everyPageShowItemNumber // 结束位置
        )
      }
    },
    created() {
      this.getOrderLists()
    },
    methods: {
      search(val) {
        this.searchList.length = 0;
        for (let i = 0; i < this.allOrderList.length; i++) {

          if (this.allOrderList[i].GoodsID.toString().includes(val) || val === '') {
            this.searchList.push(this.allOrderList[i])
          }
        }
        // 过滤完以后更新 下面的 条数
        this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
      },

      // 更新页码
      pageChange(page) {
        this.activePage = page
      },
      getOrderLists() {
        getOrderList(this.activeNumber).then(res => {
            this.totalPages = (res.length / this.everyPageShowItemNumber) * 10
            this.allOrderList = res.data
            getGoodsList('鼠标').then(res => {
              for (let i = 0; i < this.allOrderList.length; i++) {
                for (let j = 0; j < res.length; j++) {
                  if (this.allOrderList[i].GoodsID === res[j].id) {
                    this.allOrderList[i].GoodsID = res[j].good_name
                    this.allOrderList[i].photo = res[j].goods_photo_url
                    this.allOrderList[i].DeletedAt = res[j].goods_value
                  }
                }
              }
            })
            getGoodsList('键盘').then(res => {
              for (let i = 0; i < this.allOrderList.length; i++) {
                for (let j = 0; j < res.length; j++) {
                  if (this.allOrderList[i].GoodsID === res[j].id) {
                    this.allOrderList[i].GoodsID = res[j].goods_name
                    this.allOrderList[i].photo = res[j].goods_photo_url
                    this.allOrderList[i].DeletedAt = res[j].goods_value

                  }
                }
              }
            })
            this.search('')
        })
      }
    }
  }
</script>

<style>
.main{
  display: block;
}
</style>
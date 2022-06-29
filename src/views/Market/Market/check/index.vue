<template>
  <div>
    <el-card class="box-card">
      <list :list="showList" @search="search" @getTime="getTime" :money="money"></list>
    <pages :total-pages="totalPages" @pageChange="pageChange" />
    </el-card>
  </div>
</template>

<script>
  import { getOrderList, getGoodsList } from '@/api/goods'
  import List from './ChildCpm/list'
  import Pages from './ChildCpm/pages'
  import moment from 'moment'

  export default {
    components: {
      List,
      Pages
    },
    data() {
      return {
        activePage: 1, // 当前页码
        totalPages: 0, // 总页数
        everyPageShowItemNumber: 6,
        searchList: [],
        allOrderList: [],
        activeNumber: 1,
        activeNumber1: 0,
        money: 0
      }
    },
    computed: {
      remain() {
        return 1
      },
      showList() { // 展示的数据（最多只有20条）
        return this.searchList.slice(
          (this.activePage - 1) * this.everyPageShowItemNumber, // 开始位置
          (this.activePage - 1) * this.everyPageShowItemNumber + this.everyPageShowItemNumber // 结束位置
        )
      }
    },
    created() {
      this.getOrderLists()
      this.getlist()
    },
    methods: {
      search(val) {
        this.searchList.length = 0;
        for (let i = 0; i < this.allOrderList.length; i++) {
          // if(typeof this.allOrderList[i].GoodsID === 'number'){
          //   this.allOrderList[i].GoodsID.toString()
          // }
          if (this.allOrderList[i].GoodsID.toString().includes(val) || val === '') {
            this.searchList.push(this.allOrderList[i])
          }
        }
        // 过滤完以后更新 下面的 条数
        this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
      },
      getTime(val) {
        this.searchList.length = 0;
if (val !== '') {
            val = moment(val).format('YYYY-MM')
            } else {
              val = ''
              console.log(val);
            }
        for (let i = 0; i < this.allOrderList.length; i++) {
          // if(typeof this.allOrderList[i].GoodsID === 'number'){
          //   this.allOrderList[i].GoodsID.toString()
          // }
            // console.log(typeof this.allOrderList[i].CreateAt);
            
            // console.log(this.allOrderList[i].CreatedAt);
            // console.log(this.allOrderList[i].CreatedAt.includes(val) );
          if (this.allOrderList[i].UpdatedAt.includes(val) || val === '') {
            this.searchList.push(this.allOrderList[i])
            // console.log(this.allOrderList[i]);
          }
        }
        // console.log(this.searchList.length);
        // 过滤完以后更新 下面的 条数
        this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
      },
      // 更新页码
      pageChange(page) {
        this.activePage = page
      },
      getOrderLists() {
        getOrderList(this.activeNumber1).then(res => {
            this.totalPages = (res.length / this.everyPageShowItemNumber) * 10
            this.allOrderList = res.data
            console.log(this.allOrderList)
            for (let i = 0; i < this.allOrderList.length; i++) {
              this.allOrderList[i].Status = '未取货'
              this.money += this.allOrderList[i].Value
              this.allOrderList[i].UpdatedAt = moment(this.allOrderList[i].UpdatedAt).format('YYYY-MM-DD HH:MM:SS')
            }
            getGoodsList('鼠标').then(res => {
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
        // getOrderList(this.activeNumber).then(res => {
        //   console.log(res.data);
        //     this.totalPages = (res.length / this.everyPageShowItemNumber) * 10

        //     for(let i = 0 ; i<res.data.length; i++){
        //       res.data[i].Status = '已收货'
        //       res.data[i].CreatedAt = moment( res.data[i].CreateAt).format('YYYY-MM-DD HH:MM:SS')
        //       this.money += res.data[i].Value

        //       this.allOrderList.push(res.data[i])
              
        //     }
        //     console.log(this.allOrderList);
        //     getGoodsList('鼠标').then(res => {
        //       console.log(res[1].id);
        //       for (let i = 0; i < this.allOrderList.length; i++) {
        //         for (let j = 0; j < res.length; j++) {
        //           if (this.allOrderList[i].GoodsID === res[j].id) {
        //             this.allOrderList[i].GoodsID = res[j].goods_name
        //             this.allOrderList[i].photo = res[j].goods_photo_url
        //             this.allOrderList[i].DeletedAt = res[j].goods_value
        //           }
        //         }
        //       }
        //     })
        //     getGoodsList('键盘').then(res => {
        //       console.log(res);
        //       console.log(res[0].id);
        //       for (let i = 0; i < this.allOrderList.length; i++) {
        //         for (let j = 0; j < res.length; j++) {
        //           if (this.allOrderList[i].GoodsID === res[j].id) {
        //             this.allOrderList[i].GoodsID = res[j].goods_name
        //             this.allOrderList[i].photo = res[j].goods_photo_url
        //             this.allOrderList[i].DeletedAt = res[j].goods_value

        //           }
        //         }
        //       }
        //     })
        //     this.search('')
        // })
      },
      getlist() {
        getOrderList(this.activeNumber).then(res => {
            this.totalPages = (res.length / this.everyPageShowItemNumber) * 10

            for(let i = 0 ; i<res.data.length; i++){
              res.data[i].Status = '已收货'
              res.data[i].UpdatedAt = moment(res.data[i].UpdatedAt).format('YYYY-MM-DD HH:MM:SS')
              res.data[i].GetTime = moment( res.data[i].GetTime).format('YYYY-MM-DD HH:MM:SS')
              this.money += res.data[i].Value

              this.allOrderList.push(res.data[i])
              
            }
            getGoodsList('鼠标').then(res => {
              console.log(res[1].id);
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

<style scoped>

/* .text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
*/
.box-card {
  width: 800px;
  height: 500px;
  margin-left: 50px;
  margin-right: 100px;
}

</style>
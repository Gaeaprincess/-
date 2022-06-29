<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>排名</span>
      </div>
    </template>
    <bar-list 
    :name="userData"
    :rank="rankData"
    :ac="acData"/>
  </el-card>
  <el-card class="box-card">
    <table-list
      :list="showList"
    />
  </el-card>
  <pages
    :total-pages="totalPages"
    @pageChange="pageChange"
  />
</template>

<script>
  import BarList from './ChildCpm/BarList'
  import TableList from './ChildCpm/TableList'
  import Pages from './ChildCpm/Pages'
  import { getRank } from '@/api/Rank'
  export default {
    components: {
      BarList,
      TableList,
      Pages
    },
    // var chartDom = document.getElementById('main')
    // var myChart = echarts.init(chartDom)
    data() {
      return {
        userData: [],
        allNoticeList: [],
        rankData: [],
        acData: [],
        totalPages: 0,
        activePage: 1,
        everyPageShowItemNumber: 4, // 每页 8 条数据
      }
    },
    computed: {
      showList() {
        return this.allNoticeList.slice(
          (this.activePage - 1) * this.everyPageShowItemNumber, // 开始位置
          (this.activePage - 1) * this.everyPageShowItemNumber + this.everyPageShowItemNumber // 结束位置
        )
      },
      
    },
    created() {
      this.getRankList()
    },
    methods: {
      sortTable() {
        console.log(11);
        for (var i = 0; i < this.allNoticeList.length - 1; i++) {
        // 内层循环,控制比较的次数，并且判断两个数的大小
        for (var j = 0; j < this.allNoticeList.length - 1 - i; j++) {
            // 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
            if(this.allNoticeList[j].AcNumber === this.allNoticeList[j+1].AcNumber) {
              if(this.allNoticeList[j].Integral < this.allNoticeList[j+1].Integral) {
                var temp = this.allNoticeList[j];
                this.allNoticeList[j] = this.allNoticeList[j + 1];
                this.allNoticeList[j + 1] = temp;
              }
            } else {
              if(this.allNoticeList[j].AcNumber < this.allNoticeList[j+1].AcNumber) {
                var temp1 = this.allNoticeList[j];
                this.allNoticeList[j] = this.allNoticeList[j + 1];
                this.allNoticeList[j + 1] = temp1;
              }
            }
          }
        }
        console.log(this.allNoticeList);
      },
      getRankList() {
        getRank().then(res => {
          this.allNoticeList = res.data
          console.log(this.allNoticeList)
          this.sortTable()
          console.log(this.allNoticeList)
          for(let i of this.allNoticeList) {
            this.userData.push(i.UserName)
            this.acData.push(i.AcNumber)
            this.rankData.push(i.Integral)
          }
          console.log(this.userData);
          this.totalPages = Math.ceil(this.allNoticeList.length / this.everyPageShowItemNumber) * 10
        })
        
      },
       
      pageChange(page) {
        this.activePage = page
      },
    },
  }
</script>

<style lang="scss" scoped>
  .box-card {
    margin: auto;
    margin-top: 50px;
    width: 80%;
    height: 20%;
    position: relative;
  }
</style>
<template>
  <div>
    <div>
      <el-card class="show">
        <echarts :tableData="xuser" :x="timeData" :y="problemLength" :id="id"/>
      </el-card>
    </div>
    <div>
      <el-card class="box-card">
        <table-list :list="problemList" :tableData="rankData" />
      </el-card>
    </div>
  </div>
</template>

<script>
  import Echarts from './ChildCpm/echarts'
  import TableList from './ChildCpm/tableList'
  import { getUserInfo, getUserName } from '@/api/user'
  import { getProblem, getRank } from '@/api/problem'
  import { getContestsList } from '@/api/Contests'
  import moment from 'moment'
  export default {
    components: {
      Echarts,
      TableList
    },
    data() {
      return {
        id: this.$route.query.id,
        info: {},
        problemList: [],
        rankData: [],
        userData: {},
        tableDatas: [],
        xuser: [],
        start_time: new Date(),
        end_time: null,
        nowTime: null,
        timeData: [],
        problemLength: []
      };
    },
    created() {
      console.log(this.$route.query.id)
      this.getContestsLists()
      this.getProblemLists()
      this.getRankList()

    },
    methods: {
      getContestsLists() {

      },
      getProblemLists() {
        getProblem(parseInt(this.id)).then(res => {
          this.problemList = res.data
          for (let i = 0; i <= this.problemList.length; i++) {
            this.problemLength[i] = i
          }
        })

      },
      getRankList() {
        getContestsList().then(res => {
          this.tableDatas = res.data
          for (let i = 0; i < this.tableDatas.length; i++) {
            if (this.tableDatas[i].id === parseInt(this.id)) {
              this.start_time = new Date(this.tableDatas[i].start_time)
              this.end_time = new Date(this.tableDatas[i].end_time)
              this.start_time = this.start_time.getTime()
              this.end_time = this.end_time.getTime()
            }

          }
          this.nowTime = new Date(this.end_time - this.start_time).getTime()
          this.timeData[0] = moment((this.end_time - this.start_time) / 7 + this.start_time).format('MM-DD HH:MM')
          for (let i = 1; i < 7; i++) {
            this.timeData[i] = moment((this.end_time - this.start_time) / 7 * (i + 1) + this.start_time).format('MM-DD HH:MM')
          }
          //获取rank
          getRank(this.id).then(res => {

            this.rankData = res.data
            console.log(this.rankData);
            for (let i = 0; i < this.rankData.length; i++) {
              getUserName(this.rankData[i].ContestRecord.user_id).then(res => {
              console.log(res.data.user_name);
                this.rankData[i].ContestRecord.username = res.data.user_name
                this.xuser[i] = this.rankData[i].ContestRecord.username
              })
              console.log(this.rankData[i].ContestRecord.username);
            }


            for (let i = 0; i < this.rankData.length; i++) {

              
              var hours = parseInt(this.rankData[i].ContestRecord.total_time / (1000 * 60 * 60));
              var minutes = parseInt((this.rankData[i].ContestRecord.total_time % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = (this.rankData[i].ContestRecord.total_time % (1000 * 60)) / 1000;
              this.rankData[i].ContestRecord.total_time = hours + ':' + minutes + ':' + parseInt(seconds)

              if (this.rankData[i].ContestRecord.SubmissionNumber > 0) {
                for (let j = 0; j < this.rankData[i].submission_info.length; j++){
                  // console.log(this.rankData[i].submission_info[j].AcTime);
                  // this.rankData[i].submission_info[j].AcTime = (this.rankData[i].submission_info[j].AcTime - this.start_time)
                  // console.log(this.start_time);
                var hourss = parseInt((this.rankData[i].submission_info[j].AcTime / (60 * 60)));
                var minutess = parseInt((this.rankData[i].submission_info[j].AcTime % ( 60 * 60)) / ( 60));
                var secondss = (this.rankData[i].submission_info[j].AcTime % 60);
                this.rankData[i].submission_info[j].AcTime = hourss + ':' + minutess + ':' + parseInt(secondss)
                }
                 
                // }
              }
          }
          console.log(this.xuser);
    })
  }).catch (err => {
    console.log(err);
  })


  //获取全部用户
  getUserInfo().then(res => {
    this.userData = res.data.user
  })
      
    }
  },
};
</script>

<style>
  .box-card {
    margin-left: 30px;
    margin-bottom: 30px;
    background-color: #fff;
    width: 90%;
    height: 100%;
    border-radius: 10px;
  }

  .show {
    margin-left: 30px;
    margin-bottom: 30px;
    background-color: #fff;
    width: 90%;
    height: 100%;
    border-radius: 10px;
  }
</style>
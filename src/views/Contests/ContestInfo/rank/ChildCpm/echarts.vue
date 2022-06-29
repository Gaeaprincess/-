<template>
  <div id="main" style="height: 350px; width: 100%; margin-top: 20px"></div>
</template>

<script>
import * as echarts from "echarts";
import { getProblem, getRank } from '@/api/problem'
  import { getContestsList } from '@/api/Contests'
  import moment from 'moment'
  import { getUserInfo, getUserName } from '@/api/user'

export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    x: {
      type: Array,
      default() {
        return [];
      },
    },
    y: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: Number,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      problemLength: [],
      tableDatas: [],
        start_time: new Date(),
        end_time: null,
        nowTime: null,
        timeData: [],
        xuser: [], 
        rankData: [],
        userData: [],
       
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
        getProblem(parseInt(this.id)).then(res => {
          for (let i = 0; i <= res.data.length; i++) {
            this.problemLength[i] = i
          }
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
          getRank(this.id).then(res => {

            this.rankData = res.data
            console.log(this.rankData);
             var user = {
          name: '',
            type: "line",
            stack: "Total",
            data: [],
        }
            for (let i = 0; i < this.rankData.length; i++) {
              
              getUserName(this.rankData[i].ContestRecord.user_id).then(res => {
              console.log(res.data.user_name);
                this.rankData[i].ContestRecord.username = res.data.user_name
                this.xuser[i] = this.rankData[i].ContestRecord.username
                user.name = res.data.user_name
                for(let j = 0; j <= this.rankData[i].ContestRecord.accepted_number; j++) {
                user.data.push(j)
                console.log(user.data);
              }
              this.userData.push(user)
              user = {name: '',
            type: "line",
            stack: "Total",
            data: [],}
              
              })
              console.log(this.rankData[i].ContestRecord.username);
              
            }
            console.log(this.userData);
            setTimeout(() => {
                 myChart.setOption({
        title: {
          text: "竞赛排名",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: 100,
        },
        grid: {
          left: "3%",
          right: "20%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.timeData,
        },
        yAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          data: this.problemLength,
        },
        series: this.userData
      });
              }, 100)
      //      myChart.setOption({
      //   title: {
      //     text: "竞赛排名",
      //     left: "center",
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   legend: {
      //     orient: "vertical",
      //     left: "right",
      //     top: 100,
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "20%",
      //     bottom: "3%",
      //     containLabel: true,
      //   },
      //   toolbox: {
      //     feature: {
      //       saveAsImage: {},
      //     },
      //   },
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: true,
      //     data: this.timeData,
      //   },
      //   yAxis: {
      //     type: "category",
      //     axisTick: {
      //       alignWithLabel: true,
      //     },
      //     data: this.problemLength,
      //   },
      //   series: this.userData
      // });
      //   })
          })
          })
        })
     
      window.onresize = () => {
        myChart.resize();
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
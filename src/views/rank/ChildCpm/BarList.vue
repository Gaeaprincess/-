<template>
  <div id="main" style="height: 450px; width: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import { getRank } from "@/api/Rank";
export default {
  props: {
    name: {
      type: Array,
      default() {
        return [];
      },
    },
    rank: {
      type: Array,
      default() {
        return [];
      },
    },
    ac: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      rankData: [],
      acData: [],
      userData: [],
      allNoticeList: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    name: function (val) {
      if (val.length > 0) {
        console.log(val);
        this.drawLine();
      }
    },
    rank: function (val) {
      if (val.length > 0) {
        console.log(val);
        this.drawLine();
      }
    },
    ac: function (val) {
      if (val.length > 0) {
        console.log(val);
        this.drawLine();
      }
    },
  },
  methods: {
    drawLine() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var name1 = [];
      var rank1 = [];
      var ac1 = new Array();
      console.log(ac1[0]);
      getRank().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          name1.push(res.data[i].UserName);
          ac1.push(res.data[i].AcNumber);
          console.log(typeof res.data[i].AcNumber);
          rank1.push(res.data[i].Integral);
        }
        console.log(ac1.length);
        myChart.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["AC", "总积分"],
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              // prettier-ignore
              data: name1,
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "AC",
              type: "bar",
              data: ac1,
              markPoint: {
                data: [
                  { type: "max", name: "Max" },
                  { type: "min", name: "Min" },
                ],
              },
              markLine: {
                data: [{ type: "average", name: "Avg" }],
              },
            },
            {
              name: "总积分",
              type: "bar",
              data: rank1,
              markPoint: {
                data: [
                  { type: "max", name: "Max" },
                  { type: "min", name: "Min" },
                ],
              },
              markLine: {
                data: [{ type: "average", name: "Avg" }],
              },
            },
          ],
        });
      });

      console.log(ac1);

      window.onresize = () => {
        myChart.resize();
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
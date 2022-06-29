<template>
  <!-- <div class="display"> -->
  <el-card class="show">
  <div class="topbar">
    <span>Begin : {{ info.StartTime }}</span>
    <span class="title">{{ info.Title }}</span>
    <span>End : {{ info.EndTime }}</span>
  </div>
  <div class="progress">
    <el-progress :percentage="percentage1" :format="format" :stroke-width="20" :text-inside="true" ></el-progress>
  </div>
  <div class="table">
    <el-table :data="tableData" stripe >
      <el-table-column label="Comp" width="130">
        <template #default="scope">
          <el-link href="#">{{scope.row.accepted_number}}</el-link>/
          <el-link href="#">{{scope.row.submission_number}}</el-link>
        </template>
      </el-table-column>
      <el-table-column type="index" :index="indexMethod" label="#"  width="100"></el-table-column>
      <el-table-column prop="title" label="Title">
        <template #default="{row}">
          <el-link type="primary" @click="itemClick(row.ID, id)">{{ row.title }}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </el-card>
  <!-- </div> -->
</template>

<script>
import { defineComponent } from "vue";
import { getContests_Info } from "@/api/Contests_Info";
import moment from 'moment'
import { getProblem } from "@/api/problem";
export default defineComponent({
  setup() {
    const format = (percentage) =>
      percentage === 100 ? "Full" : `${percentage}%`;
    return {
      format,
    };
  },
  data() {
    return {
      id: this.$route.query.id,
      password: this.$route.query.password,
      info: {},
      start: new Date(),
      end: new Date(),
      tableData: null
    };
  },
  created() {
    this.getContests_Info(this.id, this.password);
    this.getProblemList(this.id);
  },
  methods: {
    getContests_Info(id, passsword) {
      getContests_Info(id, passsword)
        .then((res) => {
          this.info = res.data;
          this.start = new Date(this.info.StartTime);
          this.end = new Date(this.info.EndTime);
          var date = new Date(this.info.StartTime).toJSON()
          this.info.StartTime = new Date(+new Date(date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          var sdate = new Date(this.info.EndTime).toJSON()
          this.info.EndTime = new Date(+new Date(sdate)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProblemList(data) {
      getProblem(data)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    indexMethod(index){
      return String.fromCharCode(index+65);
    },
    
    itemClick(problem_id,id){
      console.log(id);
      this.$router.push({
        path: '/contests/info/problemInfo',
        query: {
          id,
          problem_id
        }
      })
    },
  },
  computed: {
    percentage1() {
      let res;
      let d = new Date();

      let alltime = this.end.getTime() - this.start.getTime();
      let nowtime = d.getTime() - this.start.getTime();
      // let nowtime = 1635000000000 - this.start.getTime();

      if(nowtime >= alltime) res = 100;
      else res = parseInt((nowtime/alltime*100).toFixed(0));
      return res;
    }
  }
});
</script>

<style>
.topbar {
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: 20px 30px;
}
.topbar .title {
  font-size: 25px;
}
.progress{
  padding: 0 40px;
}
.table{
  margin: 30px auto;
}
.el-table tr .cell {
  text-align: center;
}
</style>
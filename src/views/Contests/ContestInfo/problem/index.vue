<template>
  <el-card class="show">
    <div class="table">
      <el-table :data="tableData" stripe >
        <el-table-column label="Status" width="150">
          <template #default="scope">
            <div >
              <el-button v-show="scope.row.status === 1" :type="(scope.row.status === 1) ? 'success' : 'warning'">
                <span v-if="(scope.row.status === 1)" style="font-weight:bold;" > Accept</span>
                <!-- <span v-else style="font-weight:bold;" > Attempted</span> -->
              </el-button>
            </div>
           
          </template>
        </el-table-column>
        <el-table-column label="Comp" width="130">
          <template #default="scope">
            <el-link href="#">{{scope.row.accepted_number}}</el-link>/
            <el-link href="#">{{scope.row.submission_number}}</el-link>
          </template></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="#"  width="100"></el-table-column>
        <el-table-column prop="title" label="Title">
          <template #default="scope">
            <el-link type="primary"  @click="itemClick(scope.row.ID,id)">{{ scope.row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="" label="" width="130">
          <template #default="scope">
            <el-tag type="success">{{scope.row.title}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
 
</template>

<script>
// import { getProblemInfo } from "@api/ProblemInfo"
import { getProblem, getStatus } from "@/api/problem";
export default {
  data(){
    return {
      id: this.$route.query.id,
      tableData: [],
      state: false
    }
  },
  created(){
    // this.getProblemInfo(this.id);
    this.getProblemList(this.id);
  },
  methods: {
    getProblemList(data) {
      getProblem(data)
        .then((res) => {
          this.tableData = res.data;
          for (let i=0;i<this.tableData.length;i++) {
            getStatus(this.tableData[i].ID).then(res => {
              this.tableData[i].status = res.data
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    indexMethod(index){
      return String.fromCharCode(index+65);
    },

    itemClick(problem_id,id) {
      this.$router.push({
        path: '/contests/info/problemInfo',
        query: {
          id,
          problem_id
        }
      })
    }
  }
}
</script>

<style>
  .show {
  margin-left: 30px;
  background-color: #fff;
  width: 80%;
  height: 100%;
  border-radius: 10px;
  
}
.table{
  margin: 30px auto;
}
.el-table tr .cell {
  text-align: center;
}
</style>

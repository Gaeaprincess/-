<template>
  <el-card class="status">
    <div class="top2">
        <el-dropdown class="dropdown">
          <el-button type="primary" class="el_dropdown_link">
            {{dropdown_text}}<el-icon><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="result_change(0)">All</el-dropdown-item>
              <el-dropdown-item @click="result_change(1)">Accepted</el-dropdown-item>
              <el-dropdown-item @click="result_change(2)">Time Limit Exceeded</el-dropdown-item>
              <el-dropdown-item @click="result_change(3)">Memory Limit Exceeded</el-dropdown-item>
              <el-dropdown-item @click="result_change(4)">Runtime Error</el-dropdown-item>
              <el-dropdown-item @click="result_change(5)">System Error</el-dropdown-item>
              <el-dropdown-item @click="result_change(6)">Compile Error</el-dropdown-item>
              <el-dropdown-item @click="result_change(7)">Wrong Answer</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-table
        :data="
          tableData"
        stripe
        class="table"
      >
        <el-table-column
          prop="submission_id"
          label="ID"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="Name" width="200" align="center">
          <template #default="{ row }">
            <span>{{ row.author_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Problem"
          width="180"
          align="center"
        >
          <template #header>
            Problem:&nbsp;&nbsp;&nbsp;&nbsp;<el-input
              v-model="search"
              placeholder="输入题号"
              size="mini"
              class="input"
              @input="inputChange"
            ><template #prefix>
              <el-icon class="el-input__icon" @click="handleIconClick">
                <search />
              </el-icon>
            </template>
          </el-input>
          </template>
          
          <template #default="{row}">
            <el-link type="primary" @click="itemClick(row.problem_id)">{{row.problem_id}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="Result" width="200" align="center" >
          <template #default="{row}">
            <el-tag :type="status(row.status)">{{this.res[row.status]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="run_time" label="Time" width="150" align="center" ></el-table-column>
        <el-table-column prop="memory" label="Memory" width="150" align="center" ></el-table-column>
        <el-table-column prop="language" label="Language" width="150" align="center" ></el-table-column>
      </el-table>
      <el-pagination
        :total="total1"
        v-model:current_page="currentPage1"
        :page-size="pageSize1"
        @current-change="pageChange"
        :hide-on-single-page="value"
        layout="prev, pager, next, jumper, ->, total"
      ></el-pagination>
  </el-card>
</template>

<script>
import { ref } from "vue";
import { ArrowDown, Search } from "@element-plus/icons";
import { getContestStatusList } from "@/api/ContestStatus";
export default {
  setup(){
    return{
      currentPage1: ref(1),
    }
  },
  data() {
    return {
      logged: true,
      dropdown_text: 'All',
      search:'',
      tableData: [],
      total1: 50,
      problem_id:0,
      // currentPage1: 1,
      pageSize1: 10,
      contest_id: this.$route.query.id,
      value: false,
      myself: '0',
      result: 0,
      user_name:'',
      res: ['All','Accepted','Time Limit Exceeded','Memory Limit Exceeded','Runtime Error','System Error','Compile Error','Wrong Answer'],
    };
  },
  created(){
    // console.log(this.$route);
    this.getContestStatusList(this.myself,this.result,this.user_name,this.problem_id,this.currentPage1,this.pageSize1,this.contest_id);
  },
  components: { ArrowDown, Search },
  methods: {

    result_change(res_index){
      this.result = res_index;
      this.dropdown_text = this.res[res_index];
      this.getContestStatusList(this.myself,this.result,this.user_name,this.problem_id,this.currentPage1,this.pageSize1,this.contest_id);
    },

    pageChange(val) {
      this.currentPage1 = val;
      this.getContestStatusList(this.myself,this.result,this.user_name,this.problem_id,this.currentPage1,this.pageSize1,this.contest_id);
    },

    getContestStatusList(myself,result,user_name,problem_id,page,pagesize,contest_id){
      getContestStatusList(myself,result,user_name,problem_id,page,pagesize,contest_id).then(res => {
      console.log(res);
        this.tableData = res.data.result;
        this.total1 =res.data.total;
      }).catch(err => {
        console.log(err);
      })
    },

    cpnClick(event){
      this.myself = event
      this.getContestStatusList(this.myself,this.result,this.user_name,this.problem_id,this.currentPage1,this.pageSize1,this.contest_id);
    },
    
    status(Status){
      if(Status == 1){
        return 'success';
      }
      else if(Status == 6){
        return 'warning'
      }
      else{
        return 'danger';
      }
    },

    itemClick(id){
      // console.log(id);
      this.$router.push({
        path: '/problem/info',
        query:{
          id
        }
      })
    },

    inputChange() {
      console.log(this.search);
      this.problem_id = parseInt(this.search);
      this.getContestStatusList(
        this.myself,
        this.result,
        this.user_name,
        this.problem_id,
        this.currentPage1,
        this.pageSize1,
        this.contest_id
      );
    }

  },
};
</script>

<style scoped>
.overall {
  margin: 40px;
  background-color: rgb(238, 238, 238);
  display: flex;
}
.display {
  margin-left: 30px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #fff;
}
.table {
  width: 100%;
  background-color: #fff;
}
.top2{
  height: 80px;
  line-height: 80px;
  border-bottom: 1px rgb(235,238,245) solid;
}
.dropdown{
  margin-left: 20px;

}
.el_dropdown_link{
  font-size: 20px;
}
.status{
  margin-left: 30px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #fff;
}
</style>
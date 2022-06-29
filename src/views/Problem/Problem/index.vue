<template>
  <!-- <h1>This is an about page</h1> -->
  <div class="divs">
    <div class="search">
      <h2>SUSE Search</h2>
      <el-input
        v-model="input"
        placeholder="搜索标题"
        style="width: 60%;"
      >
        <template #prefix>
          <el-icon class="el-input__icon" @click="handleIconClick">
            <search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !input || data.title.toLowerCase().includes(input.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="date" label="#">
        <template #default="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="Title">
        <template #default="scope">
          <el-link type="primary" @click="itemClick(scope.row.ID)">{{scope.row.title}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="submission_number" label="Submission">
        
      </el-table-column>
      <el-table-column prop="accepted_number" label="Ac" />
      <el-table-column  label="Difficulty">
        <template #default={row}>
          <el-tag :type="type(row.accepted_number, row.submission_number)">{{difficulty(row.accepted_number, row.submission_number)}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        :total="total1"
        v-model:current_page="currentPage1"
        :page-size="pageSize1"
        @current-change="pageChange"
        :hide-on-single-page="value"
        layout="prev, pager, next, jumper, ->, total"
      ></el-pagination>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Search } from '@element-plus/icons'
import { getProblemAllList } from "@/api/ProblemAllList"
export default defineComponent({
  components: {
    Search
  },
  setup() {
    return {
      input: ref(""),
    };
  },
  data() {
    return {
      tableData1: [
        { id: 14, title: "A + B", submission: "300", ac: "281", label: "math" },
        { id: 14, title: "走迷宫", submission: "200", ac: "145", label: "bfs" },
        { id: 14, title: "八皇后", submission: "100", ac: "81", label: "dfs" },
        { id: 14, title: "01背包问题", submission: "100", ac: "81", label: "dp" },
        { id: 14, title: "完全背包问题", submission: "100", ac: "81", label: "dp" },
        { id: 14, title: "重建二叉树", submission: "100", ac: "81", label: "tree" },
        { id: 14, title: "货仓选址", submission: "200", ac: "181", label: "贪心" },
        { id: 14, title: "防晒", submission: "200", ac: "181", label: "贪心" },
        { id: 14, title: "国王游戏", submission: "100", ac: "81", label: "贪心" },
        { id: 14, title: "耍杂技的牛", submission: "100", ac: "81", label: "贪心" },
        { id: 14, title: "干草堆", submission: "100", ac: "81", label: "贪心" },
        { id: 14, title: "连通图", submission: "100", ac: "81", label: "图" },
        { id: 14, title: "立体图", submission: "100", ac: "81", label: "图" },
        { id: 14, title: "矩阵幂求和", submission: "100", ac: "81", label: "分治" },
        { id: 14, title: "最大公约数", submission: "100", ac: "81", label: "分治" },
      ],
      tableData: [],
      total1: 0,
      currentPage1: 1,
      pageSize1: 10,
      value: false,
    };
  },
  created(){
    this.getProblemAllList(this.input, this.currentPage1, this.pageSize1);
  },
  methods:{
    itemClick(id){
      this.$router.push({
        path:'/problem/info',
        query:{
          id
        }
      })
    },
    getProblemAllList(key_word,page, pgeSize1) {
      getProblemAllList(key_word,page, pgeSize1).then(res => {
        this.tableData = res.data.result;
        // this.accept += res.data.result.accepted_number;
        // this.submission += res.data.result.submission_number;
        this.total1 = res.data.total;
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    },
    inputChange() {
      this.getProblemAllList(this.input, this.currentPage1, this.pageSize1);
    },
    
    pageChange(val) {
      this.currentPage1 = val;
      console.log(this.currentPage1);
      this.getProblemAllList(this.input, this.currentPage1, this.pageSize1);
    },
    
    difficulty(accept, submission) {
      accept += 0.00001;
      submission += 0.00001;
      let prop = accept * 1.0/submission;
      // return prop;
      if (prop > 0 && prop <= 0.33) return "困难";
      else if (prop > 0.33 && prop <= 0.66) return "一般";
      else return "简单";
    },
    type(accept, submission){
      let prop = accept * 1.0/submission;
      if (prop >= 0 && prop <= 0.33) return "danger";
      else if (prop > 0.33 && prop <= 0.66) return "warning";
      else return "success";
    }
  }
});
// export default {

// }
</script>

<style>
.divs {
  width: 95%;
  margin: 10px auto;
}
.search {
  background-color: #fff;
  text-align: center;
}
.search h2 {
  padding-top: 20px;
}
.el-table tr .cell {
  text-align: center;
}
</style>
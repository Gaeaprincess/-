<template>
  <div class="divs">
    <div class="search">
      <h2>SUSE Search</h2>
      <!-- <el-input
        v-model="input"
        placeholder="搜索ID/标题"
        style="width:70%;"
      >
      <template #prefix>
        <el-icon @click="handleIconClick" style="vertical-align:middle ;">
          <search />
        </el-icon>
      </template>
    </el-input> -->
    <el-input
      v-model="input"
      placeholder="搜索ID/标题"
      class="input-with-select"
      style="width: 60%;"
    >
      <!-- <template #prepend>
          <el-select v-model="input3" placeholder="Select" style="width: 110px" @change="getGood">
            <el-option v-for="item in options" :key="item.content" :label="item.content" :value="item.content" />
          </el-select>
      </template> -->
      <template #prefix>
        <el-icon class="el-input__icon" @click="handleIconClick">
          <search />
        </el-icon>
      </template>
    </el-input>
    </div>
    <el-table
      :data="
        (tableData || []).filter(
          (data) =>
            !input ||
            data.title.toLowerCase().includes(input.toLowerCase()) ||
            data.id == input
        ).slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)
      "
      stripe

      style="width: 100%"
    >
      <template v-for="(item, index) of tableHead" :key="index">
        <el-table-column
          v-if="index == 0"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>

        <el-table-column v-else-if="index == 1" :prop="item.prop" :label="item.label">
          <template #default="scope">
            <div v-if="scope.row.have_password">
             
              <el-link type="primary" @click="itemClick(scope.row.id, scope.row.have_password)" v-if="scope.row.have_password">
              {{ scope.row.title }}</el-link>
               <el-icon style="margin: 10px; color: red"><lock /></el-icon>
            </div>

              <el-link type="primary" @click="itemClick(scope.row.id, scope.row.have_password)" v-else>
              {{ scope.row.title }}</el-link>
          </template>
        </el-table-column>

        <el-table-column v-else-if="index == 4" :prop="item.prop" :label="item.label">
          <template #default="scope">
            <el-tag>{{ scope.row.contest_creator_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column v-else :prop="item.prop" :label="item.label">
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      :total="tableData.length"
      v-model:current_page="currentPage1"
      :page-size="pageSize1"
      @current-change="pageChange"
      :hide-on-single-page="value"
      layout="prev, pager, next, jumper, ->, total"
    ></el-pagination>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Search, Lock } from '@element-plus/icons'
import moment from 'moment'
import { getContestsList } from '@/api/Contests'
export default defineComponent({
  components: {
    Search,
    Lock
  },
  data() {
    return {
      input: '',
      tableHead: [
        { prop: "id", label: "ID" },
        { prop: "title", label: "Title" },
        { prop: "start", label: "StartTime" },
        { prop: "end", label: "EndTime" },
        { prop: "creator_name", label: "Author" },
      ],
      tableData: [],
      currentPage1: 1,
      pageSize1:8,
      status:''
    };
  },
  created(){
    this.getContestsList(this.input, this.status, this.currentPage1, this.pageSize1)
  },
  methods: {
    pageChange(page) {
      // console.log(page);
      this.currentPage1 = page;
      // console.log(this.currentPage1);
    },

    getContestsList(key_word, status, page, page_size){
      getContestsList(key_word, status, page, page_size).then(res => {
        this.tableData = res.data;
        this.tableData.forEach((value) => {
          // value['start'] = moment(value['start_time']).format('YYYY-MM-DD HH:MM:SS')
          // value['end'] = moment(value['end_time']).format('YYYY-MM-DD HH:MM:SS')
          var date = new Date(value['end_time']).toJSON()
          value['end'] = new Date(+new Date(date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          var sdate = new Date(value['start_time']).toJSON()
          value['start'] = new Date(+new Date(sdate)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        })
      }).catch(err => {
        console.log(err);
      })
    },
    itemClick(id, have_password) {
      this.$router.push({
        path: '/contests/info',
        query: {
          id,
          have_password
        }
      })
    }

  },

  computed: {
    pageCount1(){
      return this.tableData.length/this.pageSize1
    },
    value(){
      return this.pageCount1 <= 1? true : false
    }
  }
});
</script>

<style>
.divs {
  width: 95%;
  margin: 10px auto;
}
.search {
  background-color: #fff;
  text-align: center;
  padding-bottom: 30px;
}
.search h2 {
  padding-top: 20px;
}
.el-table tr .cell {
  text-align: center;
}
/* .el-table td.el-table__cell div {
    text-align: left;
} */
</style>
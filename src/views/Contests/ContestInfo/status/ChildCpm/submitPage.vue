<template>
  <el-dialog v-model="show" title="提交情况">
    <el-table :data="tableData" border>
      <el-table-column
        label="Status"
        width="200"
        align="center"
      >
      <template #default="{row}">
        <el-tag :type="status(row.status)">{{
              state[row.status]
            }}</el-tag>
      </template>
    </el-table-column>
      <el-table-column
        property="run_time"
        label="Time"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column property="problem_id" label="ProblemId" align="center"></el-table-column>
      <el-table-column property="memory" label="Memory" align="center"></el-table-column>
      <el-table-column property="language" label="Language" align="center"></el-table-column>
      <el-table-column property="author_name" label="Submitted" align="center"></el-table-column>
    </el-table>
    <div class="codeShow">
      <editor v-model="code" previewOnly></editor>
  </div>
  </el-dialog>

</template>

<script>
  import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { getStatusList } from "@/api/Status";
export default {
  components: {
    Editor
  },
  props: {
    codeForm: {
      type: String,
      default() {
        return ''
      }
    },
    id: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      show: false,
      code: '',
      gridData: [],
      tableData: [],
      state: [
        "All",
        "Accepted",
        "Time Limit Exceeded",
        "Memory Limit Exceeded",
        "Runtime Error",
        "System Error",
        "Compile Error",
        "Wrong Answer",
      ],
    }
  },
  watch: {
    codeForm(_1, _2) {
      this.code =  _1
      setTimeout(() => {
        this.getStatusList()
      }, 3000); 
    }
  },
  mounted(){
    this.submit()
  },

  methods: {
    submit() {
    },
    status(Status) {
      if (Status == 1) {
        return "success";
      } else if (Status == 6) {
        return "warning";
      } else {
        return "danger";
      }
    },

    getStatusList() {
      const user_name = sessionStorage.getItem('username')
        getStatusList(1, 0, user_name,this.id, 0, 1)
        .then((res) => {
          this.tableData = res.data.result;

        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
}
</script>

<style scoped>
.codeShow{
  width: 100%;
  height: 80%;
}
</style>
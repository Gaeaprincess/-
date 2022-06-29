<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div class="divs">
      <div class="search">
        <h2>SUSE Search</h2>
        <el-input
        v-model="input"
        placeholder="Please input"
        @change="getGoodKey"
        class="input-with-select"
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
        :data="tableData.filter(
            (data) =>
              !input || data.problem.toLowerCase().includes(input.toLowerCase())
            )"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="problem" label="Problem" />
        <el-table-column prop="ac" label="Ac" />
        <el-table-column prop="label" label="Label" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Search } from '@element-plus/icons'
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
      tableData: [
        { date: "2021-12-1", problem: "text1", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "tree" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "math" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "xr po" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "xr po" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text2", ac: "0.81", label: "xr po" },
        { date: "2021-12-1", problem: "text1", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text1", ac: "0.81", label: "sta2" },
        { date: "2021-12-1", problem: "text1", ac: "0.81", label: "sta2" },
      ],
    };
  },
});
// export default {

// }
</script>

<style>
.divs {
  width: 95%;
  margin: 10px auto;
}
.search{
  background-color: #fff;
  text-align: center;
}
.search h2{
  padding-top: 20px;
}
</style>
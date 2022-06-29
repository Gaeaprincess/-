<template>
  <div class="good">
    <div>
      <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入商品关键字搜索" style="width: 250px; margin-bottom: 10px;" clearable>
        <template #prefix>
          <el-icon class="el-input__icon" @click="handleIconClick">
            <search />
          </el-icon>
        </template>
      </el-input>
    </div>
      <notReceive
        v-for="item in list"
        :key="item"
        :orderlist="item"
      />
  </div>
</template>

<script>
  import notReceive from './notReceive.vue'
  import { Search } from '@element-plus/icons'
  export default {
    components: {
      notReceive,
      Search
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
    return {
      search: ''
    }
  },
  watch: {
    search(o, _l) {
      this.$emit('search', o) // 过滤器
    }
  },
  }
</script>

<style>
  .good{
    width: 100%;
    margin: 30px;
  }
  .card{
    width: 800px;
    height: 350px;
    margin: 20px;
    float: left;
    padding: 0px;
  }
  .count{
    font-size: 15px;
    margin-left: 10px;
  }
  .integral{
    color: red;
  }
</style>
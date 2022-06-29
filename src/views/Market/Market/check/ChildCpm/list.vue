<template>
  <div>
    <div class="block">
      <span class="demonstration">Month：</span>
      <el-date-picker
        v-model="value2"
        type="month"
        placeholder="Pick a month"
        @change="search1"

      >
      </el-date-picker>
      <span style="float: right;">总支出：￥<el-tag type="danger" size="medium">{{money}}</el-tag></span>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column label="支出" width="100px" >
        <template #default="scope">
          -￥{{scope.row.Value}}
        </template>
      </el-table-column>
  
      <el-table-column label="购买商品" prop="GoodsID" width="150px" />
      <el-table-column label="收货状态" >
        <template #default="scope">
          {{scope.row.Status}}
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="180px">
        <template #default="scope">
          {{scope.row.UpdatedAt}}
        </template>
      </el-table-column>
      <el-table-column label="兑换时间" width="180px">
        <template #default="scope">
          <span v-if="scope.row.Status === '已收货'"> {{scope.row.GetTime}}</span>
          <span v-else>空</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import moment from 'moment'

export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    money: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      search: '',
      value2: ''
    }
  },
  watch: {
    search(o, _l) {
      this.$emit('search', o) // 过滤器
    },
    // value2(o, _l) {
    //   this.value2 = moment(this.value2).format('YYYY-MM-DD HH:MM:SS')

    //   this.$emit('getTime', o) // 过滤器
    // }
  },
  methods: {
    search1(){
      if (this.value2) {
      this.value2 = moment(this.value2).format('YYYY-MM-DD HH:MM:SS')
      } else {
        this.value2 = ''
      }
      // console.log(this.value2);
      this.$emit('getTime', this.value2)

    }
  },
}
</script>

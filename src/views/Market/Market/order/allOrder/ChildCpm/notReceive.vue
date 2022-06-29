<template>
  <div class="layout">
    <el-card style="width: 800px; display: flex; background-color: rgb(233, 240, 246);">{{time}} &nbsp;&nbsp;&nbsp;&nbsp;<span>订单编号：{{orderlist.ID}}</span>
      <el-tooltip
        class="item"
        effect="light"
        content="请拨打客服电话：15700610690"
        placement="top"
        style="margin-left: 200px;"
      >
        <el-button><el-icon><phone /></el-icon> &nbsp;&nbsp;计算机科学与工程学院算法竞赛部</el-button>
      </el-tooltip>
    </el-card>
    <el-table :show-header="status" :data="tableData" max-height="800" class="table" stripe>

      <el-table-column align="center" label="11" width="130px">
        <template #default="scope">
          <span style="margin-left: 10px" type="date"><img :src="'http://114.132.236.147:8001/onlinejudge' + scope.row.photo" alt="" style="width: 100px; height: 100px;"></span>
        </template>
      </el-table-column>
  <el-table-column align="center" label="11" prop="GoodsID" width="100px">
    <template #default="scope">
      <span>{{
        scope.row.GoodsID
      }}
      </span>
      <p>数量：{{scope.row.BookCount}}件</p>
    </template>
  </el-table-column>

  <el-table-column align="center" label="11" prop="Value" width="130px">
    <template #default="scope">
      <p>
        ￥{{scope.row.DeletedAt}}
      </p>
    </template>
  </el-table-column>

  <el-table-column align="center" label="11" prop="CreatedAt" width="200px">
    <template #default="scope">
      <p style="padding: 0; margin: 0;">实付款</p>
      <p style="padding: 0; margin: 0;">
        ￥{{scope.row.Value}}
      </p>
      <el-tag>积分兑换</el-tag>
    </template>
  </el-table-column>
  <el-table-column align="center" label="11" width="200px">
    <template #default="">
      <p style="padding: 0; margin: 0;">
        请你尽快在7天之内前往算法竞赛部领取
      </p>
    </template>
  </el-table-column>
</el-table>
  </div>
  
</template>

<script>
import moment from 'moment'
import { Phone } from '@element-plus/icons'
export default {
  components: {
    Phone
  },
  props: {
    orderlist: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableData: [],
      status: false,
      form: {
        id: this.orderlist.ID
      },
      time: moment(this.orderlist.CreatedAt).format('YYYY-MM-DD')
    }
  },
  // watch: {
  //   orderlist(_1, _2){
  //       this.form.id = _1.ID
  //       // this.ruleform.count = _1.goods_count
  //       // this.ruleform.goods_photo_url = _1.goods_photo_url
  //       // this.ruleform.goods_name = _1.goods_name
  //     }
  //   },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      this.tableData.push(this.orderlist)
    }
    }
}
</script>

<style scoped>
.layout{
  width: 100%;
}
.table{
  width: 800px;
  display: flex;
  margin-bottom: 30px;
}
</style>

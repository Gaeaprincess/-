<template>
  <div>
    <el-card class="box-card">
      <div class="main">
        <el-icon :size="size" :color="color" style="margin-left: 180px; margin-top: 100px;"><present /></el-icon>
        <P style="text-align: center; margin-bottom: 5px;">我的积分</P>
        <p style="text-align: center; font-size: 38px; margin-top: 0;">￥{{remain}}</p>
      </div>

      <!-- ￥{{list.consumption_value}} -->

    </el-card>
  </div>
</template>

<script>
  import { getIntegral } from '@/api/user'
  import { Present } from '@element-plus/icons'
  export default {
    components: {
      Present
    },
    data() {
      return {
        list: {},
        size: '100px',
        color: 'RGB(255,195,0)',
        
      }
    },
    computed: {
      remain() {
        return this.list.value - this.list.consumption_value
      },

    },
    created() {
      this.getIntegralList()
    },
    methods: {
     
      getIntegralList() {
        getIntegral().then(res => {
          this.list = res.data
        })
      },
    }
  }
</script>

<style scoped>

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 500px;
  height: 500px;
  /* display: flex */
  margin-left: 100px;
  margin-right: 100px;
}
.main{
  margin: auto;
  justify-content: center;
  align-items: center;
}
</style>
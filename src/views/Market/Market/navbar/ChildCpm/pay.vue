<template>
  <el-dialog v-model="dialogFormVisible" title="兑换商品">
    <el-form :model="ruleform">
      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-tag type="danger">{{ruleform.goods_name}}</el-tag>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-link :href="'http://114.132.236.147:8001/onlinejudge' + ruleform.goods_photo_url" :underline="false" target="_blank">
          <img
        style="width: 230px; height: 170px;"
        :src="'http://114.132.236.147:8001/onlinejudge' + ruleform.goods_photo_url"
        alt="地址错误"
      >
        </el-link>
        
      </el-form-item>
      <el-form-item label="积分值" :label-width="formLabelWidth">
        <el-tag type="info">{{ruleform.goods_value}}分</el-tag>
      </el-form-item>
      <el-form-item label="库存" :label-width="formLabelWidth">
        <el-tag type="info">{{ruleform.count}}件</el-tag>
      </el-form-item>
      <el-form-item label="购买数量" :label-width="formLabelWidth">
        <el-input-number v-model="ruleform.number" :min="1" :max="ruleform.count" size="mini" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="warning" @click="exchangeClick"
          >Exchange</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import { exchangeGoods } from '@/api/goods'
  export default {
    props: {
      show: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        dialogFormVisible: false,

        ruleform: {
          goods_photo_url: '',
          count: 0,
          goods_name: '',
          number: 0
        },
        form: {
          goods_id: 0,
          number: 0
        }
      }
    },
    watch: {
      show(_1, _2){
        this.form.goods_id = _1.id
        this.ruleform.count = _1.goods_count
        this.ruleform.goods_value = _1.goods_value
        this.ruleform.goods_photo_url = _1.goods_photo_url
        this.ruleform.goods_name = _1.goods_name
      }
    },
    methods: {
      exchangeClick() {
        this.form.number = this.ruleform.number
        this.dialogFormVisible = false
        if (sessionStorage.getItem('status') !== 'login') {
          this.$message({
            type: 'warning',
            message: '请先登录'
          })
        } else if (this.ruleform.number < 1) {
          this.$message({
            type: 'warning',
            message: '请选择加购数量'
          })
        } else {
          exchangeGoods(this.form).then(res => {
            this.$message({
              type: 'success',
              message: res
            })
          }).catch(err => {
            this.$message({
              type: 'warning',
              message: err
            })
          })
        } 

      }
    }
  }
</script>


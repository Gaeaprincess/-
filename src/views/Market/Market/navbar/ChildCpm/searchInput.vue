<template>
  <!-- <el-affix target=".affix-container" :offset="80">
    <el-button type="primary">Target container</el-button>
  </el-affix> -->
  <div style="margin-top: 10px; width: 60%; margin-left: 200px; text-align: center;">
     <el-card shadow="always" style="width: 100%">
      <el-input
      v-model="input1"
      placeholder="Please input"
      class="input"
    >
      <template #prepend>
          <el-select v-model="input3" placeholder="请选择分类" style="width: 150px; text-algin:center;" @change="getGood">
            <el-option v-for="item in options" :key="item.content" :label="item.content" :value="item.content" />
          </el-select>
      </template>
      <template #prefix>
        <el-icon class="el-input__icon" @click="handleIconClick">
          <search />
        </el-icon>
      </template>
    </el-input>
    </el-card>
    
    <marquee style="margin-top: 5px; color: rgb(0, 140, 255);" direction="right">请按照不同分类选择商品</marquee> 
  </div>
</template>

<script>
import { Search } from '@element-plus/icons'
import { getTypeList } from '@/api/type'
export default {
  components: {
    Search
  },
  props: {

  },
  data() {
    return {
      input1: '',
      input3: '',
      options: []
    }
  },
  watch: {
    input1(o, _l) {
      this.$emit('getGoodkey', o) // 过滤器
    }
  },
  created() {
    this.getTypeLists()
  },
  methods: {
    getTypeLists() {
      getTypeList().then(res => {
        this.options = res
      })
    },
    getGood() {
      this.$emit('getGood', this.input3)
    },
    // getGoodKey() {
    //   this.$emit('getGoodkey', this.input1)
    // }
  }
}
</script>

<style scoped>
.input{
  border: 0px;
  width: 100%;
}
</style>
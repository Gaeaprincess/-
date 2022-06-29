<template>
  <el-table 
    :data="list" 
    stripe
    style="width: 100%"
  >
    <el-table-column type="index" label="#" width="180" />
    <el-table-column prop="UserName" label="Name" width="180" />
    <el-table-column prop="AcNumber" label="AC" width="180" />
    <el-table-column prop="Integral" label="IntegralValue" />
  </el-table>
</template>

<script>
export default{
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
      // tableData: []
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
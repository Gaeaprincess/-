<template>
  <div style="padding: 0 0;">
    <el-table 
    :data="tableData" 
    border
    stripe
    style="width: 100%;"
    :cell-style="{padding:'0px',textAlign: 'center' ,height: '50px', verticalAlign: 'middle'}"
    :header-cell-style="{textAlign: 'center'}" 
  >
    <el-table-column type="index" label="#" width="50px" fixed />
    <el-table-column prop="ContestRecord.username" label="Name" width="80px" fixed />
    <el-table-column prop="ContestRecord.accepted_number" label="AC" width="80px" />
    <el-table-column prop="ContestRecord.total_time" label="Penalty" width="100px" />
    <template v-for="(item, index) of list" :key="item" >
  
        <el-table-column class="color" :label="indexMethod(index)" width="100px">
          <template #default="scope">
            <div  v-for="items of scope.row.submission_info" :key="items" >
              <div v-if="(item.ID === items.ProblemId) && (items.IsAC) && (items.IsFirstAC)" style="background-color: rgb(0, 136, 0); margin: 0; width: 100px;height: 50px; font-weight: bold; color: white;">            
                <span style="vertical-align: middle;" >{{items.AcTime}}</span>
                <br>
              <span v-if="items.WrongNumber !== 0">(-{{items.WrongNumber}})</span>
                
              </div>
              <div v-else-if="(item.ID === items.ProblemId) && (items.IsAC) && (items.WrongNumber > 0 )" style="background-color: rgb(208, 238, 209); margin: 0; width: 100px;height: 50px; font-weight: bold;">            
                <span style="vertical-align: middle;" >{{items.AcTime}}</span>
                <br>
              <span>(-{{items.WrongNumber}})</span>
              </div>
              <div v-else-if="(item.ID === items.ProblemId) && (items.IsAC) && (items.WrongNumber === 0 )" style="background-color: rgb(208, 238, 209); margin: 0; width: 100px;height: 50px; font-weight: bold; padding-top: 13px;">            
                <span style="vertical-align: middle;" >{{items.AcTime}}</span>
              </div>
              <div v-else-if="(item.ID === items.ProblemId) && (items.WrongNumber > 0 )" style="background-color: rgb(223, 136, 136); margin: 0; width: 100px;height: 50px; font-weight: bold; padding-top: 13px;">
                <span v-if="items.WrongNumber !== 0">(-{{items.WrongNumber}})</span>
              </div>
              <div v-else v-show="false" style="background-color: rgb(208, 238, 209); margin: 0; width: 100px;height: 50px; font-weight: bold;">            
                <span style="vertical-align: middle;" >{{items.AcTime}}</span>
                <br>
              <span v-if="items.WrongNumber !== 0">(-{{items.WrongNumber}})</span>
              </div>
              
            </div>
           
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="index == 1" :label="item.title" width="100px">
        <template #default="scope">
          <div style="background-color: rgb(208, 238, 209); margin: 0; width: 100px;height: 50px; font-weight: bold; ">            
            <span style="vertical-align: middle;" >{{scope.row.Btime}}</span>
            <br>
            <span>(-1)</span>
          </div>
        </template>
        </el-table-column> -->
    </template>

  </el-table>
  </div>
  
</template>

<script>

export default{
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  // computed: {
  //   // dataa() {
  //   //   var objectArraySort = function (keyName) {
  //   //     return function (objectN, objectM) {
  //   //       var valueN = objectN[keyName]
  //   //       var valueM = objectM[keyName]
  //   //       if (valueN < valueM) return 1
  //   //       else if (valueN > valueM) return -1
  //   //       else return 0
  //   //   }
  //   //  return this.tableData.sort(objectArraySort('age'))
  //   // }
  // },
  data() {
    return {
      tableHead: [
        { prop: "id", label: "A" },
        { prop: "title", label: "B" },
        { prop: "start_time", label: "C" },
        { prop: "end_time", label: "D" },
        { prop: "creator_name", label: "E" },
      ],
    }
  },
  mounted() {
    this.jj()
  },
  methods: {
    
    jj() {
      // console.log(this.list);
    },
    indexMethod(index){
      // console.log(index);
      return String.fromCharCode(index+65);
    },
  }
}
</script>

<style scoped>
/deep/.el-table .cell {
  padding: 0 0;
}
</style>
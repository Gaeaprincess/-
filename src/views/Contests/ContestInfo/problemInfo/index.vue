<template>
  <div class="detail">
    <el-card class="show">
      <h2 style="text-align: center; margin-bottom: 0;">{{info.title}}</h2>
      <hr color="#66b1ff" />
      <div class="container">
        <editor v-model="info.description" previewOnly></editor>
    </div>
  </el-card>
  <el-card class="more">
    <el-descriptions title="information" column="1" direction="horizontal">
      <el-descriptions-item label="ID:">{{info.ID}}</el-descriptions-item>
      <el-descriptions-item label="Time Limit:">{{info.time_limit}}</el-descriptions-item>
      <el-descriptions-item label="Memory Limit:" :span="2">{{info.memory_limit}}</el-descriptions-item>
      <el-descriptions-item label="CreatedAt:">
        <el-tag size="small">{{info.CreatedAt}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="UpdatedAt:">{{info.UpdatedAt}}</el-descriptions-item>
    </el-descriptions>
  </el-card>
  </div>
    
  <el-card class="show1">
    <template #header>
      <div class="card-header">
        <span style="margin-right: 20px;">代码编辑框</span>
        <el-select
			class="code-mode-select"
			v-model="mode"
			@change="changeMode"
		>
			<el-option
				v-for="mode in modes"
				:key="mode.value"
				:label="mode.label"
				:value="mode.value"
			>
			</el-option>
        </el-select>
        <el-button style="margin-left:20px" @click="reset"> <el-icon><refresh-right /></el-icon>
        </el-button>
      </div>
    </template>
    <div id="main">

        <Code-Editor2
          ref="codeEditor"
          :value="value"
          :uid="uid"
          :language="language"
          @input="input"
          @submit="submit"
          @language-change="languagechange"
        ></Code-Editor2>
    </div>
    <submitPage ref="submitPage" :codeForm="code" :id="id"></submitPage>
  </el-card>
</template>

<script>
import { getDetail } from '@/api/problem'
import { getStatus, putCode } from "@/api/problem";
import { Search, RefreshRight } from '@element-plus/icons'
import { getProblemInfo } from "@/api/ProblemInfo";
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import CodeEditor2 from '@/components/CodeEditor2.vue'
import {success, warning} from '@/utils/message'
import submitPage from './ChildCpm/submitPage'
import moment from 'moment'

export default {
  name: 'main',
  components: {
    Editor,
    CodeEditor2,
    submitPage,
    RefreshRight
  },
  props: {

  },
  data() {
    return {
      mode: '',
      modes: [
				{
						value: 'x-c++src',
						label: 'C++'
					},
					{
						value: 'x-java',
						label: 'Java'
					},
					{
						value: 'x-python',
						label: 'Python'
					}
			],
      info: {},
      Description: '',
      text: '',
      id: this.$route.query.problem_id,
      value: '',
			language: '',
      uid: null,
      form: {
        code: '',
        language: '',
        problem_id: null
      },
      code: ''
    }
  },
  created() {
    this.getDetails()
    this.getStatusList()
  },
  methods: {
    getDetails() {
      getProblemInfo(this.id)
        .then(res => {
          this.info = res.data;
          this.info.CreatedAt = moment(this.info.CreatedAt).format('YYYY-MM-DD HH:MM:SS')
          this.info.UpdatedAt = moment(this.info.UpdatedAt).format('YYYY-MM-DD HH:MM:SS')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeMode() {
      this.language = this.mode
      this.$refs.codeEditor.changeMode(this.mode)
    },
    getStatusList() {
       getStatus(this.id).then(res => {
        this.uid = res.data
      })
    },
    // languagechange(item) {
    //   this.form.language = item
    // },
    reset(){
      console.log(111);
      this.value=''
      // this.$refs.codeEditor.coder.setValue(this.value)
    },
    submit(item) {
      this.form.code = item
      if(this.mode === 'x-c++src'){
        this.form.language = 'c++'
      } else if(this.mode === 'x-java'){
        this.form.language = 'java'
      } else {
        this.form.language = 'python'
      }

      this.form.problem_id = parseInt(this.id) 
      this.code = '\n```' + this.form.language + '\n' + this.form.code + '\n```\n'
      putCode(this.form).then(res => {
        success('提交成功')
       
        this.$refs.submitPage.show = true
      })
    }
  }
}
</script>

<style scoped>
  .detail {
  display: flex;
}
  .show {
  margin-left: 30px;
  margin-top: 0px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  
}
.show1 {
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  
}
  .container{
  background-color: #fff;
  width: 90%;
  height: 100%;
  margin: 0px auto;
}
.content{
  width: 80%;
  height: 100%;
  /* float: left; */
  line-height: 30px;
  text-align: left;
  margin: 0px auto;
  overflow:scroll;
  border: 1px rgb(189, 187, 187) solid;
}
#main {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family: '楷体';
	}
	/deep/ .el-card {
		padding: 20px;
	}
  .more {
  width: 40%;
  height: 100%;
  margin-left: 40px;
  padding: 20px;
  border-radius: 10px;
  font-family: "微软雅黑";
}
</style>
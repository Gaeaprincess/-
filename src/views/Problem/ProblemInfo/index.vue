<template>
  <div class="overall">
    <div class="problem">
      <h2 style="text-align: center; margin-bottom: 20px">{{ info.title }}</h2>
      <hr color="#66b1ff" />
      <editor
        class="editor"
        v-model="this.info.description"
        previewOnly
      ></editor>
    </div>
    <div class="info">
      <!-- <span class="subtitle">information</span>
      <el-divider></el-divider> -->
      <el-descriptions title="information" column="1" direction="horizontal">
        <el-descriptions-item label="ID:">{{ info.ID }}</el-descriptions-item>
        <el-descriptions-item label="Time Limit:">{{
          info.time_limit
        }}</el-descriptions-item>
        <el-descriptions-item label="Memory Limit:" :span="2">{{
          info.memory_limit
        }}</el-descriptions-item>
        <el-descriptions-item label="CreatedAt:">
          <el-tag size="small">{{ info.CreatedAt }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="UpdatedAt:"
          ><el-tag size="small">{{
            info.UpdatedAt
          }}</el-tag></el-descriptions-item
        >
      </el-descriptions>
    </div>
  </div>
  <el-card class="show1">
    <template #header>
      <div class="card-header">
        <span style="margin-right: 20px">代码编辑框</span>
        <el-select class="code-mode-select" v-model="mode" @change="changeMode">
          <el-option
            v-for="mode in modes"
            :key="mode.value"
            :label="mode.label"
            :value="mode.value"
          >
          </el-option>
        </el-select>
        <el-button style="margin-left: 20px">
          <el-icon><refresh-right /></el-icon>
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
    <submitPage ref="submitPage" :codeForm="code"></submitPage>
  </el-card>
</template>

<script>
import { getDetail } from "@/api/problem";
import { getStatus, putCode } from "@/api/problem";
import { Search, RefreshRight } from "@element-plus/icons";
import { getProblemInfo } from "@/api/ProblemInfo";
import Editor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import CodeEditor2 from "@/components/CodeEditor2.vue";
import { success, warning } from "@/utils/message";
import submitPage from "./ChildCpm/submitPage";
import moment from "moment";
export default {
  data() {
    return {
      mode: "",
      modes: [
        {
          value: "x-c++src",
          label: "C++",
        },
        {
          value: "x-java",
          label: "Java",
        },
        {
          value: "x-python",
          label: "Python",
        },
      ],
      id: this.$route.query.id,
      info: {},
      value: "",
      language: "",
      uid: null,
      form: {
        code: "",
        language: "",
        problem_id: null,
      },
      code: "",
    };
  },
  created() {
    // console.log(this.$route.query.id);
    this.getStatusList();
    this.getProblemInfo(this.id);
  },
  components: {
    Editor,
    CodeEditor2,
    submitPage,
    RefreshRight,
  },
  methods: {
    getProblemInfo(id) {
      getProblemInfo(id)
        .then((res) => {
          this.info = res.data;
          this.info.CreatedAt = moment(this.info.CreatedAt).format(
            "YYYY-MM-DD HH:MM:SS"
          );
          this.info.UpdatedAt = moment(this.info.UpdatedAt).format(
            "YYYY-MM-DD HH:MM:SS"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStatusList() {
      getStatus(this.id).then((res) => {
        this.uid = res.data;
      });
    },
    changeMode() {
      console.log(this.form.language);
      this.language = this.mode;
      this.$refs.codeEditor.changeMode(this.mode);
    },
    submit(item) {
      this.form.code = item;
      if (this.mode === "x-c++src") {
        this.form.language = "c++";
      } else if (this.mode === "x-java") {
        this.form.language = "java";
      } else {
        this.form.language = "python";
      }

      this.form.problem_id = parseInt(this.id);
      console.log(this.form);
      this.code =
        "\n```" + this.form.language + "\n" + this.form.code + "\n```\n";
      if (sessionStorage.getItem("status") === 'login') {
        putCode(this.form).then((res) => {
          this.$refs.submitPage.show = true;
        });
      } else {
        warning("请先登录")
      }
    },
  },
};
</script>

<style scoped>
.overall {
  margin: 30px 40px;
  display: flex;
}
.problem {
  margin: 0px 40px;
  padding: 20px;
  width: 70%;
  background-color: #fff;
  border-radius: 10px;
  font-family: "微软雅黑";
  /* font-weight: 400; */
}
.show1 {
  margin-left: 80px;
  background-color: #fff;
  width: 80%;
  height: 100%;
  border-radius: 10px;
}
.problem span {
  font-size: 23px;
}
.problem .editor {
  margin-top: 20px;
}
.md-content h3 {
  color: rgb(102, 177, 255);
}
.md-content p {
  font-size: 15px;
  margin-left: 2em;
  line-height: 1.5em;
}
.info {
  width: 20%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  margin-left: 40px;
  padding: 20px;
  border-radius: 10px;
  font-family: "微软雅黑";
}
.subtitle {
  font-family: "微软雅黑";
  font-size: 19px;
}
</style>
<template>
  <div class="overall"  v-if="have_password=='false' || getEntered[id]">
    <!-- {{ $route.query.id }} -->
    <div class="overview">
      <el-menu :default-active="'/contests/info/overview?id=' + $route.query.id +'&password='+input " class="option" router>
        <el-menu-item :index="'/contests/info/overview?id=' + $route.query.id +'&password='+input " class="subitem">Overview</el-menu-item>
        <el-menu-item :index="'/contests/info/problem?id=' + $route.query.id +'&password='+input " class="subitem">Problems</el-menu-item>
        <el-menu-item :index="'/contests/info/status?id=' + $route.query.id +'&password='+input " class="subitem">Status</el-menu-item>
        <el-menu-item :index="'/contests/info/rank?id=' + $route.query.id +'&password='+input " class="subitem">Rank</el-menu-item>
        <el-menu-item :index="'/contests/info/comment?id=' + $route.query.id +'&password='+input " class="subitem">Comments</el-menu-item>
      </el-menu>
    </div>
      <div class="displays">
        <router-view />
      </div>
    </div>
    <div class="password" v-if="have_password=='true' && !getEntered[id]">
    <el-input v-model="input" :placeholder="placeholder" type="password"/>
    <el-button type="primary" size="small" class="confirm" @click="confirm"> 确定</el-button>
  </div>
</template>

<script>
import { getContests_Info } from "@/api/Contests_Info";
import { mapGetters } from "vuex";
import {success, warning} from '@/utils/message'
export default {
  data(){
    return{
      // have_password1 : false,
      id: this.$route.query.id,
      have_password: this.$route.query.have_password,
      input:'',
      Entered: false,
      placeholder: "Please input the contest password",
    }
  },
   computed: {
    ...mapGetters(['getEntered'])
  },
  methods: {
 getContests_Info_first(id, input) {
      getContests_Info(id, input)
        .then((res) => {
          this.$store.commit('setEntered', {id: id,val: true})
          if(res.code == -1) this.Entered = false;
          else this.Entered = true;
          this.answer = res.data.Answer;
        })
        .catch((err) => {
          console.log(err);
          this.input = "";
          this.placeholder = err.msg;
          warning("密码错误");
        });
    },
    getContests_Info(id, input) {
      getContests_Info(id, input)
        .then((res) => {
          console.log(res);
          this.$store.commit('setEntered', {id: id,val: true})
          this.answer = res.data.Answer;
          // console.log(this.answer);
        })
        .catch((err) => {
          console.log(err);
          this.input = "";
          this.placeholder = err.msg;
          warning("密码错误");
        });
    },
    confirm() {
      if (sessionStorage.getItem('status') === 'login') {
        this.getContests_Info(this.id, this.input);
      } else {
        warning('请先登录')
      }
      
    }
  }
}
</script>

<style>

.overall {
  margin: 40px;
  background-color: rgb(238, 238, 238);
  display: flex;
}

.overview {
  width: 200px;
  height: 100%;
}
.option {
  width: 200px;
  border-radius: 10px;
}
.subitem {
  /* margin-left: 30px; */
  justify-content: center;
}
.displays {
  margin-left: 30px;
  width: 80%;
  height: 100%;
  border-radius: 10px;
}
.password{
  margin: 100px auto;
  width: 50%;
  border-radius: 20px;
}
.confirm{
  margin-top: 30px;
  float: right;
}
</style>
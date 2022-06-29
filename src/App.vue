<template>
  <div id="nav" style="position:sticky; top:0; z-index: 1;" v-show="showTab"> 
    <!-- leader -->
    <div style="display: flex;">
      
      <div class="title"><img src="./assets/LOgo1.jpg" style="width: 100%;"/></div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        
        router
      >
        <el-menu-item index="/">
          <!-- <img class="icon" src="./assets/home.png" />Home -->
          <el-icon><home-filled /></el-icon>Home
        </el-menu-item>
        <el-menu-item index="/problem">
          <!-- <img class="icon" src="./assets/problem.png" />Problems -->
          <el-icon><list /></el-icon>Problems
        </el-menu-item>
        <el-menu-item index="/contests">
          <!-- <img class="icon" src="./assets/contests.png" />Contests -->
          <el-icon><medal /></el-icon>Contest
        </el-menu-item>
        <el-menu-item index="/status">
          <!-- <img class="icon" src="./assets/status.png" />Status -->
          <el-icon><trend-charts /></el-icon>Status
        </el-menu-item>
        <el-menu-item index="/rank">
          <!-- <img class="icon" src="./assets/rank.png" />Rank -->
          <el-icon><histogram /></el-icon>Rank
        </el-menu-item>
        <el-menu-item index="/market">
          <!-- <img class="icon" src="./assets/market.png" />Market -->
          <el-icon><goods-filled /></el-icon>Market
        </el-menu-item>
      </el-menu>
    </div>
    <div class="nav-actions">
        <el-button class="login" v-if="status == 'logout'" type="primary" round @click="handleLogin">Login</el-button>
        <!-- <el-button class="login" v-if="status == 'login'" type="primary" round>yuqing</el-button> -->
        <el-dropdown style="margin-top: 12px; margin-right: 20px" v-if="status == 'login'" >
          <span class="el-dropdown-link">
            {{username}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <!-- <span class="el-dropdown-link">
            <el-avatar src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F30%2F20160330084634_8weNf.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641767806&t=fddd96d066db7db71a837009a4b0aa55"><el-icon class="el-icon--right"><arrow-down /></el-icon></el-avatar>
          </span> -->
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/profile">
                <el-dropdown-item>Profile</el-dropdown-item>
              </router-link>
              <!-- <el-dropdown-item command="b">Action 2</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="logout" v-if="status == 'logout'" type="primary" round @click="handleRegister">Register</el-button>
        <el-button class="logout" v-if="status == 'login'" type="info" round @click="handleLogout">Logout</el-button>
    </div>
    <register
      ref="handleRegister"
      @registerForm="registerForm"
    />
    <login
    ref="handleLogin" 
    @loginForm="loginForm"
    />
  </div><router-view></router-view>
</template>
<script>
import { defineComponent, ref } from "vue";
import { cursorSpecialEffects } from '@/utils/texiao'
import Register from './views/register/Register'
import Login from './views/login'
import {register, login, getUserInfo} from '@/api/user'
import {success, warning} from '@/utils/message'
import { ElMessage } from 'element-plus'
import { ArrowDown, HomeFilled, GoodsFilled,Histogram, TrendCharts,List,Medal } from '@element-plus/icons'
export default defineComponent({
  setup() {
    const activeIndex = ref("1");
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleCommand = (command) => {
      ElMessage(`click on item ${command}`)
    }
    return {
      activeIndex,
      handleSelect,
      handleCommand
    };
  },
  components: {
    Register,
    Login,
    ArrowDown,
    HomeFilled,
    GoodsFilled,
    Medal,
    Histogram,
    TrendCharts,
    List
  },
  computed:{
    showTab() {
      if (this.$route.path.indexOf('/leader') !== -1) return false
      return !this.$route.meta.notShowTab
    }
  },
  data() {
    return {
      username: '',
      status: 'logout',
    }
  },
  created() {
    this.username = sessionStorage.getItem('username')
    this.status = sessionStorage.getItem('status') ? sessionStorage.getItem('status') : 'logout'
  },
  methods: {
    handleLogin() {
      this.$refs.handleLogin.dialogFormVisible = true
    },
    handleRegister() {
      // console.log("dfsaf")
      this.$refs.handleRegister.dialogFormVisible = true
    },
    registerForm(item){
      register(item).then(res => {
        success(res)
      }).catch(err => {
        warning(err)
      })
    },
    loginForm(item){
      this.$refs.handleLogin.dialogFormVisible = true
      login(item).then(res => {
        // console.log('1111')
      this.$refs.handleLogin.dialogFormVisible = false
        this.status = 'login'
        sessionStorage.setItem('status', this.status)
        this.$store.commit("changeLogin", res.data.data.jwt)
        success(res.data.msg)
        getUserInfo().then(res => {
          this.username = res.data.user.user_name
          sessionStorage.setItem('username', this.username)
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log('1111')
        warning(err)
      })
    },
    handleLogout() {
      this.status = 'logout'
      this.username = ''
      sessionStorage.clear()

      success('退出成功')
    }
  }
});
</script>

<style lang="scss" scoped>
@import url("./assets/css/base.css");
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .el-menu-demo {
    width: calc(100vw - 500px);
    background-color: #fff;
  }
  .title {
    display: inline-block;
    margin-top: 10px;
    margin-right: 20px;
    padding-left: 17px;
    width: 120px;
  }
  .icon {
    width: 15px;
    height: 15px;
    margin: 8px;
  }
  /* // .login {
    // position: fixed;
    // right: 110px;
    // width: 75px;
    // height: 40px;
    // line-height: 40px;
    // text-align: center;
    // border-radius: 20px;
    // border: 1px #a0a0a0 solid;
    // text-decoration: none;
    // color: #a0a0a0;
  // } */
  .login:hover {
    border: 1px rgb(64, 158, 255) solid;
    color: rgb(64, 158, 255);
  }
  /* // .logout {
  //   position: fixed;
  //   right: 20px;
  //   float: right;
  //   margin-left: 20px;
  //   width: 75px;
  //   height: 40px;
  //   line-height: 40px;
  //   text-align: center;
  //   border: 1px #a0a0a0 solid;
  //   border-radius: 20px;
  //   color: #a0a0a0;
  // } */
  .logout:hover {
    border: 1px rgb(64, 158, 255) solid;
    color: rgb(64, 158, 255);
  }

  .nav-actions {
    margin-right: 20px;
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    height: fit-content;
  }
  a {
  text-decoration: none;
}
  .router-link-active {
    text-decoration: none;
  }
  
}
</style>

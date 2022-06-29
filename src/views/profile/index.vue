<template>
  <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="10" :xs="24">
          <user-card
            :userlist="user"
          />
        </el-col>
        <el-col :span="14" :xs="24">
          <el-card  style="margin:50px 30px ;">
            <account/>
          </el-card>
        </el-col>

      </el-row>
  </div>
</template>

<script>
import UserCard from './components/UserCard'
// import Activity from './components/Activity'
// import Timeline from './components/Timeline'
import Account from './components/Account'
import { getUserInfo } from '@/api/user'
export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      user: {
        user_name: '',
        user_email: '',
        user_password: ''
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        this.user.user_name = res.data.user.user_name
        this.user.user_email = res.data.user.user_email
        this.user.user_password = res.data.user.user_password
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

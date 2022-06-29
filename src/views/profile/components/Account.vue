<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="Name">
        <el-input v-model="form.user_name" disabled/>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.user_email" type="email" disabled/>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.user_password" type="password"/>
      </el-form-item>
      <el-form-item label="PasswordAgain">
        <el-input v-model="form.user_passwordAgain" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Update</el-button>
      </el-form-item>
    </el-form>
    <div class="post">
      <div class="user-images">
        <el-carousel :interval="2000" type="card" height="220px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item+carouselPrefix" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
// import { userUpdate } from '@/api/user'
const carouselPrefix = '?imageView2/2/h/440'
import { getUserInfo } from '@/api/user'

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (this.form.user_password.length < 8) {
        callback(new Error('Length should be more 8'))
      } else {
        if (this.form.user_passwordAgain !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.user_password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: '',
        user_passwordAgain: ''
      },
      rules: {
        user_password: [{ validator: validatePass, trigger: 'blur' }, {min: 8, max: 12,}],
        user_passwordAgain: [{ validator: validatePass2, trigger: 'blur' }, {min: 8, max: 12,}],
      },
      carouselImages: [
        'http://112.74.107.156/lz1.jpg',
        'http://112.74.107.156/lz2.jpg',
        'http://112.74.107.156/lz3.jpg',
        'http://112.74.107.156/lz4.jpg'
      ],
      carouselPrefix
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        this.form.user_name = res.data.user.user_name
        this.form.user_email = res.data.user.user_email
        this.form.user_password = res.data.user.user_password
        this.form.user_passwordAgain = res.data.user.user_password
      }).catch(err => {
        console.log(err)
      })
    },
    submit() {
      console.log(this.form.user_name)
      console.log(this.form.user_name)
      // userUpdate(this.form).then(res => {
      //   this.$message({
      //     type: 'success',
      //     message: res.msg
      //   })
      // }).catch(err => {
      //   this.$message({
      //     type: 'warning',
      //     message: err
      //   })
      // })
      // this.$message({
      //   message: 'User information has been updated successfully',
      //   type: 'success',
      //   duration: 5 * 1000
      // })
    }
  }
}
</script>

<style>
.image {
      width: 100%;
      height: 100%;
  }
  /* .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }
  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  } */

</style>

<template>
  <el-dialog v-model="dialogFormVisible" title="Welcome to SUSE JUDGE">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="Username" :label-width="formLabelWidth" prop="user_name">
        <el-input v-model="form.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Email" :label-width="formLabelWidth" prop="user_email">
        <el-input v-model="form.user_email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth" prop="user_password">
        <el-input v-model="form.user_password" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="PasswordAgain" :label-width="formLabelWidth" prop="user_passwordAgain">
        <el-input v-model="form.user_passwordAgain" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Code" :label-width="formLabelWidth" prop="user_email_code">
        <el-input v-model="form.user_email_code" autocomplete="off" style="width: 50%; margin-right: 20px;"></el-input>
        <el-button
          type="primary"
          plain
          @click="sendcode"
          :disabled="isDisabled"
          >{{ buttonName }}</el-button>      
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm('form')">Cancel</el-button>
        <el-button type="primary" @click="submitForm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import {isEmail} from '@/utils/validate'
  import {getCode} from '@/api/user'
  import md5 from 'js-md5'
  // import { defineComponent } from 'vue'
  import {success, warning} from '@/utils/message'
export default{
  data() {
    const checkUser_name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the username'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('Please input the email'))
      } else if (!isEmail(value)) {
        callback(new Error('Please input the correct email'))
      } else {
        callback()
      }
    }
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
      buttonName: '发送验证码',
      timeDown: 60,
      isDisabled: false,
      dialogFormVisible: false,
      form: {
        user_name: '',
        user_email: '',
        user_password: '',
        user_passwordAgain: '',
        user_email_code: ''
      },
      emailForm: {
        email: ''
      },
      userForm: {
        user_name: '',
        user_email: '',
        user_password: '',
        user_email_code: ''
      },
      formLabelWidth: '120px',
      rules: {
        user_password: [{ validator: validatePass, trigger: 'blur' }, {min: 8, max: 12,}],
        user_passwordAgain: [{ validator: validatePass2, trigger: 'blur' }, {min: 8, max: 12,}],
        user_name: [{ validator: checkUser_name, trigger: 'blur' }],
        user_email: [{ type: 'email', validator: checkEmail, trigger: 'blur' }]
      },
    }
  },
  methods: {
    sendcode() {
      this.timeDown = 60
      this.timer()
      this.emailForm.email = this.form.user_email
      getCode(this.emailForm).then(res => {
        success(res.msg)
      }).catch(err => {
        warning(err.msg)
      })
    },
    timer() {
      if(this.timeDown > 0){
        this.isDisabled = true
        this.timeDown--
        this.buttonName = this.timeDown + '秒'
        setTimeout(this.timer, 1000)
      } else {
        this.timeDown = 0;
        this.buttonName = '发送验证码'
        this.isDisabled = false
      }
    },
    submitForm() {
      this.dialogFormVisible = false
      this.userForm.user_email = this.form.user_email
      this.userForm.user_name = this.form.user_name
      this.userForm.user_password = md5(this.form.user_password)
      this.userForm.user_email_code = this.form.user_email_code
      this.$emit('registerForm', this.userForm)
      this.form = {}
    },
    resetForm(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
  }
  
}

</script>

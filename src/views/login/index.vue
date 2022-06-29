<template>
  <el-dialog v-model="dialogFormVisible" title="Welcome to SUSE JUDGE" class="login">
    <el-form :model="form" ref="form" :rules="rules" autocomplete="on">
      <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" @change="keyDown"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="forget" type="text" @click="forget">忘记密码？</el-button>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm('form')">Cancel</el-button>
        <el-button type="primary" @click="submitForm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible" title="修改密码" class="login">
    <el-form ref="form" :model="ruleform" :rules="rulesa">
       <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
        <el-input v-model="ruleform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px" prop="password">
        <el-input v-model="ruleform.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" label-width="120px" prop="checkPassword">
        <el-input v-model="ruleform.checkPassword" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="surePasswordClick">Submit</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import {isEmail} from '@/utils/validate'
  // import { defineComponent } from 'vue'
  import md5 from 'js-md5'
import {success, warning} from '@/utils/message'
export default{
  data() {
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
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
      } else if (this.form.password.length < 8) {
        callback(new Error('Length should be more 8'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (this.ruleform.password.length < 8) {
        callback(new Error('Length should be more 8'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleform.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        email: '',
        password: ''
      },
      ruleform: {
        email: '',
        password: '',
        checkPassword: ''
      },
      formLabelWidth: '120px',
      rules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }]
      },
      rulesa: {
        password: [{ required: true, validator: validatePass3, trigger: 'blur' }],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }]
      },
    }
  },
  mounted(){
    //绑定事件
     window.addEventListener('keydown',this.keyDown);
  },
  methods: {
    keyDown(e){
        //如果是回车则执行登录方法
      if(e.keyCode == 13){
        // this.dialogFormVisible = false
        this.form.password = md5(this.form.password)
        this.$emit('loginForm', this.form)
        this.form = {}
      }
      
    },
    forget() {
      this.dialogFormVisible = false
      this.dialogVisible = true
    },
    surePasswordClick() {
      if ((this.ruleform.password === this.ruleform.checkPassword) && this.ruleform.password !== '') {
        this.dialogVisible = false
        success("修改密码成功")
      } else this.dialogFormVisible = true
    },
    submitForm() {
      // this.dialogFormVisible = false
      this.form.password = md5(this.form.password)
      this.$emit('loginForm', this.form)
      this.form = {}
    },
    resetForm(formName) {
      this.dialogFormVisible = false
     this.from = {}
    },
  },
  onUnmounted(){
    window.removeEventListener('keydown',this.keyDown,false);
  }
}

</script>

<style scoped>
.forget{
  float: right;
}
</style>

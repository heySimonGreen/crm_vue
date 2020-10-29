<template>
  <div class="app-container">
    <el-button @click="goBack"><i class="el-icon-back">返回</i></el-button>
    <el-row type="flex" justify="center" style="margin-top: 5%">
      <el-col :span="8">
        <el-form ref="rigisterForm" :model="rigisterForm" :rules="rigisterFormRules" label-width="100px">
          <el-form-item
            prop="username"
            label="用户名"
          >
            <el-input v-model.trim="rigisterForm.username" />
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
          >
            <el-input v-model.trim="rigisterForm.password" />
          </el-form-item>
          <el-form-item
            prop="phonenumber"
            label="电话号码"
          >
            <el-input v-model.trim="rigisterForm.phonenumber" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRigisterForm('rigisterForm')">提交</el-button>
            <el-button @click="resetForm('rigisterForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crypto from 'crypto'
import store from '../../store'
import { testpost } from '../../api/customer'
export default {
  name: 'RigisterAdmin',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
      // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
      // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的手机号码'))
          }
        }
      }, 100)
    }
    return {
      rigisterForm: {
        username: '111',
        password: '123456',
        phonenumber: '18896173420'
      },
      rigisterFormRules: {
        username: [{ required: true, message: 'type is required', trigger: 'change' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        phonenumber: [{ required: true, message: 'type is required', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }]
      },
      url: this.$store.state.user.url
    }
  },
  methods: {
    goBack() {
      // 点击返回按钮，向后跳转
      this.$router.go(-1)
      console.log(this)
    },
    submitRigisterForm(rigisterForm) {
      this.$refs[rigisterForm].validate((valid) => {
        if (valid) {
          console.log('valid')
          const submitForm = {}
          var md5 = crypto.createHash('md5')
          submitForm.username = this.rigisterForm.username
          submitForm.password = this.rigisterForm.password
          submitForm.phonenumber = this.rigisterForm.phonenumber
          md5.update(submitForm.password)
          submitForm.password = md5.digest('hex')
          testpost(submitForm)
          // this.$axios.post(this.url + '/admin/rigister', submitForm, { timeout: 2000 })
          //   .then(res => {
          //     console.log(res)
          //     if (res.data === 'rigister successful') {
          //       this.$notify({
          //         title: '成功',
          //         message: '添加管理员成功',
          //         type: 'success',
          //         duration: 1000
          //       })
          //     } else {
          //       this.$notify({
          //         title: '失败',
          //         message: res.data,
          //         type: 'error',
          //         duration: 1000
          //       })
          //     }
          //   })
        } else {
          console.log(' not valid')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" size="small">
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" placeholder="请输入当前密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordConfirm">
        <el-input v-model="form.passwordConfirm" type="password" placeholder="请再次输入新密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userPasswordUpdateApi } from '@/api/personal'
import { encrypt } from '@/utils/jsencrypt'
import { areYouOk } from '@/api/router'

export default {
  data() {
    // 密码校验
    const checkPassword = (rule, value, callback) => {
      if (value.trim() !== value) {
        callback(new Error('密码不允许空格'))
      }
      if (value.length < 8 || value.length > 20) {
        callback(new Error('密码长度限定为8-20位'))
      }
      var ls = 0
      if (value.match(/([a-z])+/)) { ls++ }
      if (value.match(/([0-9])+/)) { ls++ }
      if (value.match(/([A-Z])+/)) { ls++ }
      if (value.match(/[^a-zA-Z0-9]+/)) { ls++ }
      if (ls < 3) {
        callback(new Error('密码必须同时包含大写字母、小写字母、数字'))
      }
      callback()
    }
    const checkPasswordConfirm = (rule, value, callback) => {
      if (this.form.password !== this.form.passwordConfirm) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    return {
      form: {
        oldPassword: '',
        password: '',
        passwordConfirm: ''

      },
      rules: {
        oldPassword: [
          { required: true, message: '原密码为必填项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '新密码为必填项', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '确认密码为必填项', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
          { validator: checkPasswordConfirm, trigger: 'blur' }

        ]
      }
    }
  },
  created() {
    areYouOk()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          var parm = {
            password: encrypt(this.form.oldPassword),
            newPassword: encrypt(this.form.password)
          }
          userPasswordUpdateApi(parm).then(res => {
            this.$message.success('修改密码成功')
            this.onCancel()
          }).catch(() => {})
        } else {
          console.log('表单校验失败，不能提交')
        }
      })
    },
    onCancel() {
      this.$refs.form.resetFields()
    }
  }
}
</script>


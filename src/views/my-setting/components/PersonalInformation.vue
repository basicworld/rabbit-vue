<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" size="small">

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入11位手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validCellphone } from '@/utils/validate'
import { userInfoUpdateAPI, getInfo } from '@/api/personal'
export default {

  data() {
    // 表单校验：手机号校验
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (validCellphone(value)) {
          callback()
        } else {
          callback(new Error('手机号格式错误'))
        }
      }
    }
    return {
      form: {
        nickname: undefined,
        phone: undefined,
        email: undefined
      },
      rules: {

        nickname: [
          { required: true, message: '昵称为必填项', trigger: 'blur' },
          { min: 2, max: 20, message: '昵称长度限制为 2 到 20 字', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.doGetUserInfo()
  },

  methods: {
    // 获取用户基本信息
    doGetUserInfo() {
      getInfo().then(res => {
        this.form.nickname = res.data.nickname
        this.form.phone = res.data.phone
        this.form.email = res.data.email
      }).catch(() => {})
    },
    isNotBlank(obj) {
      return (undefined !== obj) && (obj !== '')
    },
    // 提交修改
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = {
            nickname: this.isNotBlank(this.form.nickname) ? this.form.nickname : undefined,
            email: this.isNotBlank(this.form.email) ? this.form.email : undefined,
            phone: this.isNotBlank(this.form.phone) ? this.form.phone : undefined
          }
          userInfoUpdateAPI(param).then(res => {
            this.$message.success('个人资料更新成功')
            this.doGetUserInfo()
          }).catch(() => {})
        } else {
          console.log('表单校验失败')
        }
      })
    },
    onCancel() {
      this.$refs.form.resetFields()
      this.doGetUserInfo()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


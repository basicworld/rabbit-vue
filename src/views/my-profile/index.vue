<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <span>昵称：</span><span>{{ user.nickname }}</span><br><br>
            <span>账号：</span><span>{{ user.username }}</span><br><br>
            <span>手机：</span><span>{{ user.phone }}</span><br><br>
            <span>邮箱：</span><span>{{ user.email }}</span><br><br>
            <span>部门：</span><span>{{ user.deptName }}</span><br><br>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>修改信息</span>
          </div>
          <el-tabs v-model="activeTab">
            <!-- 基本信息设置 -->
            <el-tab-pane label="基本信息" name="userInfo">
              <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="100px" size="small">

                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="infoForm.nickname" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                  <el-input v-model="infoForm.phone" placeholder="请输入11位手机号" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="infoForm.email" placeholder="请输入邮箱" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="onInfoSubmit">保存</el-button>
                  <el-button @click="onInfoCancel">取消修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 修改密码 -->
            <el-tab-pane label="修改密码" name="resetPassword">
              <el-form ref="pwdForm" :rules="pwdRules" :model="pwdForm" label-width="100px" size="small">
                <el-form-item label="当前密码" prop="oldPassword">
                  <el-input v-model="pwdForm.oldPassword" type="password" placeholder="请输入当前密码" />
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                  <el-input v-model="pwdForm.password" type="password" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordConfirm">
                  <el-input v-model="pwdForm.passwordConfirm" type="password" placeholder="请再次输入新密码" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="onPwdSubmit">保存</el-button>
                  <el-button @click="onPwdCancel">取消修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>

      </el-col>
    </el-row>
  </div>

</template>

<script>
import { validCellphone } from '@/utils/validate'
import { areYouOk } from '@/api/router'
import { userInfoUpdateAPI, getInfo } from '@/api/personal'
import { userPasswordUpdateApi } from '@/api/personal'
import { encrypt } from '@/utils/jsencrypt'

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
      if (this.pwdForm.password !== this.pwdForm.passwordConfirm) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
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
      // 修改密码表单
      pwdForm: {
        oldPassword: '',
        password: '',
        passwordConfirm: ''

      },
      // 密码校验规则
      pwdRules: {
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
      },
      // 活动tab
      activeTab: 'userInfo',
      // 用户详情
      user: {}, // 个人详情
      // 个人信息表单
      infoForm: {
        nickname: undefined,
        phone: undefined,
        email: undefined
      },
      // 个人信息校验规则
      infoRules: {

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
  created() {
    areYouOk().then(() => {
      this.doGetUserInfo()
    })
  },
  methods: {
    doGetUserInfo() {
      getInfo().then(res => {
        this.user = res.data

        this.infoForm = {
          nickname: res.data.nickname,
          phone: res.data.phone,
          email: res.data.email
        }
      })
    },
    onPwdSubmit() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          var parm = {
            password: encrypt(this.pwdForm.oldPassword),
            newPassword: encrypt(this.pwdForm.password)
          }
          userPasswordUpdateApi(parm).then(res => {
            this.$message.success('修改密码成功')
            this.onPwdCancel()
          }).catch(() => {})
        }
      })
    },
    onPwdCancel() {
      this.$refs.pwdForm.resetFields()
    },

    isNotBlank(obj) {
      return (undefined !== obj) && (obj !== '')
    },
    // 提交修改
    onInfoSubmit() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          const param = {
            nickname: this.isNotBlank(this.infoForm.nickname) ? this.infoForm.nickname : undefined,
            email: this.isNotBlank(this.infoForm.email) ? this.infoForm.email : undefined,
            phone: this.isNotBlank(this.infoForm.phone) ? this.infoForm.phone : undefined
          }
          userInfoUpdateAPI(param).then(res => {
            this.$message.success('个人资料更新成功')
            this.doGetUserInfo()
          }).catch(() => {})
        }
      })
    },
    onInfoCancel() {
      this.$refs.infoForm.resetFields()
      this.doGetUserInfo()
    }
  }
}
</script>


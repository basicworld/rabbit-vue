<template>
  <div class="regist-container">
    <el-form
      ref="registForm"
      :model="registForm"
      :rules="registRules"
      class="regist-form"
      auto-complete="on"
      label-position="left"
      label-width="120px"
    >

      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <el-form-item prop="username" label="用户名">
        <el-input
          ref="username"
          v-model="registForm.username"
          placeholder="请输入用户名，仅支持小写字母和数字"
          name="username"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="nickname" label="昵称">
        <el-input
          ref="nickname"
          v-model="registForm.nickname"
          placeholder="请输入昵称"
          name="nickname"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="passwordConfirm" label="确认密码">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registForm.passwordConfirm"
          :type="passwordType"
          placeholder="再次输入密码"
          name="password"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="email" label="邮箱">
        <el-input
          ref="email"
          v-model="registForm.email"
          placeholder="请输入邮箱"
          name="email"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="emailCaptcha" label="邮箱验证码">
        <el-input
          ref="emailCaptcha"
          v-model="registForm.emailCaptcha"
          placeholder="邮箱验证码"
          name="emailCaptcha"
          type="text"
          auto-complete="off"
        >
          <el-button slot="append">发送邮箱验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" label="图片验证码">
        <el-input
          ref="captcha"
          v-model="registForm.captcha"
          placeholder="图片验证码"
          name="captcha"
          type="text"
          auto-complete="off"
          class="img-container"
        >
          <div slot="append" style="width: 140px; height: 40px;">
            <img
              :src="captchaUrl"
              title="点击替换"
              alt="验证码"
              style="cursor: pointer; width:140px; height: 40px;"
              @click="reloadCaptcha"
            >
          </div>
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegist"
      >注册</el-button>

      <div class="tips">
        <span style="margin-right:20px;">
          <a :href="'#/login'">已有账号，点我登录</a>
        </span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { captchaGetAPI } from '@/api/user'
export default {
  name: 'Regist',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确格式的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (undefined === value || value.length < 6) {
        callback(new Error('请输入6位以上密码'))
      } else {
        callback()
      }
    }
    const validateTwoPassword = (rule, value, callback) => {
      if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // 图片验证码地址
      captchaUrl: undefined,
      registForm: {
        username: undefined,
        password: undefined,
        passwordConfirm: undefined,
        nickname: undefined
      },
      registRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        nickname: [{ required: true, trigger: 'blur', message: '昵称不能为空' },
          { min: 2, max: 20, message: '昵称长度限制为2-20个字符' }
        ],
        email: [{ required: true, trigger: 'blur', message: '邮箱不能为空' }],
        emailCaptcha: [{ required: true, trigger: 'blur', message: '邮箱验证码不能为空' }],
        captcha: [{ required: true, trigger: 'blur', message: '图片验证码不能为空' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        passwordConfirm: [
          { required: true, trigger: 'blur', validator: validatePassword },
          { trigger: 'blur', validator: validateTwoPassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.reloadCaptcha()
  },
  methods: {
    reloadCaptcha() {
      captchaGetAPI().then(res => {
        this.captchaUrl = 'data:image/gif;base64,' + res.data.base64
        this.registForm.uuid = res.data.uuid
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegist() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.registForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
 .img-container{
    .el-input-group__append{
      padding: 0;
      border: 0;
    }
  }
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.regist-container {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/images/bg.jpg);
  background-size: 100%;
  background-position-x: center;
  overflow: hidden;
  // height:100%;
  background-size:cover;

  .regist-form {
    background-color: #fff;
    position: relative;
    width: 600px;
    max-width: 100%;
    padding: 40px 35px 30px;
    margin: 60px auto;
    overflow: hidden;
    border-radius: 1%;
  }

  .tips {
    font-size: 14px;
    color: #454545;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #454545;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

}
</style>

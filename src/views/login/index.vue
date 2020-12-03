<template>
  <div class="login-container">
    <img
      src="../../assets/images/computer.png"
      alt="加载失败"
      style="width:36%;height:36%;position:absolute;top:26%;left:12%;"
    >
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          prefix-icon="el-icon-user"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
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

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">
          <a :href="'#/register'">注册</a>
        </span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { captchaGetAPI } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确格式的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入6位以上密码'))
      } else {
        callback()
      }
    }
    return {
      // 图片验证码地址
      captchaUrl: undefined,
      loginForm: {
        username: 'admin',
        password: '111111',
        captcha: undefined
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', message: '图片验证码不能为空' }]
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
        this.loginForm.uuid = res.data.uuid
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
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

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/images/bg.jpg);
  background-size: 100%;
  background-position-x: center;
  overflow: hidden;
  height:100%;
  background-size:cover;

  .el-input {
    // display: inline-block;
  }

  .login-form {
    background-color: #fff;
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 40px 35px 30px;
    margin: 100px 60% 0;
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

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
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

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<template>
  <div class="app-container">
    <!-- 参数配置 -->
    <el-form
      ref="form"
      v-loading="loading"
      :model="form"
      size="small"
      :inline="false"
      :rules="rules"
      label-width="220px"
      style="width: 780px"
    >
      <el-form-item
        v-for="conf in tableData"
        :key="conf.id"
        :label="conf.cname"
      >
        <el-input v-if="conf.ctype === 'string' || conf.ctype === 'number'" v-model="form[conf.ckey]" />
        <el-input v-if="conf.ctype === 'password'" v-model="form[conf.ckey]" type="password" />
        <el-switch
          v-if="conf.ctype === 'boolean'"
          v-model="form[conf.ckey]"
          active-value="true"
          inactive-value="false"
        />
      </el-form-item>
      <el-form-item style="color: #F56C6C;">
        <span>注：已【保存】参数默认在下次系统启动时生效，或点击【刷新缓存】立即生效</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" size="mini" @click="submitForm">保存</el-button>
        <el-button icon="el-icon-close" size="mini" @click="cacel">取消修改</el-button>
        <el-tooltip class="item" effect="dark" content="点击以使保存参数立即生效" placement="right">
          <el-button type="danger" icon="el-icon-refresh" size="mini" @click="reCacheConfig">刷新缓存</el-button>
        </el-tooltip>
      </el-form-item>

      <el-form-item prop="emailTo">
        <el-input
          v-model="emailTo"
          placeholder="example@abc.com"
          clearable
          size="small"
        >
          <el-button slot="append" size="mini" icon="el-icon-message" @click="sendEmail">发送测试邮件</el-button>
        </el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { configListAPI, configReCacheAPI, configUpdateAPI, emailConfigTestAPI } from '@/api/system/config'
import { diffObjectFunc } from '@/utils/object-util'
import { areYouOk } from '@/api/router'

export default {
  name: 'Config',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表格数据
      tableData: [],
      // 表单参数
      form: {},
      // 修改前的表单参数
      constForm: {},
      // 目标邮箱
      emailTo: undefined,
      emailForm: {},
      // 表单校验
      rules: {

      }
    }
  },
  created() {
    areYouOk().then(() => {
      this.getList()
    })
  },
  methods: {
    sendEmail() {
      if (undefined === this.emailTo || this.emailTo.trim() === '') {
        return
      }
      emailConfigTestAPI(this.emailTo).then(resp => {
        this.$message.success(resp.msg)
      })
    },
    /** 取消修改按钮操作 */
    cacel() {
      this.getList()
    },
    /** 重置按钮操作 */
    reCacheConfig() {
      configReCacheAPI().then(resp => {
        this.$message.success(resp.msg)
      })
    },
    // 获取列表
    getList() {
      configListAPI().then(resp => {
        const respForm = {}
        for (let i = 0; i < resp.data.length; i++) {
          respForm[resp.data[i].ckey] = resp.data[i].cvalue
        }
        this.form = respForm
        this.constForm = Object.assign({}, respForm)

        this.tableData = resp.data

        this.loading = false
      })
    },

    // 修改提交
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 找到修改后的配置
          const diffForm = diffObjectFunc(this.constForm, this.form)
          if (undefined === diffForm) {
            this.$message.info('未修改任何参数，无需保存')
            return
          }
          // 仅提交修改过的配置
          const updateItemList = []
          Object.keys(diffForm).forEach(ckey => {
            const item = {
              ckey: ckey.trim(),
              cvalue: diffForm[ckey].trim()
            }
            updateItemList.push(item)
          })
          configUpdateAPI(updateItemList).then(response => {
            this.$message.success('修改成功')
            this.getList()
          })
        }
      })
    }

  }
}
</script>

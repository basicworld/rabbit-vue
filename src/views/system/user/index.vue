<template>
  <div class="app-container">
    <!--搜索区-->
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入用户昵称"
          clearable
          size="small"
          style="width: 180px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!--操作按钮区-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>
    <!--表格展示区-->
    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="45" />
      <el-table-column prop="userId" label="编号" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="deptName" label="部门" />
      <el-table-column fixed="right" label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-key"
            @click="handleResetPwd(scope.row)"
          >重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total >= 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!--弹窗操作区-->
    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名（全局唯一）" />
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-select v-model="form.deptId" filterable placeholder="请选择部门" style="width: 100%;">
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.fullname"
              :value="item.id"
              empty-text="加载中，请稍后"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="form.roleIds" filterable multiple placeholder="请选择角色（可多选）" style="width: 100%;">
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              empty-text="加载中，请稍后"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号（全局唯一）" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱（全局唯一）" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
    <!-- 重置密码对话框 -->
    <el-dialog title="重置密码" :visible.sync="pwdOpen" width="500px" append-to-body>
      <el-form ref="pwdForm" size="small" :model="pwdForm" :rules="pwdRules" label-width="80px">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="pwdForm.password" type="password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input v-model="pwdForm.passwordConfirm" type="password" placeholder="请再次输入新密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="pwdSubmitForm">确定</el-button>
        <el-button size="small" @click="pwdCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { userResetPasswordAPI, userListAPI, userCreateAPI, userUpdateAPI, userGetAPI, userDeleteAPI } from '@/api/system/user'
import { deptListAPI } from '@/api/system/dept'
import { roleListAPI } from '@/api/system/role'
import { encrypt } from '@/utils/jsencrypt'

export default {
  name: 'User',
  components: { Pagination },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.pwdForm.password !== this.pwdForm.passwordConfirm) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 角色列表
      roleOptions: [],
      // 部门列表
      deptOptions: [],
      // 账号类型列表
      categoryOptions: [
        { id: 1, name: '手机号' },
        { id: 2, name: '邮箱' },
        { id: 3, name: '用户名' },
        { id: 4, name: '身份证' },
        { id: 5, name: '微信' }
      ],
      // 表格数据
      tableData: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nickname: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        username: [
          { required: true, message: '账号名称不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '账号类型不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }

        ],
        deptId: [
          { required: true, message: '部门为必选项', trigger: 'blur' }
        ],
        roleIds: [
          { required: true, message: '角色为必选项', trigger: 'blur' }
        ]

      },
      pwdOpen: false,
      pwdForm: {},
      pwdRules: {
        password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDeptOptions()
    this.getRoleOptions()
  },
  methods: {
    // 重置密码
    handleResetPwd(row) {
      this.pwdForm = {
        userId: row.userId,
        password: undefined,
        passwordConfirm: undefined
      }
      this.pwdOpen = true
    },
    // 重置密码提交
    pwdSubmitForm() {
      this.$refs['pwdForm'].validate(valid => {
        if (valid) {
          const param = {
            userId: this.pwdForm.userId,
            password: encrypt(this.pwdForm.password)
          }
          userResetPasswordAPI(param).then(resp => {
            this.$message.success(resp.msg)
            this.pwdOpen = false
          })
        }
      })
    },
    // 取消重置密码
    pwdCancel() {
      this.pwdOpen = false
    },
    // 账号类型解析
    parseCategory(categoryId) {
      for (let i = 0; i < this.categoryOptions.length; i++) {
        if (categoryId === this.categoryOptions[i].id) {
          return this.categoryOptions[i].name
        }
      }
      return categoryId
    },
    // 弹窗取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    /** 查询部门列表结构 */
    getDeptOptions() {
      deptListAPI({ pageNum: 1, pageSize: 99999 }).then(resp => {
        this.deptOptions = resp.data
      })
    },
    /** 查询角色列表结构 */
    getRoleOptions() {
      roleListAPI({ pageNum: 1, pageSize: 99999 }).then(resp => {
        this.roleOptions = resp.rows
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs['queryForm'].resetFields()
      this.handleQuery()
    },
    // 获取列表
    getList() {
      userListAPI(this.queryParams).then(resp => {
        this.tableData = resp.rows
        this.total = resp.total
        this.loading = false
      })
    },
    // 新增弹窗
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加用户'
    },
    // 修改弹窗
    handleUpdate(row) {
      this.reset()
      const userId = row.userId || this.ids
      userGetAPI(userId).then(resp => {
        this.form = resp.data
        this.open = true
        this.title = '修改用户'
      })
    },
    // 新增提交、修改提交
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.userId !== undefined) {
            userUpdateAPI(this.form).then(response => {
              this.$message.success('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            userCreateAPI(this.form).then(response => {
              this.$alert(response.msg, {
                confirmButtonText: '确定'
              })
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    // 删除处理和提交
    handleDelete(row) {
      const userIds = row.userId || this.ids
      this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return userDeleteAPI(userIds)
      }).then(() => {
        this.getList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        username: undefined,
        nickname: undefined,
        phone: undefined,
        email: undefined,
        idcard: undefined,
        wechat: undefined,
        deptId: undefined,
        deptName: undefined,
        category: undefined,
        roleIds: []
      }
    }
  }
}
</script>

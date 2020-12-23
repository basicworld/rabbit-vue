<template>
  <div class="app-container">
    <!--搜索区-->
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="部门筛选" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="筛选部门名称/部门代码"
          clearable
          size="small"
          style="width: 300px"
        />
      </el-form-item>

      <el-form-item>
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
    </el-row>
    <!--表格展示区-->

    <el-table
      v-loading="loading"
      :data="filterData"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="fullname" label="部门全称" min-width="200" />
      <el-table-column prop="orgcode" label="部门代码" min-width="140" />
      <el-table-column label="创建时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{ renderTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹窗操作区-->
    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上级部门" prop="parentId">
          <treeselect v-model="form.parentId" :options="deptOptions" :normalizer="normalizer" placeholder="选择上级部门" />
        </el-form-item>
        <el-form-item label="部门全称" prop="fullname">
          <el-input v-model="form.fullname" placeholder="请输入部门全称" />
        </el-form-item>
        <el-form-item label="部门简称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门简称" />
        </el-form-item>
        <el-form-item label="部门代码" prop="orgcode">
          <el-input v-model="form.orgcode" placeholder="请输入部门代码/组织机构代码" />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deptTreeAPI, deptCreateAPI, deptUpdateAPI, deptGetAPI, deptDeleteAPI } from '@/api/system/dept'
import { roleListAPI } from '@/api/system/role'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { areYouOk } from '@/api/router'

export default {
  name: 'Dept',
  components: { Treeselect },
  data() {
    return {
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 遮罩层
      loading: true,
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
      // 表格数据
      tableData: [],
      // 查询参数
      queryParams: {
        name: undefined,
        orgcode: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: '上级部门为必选项', trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: '部门全称不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '部门简称不能为空', trigger: 'blur' }
        ],
        orgcode: [
          { required: true, message: '部门代码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  // 搜索数据
  computed: {
    // 动态筛选框
    filterData: function() {
      /** 单个dept筛选器 */
      var deptFilter = (dept, input) => {
        return Object.keys(dept).some(function(key1) {
          return String(dept[key1]).toLowerCase().match(input)
        })
      }
      /** dept树遍历 筛选器 */
      var deptLoopFilter = (dept, input) => {
        var showMe = false // 显示标记
        if (dept) {
          // 判断是否显示本部门
          showMe = showMe || deptFilter(dept, input)
          if (dept.children) {
            for (var i = 0; i < dept.children.length; i++) {
              // 如果需要显示子部门，则本部门也应显示
              showMe = showMe || deptLoopFilter(dept.children[i], input)
            }
          }
        }
        return showMe
      }

      var input = this.queryParams.name && this.queryParams.name.toLowerCase()
      var items = this.tableData
      var items1
      if (input) {
        items1 = items.filter(function(item) {
          return deptLoopFilter(item, input)
        })
      } else {
        items1 = items
      }
      return items1
    }
  },
  created() {
    areYouOk().then(() => {
      this.getList()
      this.getRoleOptions()
    })
  },
  methods: {

    /** 转换部门数据结构 */
    normalizer(node) {
      // 去掉children=null的属性
      if (node.children == null || node.children === 'null') {
        delete node.children
      }
      return {
        id: node.id,
        label: node.fullname,
        children: node.children
      }
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    /** 查询角色可选列表 */
    getRoleOptions() {
      roleListAPI().then(resp => {
        this.roleOptions = resp.rows
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs['queryForm'].resetFields()
      this.getList()
    },
    // 获取列表
    getList() {
      deptTreeAPI(this.queryParams).then(resp => {
        this.tableData = resp.data
        // 根机构，可选不可见，选择根机构后，创建的机构作为顶级机构展示
        const rootDept = { id: 0, parentId: -1, fullname: '根机构', name: '根机构', children: this.tableData }
        this.deptOptions = [rootDept]
        this.loading = false
      })
    },
    // 新增弹窗
    handleAdd(row) {
      this.reset()
      if (row.id) {
        this.form.parentId = row.id
      }
      this.open = true
      this.title = '添加部门'
    },
    // 修改弹窗
    handleUpdate(row) {
      this.reset()
      const deptId = row.id
      deptGetAPI(deptId).then(resp => {
        this.form = resp.data
        this.open = true
        this.title = '修改部门'
      })
    },
    // 新增提交、修改提交
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            deptUpdateAPI(this.form).then(response => {
              this.$message.success('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            deptCreateAPI(this.form).then(response => {
              this.$message.success('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    // 删除处理和提交
    handleDelete(row) {
      const deptId = row.id
      this.$confirm('是否确认删除部门"' + row.fullname + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return deptDeleteAPI(deptId)
      }).then(() => {
        this.getList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        parentId: undefined,
        fullname: undefined,
        name: undefined,
        orgcodecode: undefined,
        roleIds: []
      }
    }
  }
}
</script>

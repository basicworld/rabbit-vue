<template>
  <div class="app-container">
    <!--搜索区-->
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="操作类型" prop="logtype">
        <el-select
          v-model="queryParams.operType"
          style="width: 180px"
          clearable
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in logtypeOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名"
          clearable
          size="small"
          style="width: 180px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作结果" prop="success">
        <el-select
          v-model="queryParams.isSuccess"
          style="width: 180px"
          clearable
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in resultOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--表格展示区-->
    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="45" />
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="operType" label="操作类型" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="isSuccess" label="结果">
        <template slot-scope="scope">
          <i v-if="scope.row.isSuccess === true" class="el-icon-success" style="color: #67C23A;" />
          <i v-if="scope.row.isSuccess !== true" class="el-icon-error" style="color: #F56C6C;" />
        </template>
      </el-table-column>
      <el-table-column prop="operTime" label="时间" min-width="100">
        <template slot-scope="scope">
          <span>{{ renderTime(scope.row.operTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operContent" label="动作" min-width="200" />

    </el-table>
    <pagination
      v-show="total >= 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { logtypeListAPI, logListAPI } from '@/api/system/log'
export default {
  name: 'Log',
  components: { Pagination },
  data() {
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
      // 可选日志类型
      logtypeOptions: [],
      resultOptions: [
        { label: '成功', value: true },
        { label: '失败', value: false }
      ],
      // 表格数据
      tableData: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        operType: undefined,
        userName: undefined,
        isSuccess: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      }

    }
  },
  created() {
    this.getList()
    this.getLogtype()
  },
  methods: {
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    /** 查询日志类型列表 */
    getLogtype() {
      logtypeListAPI().then(resp => {
        const rawOptions = resp.data
        const items = []
        for (let i = 0; i < rawOptions.length; i++) {
          const item = {
            id: i,
            name: rawOptions[i]
          }
          items.push(item)
        }
        this.logtypeOptions = resp.data
      })
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
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
      this.queryParams.operType = undefined
      this.queryParams.isSuccess = undefined
      this.handleQuery()
    },
    // 获取列表
    getList() {
      logListAPI(this.queryParams).then(resp => {
        this.tableData = resp.rows
        this.total = resp.total
        this.loading = false
      })
    }

  }
}
</script>

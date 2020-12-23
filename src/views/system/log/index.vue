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
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="operType" label="操作类型" />
      <el-table-column prop="isSuccess" label="是否成功">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isSuccess" size="mini" effect="dark" type="success" @click="showDetail(scope.row)">{{ scope.row.isSuccess }}</el-tag>
          <el-tag v-if="!scope.row.isSuccess" size="mini" effect="dark" type="danger" @click="showDetail(scope.row)">{{ scope.row.isSuccess }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operTime" label="操作时间" min-width="100">
        <template slot-scope="scope">
          <span>{{ renderTime(scope.row.operTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operContent" label="操作描述" min-width="200" />

    </el-table>
    <pagination
      v-show="total >= 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!--弹窗操作区-->
    <!-- 查看日志详情 -->
    <el-dialog title="日志详情" :visible.sync="open" append-to-body :width="dialogWidth">
      <table width="100%" class="table">
        <tr>
          <td>日志编号</td>
          <td colspan="3">{{ logItem.id }}</td>
        </tr>
        <tr>
          <td>用户名称</td>
          <td colspan="3">
            {{ logItem.userName }}
            <span v-if="logItem.userId">  (ID = {{ logItem.userId }})</span>
          </td>
        </tr>
        <tr>
          <td>操作类型</td>
          <td colspan="3">{{ logItem.operType }}</td>
        </tr>
        <tr>
          <td>是否成功</td>
          <td colspan="3">
            <el-tag v-if="logItem.isSuccess" size="mini" effect="dark" type="success">{{ logItem.isSuccess }}</el-tag>
            <el-tag v-if="!logItem.isSuccess" size="mini" effect="dark" type="danger">{{ logItem.isSuccess }}</el-tag>
          </td>
        </tr>
        <tr>
          <td>操作时间</td>
          <td colspan="3">{{ renderTime(logItem.operTime) }}</td>
        </tr>
        <tr>
          <td>输入参数</td>
          <td colspan="3">
            <span v-if="logItem.operArgs"> {{ logItem.operArgs }}</span>
            <span v-if="!logItem.operArgs"> ******</span>
          </td>
        </tr>
        <tr>
          <td>操作描述</td>
          <td colspan="3">{{ logItem.operContent }}</td>
        </tr>
        <tr>
          <td>返回结果</td>
          <td colspan="3">{{ logItem.returnMsg }}</td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { logtypeListAPI, logListAPI, logGetAPI } from '@/api/system/log'
import { areYouOk } from '@/api/router'

export default {
  name: 'Log',
  components: { Pagination },
  data() {
    return {
      // 单条日志详情
      logItem: {},
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
      // 对话框宽度
      dialogWidth: '50%',
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
    areYouOk().then(() => {
      this.getList()
      this.getLogtype()
    })
  },
  mounted() {
    this.setDialogWidth()
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  methods: {
    setDialogWidth() {
      var val = document.body.clientWidth
      const def = 800 // 默认宽度
      if (val < def) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = '50%'
      }
    },
    // 查看日志详情
    showDetail(log) {
      logGetAPI(log.id).then(resp => {
        this.logItem = resp.data
        this.open = true
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    /** 查询日志类型列表 */
    getLogtype() {
      logtypeListAPI().then(resp => {
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
<style type="text/css" scoped>
  table {
      font-size: 14px;
      line-height:1.6em;
  }

  table {
      table-layout: fixed;
      empty-cells: show;
      border-collapse: collapse;
      margin: 0 auto;
  }

  td {
      height: 30px;
  }

  .table {
      border: 1px solid #DCDFE6;
      color: #666;
  }

  .table th {
      background-repeat: repeat-x;
      height: 30px;
  }

  .table td,
  .table th {
      border: 1px solid #DCDFE6;
      padding: 0 1em 0;
  }

  .table tr.alter {
      background-color: rgb(217,236,255);
  }
  .table .subtitle{
    text-align : center;
  }
</style>

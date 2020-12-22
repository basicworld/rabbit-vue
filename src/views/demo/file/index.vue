<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      action="#"
      :on-preview="handleFilePreview"
      :on-remove="handleFileRemove"
      :before-remove="beforeFileRemove"
      :on-exceed="handleFileExceed"
      multiple
      :limit="10"
      :file-list="fileList"
      :before-upload="handleFileBeforeUpload"
      :http-request="handleFileUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">最多10个附件，文件大小不超过10MB</div>
    </el-upload>
  </div>
</template>
<script>
import { fileUploadAPI, fileDeleteAPI, fileDownloadFunc } from '@/api/demo/file'
export default {
  name: 'DemoFile',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    // 执行删除
    handleFileRemove(file, fileList) {
      const id = file.id
      const i = this.fileList.findIndex(item => item.id === id)
      this.fileList.splice(i, 1)
      // 成功上传的 进行远程删除
      if (file.status === 'success') {
        // 远程删除
        fileDeleteAPI(file.id).then(res => {
          this.$message.success(res.msg)
        })
      }
    },
    handleFilePreview(file) {
      console.log(file)
      fileDownloadFunc(file.id, file.fileName)
    },
    // 超出文件数限制的提示
    handleFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 删除前的钩子
    beforeFileRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传文件前的检查
    handleFileBeforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10

      // 这里常规检验，看项目需求而定
      if (!isLt10M) {
        this.$message.warning('只能上传小于10M的附件')
        return false
      }
    },
    // 执行上传文件
    handleFileUpload(params) {
      const file = params.file
      // 根据后台需求数据格式
      const form = new FormData()
      // 文件对象
      form.append('file', file)
      fileUploadAPI(form).then(res => {
        const item = {
          name: res.data.rawFileName,
          fileName: res.data.rawFileName,
          diskFileName: res.data.diskFileName,
          id: res.data.diskFileName,
          uid: file.uid,
          status: file.status
        }
        // 必须执行，否则无法把自定义参数传入upload组件的fileList
        this.fileList.push(item)
      })
    }
  }
}
</script>

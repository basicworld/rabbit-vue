import request from '@/utils/request'
import { downloadFile } from '@/utils/file-util'

// 文件上传
export function fileUploadAPI(data) {
  return request({
    url: '/demo/file',
    method: 'post',
    data
  })
}
// 文件上传
export function fileDeleteAPI(filename) {
  return request({
    url: '/demo/file/' + filename,
    method: 'delete'
  })
}
// 文件下载
export function fileDownloadFunc(filename, saveFilename) {
  const url = process.env.VUE_APP_BASE_API + '/demo/file/download/' + filename
  downloadFile({}, url, saveFilename)
}

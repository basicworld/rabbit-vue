module.exports = [
  // file delete
  {
    url: '/demo/file',
    type: 'delete',
    response: config => {
      return {
        'msg': '删除成功',
        'code': 20000
      }
    }
  },
  // file upload
  {
    url: '/demo/file',
    type: 'post',
    response: config => {
      return {
        'msg': '上传成功',
        'code': 20000,
        data: {
          rawFileName: 'rawfilename.jpg',
          diskFileName: 'uuid.jpg'
        }
      }
    }
  }
]

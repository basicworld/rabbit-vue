module.exports = [
  {
    url: '/system/log/logtype/list',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          '用户登录',
          '用户修改密码',
          '用户修改信息',
          '用户登出',
          '新增用户',
          '删除用户',
          '编辑用户',
          '重置密码',
          '新增角色',
          '删除角色',
          '编辑角色',
          '新增部门',
          '删除部门',
          '编辑部门',
          '其他操作'
        ]
      }
    }
  },
  // get
  {
    url: '/system/log/\\d',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': {
          'id': 58,
          'userId': 1,
          'userName': 'admin',
          'operType': '用户登出',
          'operTime': '2020-12-13T00:42:30.000+0800',
          'operContent': '退出成功',
          'isSuccess': true,
          'operArgs': null,
          'returnMsg': '{"msg":"退出成功","code":20000}',
          'requestMethod': null
        }
      }
    }
  },
  {
    url: '/system/log/list',
    type: 'get',
    response: config => {
      return {
        'total': 10,
        'rows': [
          {
            'id': 50,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登出',
            'operTime': '2020-12-13T00:12:18.000+0800',
            'operContent': '退出成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"退出成功","code":20000}',
            'requestMethod': null
          },
          {
            'id': 51,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登录',
            'operTime': '2020-12-13T00:12:24.000+0800',
            'operContent': '登录成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"success","code":20000,"data":"eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjFjOGU5YmFmLTFkNDUtNDA4NS1hMmEwLWYyMjZlZmQ5ODEwYSJ9.kt9BhniH6GzNqg1ZsslrQ9OddHaBkmD7LYuAIZj2pAMr6KesJcJRIhSGChu0dAQUhkrNe6mUBDsA3oBBRa4B0w"}',
            'requestMethod': null
          },
          {
            'id': 52,
            'userId': 1,
            'userName': 'admin',
            'operType': '重置密码',
            'operTime': '2020-12-13T00:12:53.000+0800',
            'operContent': 'com.rabbit.system.controller.SysPersonalController.updatePassword()',
            'isSuccess': false,
            'operArgs': null,
            'returnMsg': '{"msg":"新旧密码相同，无需更新","code":40000}',
            'requestMethod': 'PUT'
          },
          {
            'id': 53,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户修改信息',
            'operTime': '2020-12-13T00:13:30.000+0800',
            'operContent': 'com.rabbit.system.controller.SysPersonalController.updateInfo()',
            'isSuccess': true,
            'operArgs': '{"phone":"13344445552","nickname":"超管哦！!","email":"admin@123.com"}',
            'returnMsg': '{"msg":"操作成功","code":20000}',
            'requestMethod': 'PUT'
          },
          {
            'id': 54,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登出',
            'operTime': '2020-12-13T00:27:44.000+0800',
            'operContent': '退出成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"退出成功","code":20000}',
            'requestMethod': null
          },
          {
            'id': 55,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登录',
            'operTime': '2020-12-13T00:27:48.000+0800',
            'operContent': '登录成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"success","code":20000,"data":"eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjFjNzNkMjZhLTE3YTYtNGI3MC1hMTJlLTFkOTIyMjBjZTBlZSJ9.vc71Yvpas4qRroeAluit5K0I5iGzj8I5pePH4vQUV5fzoRC6v8Tyk-UyUSMrHgGwv7yLmT4sMhGL0CWhABg1jA"}',
            'requestMethod': null
          },
          {
            'id': 56,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登出',
            'operTime': '2020-12-13T00:28:56.000+0800',
            'operContent': '退出成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"退出成功","code":20000}',
            'requestMethod': null
          },
          {
            'id': 57,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登录',
            'operTime': '2020-12-13T00:29:05.000+0800',
            'operContent': '登录成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"success","code":20000,"data":"eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImEyOTYxODI5LTQ1ZjEtNDFhMC1hNGM2LTRlYzU3OTQ4ZjBmOSJ9.3KrDJGSDmCqx_hiYeMpiQK7ONi5PlAWp-MNe0Z58qUUVSudBm6m8EnDb079wdSdl20SiSGMxKwwCdmOI8-rnAQ"}',
            'requestMethod': null
          },
          {
            'id': 58,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登出',
            'operTime': '2020-12-13T00:42:30.000+0800',
            'operContent': '退出成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"退出成功","code":20000}',
            'requestMethod': null
          },
          {
            'id': 59,
            'userId': 1,
            'userName': 'admin',
            'operType': '用户登录',
            'operTime': '2020-12-13T00:42:48.000+0800',
            'operContent': '登录成功',
            'isSuccess': true,
            'operArgs': null,
            'returnMsg': '{"msg":"success","code":20000,"data":"eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjM3MDRhYmI1LTE5YjgtNDc0ZS04NmFhLWRjOTEwNTZhOWRhNyJ9.1xQjYB3q-FEouUl4cZOYlW1ROcR80oaWLYRmh0WJLD-mHtZoepwV-s31M-ArBFr3Mx1I3NP497rcsPAjDpaVxw"}',
            'requestMethod': null
          }
        ],
        'code': 20000,
        'msg': '查询成功'
      }
    }
  }
]

module.exports = [
  // email config check
  {
    url: '/system/config/emailCheck/',
    type: 'get',
    response: config => {
      return {
        'msg': '邮件已发送，请查收验证',
        'code': 20000
      }
    }
  },
  // update
  {
    url: '/system/config',
    type: 'put',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000
      }
    }
  },
  // recache
  {
    url: '/system/config/recache',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000
      }
    }
  },
  // list
  {
    url: '/system/config/list',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 1,
            'cname': 'cname1',
            'ckey': 'ckey1',
            'cvalue': 'cvalue1',
            'systemBuilt': '0'
          },
          {
            'id': 2,
            'cname': 'cname2',
            'ckey': 'ckey2',
            'cvalue': 'cvalue2',
            'systemBuilt': '0'
          },
          {
            'id': 3,
            'cname': 'cname3',
            'ckey': 'ckey3',
            'cvalue': 'cvalue3',
            'systemBuilt': '0'
          }

        ]
      }
    }
  }
]

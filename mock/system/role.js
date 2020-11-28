const Mock = require('mockjs')
const data = Mock.mock({
  'items|7': [{
    'id|+1': 1,
    name: '@cword(3)',
    code: '@word',
    intro: '@cword(3,7)'
  }]

})

module.exports = [
  // list
  {
    url: '/system/role/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        msg: 'success',
        total: 20,
        rows: items
      }
    }
  },
  // get
  {
    url: '/system/role/\\d',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': {
          'id': 3,
          'name': 'uname',
          'code': 'nickcode',
          'intro': null,
          'createTime': null,
          'createBy': null,
          'updateTime': '2020-11-23T23:37:11.000+0800',
          'updateBy': null,
          'deleted': false,
          'menuIds': [

            2
          ]
        }
      }
    }
  },
  // add
  {
    url: '/system/role',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // update
  {
    url: '/system/role',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // delete
  {
    url: '/system/role',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  }
]

module.exports = [
  // add
  {
    url: '/system/user',
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
    url: '/system/user',
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
    url: '/system/user/\\d',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // get
  {
    url: '/system/user/\\d',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': {
          'userId': 2,
          'nickname': 'user1',
          'password': '****',
          'newPassword': null,
          'category': null,
          'username': null,
          'phone': '13411112222',
          'email': null,
          'idcard': null,
          'wechat': null,
          'deptId': null,
          'deptName': null,
          'deleted': false,
          'roleIds': [
            3
          ]
        }
      }
    }
  },
  // list
  {
    url: '/system/user/list',
    type: 'get',
    response: config => {
      return {
        'total': 11,
        'rows': [
          {
            'userId': 2,
            'nickname': 'user1',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': '13411112222',
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': false,
            'roleIds': null
          },
          {
            'userId': 3,
            'nickname': 'user2',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': 'user2',
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': false,
            'roleIds': null
          },
          {
            'userId': 4,
            'nickname': 'nick',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': true,
            'roleIds': null
          },
          {
            'userId': 5,
            'nickname': 'nick',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': 'uname9',
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': false,
            'roleIds': null
          },
          {
            'userId': 6,
            'nickname': 'name10',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': 'uname10',
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': false,
            'roleIds': null
          },
          {
            'userId': 7,
            'nickname': 'name10',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': true,
            'roleIds': null
          },
          {
            'userId': 8,
            'nickname': 'uname12',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': true,
            'roleIds': null
          },
          {
            'userId': 9,
            'nickname': 'uname12',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': true,
            'roleIds': null
          },
          {
            'userId': 10,
            'nickname': 'uname13',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': true,
            'roleIds': null
          },
          {
            'userId': 11,
            'nickname': 'uname13',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': null,
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': true,
            'roleIds': null
          },
          {
            'userId': 12,
            'nickname': 'nick',
            'password': '******',
            'newPassword': null,
            'category': null,
            'username': 'uname',
            'phone': null,
            'email': null,
            'idcard': null,
            'wechat': null,
            'deptId': null,
            'deptName': null,
            'deleted': false,
            'roleIds': null
          }
        ],
        'code': 20000,
        'msg': '查询成功'
      }
    }
  }
]

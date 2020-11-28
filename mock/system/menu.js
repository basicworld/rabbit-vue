module.exports = [
  // treeselect
  {
    url: '/system/menu/treeselect',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 1,
            'label': '系统管理',
            'children': [
              {
                'id': 2,
                'label': '角色管理'
              },
              {
                'id': 3,
                'label': '用户管理'
              }
            ]
          }
        ]
      }
    }
  },
  // list
  {
    url: '/system/menu/list',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 1,
            'parentId': 0,
            'name': '系统管理',
            'path': '/system',
            'component': 'layout',
            'orderNum': null,
            'isFrame': null,
            'visible': null,
            'status': null,
            'perms': null,
            'icon': null,
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': []
          },
          {
            'id': 2,
            'parentId': 1,
            'name': '角色管理',
            'path': '/system/role',
            'component': 'layout',
            'orderNum': null,
            'isFrame': null,
            'visible': null,
            'status': null,
            'perms': null,
            'icon': null,
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': []
          },
          {
            'id': 3,
            'parentId': 1,
            'name': '用户管理',
            'path': '/system/user',
            'component': 'layout',
            'orderNum': null,
            'isFrame': null,
            'visible': null,
            'status': null,
            'perms': null,
            'icon': null,
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': []
          }
        ]
      }
    }
  },
  // tree
  {
    url: '/system/menu/tree',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 1,
            'parentId': 0,
            'name': '系统管理',
            'path': '/system',
            'component': 'layout',
            'orderNum': null,
            'isFrame': null,
            'visible': null,
            'status': null,
            'perms': null,
            'icon': null,
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': [
              {
                'id': 2,
                'parentId': 1,
                'name': '角色管理',
                'path': '/system/role',
                'component': 'layout',
                'orderNum': null,
                'isFrame': null,
                'visible': null,
                'status': null,
                'perms': null,
                'icon': null,
                'createTime': null,
                'createBy': null,
                'updateTime': null,
                'updateBy': null,
                'deleted': false,
                'children': null
              },
              {
                'id': 3,
                'parentId': 1,
                'name': '用户管理',
                'path': '/system/user',
                'component': 'layout',
                'orderNum': null,
                'isFrame': null,
                'visible': null,
                'status': null,
                'perms': null,
                'icon': null,
                'createTime': null,
                'createBy': null,
                'updateTime': null,
                'updateBy': null,
                'deleted': false,
                'children': null
              }
            ]
          }
        ]
      }
    }
  }

]

module.exports = [
  // add
  {
    url: '/system/dept',
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
    url: '/system/dept',
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
    url: '/system/dept/\\d',
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
    url: '/system/dept/\\d',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': {
          'id': 7,
          'parentId': 0,
          'fullname': 'fullname',
          'name': 'name',
          'orgcode': '123456',
          'createTime': null,
          'createBy': null,
          'updateTime': null,
          'updateBy': null,
          'deleted': false,
          'children': [],
          'roleIds': [
            6,
            7,
            8
          ],
          'userIds': null
        }
      }
    }
  },
  // list
  {
    url: '/system/dept/list',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 7,
            'parentId': 0,
            'fullname': 'fullname',
            'name': 'name',
            'orgcode': '123456',
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': [],
            'roleIds': null,
            'userIds': null
          },
          {
            'id': 8,
            'parentId': 7,
            'fullname': 'fullname2',
            'name': 'name2',
            'orgcode': '22222',
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': [],
            'roleIds': null,
            'userIds': null
          },
          {
            'id': 9,
            'parentId': 8,
            'fullname': 'fullname3',
            'name': 'name3',
            'orgcode': '11111',
            'createTime': null,
            'createBy': null,
            'updateTime': '2020-11-22T18:13:47.000+0800',
            'updateBy': null,
            'deleted': false,
            'children': [],
            'roleIds': null,
            'userIds': null
          },
          {
            'id': 10,
            'parentId': 0,
            'fullname': '大公司',
            'name': '公司',
            'orgcode': '12121212',
            'createTime': null,
            'createBy': null,
            'updateTime': '2020-11-28T10:16:24.000+0800',
            'updateBy': null,
            'deleted': false,
            'children': [],
            'roleIds': null,
            'userIds': null
          }
        ]
      }
    }
  },
  // tree
  {
    url: '/system/dept/tree',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 7,
            'parentId': 0,
            'fullname': 'fullname',
            'name': 'name',
            'orgcode': '123456',
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': [
              {
                'id': 8,
                'parentId': 7,
                'fullname': 'fullname2',
                'name': 'name2',
                'orgcode': '22222',
                'createTime': null,
                'createBy': null,
                'updateTime': null,
                'updateBy': null,
                'deleted': false,
                'children': [
                  {
                    'id': 9,
                    'parentId': 8,
                    'fullname': 'fullname3',
                    'name': 'name3',
                    'orgcode': '11111',
                    'createTime': null,
                    'createBy': null,
                    'updateTime': '2020-11-22T18:13:47.000+0800',
                    'updateBy': null,
                    'deleted': false,
                    'children': null,
                    'roleIds': null,
                    'userIds': null
                  }
                ],
                'roleIds': null,
                'userIds': null
              }
            ],
            'roleIds': null,
            'userIds': null
          },
          {
            'id': 10,
            'parentId': 0,
            'fullname': '大公司',
            'name': '公司',
            'orgcode': '1111',
            'createTime': null,
            'createBy': null,
            'updateTime': null,
            'updateBy': null,
            'deleted': false,
            'children': null,
            'roleIds': null,
            'userIds': null
          }
        ]
      }
    }
  }
]


const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/personal/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username].token

      // mock error
      if (!token) {
        return {
          code: 60204,
          msg: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },
  // update info
  {
    url: '/personal/info',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // update password
  {
    url: '/personal/password',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // get user info
  {
    url: '/personal/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          msg: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info,
        msg: 'success'
      }
    }
  },

  // user logout
  {
    url: '/personal/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // captcha
  {
    url: '/captcha',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        msg: 'success',
        data: {
          base64: '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',
          uuid: 1
        }
      }
    }
  }
]

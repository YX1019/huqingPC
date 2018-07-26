let apiUrl = '/api/hqyt/'
let url = {
  api: {
    login: apiUrl + 'userLogin.do', // 登录
    register: apiUrl + 'forgetPwd.do', // 忘记密码，注册
    bannerQuery: apiUrl + 'bannerQuery.do' // 首页banner
  }
}

export {url}

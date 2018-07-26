let apiUrl = '/api/hqyt/'
let url = {
  api: {
    login: apiUrl + 'userLogin.do', // 登录
    forgetPwd: apiUrl + 'forgetPwd.do', // 忘记密码
    bannerQuery: apiUrl + 'bannerQuery.do', // 首页banner
    sendVerifyCode: apiUrl + 'sendVerifyCode.do', // 发送验证码 1注册 2忘记密码
    register: apiUrl + 'register.do', // 注册
    knowledgeQuery: apiUrl + 'knowledgeQuery.do', // 新闻，养生知识点查询 1：新闻 2：养生知识
    pickGoods: apiUrl + 'merchantProQuery.do', // 首页的推荐商品
    queryProduct: apiUrl + 'queryProduct.do' // 商城商品列表
  }
}

export {url}

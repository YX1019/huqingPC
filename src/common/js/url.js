let apiUrl = '/api/fyapp/'
// let apiUrl = process.env.API_ROOT
let url = {
  api: {
    login: apiUrl + 'userLogin.do', // 登录
    forgetPwd: apiUrl + 'forgetPwd.do', // 忘记密码
    bannerQuery: apiUrl + 'bannerQuery.do', // 首页banner
    sendVerifyCode: apiUrl + 'sendVerifyCode.do', // 发送验证码 1注册 2忘记密码
    register: apiUrl + 'register.do', // 注册
    knowledgeQuery: apiUrl + 'knowledgeQuery.do', // 新闻，养生知识点查询 1：新闻 2：养生知识
    pickGoods: apiUrl + 'merchantProQuery.do', // 首页的推荐商品
    queryProduct: apiUrl + 'queryProduct.do', // 商城商品列表
    categoryQuery: apiUrl + 'categoryQuery.do', // 商品类别
    accountLogList: apiUrl + 'accountLogList.do', // 我的账户
    addToCollect: apiUrl + 'addToCollect.do', // 添加收藏
    myCollect: apiUrl + 'myCollect.do', // 我的收藏
    queryProductDetails: apiUrl + 'queryProductDetails.do', // 商品详情
    newOption: apiUrl + 'newOption.do', // 意见反馈
    getUserAllInfo: apiUrl + 'getUserAllInfo.do', // 获取用户个人信息
    getKnowledgeDetails: apiUrl + 'knowledgeDetailsQuery.do', // 新闻详情页
    addressQuery: apiUrl + 'addressQuery.do', // 地址列表查询
    updateUserAddress: apiUrl + 'updateUserAddressWeb.do', // type 1修改  0新增  isDefalt  是否默认(1是  0不是)
    delAddressMsg: apiUrl + 'delAddressMsg.do', // 删除地址
    knowledgeCommentQuery: apiUrl + 'knowledgeCommentQuery.do', // 新闻评论列表
    knowledgeZan: apiUrl + 'knowledgeZan.do', // 新闻点赞
    knowledgeComment: apiUrl + 'knowledgeCommnet.do', // 新闻评论
    accountLogTeam: apiUrl + 'accountLogTeam.do', // 团队账户
    updatePwd: apiUrl + 'updatePwdForWeb.do', // 修改登录密码
    addCart: apiUrl + 'addCart.do', // 加入购物车
    myCart: apiUrl + 'myCarts.do', // 查看购物车
    delCart: apiUrl + 'delCart.do', // 删除购物车商品
    updateCartSum: apiUrl + 'updateCartSum.do', // 购物车单件数量加减
    cancelCollect: apiUrl + 'cancleCollect.do', // 取消收藏
    createOrder: apiUrl + 'createOrder.do', // 创建订单 购物车里的去结算
    queryCartOrderList: apiUrl + 'queryCartOrderListS.do', // 结算页面信息列表
    updateCartDelivery: apiUrl + 'updateCartDeliveryS.do', // 修改购物车中的商品的配送方式
    nearQuery: apiUrl + 'nearQueryS.do', // 店铺列表查询
    queryUserOrderList: apiUrl + 'queryUserOrderList.do', // 查询用户订单列表
    completeOrder: apiUrl + 'completeOrderS.do', // 完善用户信息，提交订单
    completeOrderReturn: apiUrl + 'completeOrderReturn.do', // 订单地址
    getCompleteOrderDetails: apiUrl + 'getCompleteOrderDetails.do', // 提交订单后到支付页面的信息
    mineInfo: apiUrl + 'mineInfo.do', // 我的页面
    updateUserSomeInfo: apiUrl + 'updateUserSomeInfo.do', // 用户修改信息
    queryUserComplaintsOrderList: apiUrl + 'queryUserComplaintsOrderList.do', // 查询用户可投诉维权订单列表
    queryOrderDetails: apiUrl + 'queryOrderDetails.do', // 查询订单详情
    cancleOrder: apiUrl + 'cancleOrder.do', // 取消订单
    returnOrder: apiUrl + 'returnOrder.do', // 申请退货
    getReturnReason: apiUrl + 'getReturnReason.do', // 退货理由列表查询
    getExpress: apiUrl + 'getExpress.do', // 物流列表查询
    queryComplaintsOrderDetails: apiUrl + 'queryComplaintsOrderDetails.do', // 查询用户可投诉列表订单详情
    queryEvaluate: apiUrl + 'queryEvaluate.do', // 评论列表 1商品 2服务 3养生知识/新闻公告ID
    addOrderEvaluate: apiUrl + 'addOrderEvaluate.do', // 新增订单评价
    receiveOrder: apiUrl + 'receiveOrder.do', // 确认收货
    queryOrderExpress: apiUrl + 'queryOrderExpress.do', // 查询物流信息
    activityQuery: apiUrl + 'activityQuery.do', // 活动列表
    activityDetailQuery: apiUrl + 'activityDetailQuery.do', // 活动详情
    queryTeamOrderList: apiUrl + 'queryTeamOrderList.do', // 门店订单
    queryTeamOrderDetails: apiUrl + 'queryTeamOrderDetails.do', // 团队订单列表查看详情
    queryTeamOrderExpress: apiUrl + 'queryTeamOrderExpress.do', // 团队查看物流
    queryMerchantDetails: apiUrl + 'queryMerchantDetails.do', // 店铺详情
    getHotSearch: apiUrl + 'getHotSearch.do', // 搜索热词
    receiveServiceOrder: apiUrl + 'receiveServiceOrder.do', // 接单
    updateCartTeamS: apiUrl + 'updateCartTeamS.do', // 修改店铺
    getOrderPayStatus: apiUrl + 'getOrderPayStatus.do', // 获取订单支付信息
    queryCartPlanList: apiUrl + 'queryCartPlanList.do', // 购物车优惠列表
    withdrawRate: apiUrl + 'withdrawRate.do', // 提现费率查询个人
    withdrawRateTeam: apiUrl + 'withdrawRateTeam.do', // 提现费率查询团队
    applyWithdraw: apiUrl + 'applyWithdraw.do', // 提现申请
    withdrawLogList: apiUrl + 'withdrawLogList.do', // 提现记录
    sendOrder: apiUrl + 'sendOrder.do', // 发货
    getUserChatRecord: apiUrl + 'getUserChatRecord.do', // 客服聊天列表
    createUserChatRecord: apiUrl + 'createUserChatRecord.do', // 新增聊天记录
    createCustomerChatRecord: apiUrl + 'createCustomerChatRecord.do' // 模拟客服聊天
  }
}

export {url}

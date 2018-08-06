import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import codeLogin from '@/components/codeLogin'
import register from '@/components/register'
import forgotPwd from '@/components/forgotPwd'
import index from '@/components/index'
import store from '@/components/store'
import shopcart from '@/components/shopcart'
import placeOrder from '@/components/placeOrder'
import payOrder from '@/components/payOrder'
import evaluate from '@/components/evaluate'
import collect from '@/components/collect'
import collectStore from '@/components/collectStore'
import personal from '@/components/personal'
import orderDetail from '@/components/orderDetail'
import complainDetail from '@/components/complainDetail'
import storeOrderDetail from '@/components/storeOrderDetail'
import returnGoods from '@/components/returnGoods'
import news from '@/components/news'
import newsDetail from '@/components/newsDetail'
import productDetail from '@/components/productDetail'
import personInfo from '@/personalNav/personInfo'
import myAcount from '@/personalNav/myAcount'
import teamAcount from '@/personalNav/teamAcount'
import putCash from '@/personalNav/putCash'
import userCenter from '@/personalNav/userCenter'
import myOder from '@/personalNav/myOder'
import storeOder from '@/personalNav/storeOder'
import feedback from '@/personalNav/feedback'
import myDiscount from '@/personalNav/myDiscount'
import myCollect from '@/personalNav/myCollect'
import complaint from '@/personalNav/complaint'
import cashExchange from '@/personalNav/cashExchange'
import address from '@/personalNav/address'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/codeLogin',
      name: 'codeLogin',
      component: codeLogin
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgotPwd',
      name: 'forgotPwd',
      component: forgotPwd
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/store',
      name: 'store',
      component: store
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect
    },
    {
      path: '/collectStore',
      name: 'collectStore',
      component: collectStore
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal,
      redirect: '/personal/userCenter',
      children: [
        {
          path: '/personal/userCenter',
          name: 'userCenter',
          component: userCenter
        },
        {
          path: '/personal/personInfo',
          name: 'personInfo',
          component: personInfo
        },
        {
          path: '/personal/myAcount',
          name: 'myAcount',
          component: myAcount
        },
        {
          path: '/personal/putCash',
          name: 'putCash',
          component: putCash
        },
        {
          path: '/personal/teamAcount',
          name: 'teamAcount',
          component: teamAcount
        },
        {
          path: '/personal/myOder',
          name: 'myOder',
          component: myOder
        },
        {
          path: '/personal/storeOder',
          name: 'storeOder',
          component: storeOder
        },
        {
          path: '/personal/feedback',
          name: 'feedback',
          component: feedback
        },
        {
          path: '/personal/myDiscount',
          name: 'myDiscount',
          component: myDiscount
        },
        {
          path: '/personal/myCollect',
          name: 'myCollect',
          component: myCollect
        },
        {
          path: '/personal/complaint',
          name: 'complaint',
          component: complaint
        },
        {
          path: '/personal/cashExchange',
          name: 'cashExchange',
          component: cashExchange
        },
        {
          path: '/personal/address',
          name: 'address',
          component: address
        }
      ]
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/complainDetail',
      name: 'complainDetail',
      component: complainDetail
    },
    {
      path: '/storeOrderDetail',
      name: 'storeOrderDetail',
      component: storeOrderDetail
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: shopcart
    },
    {
      path: '/placeOrder',
      name: 'placeOrder',
      component: placeOrder
    },
    {
      path: '/payOrder',
      name: 'payOrder',
      component: payOrder
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate
    },
    {
      path: '/returnGoods',
      name: 'returnGoods',
      component: returnGoods
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: productDetail
    }

  ]
})

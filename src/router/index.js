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
import knowledge from '@/components/knowledge'
import message from '@/components/message'
import msgDetail from '@/components/msgDetail'
import productList from '@/components/productList'
import productDetail from '@/components/productDetail'
import shop from '@/components/shop'
import coupon from '@/components/coupon'
import couponList from '@/components/couponList'
import paySucess from '@/components/paySucess'
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
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
          path: 'userCenter',
          name: 'userCenter',
          component: userCenter
        },
        {
          path: 'personInfo',
          name: 'personInfo',
          component: personInfo
        },
        {
          path: 'myAcount',
          name: 'myAcount',
          component: myAcount
        },
        {
          path: 'putCash',
          name: 'putCash',
          component: putCash
        },
        {
          path: 'teamAcount',
          name: 'teamAcount',
          component: teamAcount
        },
        {
          path: 'myOder',
          name: 'myOder',
          component: myOder
        },
        {
          path: 'storeOder',
          name: 'storeOder',
          component: storeOder
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: feedback
        },
        {
          path: 'myDiscount',
          name: 'myDiscount',
          component: myDiscount
        },
        {
          path: 'myCollect',
          name: 'myCollect',
          component: myCollect
        },
        {
          path: 'complaint',
          name: 'complaint',
          component: complaint
        },
        {
          path: 'cashExchange',
          name: 'cashExchange',
          component: cashExchange
        },
        {
          path: 'address',
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
      path: '/knowledge',
      name: 'knowledge',
      component: knowledge
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/msgDetail',
      name: 'msgDetail',
      component: msgDetail
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: productDetail
    },
    {
      path: '/productList',
      name: 'productList',
      component: productList
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon
    },
    {
      path: '/couponList',
      name: 'couponList',
      component: couponList
    },
    {
      path: '/paySucess',
      name: 'paySucess',
      component: paySucess
    },
    { path: '*', component: NotFoundComponent }
  ]
})

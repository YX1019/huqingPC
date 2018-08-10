<template>
  <div class="hqTop">
  <div class="top">
     <div class="top_lf lf">您好，欢迎光临胡庆余堂网上商城<span class="line">|</span><a v-show="!isLogin" @click="toLogin();">登录</a><span class="line" v-show="!isLogin">|</span><a v-show="!isLogin" @click="toRegister();">快速注册</a><span v-show="isLogin">{{name}}</span> <span class="line" v-show="isLogin">|</span><span v-show="isLogin" style="cursor: pointer" @click="loginOut()">退出</span></div>
    <div class="top_rg rg">
      <div class="lf hand" :class="{'cartDiv' : isShowCart}">
      <div @click="showCartList()"><i class="iconfont red">&#xe887;</i>购物车<span class="red">{{this.$store.state.goodsNum}}</span>件<i class="iconfont">&#xe60b;</i></div>
       <div class="smallCart" v-show="isShowCart">
         <div class="smallCartItem" v-for="item in cartList" :key="item.cartId">
           <span class="smallCart_lf">{{item.productName}}</span><span class="smallCart_Rg">{{item.price}}元×{{item.productNum}}</span>
         </div>
         <div style="border-top:1px solid #ccc;margin: 0 10px;"><button class="lookCart" @click="toCart()">查看我的购物车</button></div>
       </div>
     </div>
      <span class="line lf">|</span>
       <div class="lf hand" @click="toCollect()">收藏夹
         <!--<i class="iconfont">&#xe60b;</i>-->
       </div><span class="line lf">|</span>
       <div class="lf hand" @click="toPerson();">用户中心
         <!--<i class="iconfont">&#xe60b;</i>-->
       </div></div>
  </div>
  <div class="header">
      <div class="headCont">
        <div style="width: 100%;float: left;">
        <img src="../common/img/logo.png"/>
        <div class="searchLine rg">
          <div class="search"><i class="iconfont searchIcon">&#xe627;</i><input type="text" placeholder="请输入搜索关键词" class="keyword" v-model="searchCont"><input type="button" value="搜索" class="searchBtn" @click="toStore()"></div>
          <div class="hotWord"><span>鹿精蛹虫草膏</span><span>黄芪</span><span>甘草</span><span>艾叶</span><span>白术</span></div>
        </div>
        </div>
      </div>
    <ul class="menu">
      <li v-for= "(item,index) in menuList" :key='item.name' :class="{'cur': index === isActive}" @click='linkPage(index)'><a>{{item.name}}</a></li>
      <!--<li><a>商城</a></li>-->
      <!--<li class="cur"><a>我的优惠</a></li>-->
      <!--<li><a>活动信息</a></li>-->
      <!--<li><a>新闻公告</a></li>-->
      <!--<li><a>养生知识</a></li>-->
    </ul>
  </div>
    <el-dialog
      title="提示"
      :visible.sync="errorBox"
      width="30%"
      center>
      <span>{{errMsg}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="errorBox = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  props: ['childState'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isActive: 0,
      menuList: [{name: '首页'}, {name: '商城'}, {name: '活动信息'}, {name: '新闻公告'}, {name: '养生知识'}],
      isShowCart: false,
      cartList: [],
      searchCont: '',
      errorBox: false,
      errMsg: ''
    }
  },
  created () {
    this.lookMyCart()
    this.getHotSearch()
    console.log(this.$store.state.isLogin, this.$store.state.name, this.$store.state.goodsNum)
    this.isActive = sessionStorage.getItem('sIndex') || 0
    console.log(this.$store.state.isLogin, this.$store.state.name, this.$store.state.goodsNum)
  },
  mounted () {
    let pageName = this.$route.name
    if (pageName === 'index') {
      this.isActive = 0
    } else if (pageName === 'store') {
      this.isActive = 1
    } else if (pageName === 'news') {
      this.isActive = 3
    } else if (pageName === 'knowledge') {
      this.isActive = 4
    } else if (pageName === 'message') {
      this.isActive = 2
    }
    console.log(this.isActive)
  },
  computed: {
    ...mapState(['isLogin', 'name']) // 引入vuex 里的变量
  },
  methods: {
    linkPage: function (index) {
      this.isActive = index
      sessionStorage.setItem('sIndex', this.isActive)
      if (index === 0) {
        this.$router.push({ path: '/index' })
      } else if (index === 1) {
        if (this.$store.state.isLogin) {
          this.$router.push({ path: '/store' })
        } else {
          this.$message({
            message: '请先登录！',
            type: 'warning',
            duration: 1000
          });
          this.$router.push({ path: '/login' })
        }
      } else if (index === 2) {
        this.$router.push({ path: '/message' })
      } else if (index === 3) {
        this.$router.push({ path: '/news' })
      } else if (index === 4) {
        this.$router.push({ path: '/knowledge' })
      }
      console.log(index)
    },
    loginOut: function () {
      this.$store.commit('changeLogin', false)
      window.localStorage.removeItem('isLogin')
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('userId')
      window.localStorage.removeItem('goodsNum')
    },
    toLogin: function () {
      this.$router.push({ path: '/login' })
    },
    toRegister: function () {
      this.$router.push({ path: '/register' })
    },
    toPerson: function () {
      if (this.$store.state.isLogin) {
        this.$router.push({ path: '/personal' })
        sessionStorage.setItem('pIndex', -1)
        sessionStorage.setItem('pIndexx', 0)
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({ path: '/login' })
      }
    },
    toCollect: function () {
      if (this.$store.state.isLogin) {
        this.$router.push({path: '/collect'})
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({ path: '/login' })
      }
    },
    lookMyCart: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      _this.axios({
        method: 'post',
        url: _this.url.api.myCart,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
          return false
        } else {
          console.log(data)
          _this.cartList = data.obj.cartAllInfo
          let goodsNum = 0;
          if (_this.cartList.length > 0) {
            for (let i = 0; i < _this.cartList.length; i++) {
              goodsNum = parseInt(goodsNum) + parseInt(_this.cartList[i].productNum)
            }
          } else {
            goodsNum = 0
          }
          window.localStorage.setItem('goodsNum', goodsNum)
          _this.$store.commit('changeGoodsNum', goodsNum)
          console.log(goodsNum, window.localStorage.getItem('goodsNum'))
        }
      })
    },
    showCartList: function () {
      this.isShowCart = !this.isShowCart
    },
    toCart: function () {
      if (this.$store.state.isLogin) {
        this.$router.push({path: '/shopcart'})
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({ path: '/login' })
      }
    },
    toStore: function () {
      this.$router.push({path: '/productList', query: {searchCont: this.searchCont}})
    },
    getHotSearch: function () {
      let _this = this;
      this.axios({
        method: 'get',
        url: this.url.api.getHotSearch
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
        }
      })
    }
  },
  watch: {
    $route (to, from) {
      if (from.path === '/shopcart') {
        this.isActive = 1
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss" >
  $pageWidth:60%;
  $red:#e70012;
  .hqTop{
    width:100%;
    height: auto;
  }
  .top{
    width:$pageWidth;
    height: 34px;
    line-height: 34px;
    padding: 10px 0;
    margin: 0 auto;
    font-size:14px;
    color: #383838;
  }
  .top_lf a{
    color: #e70012;
    cursor: pointer;
  }
  .top_rg a{
    color:#383838;
  }
  .line{
    color: #d2d2d2;
    padding:0 10px;
  }
  .header{
    width:100%;
    height: 280px;
    background: url(../common/img/topbg.jpg) no-repeat;
    background-size:100% 100%;
  }
  .headCont{
    width:$pageWidth;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    margin:0 auto;
    img{
      margin-top: 60px;
    }
  }
  .searchLine{
    margin-top: 110px;
    position: relative;
    .searchIcon{
      position: absolute;
      left:8px;
      color: #b9b9b9;
      font-size:20px;
      line-height: 40px;
    }
  }
  .keyword{
    width:430px;
    height: 40px;
    border:2px solid $red;
    box-sizing: border-box;
    float: left;
    padding-left: 30px;
  }
  .searchBtn{
    box-sizing: border-box;
    height:40px;
    background:$red;
    color: #fff;
    border: 0;
    float: left;
    padding:0 25px;
  }
  .hotWord{
    font-size: 14px;
    color: #535353;
    margin-top: 5px;
    float: left;
    span{
      margin-right: 8px;
    }
  }
  .menu{
    width:$pageWidth;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    margin: 0 auto;
    li{
      width:100px;
      height: 41px;
      line-height: 41px;
      color: #151515;
      float: left;
      margin: 0 2% 0 1%;
      cursor: pointer;
      &:first-child a{
        margin-left: 20px;
      }
      &:nth-child(2) a{
        margin-left: 20px;
      }
      a{
        margin-left: 10px;
        padding-top: 6px;
        display: block;
        color: #151515;
        cursor: pointer;
      }
    }
  }
  .menu li.cur{
    a {
      color: #fff;
    }
    background: url(../common/img/curbg.png) no-repeat;
  }
.red{
  color: $red;
}
  .smallCart{
    position: absolute;
    top: 34px;
    left:0;
    width:270px;
    background: #fff;
    border: 1px solid #ccc;
    border-top: 0;
  }
  .cartDiv{
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    position: relative
  }
  .smallCartItem{
    width:100%;
    height: auto;
    &:first-child{
      .smallCart_Rg{
        border-top: 1px solid #ccc;
      }
    }
  }

  .smallCart_lf{
    width:98px;
    display: inline-block;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .smallCart_Rg{
    width:calc(100% - 98px);
    display: inline-block;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    color: #d81e06;
  }
  .lookCart{
    margin: 5px 0;
    float: right;
    background: #d81e06;
    color: #fff;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 5px;
  }
</style>

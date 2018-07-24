<template>
  <div class="hqTop">
  <div class="top">
     <div class="top_lf lf">您好，欢迎光临胡庆余堂网上商城<span class="line">|</span><a v-show="!isLogin" @click="toLogin();">登录</a><span class="line" v-show="!isLogin">|</span><a v-show="!isLogin" @click="toRegister();">快速注册</a><span v-show="isLogin">{{name}}</span> <span class="line" v-show="isLogin">|</span><span v-show="isLogin" style="cursor: pointer" @click="loginOut()">退出</span></div>
     <div class="top_rg rg"><div class="lf" style="position: relative;" :class="{'cartDiv': isShowCart}"><i class="iconfont red">&#xe887;</i>购物车<span class="red">0</span>件<i class="iconfont">&#xe60b;</i>
       <div class="smallCart" v-show="isShowCart">
         <div class="smallCartItem" v-for="item in 2" :key="item">
           <span class="smallCart_lf">益母草</span><span class="smallCart_Rg">50.00元×1</span>
         </div>
         <div style="border-top:1px solid #ccc;margin: 0 10px;"><button class="lookCart">查看我的购物车</button></div>
       </div>
     </div><span class="line lf">|</span>
       <router-link to="collect"><div class="lf">收藏夹<i class="iconfont">&#xe60b;</i></div></router-link><span class="line lf">|</span><router-link to="personal"><div class="lf">用户中心<i class="iconfont">&#xe60b;</i></div></router-link></div>
  </div>
  <div class="header">
      <div class="headCont">
        <div style="width: 100%;float: left;">
        <img src="../common/img/logo.png"/>
        <div class="searchLine rg">
          <div class="search"><i class="iconfont searchIcon">&#xe627;</i><input type="text" placeholder="请输入搜索关键词" class="keyword"><input type="button" value="搜索" class="searchBtn"></div>
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
      menuList: [{name: '首页'}, {name: '商城'}, {name: '我的优惠'}, {name: '活动信息'}, {name: '新闻公告'}, {name: '养生知识'}],
      isShowCart: false
    }
  },
  created () {
    console.log(this.$store.state.isLogin, this.$store.state.name)
  },
  computed: {
    ...mapState(['isLogin', 'name']) // 引入vuex 里的变量
  },
  methods: {
    linkPage: function (index) {
      this.isActive = index
      if (index === 0) {
        this.$router.push({ path: '/index' })
      } else if (index === 1) {
        this.$router.push({ path: '/store' })
      } else if (index === 2) {
        this.$router.push({ path: '/store' })
      } else if (index === 4) {
        this.$router.push({ path: '/news' })
      }
      console.log(index)
    },
    loginOut: function () {
      this.$store.commit('changeLogin', false)
      window.localStorage.removeItem('isLogin')
    },
    toLogin: function () {
      this.$router.push({ path: '/login' })
    },
    toRegister: function () {
      this.$router.push({ path: '/register' })
    }
  },
  watch: {

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

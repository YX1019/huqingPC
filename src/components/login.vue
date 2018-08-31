<template>
  <div class="loginPart">
    <div class="loginCont clearfix">
     <div class="loginLf"><img src="../common/img/login.png"/></div>
     <div class="loginRg">
       <h1>用户登录</h1>
       <div class="loginInfo">
         <p><label>手机号:</label><input type="text" v-model="cell"/> </p>
         <p><label>密码:</label><input type="password" v-model="pwd"/> </p>
         <div class="loginBtn">
           <button @click="login()">用户登录</button><span style="display: inline-block;vertical-align: middle;"><i class="iconfont wechatIcon" @click="toCodeLogin()">&#xe615;</i></span>
       </div>
     </div>
       <div class="loginBottom">
         <a @click="toRegister()">免费注册</a><a @click="toForgotPwd()">忘记密码?</a>
       </div>
    </div>
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

    <!--<div class="errorbox"><p>{{errMsg}}</p><button @click="closeErrorBox();">确定</button></div>-->
    <!--<div class="bg"></div>-->
  </div>
</template>
<script type="text/ecmascript-6">
// import { mapActions, mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      cell: '',
      pwd: '',
      errorBox: false,
      errMsg: '',
      cartList: []
    }
  },
  mounted () {
  },
  computed: {
    // ...mapState(['Login'])
  },
  methods: {
    login: function () {
      var _this = this;
      var params = new URLSearchParams();
      params.append('cell', _this.cell);
      params.append('loginPwd', _this.pwd);
      params.append('token', '1');
      this.axios({
        method: 'post',
        url: this.url.api.login,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          window.localStorage.setItem('isLogin', true)
          window.localStorage.setItem('name', data.obj.cell)
          window.localStorage.setItem('userId', data.obj.userId)
          var name = data.obj.cell
          var userId = data.obj.userId
          _this.$store.commit('changeLogin', true)
          _this.$store.commit('changeName', name)
          _this.$store.commit('changeId', userId)
          _this.lookMyCart()
          _this.$router.push({ path: '/index' })
        }
      })
      // window.localStorage.setItem('isLogin', true)
      // this.$router.push({ path: '/index' })
      // location.reload()
    },
    toCodeLogin: function () {
      this.$router.push({ path: '/codeLogin' })
    },
    toRegister: function () {
      this.$router.push({ path: '/register' })
    },
    toForgotPwd: function () {
      this.$router.push({ path: '/forgotPwd' })
    },
    closeErrorBox: function () {
      this.errorBox = false;
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
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .loginBottom{
    width:100%;
    height: 82px;
    line-height: 82px;
    text-align: center;
    a{
      color: #151515;
      font-size:14px;
      cursor: pointer;
      &:first-child{
        color:#095dbb;
        margin-right: 70px;
      }
    }
  }
  .wechatIcon{
    font-size:30px;
    color: #13ce66;
    cursor: pointer;
  }
  .loginPart{
    width:100%;
    height: auto;
    padding: 85px 0 175px 0;
    background: url(../common/img/loginBg.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .loginCont{
    width:60%;
    @media screen  and (max-width:1900px){
      width:1000px;
    }
    height:auto;
    margin: 0 auto;
  }
  .loginLf{
    width:48%;
    float: left;
    img{
      width:100%;
      height: auto;
    }
  }
  .loginRg{
    width: 46%;
    float: right;
    border:1px solid #dcdcdc;
    box-sizing: border-box;
    h1{
      width:100%;
      height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      padding: 0 30px;
      font-size:16px;
      color: #151515;
      border-bottom: 1px solid #dcdcdc;
      background: #fcfcfc;
    }
  }
  .loginInfo{
    width:98%;
    margin: 0 1%;
    padding: 15px 0 25px 0;
    border-bottom: 1px solid #dcdcdc;
    p{
      margin-top: 20px;
      label{
        width:115px;
        height: 35px;
        line-height: 35px;
        text-align: right;
        margin-right: 15px;
        display: inline-block;
      }
      input{
        width:50%;
        @media screen  and (max-width:1900px){
          width:44%;
        }
        height: 35px;
        box-sizing: border-box;
        border:1px solid #dcdcdc;
        padding: 0 10px;
      }
    }
  }
  .loginInfo p input.sendPwd{
    width:105px;
    height: 35px;
    font-size: 14px;
    color: #dd0011;
    border:1px solid #dd0011;
    margin-left: 10px;
    background: #fff;
  }
  .loginBtn{
    width:100%;
    margin-top: 40px;
    text-align: center;
    button{
      width:160px;
      height: 40px;
      background: #dd0011;
      font-size:18px;
      color: #fff;
      border:none;
      border-radius: 3px;
      margin-right: 30px;
    }
  }
  .errorbox{
    width:500px;
    position: fixed;
    top:50%;
    left: 50%;
    background: #fff;
    border-radius: 5px;
    color: #333;
    text-align: center;
    padding: 30px;
    box-sizing: border-box;
    z-index:12;
  }
  .bg{
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left: 0;
    z-index:11;
  }
</style>

<template>
  <div class="loginPart">
    <div class="loginCont clearfix">
     <div class="loginLf"><img src="../common/img/login.png"/></div>
     <div class="loginRg2">
      <img src="../common/img/code.jpg" class="weCode"/>
       <p>打开微信扫描二维码登录</p>
       <a @click="toLogin()" class="accountLogin">账号登录</a>
     </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    toLogin: function () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
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
  .loginRg2{
    width: 46%;
    float: right;
    border:1px solid #dcdcdc;
    box-sizing: border-box;
    text-align: center;
    p{
     font-size: 18px;
      margin: 15px 0;
    }
  }
  .accountLogin{
    font-size: 18px;
    color: #e70012;
    margin-bottom: 22px;
    display: block;
    cursor: pointer;
  }
  .weCode{
    margin-top: 40px;
  }
</style>

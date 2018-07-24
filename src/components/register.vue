<template>
  <div class="loginPart">
    <div class="loginCont clearfix">
      <div class="loginLf"><img src="../common/img/login.png"/></div>
      <div class="loginRg">
        <h1>注册新用户</h1>
        <div class="loginInfo">
          <p><label>手机号:</label><input type="text"/> </p>
          <p><label>验证码:</label><input type="text"/><input type="button" value="发送验证码" class="sendPwd"/> </p>
          <p><label>密码:</label><input type="password"/> </p>
          <div class="loginBtn">
            <button>注册用户</button><router-link to="login"><span style="display: inline-block;vertical-align: middle;color: #095dbb;">直接登录</span></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'register',
  data () {
    return {
      cell: '',
      pwd: ''
    }
  },
  mounted () {
  },
  computed: {

  },
  methods: {
    login: function () {
      this.axios.post(this.url.api.login, {
        cell: this.cell,
        loginPwd: this.pwd
      }).then(function (res) {
        console.log(res)
      })
      this.$router.push({ path: '/index' })
    },
    toCodeLogin: function () {
      this.$router.push({ path: '/codeLogin' })
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
</style>

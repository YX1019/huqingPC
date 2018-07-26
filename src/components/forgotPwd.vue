<template>
  <div class="loginPart">
    <div class="loginCont clearfix">
      <div class="loginLf"><img src="../common/img/login.png"/></div>
      <div class="loginRg">
        <h1>找回密码</h1>
        <div class="loginInfo">
          <p><label>手机号:</label><input type="text"/> </p>
          <p><label>验证码:</label><input type="text"/><input type="button" v-model="btnTxt" :disabled="disabled" class="sendPwd" :class="{'btnGray' : disabled }" @click="getCode()"/> </p>
          <p><label>密码:</label><input type="password"/> </p>
          <div class="loginBtn">
            <button @click="forgotPwd()">确认</button><span style="display: inline-block;vertical-align: middle;color: #095dbb;" @click="toLogin();">返回登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'forgotPwd',
  data () {
    return {
      disabled: false,
      cell: '',
      pwd: '',
      time: 60,
      btnTxt: '发送验证码'
    }
  },
  mounted () {
  },
  computed: {

  },
  methods: {
    forgotPwd: function () {
      this.axios.post(this.url.api.register, {
        cell: this.cell,
        newPwd: this.pwd,
        checkCode: this.code
      }).then(function (res) {
        console.log(res)
        this.$router.push({ path: '/login' })
      })
    },
    toLogin: function () {
      this.$router.push({path: '/login'})
    },
    getAuthCode: function () {
      if (this.time > 0) {
        this.disabled = true
        this.time--
        this.btnTxt = this.time + 's后重新获取'
        setTimeout(this.getAuthCode, 1000)
      } else {
        this.time = 0
        this.btnTxt = '获取验证码'
        this.disabled = false
      }
    },
    getCode: function () {
      this.time = 60
      this.getAuthCode()
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
  .loginInfo p input.sendPwd.btnGray{
    color: #ccc;
    border:1px solid #ccc;
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

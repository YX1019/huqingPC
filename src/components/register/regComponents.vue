<template>
  <div class="loginPart">
    <div class="loginCont clearfix">
      <div class="loginLf"><img src="../../common/img/login.png"/></div>
      <div class="loginRg">
        <h1>{{title}}</h1>
        <div class="loginInfo">
          <p><label>手机号:</label><input type="text" v-model="cell"/> </p>
          <p><label>验证码:</label><input type="text" v-model="code"/><input type="button" v-model="btnTxt" :disabled="disabled" class="sendPwd" :class="{'btnGray' : disabled }" @click="getCode()"/> </p>
          <p><label>密码:</label><input type="password" v-model="pwd"/> </p>
          <div class="loginBtn" v-if="type === 1">
            <button @click="toRegister()">注册用户</button><span style="display: inline-block;vertical-align: middle;color: #095dbb;" @click="toLogin()">直接登录</span>
          </div>
          <div class="loginBtn" v-if="type === 2">
          <button @click="forgotPwd()">确认</button><span style="display: inline-block;vertical-align: middle;color: #095dbb;" @click="toLogin();">返回登录</span>
          </div>
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
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'regComponents',
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
    }
  },
  data () {
    return {
      cell: '',
      pwd: '',
      code: '',
      time: 0,
      btnTxt: '发送验证码',
      disabled: false,
      errorBox: false,
      errMsg: ''
    }
  },
  mounted () {
  },
  computed: {

  },
  methods: {
    toRegister: function () {
      let _this = this
      let params = new URLSearchParams();
      params.append('cell', _this.cell);
      params.append('checkCode', _this.code);
      params.append('newPwd', _this.pwd);
      if (_this.cell === '') {
        _this.errMsg = '手机号码不能为空'
        _this.errorBox = true
        return
      }
      if (_this.code === '') {
        _this.errMsg = '验证码不能为空'
        _this.errorBox = true
        return
      }
      if (_this.pwd === '') {
        _this.errMsg = '密码不能为空'
        _this.errorBox = true
        return
      }
      this.axios({
        method: 'post',
        url: this.url.api.register,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.$router.push({ path: '/login' })
        }
      })
    },
    forgotPwd: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('cell', _this.cell);
      params.append('checkCode', _this.code);
      params.append('newPwd', _this.pwd);
      if (_this.cell === '') {
        _this.errMsg = '手机号码不能为空'
        _this.errorBox = true
        return
      }
      if (_this.code === '') {
        _this.errMsg = '验证码不能为空'
        _this.errorBox = true
        return
      }
      if (_this.pwd === '') {
        _this.errMsg = '密码不能为空'
        _this.errorBox = true
        return
      }
      this.axios({
        method: 'post',
        url: this.url.api.forgetPwd,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.$router.push({ path: '/login' })
        }
      })
    },
    toLogin: function () {
      this.$router.push({ path: '/login' })
    },
    getAuthCode: function () {
      let _this = this
      if (_this.time > 0) {
        _this.disabled = true
        _this.time--
        _this.btnTxt = this.time + 's后重新获取'
        setTimeout(this.getAuthCode, 1000)
      } else {
        _this.time = 0
        _this.btnTxt = '获取验证码'
        _this.disabled = false
      }
    },
    getCode: function () {
      var _this = this;
      if (!_this.cell || _this.cell === '') {
        _this.errMsg = '手机号码不能为空'
        _this.errorBox = true
        return
      }
      var params = new URLSearchParams();
      params.append('cell', _this.cell);
      params.append('type', _this.type);
      this.axios({
        method: 'post',
        url: this.url.api.sendVerifyCode,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.errorBox = false
          _this.time = 60
          _this.getAuthCode()
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .loginPart{
    width:100%;
    height: auto;
    padding: 85px 0 175px 0;
    background: url(../../common/img/loginBg.jpg) no-repeat;
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
        padding: 0 10px;
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

<template>
<div class="personRg">
   <div class="userInfoItem">
     <h1>个人信息</h1>
     <div class="userForm">
     <el-form ref="form" :model="form" label-width="80px">
       <el-form-item label="昵称:">
         <el-input v-model="form.name"></el-input>
       </el-form-item>
       <!--<el-form-item label="真实姓名:">-->
         <!--<el-input v-model="form.realName"></el-input>-->
       <!--</el-form-item>-->
       <el-form-item label="身份证号:">
         <el-input v-model="form.cerNo"></el-input>
       </el-form-item>
       <el-form-item label="性别:">
         <el-radio-group v-model="form.sex">
           <el-radio label="1">男</el-radio>
           <el-radio label="2">女</el-radio>
         </el-radio-group>
       </el-form-item>
       <el-form-item label="生日:">
         <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" value-format="yyyy-MM-dd"></el-date-picker>
       </el-form-item>
       <el-form-item label="公司地址:">
         <el-input type="textarea" v-model="form.addr"></el-input>
       </el-form-item>
       <el-form-item>
         <a class="saveBtn" @click="saveInfo()">保存</a>
       </el-form-item>
     </el-form>
   </div>
   </div>
  <div class="userInfoItem">
    <h1>修改密码</h1>
    <div class="userForm">
      <el-form ref="form2" :model="form" label-width="80px">
        <el-form-item label="原密码:">
          <el-input v-model="form2.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码:">
          <el-input v-model="form2.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input v-model="form2.newPwd2" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <a  class="saveBtn" @click="updatePwd()">保存</a>
        </el-form-item>
      </el-form>
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
  name: 'personInfo',
  data () {
    return {
      form: {
        name: '',
        cerNo: '',
        sex: '',
        birthday: '',
        addr: ''
      },
      form2: {
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      errorBox: false,
      errMsg: ''
    }
  },
  created () {
    this.getPersonInfo()
  },
  methods: {
    getPersonInfo: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      this.axios({
        method: 'post',
        url: this.url.api.getUserAllInfo,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.form.name = data.obj.nickName
          _this.form.cerNo = data.obj.idCard
          _this.form.sex = data.obj.sex
          _this.form.birthday = data.obj.birthday
          _this.form.addr = data.obj.comName
        }
      })
    },
    saveInfo: function () {
      console.log(this.form);
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('nickName', this.form.name);
      params.append('sex', this.form.sex);
      params.append('birthday', this.form.birthday);
      params.append('idCard', this.form.cerNo);
      params.append('comName', this.form.addr);
      this.axios({
        method: 'post',
        url: this.url.api.updateUserSomeInfo,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }
      })
    },
    updatePwd: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('oldPwd', this.form2.oldPwd);
      params.append('newPwd', this.form2.newPwd);
      params.append('confirmPwd', this.form2.newPwd2);
      this.axios({
        method: 'post',
        url: this.url.api.updatePwd,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '密码修改成功,请重新登录',
            type: 'success',
            duration: 1000
          });
          _this.$store.commit('changeLogin', false)
          window.localStorage.removeItem('isLogin')
          window.localStorage.removeItem('name')
          window.localStorage.removeItem('userId')
          window.localStorage.removeItem('goodsNum')
          _this.$router.push({ path: '/login' })
        }
      })
    }
  }
}

</script>
<style lang="scss" rel="stylesheet/scss" >
.personRg{
  margin-left: 250px;
  position: relative;
  color: #000;
}
.userInfoItem{
  width:100%;
  height:auto;
  border:1px solid #ddd;
  margin-bottom: 20px;
  h1{
    height:40px;
    line-height: 40px;
    font-weight: 100;
    padding-left: 15px;
    font-size: 16px;
    color: #000;
    background: #eee;
    border-bottom: 1px solid #ddd;
  }
}
  .el-form-item{
    height: 40px;
  }
  .userForm{
    width:460px;
    margin-left: 35px;
    padding: 22px 0;
  }
  .el-form-item__label{
    text-align: left;
    color: #000;
  }
  .saveBtn{
    background: #dd0011;
    color: #fff;
    width:115px;
    height: 44px;
    border-radius: 3px;
    display: block;
    text-align: center;
    line-height:44px;
  }
</style>

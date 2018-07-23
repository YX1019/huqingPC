<template>
<div class="personRg">
   <div class="userInfoItem">
     <h1>个人信息</h1>
     <div class="userForm">
     <el-form ref="form" :model="form" label-width="80px">
       <el-form-item label="昵称:">
         <el-input v-model="form.name"></el-input>
       </el-form-item>
       <el-form-item label="真实姓名:">
         <el-input v-model="form.realName"></el-input>
       </el-form-item>
       <el-form-item label="身份证号:">
         <el-input v-model="form.cerNo"></el-input>
       </el-form-item>
       <el-form-item label="性别:">
         <el-radio-group v-model="form.sex">
           <el-radio label="男"></el-radio>
           <el-radio label="女"></el-radio>
         </el-radio-group>
       </el-form-item>
       <el-form-item label="生日:">
         <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"></el-date-picker>
       </el-form-item>
       <el-form-item label="公司地址:">
         <el-input type="textarea" v-model="form.addr"></el-input>
       </el-form-item>
       <el-form-item>
         <button  class="saveBtn">保存</button>
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
          <button  class="saveBtn">保存</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'personInfo',
  data () {
    return {
      form: {
        name: '',
        realName: '',
        cerNo: '',
        sex: '',
        birthday: '',
        addr: ''
      },
      form2: {
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      }
    }
  },
  methods: {}
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
  }
</style>

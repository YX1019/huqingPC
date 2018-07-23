<template>
<div class="personRg">
  <div class="addr">
    <h1>收货地址</h1>
    <p><span class="red" style="margin-right: 30px;">新增收货地址</span>电话号码、手机号选填一项，其余均为必填项</p>
    <div class="addrCont">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="所在地区" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择省市区">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"></el-input>
      </el-form-item>

      <el-form-item label="邮政编码" prop="postalCode">
        <el-input v-model="ruleForm.postalCode" placeholder="请填写邮政区号"></el-input>
      </el-form-item>

        <el-form-item label="收货人姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请填写收货人姓名"></el-input>
        </el-form-item>

          <el-form-item label="手机号码" prop="cell">
            <el-input v-model="ruleForm.cell" placeholder="电话号码，手机号码必须填一项"></el-input>
          </el-form-item>

            <el-form-item label="电话号码" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
      <el-form-item>
        <button type="primary" @click="submitForm('ruleForm')" class="saveBtn">保存</button>
      </el-form-item>
    </el-form>
    </div>
  </div>
  <table class="myAddrTable" border="1" cellspacing="0">
    <tr>
      <th>收货人</th>
      <th>所在地区</th>
      <th>详细地址</th>
      <th>邮编</th>
      <th>电话/手机</th>
      <th>操作</th>
    </tr>
    <tr v-for="item in 3" :key="item">
      <td>张三</td>
      <td style="width:22%;text-align: left;">浙江省 杭州市 萧山区
        郓州街道</td>
      <td>某某某一幢209</td>
      <td>274100</td>
      <td>153****710</td>
      <td><a>修改</a>|<a>删除</a></td>
    </tr>

  </table>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        desc: '',
        postalCode: '',
        cell: '',
        tel: ' '
      },
      rules: {
        name: [
          { required: true, message: '请填写收货人姓名', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择省市区', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .personRg{
    margin-left: 250px;
    position: relative;
    color: #000;
  }
  .addr{
    h1{
      padding-left: 8px;
      height: 50px;
      line-height: 50px;
      color: #e70012;
      font-size: 16px;
      background: #fef7f7;
    }
    p{
      margin: 20px 0;
    }
  }
  .addrCont{
    width:70%;
    float: left;
  }
  .red{
    color: #e70012;
  }
  .myAddrTable{
    width:100%;
    height: auto;
    border:1px solid #ddd;
    th{
      text-align: center;
      height: 50px;
      border-bottom: 1px solid #ddd;
      background: #f2f2f2;
    }
    td{
      text-align: center;
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
    }
    tr{
      &:last-child{
        td{
        border-bottom: 0;
        }
      }
    }
  }
  .saveBtn{
    background: #dd0011;
    color: #fff;
    width:115px;
    height: 40px;
    font-size: 16px;
    border-radius: 3px;
  }
</style>

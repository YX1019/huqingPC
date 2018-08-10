<template>
<div>
  <div class="addr">
    <!--<h1>收货地址</h1>-->
    <!--<p v-show="isNew"><span class="red" style="margin-right: 30px;">新增收货地址</span>电话号码、手机号选填一项，其余均为必填项</p>-->
    <!--<p v-show="!isNew"><span class="red" style="margin-right: 30px;">修改收货地址</span>电话号码、手机号选填一项，其余均为必填项</p>-->
    <div class="addrCont1">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="所在地区" prop="region">
        <div>
          <VDistpicker
            :province="getListData.province"
            :city="getListData.city"
            :area="getListData.district"
            @province="onChangeProvince"
            @city="onChangeCity"
            @area="onChangeArea">
          </VDistpicker>
        </div>
      </el-form-item>
      <el-form-item label="详细地址" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"></el-input>
      </el-form-item>

      <!--<el-form-item label="邮政编码" prop="postalCode">-->
        <!--<el-input v-model="ruleForm.postalCode" placeholder="请填写邮政区号"></el-input>-->
      <!--</el-form-item>-->

        <el-form-item label="收货人姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请填写收货人姓名"></el-input>
        </el-form-item>

          <el-form-item label="手机号码/电话" prop="cell">
            <el-input v-model="ruleForm.cell" placeholder="电话号码，手机号码必须填一项"></el-input>
          </el-form-item>

            <!--<el-form-item label="电话号码" prop="tel">-->
              <!--<el-input v-model="ruleForm.tel"></el-input>-->
            <!--</el-form-item>-->
      <el-form-item>
        <button type="primary" @click="submitForm('ruleForm')" class="saveBtn" >保存</button>
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
import VDistpicker from 'v-distpicker'
export default {
  name: '',
  components: {
    VDistpicker
  },
  data () {
    return {
      ruleForm: {
        name: '',
        desc: '',
        cell: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写收货人姓名', trigger: 'blur' }
        ],
        cell: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      addressList: [],
      getListData: {
        province: '',
        city: '',
        district: '' // 这个参数名后端返回的和插件定义的不一样
      },
      errorBox: false,
      errMsg: '',
      isNew: true,
      addressId: ''
    }
  },
  created () {
  },
  methods: {
    onChangeProvince (data) {
      this.getListData.province = data.value
    },
    onChangeCity (data) {
      this.getListData.city = data.value
    },
    onChangeArea (data) {
      this.getListData.district = data.value
    },
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.updateUserAddress()
          _this.$emit('refreshbizlines')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateUserAddress: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('isDefalt', 0);
      params.append('reUserName', this.ruleForm.name);
      params.append('cell', this.ruleForm.cell);
      params.append('province', this.getListData.province);
      params.append('city', this.getListData.city);
      params.append('area', this.getListData.district);
      params.append('reAddr', this.ruleForm.desc);
      params.append('type', 0);
      this.axios({
        method: 'post',
        url: this.url.api.updateUserAddress,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '地址新建成功！',
            type: 'success'
          });
          _this.ruleForm.name = ''
          _this.ruleForm.cell = ''
          _this.getListData.province = ''
          _this.getListData.city = ''
          _this.getListData.district = ''
          _this.ruleForm.desc = ''
          _this.ruleForm.postalCode = ''
          _this.ruleForm.tel = ''
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" >
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
  .addrCont1{
    width:100%;
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

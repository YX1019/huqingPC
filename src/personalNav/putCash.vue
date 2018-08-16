<template>
<div class="personRg">
  <div class="putCashCont">
    <h1>提现</h1>
    <p><label>提现金额:</label><input type="text" v-model="amount"/><span class="red">{{amountStr}}</span> <span class="red marginLeft20">{{rateStr}}</span></p>
    <p><label>提现至:</label><span class="payWay2"><el-radio v-model="radio" label="1"><img src="../common/img/zfb.png"/> </el-radio></span><span><el-radio v-model="radio" label="2"><img src="../common/img/wechat.png"/> 微信</el-radio></span></p>
    <button @click="applyWithdraw()">提现</button>
  </div>
  <div class="putCashCont">
    <h1>提现记录</h1>
    <ul class="puCashList" v-show="list">
      <li v-for="(item,index) in recordList" :key="index"><div class="cashLf"><h2>{{item.status}}</h2><h5>{{item.timeStr}}</h5></div>
        <div class="cashRg">{{item.amountStr}}</div></li>
    </ul>
    <div style="width:100%;text-align: center;line-height: 80px;" v-show="!list">暂无记录</div>
  </div>
  <div style="width: 100%;height: 50px;text-align: center;margin-top: 30px;" v-show="list">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-size="pageSize"
    >
    </el-pagination>
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
  name: 'putCash',
  data () {
    return {
      radio: '1',
      errorBox: false,
      errMsg: '',
      withdrawFrom: '',
      withUserType: '',
      withdrawType: '',
      amount: '',
      type: '', // 区分用户还是团队
      amountStr: '',
      rateStr: '',
      recordList: [],
      list: true,
      pageNo: 1,
      pageSize: 10,
      total: 5
    }
  },
  created () {
    this.getParams()
    if (this.type === '2') {
      this.withdrawRateTeam()
    } else {
      this.withdrawRate()
    }
    this.withdrawLogList(1)
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.type
      // 将数据放在当前组件的数据内
      this.type = routerParams
      console.log(this.type)
    },
    withdrawLogList: function (pageNo) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('searchType', this.type);
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.withdrawLogList,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.recordList = data.listObject
          _this.total = data.totalItems
          if (_this.recordList.length === 0) {
            _this.list = false
          } else {
            _this.list = true
          }
        }
      })
    },
    handleCurrentChange (val) {
      var pageNum = val
      this.withdrawLogList(pageNum)
    },
    withdrawRate: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      this.axios({
        method: 'post',
        url: this.url.api.withdrawRate,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.amountStr = data.amountStr
          _this.rateStr = data.rateStr
        }
      })
    },
    withdrawRateTeam: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      this.axios({
        method: 'post',
        url: this.url.api.withdrawRateTeam,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.amountStr = data.amountStr
          _this.rateStr = data.rateStr
        }
      })
    },
    applyWithdraw: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('withdrawType', this.radio);
      params.append('amount', this.amount);
      params.append('withUserType', this.type);
      params.append('withdrawFrom', 'WEB');
      console.log(this.radio, this.amount, this.type)
      this.axios({
        method: 'post',
        url: this.url.api.applyWithdraw,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '提现申请提交成功！',
            type: 'success'
          });
          _this.amount = ''
          if (_this.type === '2') {
            _this.withdrawRateTeam()
          } else {
            _this.withdrawRate()
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .marginLeft20{margin-left: 20px;}
  .el-radio__input.is-checked .el-radio__inner{
    border: #a6a6a6;
    background: #a6a6a6;
  }
  .el-radio__inner{
    background: #f0f0f0;
  }
  .personRg{
    margin-left: 250px;
    position: relative;
    color: #000;
  }
  .putCashCont{
    width:100%;
    height:auto;
    box-sizing: border-box;
    border:1px solid #ddd;
    margin-bottom: 25px;
    h1{
      padding-left: 25px;
      background:#f7f7f7 ;
      font-size: 18px;
      border-bottom:1px solid #ddd;
      line-height: 54px;
      font-weight: 100;
    }
    p{
      padding: 20px 25px;
      label{
        margin-right: 25px;
        width:70px;
        display: inline-block;
        font-size: 16px;
      }
     input{
       width:270px;
       height:35px;
       line-height: 35px;
       padding-left: 3px;
       border:1px solid #ddd;
       margin-right: 15px;
     }
    }
    button{
      width:135px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border:1px solid #ddd;
      background:#f4f4f4 ;
      margin: 50px 0 15px 95px;
      border-radius: 3px;
    }
  }
  .payWay2{
    margin-right: 95px;
  }
  .puCashList li{
    width:100%;
    height: 80px;
    box-sizing: border-box;
    padding: 0 25px;
    border-bottom: 1px solid #ddd;
    &:last-child{
      border-bottom: none;
    }
  }
  .cashLf{
    float: left;
    h2{
      margin-top: 20px;
      font-size: 18px;
      font-weight: 100;
    }
    h5{
      font-size: 14px;
      color: #9f9f9f;
      margin-top: 12px;
      font-weight:100;
    }
  }
  .cashRg{
    float: right;
    font-size: 24px;
    color: #0883eb;
    line-height: 80px;
  }
.red{
  color: #e3130f;
}
</style>

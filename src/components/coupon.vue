<template>
<div class="coupon">
  <div class="curPosition">您现在的位置:首页>商城>我的优惠>代金券</div>
  <div class="couponTop">
    <h6>胡庆余堂·滨江店</h6>
    <h1>{{obj.title}}</h1>
    <h6>周一至周日可用</h6>
  </div>
  <div class="couponMid">
      <h2>￥{{obj.priceAmount}}</h2>
      <p>积分{{obj.pointAmount}}</p>
      <a v-if="buyWay == '2'" @click="newDiscountOrder()">立即购买</a>
      <a v-if="buyWay == '1'" @click="payByOnlyPointDiscount()">立即兑换</a>
      <a v-if="buyWay == '3'" @click="getDiscountWithNoThing()">立即领取</a>
  </div>
  <div class="couponBtm">
    <!--<p>可叠加 | 随时退</p>-->
    <h4 v-html="obj.timeStr" style="margin-top:15px;"><span>有效期：</span>2018.10.04至2018.12.10</h4>
    <!--<h4><span>使用时间：</span>使用时间：17:00-次日01:00</h4>-->
    <!--<h4><span>适用范围：</span>全场通用</h4>-->
    <!--<h4><span>使用规则：</span>全场通用</h4>-->
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
  <el-dialog
    title="请选择支付方式"
    :visible.sync="payBox"
    width="60%"
    center>
    <div class="payMethod clearfix">
      <ul class="payMenu">
        <li :class="{'cur' : menuIndex === 0}" @click="payWechat()">微信支付<img src="../common/img/wepayIcon.png" class="wepayIcon"/></li>
        <li @click="payZfb()" :class="{'cur' : menuIndex === 1}">支付宝支付</li>
      </ul>
      <div class="payCont">
        <div v-show="menuIndex === 0">
          <div class="payCont_lf"><img src="../common/img/WePayLogo.png"/></div>
          <div class="payCont_rg">
            <p><img :src="weCode" style="width:260px;"/></p>
            <p><img src="../common/img/wepayTxt.png" /></p>
          </div>
          <div class="payMoney"><font class="lf" style="margin-left: 20px;">若已支付，请按确定按钮查看支付状态</font><a @click="payQrSearch()" class="hand">确定</a></div>
        </div>
        <div v-show="menuIndex === 1">
          <p style="margin-left: 30px;line-height: 50px;">请按下面的按钮去支付宝支付</p>
          <el-button type="primary" @click="payByAliPayWithDiscountQr()" style="margin-left: 30px;">去支付</el-button>
        </div>
      </div>
    </div>
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="payBox = false">确 定</el-button>-->
  <!--</span>-->
  </el-dialog>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'coupon',
  data () {
    return {
      discountId: '',
      buyWay: '1',
      obj: {},
      errorBox: false,
      errMsg: '',
      payBox: false,
      menuIndex: 0,
      weCode: '',
      discountOrderNo: ''
    }
  },
  created () {
    this.getParams()
    this.getDiscountDetails()
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.discountId
      // 将数据放在当前组件的数据内
      this.discountId = routerParams
    },
    getDiscountDetails: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('discountId', this.discountId);
      this.axios({
        method: 'post',
        url: this.url.api.getDiscountDetails,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.obj = data.obj
          _this.buyWay = data.obj.buyWay
        }
      })
    },
    newDiscountOrder: function () { // 现金支付创建订单
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('discountId', this.discountId);
      this.axios({
        method: 'post',
        url: this.url.api.newDiscountOrder,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.payBox = true
          _this.discountOrderNo = data.obj
          _this.payByWeixinGzhWithDiscountQr()
        }
      })
    },
    payByWeixinGzhWithDiscountQr: function () { // 现金支付
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('discountOrderNo', this.discountOrderNo);
      this.axios({
        method: 'post',
        url: this.url.api.payByWeixinGzhWithDiscountQr,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.payBox = true
          _this.weCode = data.obj.qrUrl
        }
      })
    },
    payByAliPayWithDiscountQr: function () { // 支付宝支付
      window.location.href = 'https://m.hqyt.cc/fyapp/payByAliPayWithDiscountQr.do?userId=' + this.$store.state.userId + '&discountOrderNo=' + this.discountOrderNo
    },
    payByOnlyPointDiscount: function () { // 积分兑换
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('discountId', this.discountId);
      this.axios({
        method: 'post',
        url: this.url.api.payByOnlyPointDiscount,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '恭喜你！兑换成功',
            type: 'success'
          });
        }
      })
    },
    getDiscountWithNoThing: function () { // 立即领取
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('discountId', this.discountId);
      this.axios({
        method: 'post',
        url: this.url.api.getDiscountWithNoThing,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '恭喜你！领取成功',
            type: 'success'
          });
        }
      })
    },
    payZfb: function () {
      this.menuIndex = 1;
    },
    payWechat: function () {
      this.menuIndex = 0;
    },
    payQrSearch: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('discountOrderNo', this.discountOrderNo);
      this.axios({
        method: 'post',
        url: this.url.api.payByWeixinGzhWithDiscountQrSearch,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.payBox = false
          _this.$message({
            message: '支付成功',
            type: 'success'
          });
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .curPosition{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    height: 48px;
    line-height: 48px;
    color: #131313;
    font-size: 14px;
    margin: 0 auto;
    border-bottom:1px dashed #ccc;
  }
.coupon{
  width:1150px;
  margin: 0 auto;
}
.couponTop{width: 96%;height: 250px;background: url(../common/img/ticketBg.png) no-repeat;background-size: 100% 100%;box-sizing: border-box;padding: 40px;margin:10px 2%;}
.couponTop h6{font-size: 26px;color: #131313;font-weight: 100;}
.couponTop h1{font-size: 48px;color: #131313;font-weight: 100;margin: 20px 0;}
.couponMid{
  padding: 35px 0;
  margin: 0 2%;
  border-bottom: 1px dashed #ccc;
  position: relative;
  h2{
    font-size: 42px;
    margin-bottom: 20px;
    font-weight: 100;
  }
  p{
    font-size:22px;
  }
  a{
    display: block;
    width:235px;
    height: 75px;
    line-height: 75px;
    text-align: center;
    background: #cc0000;
    border-radius: 3px;
    color: #fff;
    font-size: 30px;
    position: absolute;
    right: 2%;
    top:45px;
  }
}
  .couponBtm{
    margin: 0 2% 50px 2%;
    p{
      line-height: 80px;
      font-size: 18px;
    }
    h4{
      font-size: 16px;
      font-weight: 100;
      margin-bottom: 15px;
      span{
        font-size: 18px;
      }
    }
  }
  .payMethod{
    width: 90%;
    margin: 0 auto;
  }
  .payMenu{
    width:100%;
    height: 40px;
    li{
      width:180px;
      text-align: center;
      line-height: 40px;
      background: #e4e4e4;
      float: left;
      color: #333;
      border-radius: 3px 3px 0 0;
      border-top:1px solid #a1a1a1;
      border-left:1px solid #a1a1a1;
      border-right:1px solid #a1a1a1;
      position: relative;
      &:first-child{
        border-right: 0;
      }
      &.cur{
        color: #000;
        background: #fff;
        border-bottom: 1px solid #fff;
        font-weight: bold;
        z-index:2;
      }
    }
  }
  .payCont{
    width: 100%;
    height:auto;
    float: left;
    padding: 40px 0 0 0;
    border:1px solid #a1a1a1;
    position: relative;
    margin-top: -1px;
    min-height:200px;
  }
  .payCont_lf{
    float: left;
    img{
      width:150px;
      margin-left: 20px;
      margin-right: 80px;
    }
  }
  .payCont_rg{
    float: left;
  }
  .wepayIcon{
    position: absolute;
    top:-18px;
    left:40%;
  }
  .payMoney{
    background: #e7e7e7;
    text-align: right;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    float: left;
    width:100%;
    margin-top: 30px;
    span{
      font-size: 22px;
      color: #e4393c;
      margin-right: 45px;
    }
    a{
      display: inline-block;
      width:210px;
      height: 56px;
      background: #dd0011;
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
  }
</style>

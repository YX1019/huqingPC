<template>
<div class="order">
    <div class="orderState">
      <p class="stateTxt">
      <img src="../common/img/suc.png"/>
      <span>您的订单已提交成功！付款咯~</span>
      </p>
      <div class="orderInfo">
       <h6>订单：{{orderObj.orderNo}}</h6>
        <p>商品名称：{{orderObj.productName}}</p>
        <p>金额：{{orderObj.orderPrice}}</p>
        <p>购买时间:{{orderObj.orderTime}}</p>
        <p>应付金额<span>￥{{orderObj.orderPrice}}</span></p>
        <!--<p>配送：张三/13989238902/浙江省，杭州市，滨江区 伟业路</p>-->
        <!--<p>商品详情：胡庆余堂琵琶膏&nbsp;&nbsp;&nbsp;&nbsp;单价：100.00；&nbsp;使用胡币：10；&nbsp;使用积分10；&nbsp;数量：1件</p>-->
      </div>
    </div>
  <h4>选择支付方式</h4>
  <!--<div class="payWay">-->
    <!--<span><input type="radio" name="pay" value="2" v-model="payWay"/><img src="../common/img/zfb.png"/> </span>-->
    <!--<span><input type="radio" name="pay" value="1" v-model="payWay"/><img src="../common/img/wechat.png"/> </span>-->
  <!--</div>-->
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
            <p><img src="../common/img/wepayTxt.png"/></p>
           </div>
       </div>
       <div v-show="menuIndex === 1">
         <p style="margin-left: 30px;line-height: 50px;">请按下面的按钮去支付宝支付</p>
         <el-button type="primary" @click="webPageAliPay()" style="margin-left: 30px;">去支付</el-button>
       </div>
     </div>
  </div>
  <div class="payMoney"><font class="lf" style="margin-left: 20px;">若已支付，请按确定按钮到订单页面查看订单信息</font><a @click="getOrderPayStatus()" class="hand">确定</a></div>
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
  name: '',
  data () {
    return {
      errorBox: false,
      errMsg: '',
      orderObj: {},
      payWay: 2,
      menuIndex: 0,
      orderNo: '',
      weCode: '',
      type: '0'
    }
  },
  created () {
    this.getParams()
    this.getCompleteOrderDetails()
    this.payByWeixinPage()
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.orderNo
      // 将数据放在当前组件的数据内
      this.orderNo = routerParams
      this.type = this.$route.query.type
      console.log(this.orderNo)
    },
    getCompleteOrderDetails: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderNo);
      params.append('type', this.type);
      this.axios({
        method: 'post',
        url: this.url.api.getCompleteOrderDetails,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.orderObj = data.obj
        }
      })
    },
    toPay: function () {
      this.$router.push({path: '/personal/myOder'})
    },
    payZfb: function () {
      this.menuIndex = 1;
    },
    payWechat: function () {
      this.menuIndex = 0;
    },
    payByWeixinPage: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderNo);
      params.append('orderType', this.type);
      this.axios({
        method: 'post',
        url: 'https://m.hqyt.cc/fyapp/payByWeixinPage.do',
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.weCode = data.obj
        }
      })
    },
    getOrderPayStatus: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderNo);
      params.append('type', this.type);
      this.axios({
        method: 'post',
        url: this.url.api.getOrderPayStatus,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          if (data.obj.status === '1') {
            _this.$router.push({path: '/personal/myOder'})
          } else {
            _this.$message.error('支付失败，请重新支付！');
          }
        }
      })
    },
    webPageAliPay: function () {
      window.location.href = process.env.API_ROOT + 'webPageAliPay.do?userId=' + this.$store.state.userId + '&orderNo=' + this.orderNo + '&orderType=' + this.type
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.order{
  width:1150px;
  margin: 30px auto;
  h4{
    font-size: 18px;
    font-weight: 100;
    margin: 30px 0 20px 0;
  }
}
  .orderState{
    width:100%;
    box-sizing: border-box;
    border:1px solid #ddd;
    padding: 25px 65px;
  }
  .stateTxt{
    margin: 60px 0;
    color: #131313;
    font-size:24px;
    img{
      vertical-align: middle;
      margin-right: 45px;
    }
  }
  .orderInfo{
    width:100%;
    box-sizing: border-box;
    padding: 28px 35px;
    border:1px solid #ddd;
    color: #131313;
    h6{
      font-size: 18px;
     font-weight: 100;
      margin-bottom: 20px;
    }
    p{
      font-size: 16px;
      margin-left: 35px;
      margin-bottom: 15px;
    }
  }
  .payWay{
    box-sizing: border-box;
    padding: 40px 60px 30px 60px;
    border:1px solid #ddd;
    span{
      margin-right: 100px;
      input{
        margin-right: 10px;
      }
      img{
        vertical-align: middle;
      }
    }
  }
  .payMoney{
    margin: 20px 0;
    background: #e7e7e7;
    text-align: right;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
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
    padding: 40px 0;
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

</style>

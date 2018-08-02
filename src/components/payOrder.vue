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
        <!--<p>配送：张三/13989238902/浙江省，杭州市，滨江区 伟业路</p>-->
        <!--<p>商品详情：胡庆余堂琵琶膏&nbsp;&nbsp;&nbsp;&nbsp;单价：100.00；&nbsp;使用胡币：10；&nbsp;使用积分10；&nbsp;数量：1件</p>-->
      </div>
    </div>
  <h4>选择支付方式</h4>
  <div class="payWay">
    <span><input type="radio" name="pay" value="2" v-model="payWay"/><img src="../common/img/zfb.png"/> </span>
    <span><input type="radio" name="pay" value="1" v-model="payWay"/><img src="../common/img/wechat.png"/> </span>
  </div>
  <div class="payMoney">应付金额<span>￥{{orderObj.orderPrice}}</span><a @click="toPay()" class="hand">立即付款</a></div>
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
      payWay: 2
    }
  },
  created () {
    this.getCompleteOrderDetails()
  },
  methods: {
    getCompleteOrderDetails: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', sessionStorage.getItem('orderNo'));
      params.append('type', 0);
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
      console.log(this.payWay)
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

</style>

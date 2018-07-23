<template>
<div class="order">
 <h3>确认订单信息</h3>
  <div class="orderTitle">
    <span>店铺宝贝</span>
    <span>商品属性</span>
    <span>单价</span>
    <span>数量</span>
    <span>优惠方式</span>
    <span>小计</span>
  </div>
  <div class="orderItem clearfix">
    <h4>店铺:胡庆余堂滨江店</h4>
    <div style="width: 100%;box-sizing: border-box;padding: 15px;">
      <div class="orderItem1"><img src="../common/img/productImg1.jpg"/><span>胡庆余堂枇杷膏</span> </div>
      <div class="orderItem2">规格：100ML</div>
      <div class="orderItem3">199.00</div>
      <div class="orderItem4">1</div>
      <div class="orderItem5"><select><option selected>已省10元</option></select></div>
      <div class="orderItem6">199.00</div>
    </div>
    <div class="methods">运送方式<select><option selected>快递</option></select></div>
    <div class="address">收货地址<select>
      <option selected><span>张三</span><span>浙江省杭州市滨江区伟业路1号</span><span>高新软件园307</span><span>287421</span><span>159****124</span></option>
      <option><a>新增收货地址</a></option>
    </select>
      <p class="total">店铺合计:<span> ￥199.00</span></p>
    </div>
    <div class="address" style="display: none">门店地址 <span style="margin-left: 20px">浙江省杭州市滨江区胡庆余堂滨江店</span>
      <p class="total">店铺合计:<span> ￥199.00</span></p>
    </div>
  </div>
  <p class="realPayment">实付款:<span>￥199.00</span></p>
  <p class="clearfix"><button class="putOrder" @click="postOrder()">提交订单</button></p>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {}
  },
  methods: {
    postOrder: function () {
      this.$router.push({path: '/payOrder'})
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.order{
  width:1150px;
  margin: 0 auto 30px auto;
  h3{
    font-size: 16px;
    margin: 30px auto;
  }
}
  .orderTitle{
    width:100%;
    line-height: 35px;
    margin-bottom: 30px;
    span{
      display: inline-block;
      box-sizing: border-box;
      margin-right: 2px;
      border-bottom: 2px solid #dd0011;
      text-align: center;
      &:first-child{
        width:28%;
      }
      &:nth-child(2){
        width:18%;
      }
      &:nth-child(3){
        width:11%;
      }
      &:nth-child(4){
        width:15%;
      }
      &:nth-child(5){
         width:15%;
       }
      &:nth-child(6){
        width:10%;
      }
    }
  }
  .orderItem{
    h4{
      width:100%;
      height: 40px;
      border-bottom: 1px dashed #e22735;
      line-height: 40px;
      font-weight: 100;
    }
  }

.orderItem1,.orderItem2,.orderItem3,.orderItem4,.orderItem5,.orderItem6{
  float: left;
  text-align: center;
  margin-right: 2px;
  font-size: 14px;
  color: #717171;
}
.orderItem1{width:28%;text-align: left;
img{
  float: left;
  margin-right: 10px;
}}
.orderItem2{ width:18%;}
.orderItem3{width:11%;}
.orderItem4{ width:15%;}
.orderItem5{ width:15%;
  select{
  width:80%;
  margin-left: 10%;
  height: 30px;
  border:1px solid #ddd;
}}
.orderItem6{width:10%;text-align: right;color: #dd0011;}
  .methods{
    clear: both;
    width:100%;
  height: auto;
    background: #fef2f3;
    padding: 15px 20px;
    box-sizing: border-box;
    margin-bottom: 2px;
    select{
      width:150px;
      height: 30px;
      border:1px solid #ddd;
      margin-left: 30px;
      text-align: center;
    }
  }
  .address{
    width:100%;
    height: auto;
    box-sizing: border-box;
    background: #fef2f3;
    padding: 20px;
    select{
      width:700px;
      height: 30px;
      border:1px solid #ddd;
      margin-left: 30px;
    }
  }
  .total{
    text-align: right;
    margin-top: 25px;
    font-size: 14px;
    span{
      font-size: 18px;
      color: #dd0011;
    }
  }
  .realPayment{
    font-size:14px;
    color: #000;
    text-align: right;
    margin: 35px 30px 20px 0;
    span{
      color: #dd0011;
      font-size:30px;
    }
  }
  .putOrder{
    width:195px;
    color: #fff;
    background: #dd0011;
    font-size: 18px;
    height: 50px;
    border-radius: 3px;
    float: right;
  }
</style>

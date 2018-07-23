<template>
<div class="personRg">
  <div class="orderTitle">
    <span class="orderItem1">产品</span><span class="orderItem2">单价</span><span class="orderItem3">数量</span>
    <span class="orderItem4">商品操作</span><span class="orderItem5">实付款</span><span class="orderItem6">交易状态</span><span class="orderItem7">交易操作</span>
  </div>
  <div class="myOderItem ">
    <div class="myOrderTop">
      <input type="checkbox"/>2018-06-21<span class="orderNo">订单号:15652154654524</span>
      <span><img src="../common/img/storeIcon.png" class="storeIcon"/> 胡庆余堂滨江店</span><span class="rg">快递</span>
    </div>
    <div class="myOrderItemCont ">
      <div class="orderItem1 orderItemName"><img src="../common/img/productImg1.jpg"/>
        <div class="oderItem_rg"><h3>胡庆余堂鹿精蛹虫草膏</h3><p>规格：100ml</p></div>
      </div>
      <div class="orderItem2"><p class="oldProPrice">￥199.00</p><p>￥100.00</p></div>
      <div class="orderItem3"><p>1</p></div>
      <div class="orderItem4"></div>
      <div class="orderItem5"><p>￥100.00</p></div>
      <div class="orderItem6"><p>已收货</p><p>订单详情</p></div>
      <div class="orderItem7"><a class="returnGoods">申请售后</a></div>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .personRg{
    margin-left: 250px;
    position: relative;
    color: #000;
  }
  .orderTitle{
    box-sizing: border-box;
    height: 48px;
    line-height: 48px;
    border:1px solid #ddd;
    background: #f5f5f5;
    font-size:14px;
    margin-top: 25px;
  }
  .orderItem1,.orderItem2,.orderItem3,.orderItem4,.orderItem5,.orderItem6,.orderItem7{
    display: inline-block;
    text-align: center;
    float: left;
  }
  .orderItem1{
    width:36%;
  }
  .orderItem2,.orderItem3,.orderItem4,.orderItem5{
    width:9%;
  }
  .orderItem6,.orderItem7{
    width:13%;
  }
  .orderItem4{height: 48px;}
  .myOderItem{
    width:100%;
    box-sizing: border-box;
    height: auto;
    border:1px solid #ffc8cc;
    margin-top: 15px;
    float: left;
  }
  .myOrderTop{
    line-height: 48px;
    border-bottom: 1px solid #ffc8cc;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 15px;
    background: #fef7f7;

    input{
      margin-right: 15px;
    }
  }
  .orderNo{margin: 0 120px 0 20px;}
  .myOrderItemCont{
    width:100%;
    padding: 20px 0;
    float: left;
  }
  .orderItemName{
    img{
      width:90px;
      height: 90px;
      float: left;
      margin: 0 15px;
    }
  }
  .oderItem_rg{
    float: left;
    h3{
      font-weight: 100;
      font-size: 14px;
      margin-bottom: 30px;
    }
    p{
      color: #8e8e8e;
    }
  }
  .oldProPrice{
    color: #8e8e8e;
    text-decoration: line-through;
  }
  .orderItem6{
    p{
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
  .returnGoods{
    padding: 8px 15px;
    color: #fff;
    background: #dd0011;
    border-radius: 3px;
    display: inline-block;
  }
</style>

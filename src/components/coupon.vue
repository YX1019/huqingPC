<template>
<div class="coupon">
  <div class="curPosition">您现在的位置:首页>商城.>我的优惠>代金券</div>
  <div class="couponTop">
    <h6>胡庆余堂·滨江店</h6>
    <h1>￥20代50元券</h1>
    <h6>周一至周日可用</h6>
  </div>
  <div class="couponMid">
      <h2>￥20</h2>
      <p>门市价￥50</p>
      <a>立即购买</a>
  </div>
  <div class="couponBtm">
    <p>可叠加 | 随时退</p>
    <h4><span>有效期：</span>2018.10.04至2018.12.10</h4>
    <h4><span>使用时间：</span>使用时间：17:00-次日01:00</h4>
    <h4><span>适用范围：</span>全场通用</h4>
    <h4><span>使用规则：</span>全场通用</h4>
  </div>

</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'coupon',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
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
</style>

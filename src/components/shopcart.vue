<template>
<div class="shopCart clearfix">
  <h1><span>全部商品0</span></h1>
  <div class="noGoods" style="display: none;">
    <img src="../common/img/nogoods.png"/>
    <p>对不起，当前购物车为空</p>
    <a @click="toStore()">去商城逛逛</a>
  </div>
  <div class="goods">
    <h5 class="goodsTitle">
      <span>单价</span>
      <span>数量</span>
      <span>金额</span>
      <span>操作</span>
    </h5>
    <div content="goodsPart">
    <div class="goodStore">
      <h4><input type="checkbox" class="checkIcon" style="margin-top: 20px;">
        <span><img src="../common/img/storeIcon.png" class="storeIcon"/>胡庆余堂滨江店
          <img src="../common/img/ticket.png" class="ticket"/></span>
      </h4>
    </div>
    <div class="goodsItem">
      <div class="goodsItem1"><input type="checkbox" class="checkIcon"><img src="../common/img/productImg1.jpg"/><span>胡庆余堂鹿精蛹虫草膏</span></div>
      <div class="goodsItem2">规格：100ml</div>
      <div class="goodsItem3"><p>￥299.00</p><p>￥199.00</p></div>
      <div class="goodsItem4"><button>-</button><input type="text" value="1"/><button>+</button> </div>
      <div class="goodsItem5 red">￥199.00</div>
      <div class="goodsItem6"><p>移入收藏夹</p><p>删除</p></div>
    </div>
    </div>
    <div class="goodsOpera">
      <input type="checkbox" class="checkIcon" style="margin-top: 13px;">全选
      <span class="opera1">删除</span>
      <span>移入收藏夹</span>
      <span class="opera3">已选商品<span class="red">0</span>件</span>
      <span class="opera4">合计（不含运费）:<span class="red">0.00</span></span>
      <a @click="toOrder()">结算</a>
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
  methods: {
    toStore: function () {
      this.$router.push({ path: '/store' })
    },
    toOrder: function () {
      this.$router.push({ path: '/placeOrder' })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .red{
    color: #dd0011;
  }
.shopCart{
  width: 1150px;
  height:auto;
  margin: 0 auto;
  h1{
    margin-top: 35px;
    height: 50px;
    border-bottom: 2px solid #dcdcdc;
    box-sizing: border-box;
    span{
      box-sizing: border-box;
      display: inline-block;
      padding: 0 15px;
      line-height: 48px;
      border-bottom: 2px solid #dd0011;
      color: #dd0011;
      font-size: 18px;
    }
  }
}
  .noGoods{
    width:100%;
    text-align: center;
    margin: 150px 0 300px 0;
    p{
      font-size: 16px;
      color: #000;
      margin: 15px 0;
    }
    a{
      display: inline-block;
      width:230px;
      height: 56px;
      line-height: 56px;
      color: #fff;
      background: #dd0011;
      border-radius: 3px;
      font-size: 18px;
    }
  }
  .goods{
    width:100%;
    .goodsTitle{
      height:40px;
      width:48%;
      margin-left: 52%;
      span{
        display: inline-block;
        text-align: center;
        font-weight: 100;
        width:24%;
        line-height:40px;
      }
    }
  }
  .goodStore{
    h4{
      height: 55px;
      line-height:55px;
      vertical-align: middle;
      span{
        display: inline-block;
        line-height: 55px;
      }
    }
  }
  .storeIcon{
    width:22px;
    height:22px;
    margin-right: 15px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .goodsItem{
    width:100%;
    height: auto;
    padding:25px;
    border:1px solid #ddd;
    float: left;
    font-size: 14px;
    margin-bottom: 35px;
    box-sizing: border-box;
    &:after{
      display: table;
      content: '';
      clear: both;
    }
  }
  .goodsItem1{
    width:40%;float: left;
    img{
      width:88px;
      margin-right: 10px;
      float: left;
    }
    span{
      float: left;
      font-size: 14px;
    }
  }
  .goodsItem2{width:12%;float: left;
    color: #818181;}
  .goodsItem3{
    width:12%;float: left;
    p{
      &:first-child{
        text-decoration: line-through;
        color: #818181;}
    }
  }
  .goodsItem4{
    width:12%;
    float: left;
    button{
      float: left;
      width:27px;
      height:27px;
      border: 1px solid #ddd;
      background: #f0f0f0;
      box-sizing: border-box;
    }
    input{
      box-sizing: border-box;
      float: left;
      width:48px;
      height:27px;
      border: 1px solid #aaa;
      text-align: center;
    }
  }
  .checkIcon{
    width:18px;
    height: 18px;
    margin-right: 5px;
    background: none;
    border:1px solid #ddd;
    float: left;
    margin-top: 5px;
  }
  .goodsItem5{width:12%;float: left;}
  .goodsItem6{width:12%;float: left;}
  .goodsOpera{
    box-sizing: border-box;
    float: left;
    background: #e5e5e5;
    margin-bottom: 35px;
    width:100%;padding-left:15px;height: 50px;line-height: 50px;
    a{
      width: 128px;
      height: 50px;
      line-height:50px;
      display: inline-block;
      float: right;
      background: #b0b0b0;
      color: #fff;
      text-align: center;
    }
  }
  .opera1{
    margin: 0 60px;
  }
  .opera3{
    margin-left: 20%;
    margin-right: 50px;
  }
  .goodsPart{
    width:100%;
    height: auto;
    float: left;
  }
  .ticket{
    vertical-align: middle;
    margin-left: 25px;
  }
</style>

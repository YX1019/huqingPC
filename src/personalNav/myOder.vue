<template>
  <div class="personRg">
     <ul class="myOrderList">
       <li v-for="(item,index) in myOrderMenu" :key="item" @click="changeOrderState(index)" :class="{'cur':index == active}">{{item}}</li>
     </ul>
    <div class="nocont" v-show="!isList">暂无订单</div>
    <div class="orderTitle1" v-show="isList">
      <span class="orderItem1">产品</span><span class="orderItem2">单价</span><span class="orderItem3">数量</span>
      <span class="orderItem4">商品操作</span><span class="orderItem5">实付款</span><span class="orderItem6">交易状态</span><span class="orderItem7">交易操作</span>
    </div>
    <div class="myOderItem " v-for="item in myOrderList" :key="item.childOrderId" v-show="isList">
      <div class="myOrderTop">
        <input type="checkbox"/>{{item.createTime}}<span class="orderNo">订单号:{{item.orderId}}</span>
        <span><img src="../common/img/storeIcon.png" class="storeIcon"/> {{item.merchantName}}</span><span class="rg">快递</span>
      </div>
      <div class="myOrderItemCont ">
        <div class="orderItem1 orderItemName"><img src="../common/img/productImg1.jpg"/>
          <div class="oderItem_rg"><h3>胡庆余堂鹿精蛹虫草膏</h3><p>规格：100ml</p></div>
        </div>
        <div class="orderItem2"><p class="oldProPrice">￥199.00</p><p>￥100.00</p></div>
        <div class="orderItem3"><p>1</p></div>
        <div class="orderItem4"></div>
        <div class="orderItem5"><p>￥100.00</p></div>
        <div class="orderItem6" v-if="item.statusEnum == 0"><p>等待买家付款</p><p>订单详情</p></div>
        <div class="orderItem6" v-if="item.statusEnum == 1"><p>待发货</p><p @click="toOderDteail()">订单详情</p></div>
        <div class="orderItem6" v-if="item.statusEnum == 2"><p>待收货</p><p>订单详情</p></div>
        <div class="orderItem6" v-if="item.statusEnum == 3"><p>待评价</p><p>订单详情</p></div>
        <div class="orderItem7" v-if="item.statusEnum == 0"><a class="returnGoods">立即付款</a><p>取消订单</p></div>
        <div class="orderItem7" v-if="item.statusEnum == 1"><a class="returnGoods">申请退货</a></div>
        <div class="orderItem7" v-if="item.statusEnum == 2"><a class="returnGoods">确认收货</a><p>查询物流</p></div>
        <div class="orderItem7" v-if="item.statusEnum == 3"><a class="returnGoods">待评价</a></div>
      </div>
    </div>
    <!--<div class="orderBottom"><input type="checkbox"/>全选 <span class="orderPayBtn">合并付款</span></div>-->
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
  name: 'myOder',
  data () {
    return {
      myOrderMenu: ['所有订单', '待付款', '待发货', '待收货', '待评价'],
      active: 0,
      myOrderList: [],
      errorBox: false,
      errMsg: '',
      isList: true
    }
  },
  created () {
    this.queryUserOrderList('', '')
  },
  methods: {
    changeOrderState: function (index) {
      this.active = index
      if (index === 0) {
        this.queryUserOrderList()
      } else if (index === 1) {
        this.queryUserOrderList('', 0)
      } else if (index === 2) {
        this.queryUserOrderList('', 1)
      } else if (index === 3) {
        this.queryUserOrderList('', 2)
      } else if (index === 4) {
        this.queryUserOrderList('', 3)
      }
    },
    toOderDteail: function () {
      this.$router.push({ path: '/orderDetail' })
    },
    queryUserOrderList: function (payStatus, orderStatus) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('payStatus', payStatus);
      params.append('orderStatus', orderStatus);
      this.axios({
        method: 'post',
        url: this.url.api.queryUserOrderList,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.myOrderList = data.listObject
          if (_this.myOrderList.length === 0) {
            _this.isList = false
          } else {
            _this.isList = true
          }
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
.myOrderList{
  width:100%;
  height:40px;
  border-bottom: 1px solid #ddd;
  li{
    width:170px;
    height: 38px;
    float: left;
    font-size: 16px;
    text-align: center;
    line-height: 38px;
    &.cur{
      color: #e10a08;
      border-bottom: 2px solid #e10a08;
    }
  }
}
.orderTitle1{
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
      cursor: pointer;
    }
  }
  .returnGoods{
    padding: 8px 15px;
    color: #fff;
    background: #dd0011;
    border-radius: 3px;
    display: inline-block;
  }
  .storeIcon{
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
  .orderBottom{
    width:100%;
    float: left;
    margin-top: 15px;
  input{
    margin: 0 15px;
  }}
  .orderPayBtn{
    padding: 8px 15px;
    display: inline-block;
    border:1px solid #ddd;
    font-size: 14px;
    margin-left: 15px;
  }
  .nocont{
    width:100%;
    padding: 30px 0;
    text-align: center;
  }
</style>

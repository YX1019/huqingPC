<template>
<div class="orderDetail clearfix">
  <div class="curPosition">您现在的位置:首页>用户中心>订单详情</div>
  <p class="orderTime">2018-06-21 12:20:10</p>
  <div class="orderContent">
     <div class="order_lf">
       <h2>订单信息</h2>
       <p><span class="ordCont_lf">收货地址：</span><span class="ordCont_rg">{{orderInfo.receiveName}}，{{orderInfo.receiveCell}}，{{orderInfo.receiveProvince}}{{orderInfo.receiveCity}} {{orderInfo.receiveArea}} {{orderInfo.receiveAddress}}</span></p>
       <p><span class="ordCont_lf">订单编号：</span><span class="ordCont_rg">{{orderInfo.orderId}}</span></p>
       <p><span class="ordCont_lf">商家：</span><span class="ordCont_rg">胡庆余堂滨江店</span></p>
       <p><span class="ordCont_lf">地址：</span><span class="ordCont_rg">杭州市滨江区</span></p>
       <p><span class="ordCont_lf">电话：</span><span class="ordCont_rg">158458784520</span></p>
     </div>
    <div class="order_rg">
      <div class="waitToDeliver" v-if="orderInfo.statusEnum == 0">
        <p><img src="../common/img/icon.png"/><span>订单状态：商品已拍下，等待买家付款</span></p>
        <!--<p>您可以 <span class="rtnGoodsBtn">申请退货</span><span class="cancelBtn">取消订单</span></p>-->
        <p>您可以 <span class="rtnGoodsBtn hand" @click="toPayPage()">付款</span><span class="cancelBtn hand" @click="cancleOrder()">取消订单</span></p>
      </div>
      <div class="waitToDeliver" v-else-if="orderInfo.statusEnum == 1 && orderInfo.proType != 2">
       <p><img src="../common/img/icon.png"/><span>订单状态：卖家已付款等待发货</span></p>
        <p>您可以 <span class="rtnGoodsBtn hand" @click="returnGoods(orderInfo.orderId)">申请退货</span></p>
      </div>
      <div class="waitToDeliver" v-else-if="orderInfo.statusEnum == 3 && orderInfo.proType != 2">
        <p><img src="../common/img/icon2.png"/><span>订单状态：商家已发货，等待买家确认</span></p>
         <h6>物流：中通快递 运单号：1567465435<br/>2018-06-21 18:20:12  <span class="orange">已签收</span></h6>
        <p>您可以 <span class="rtnGoodsBtn hand" @click="toEvaluate(orderInfo.orderId)">评价</span></p>
      </div>
      <div class="waitToDeliver" v-else-if="orderInfo.statusEnum == 2 && orderInfo.proType == 2">
        <p><img src="../common/img/icon.png"/><span>订单状态：买家已付款，待使用</span></p>
        <p>您可以 <span class="rtnGoodsBtn hand" @click="lookCode()">点击凭证</span><span class="cancelBtn hand" @click="returnGoods(orderInfo.orderId)">申请退款</span></p>
      </div>
      <div class="waitToDeliver" v-else-if="orderInfo.statusEnum == 2 && orderInfo.proType != 2">
        <p><img src="../common/img/icon2.png"/><span>订单状态：商家已发货，等待买家确认</span></p>
        <h6 v-show="orderInfo.trans == 0">最新物流消息：{{orderInfo.transTime}}  <br/><span class="orange" style="display: inline-block;padding: 10px 50px 0 20px;">{{orderInfo.transMsg}}</span></h6>
        <p>您可以 <span class="rtnGoodsBtn" @click="receiveOrder()">确认收货</span>
          <!--<span class="cancelBtn hand" @click="returnGoods(orderInfo.orderId)">申请退款</span>-->
        </p>
      </div>
      <div class="waitToDeliver" v-else>
        <p><img src="../common/img/icon.png"/><span>订单状态：{{orderInfo.statusStr}}</span></p>
      </div>
    </div>
  </div>
    <div class="orderTitle">
      <span class="orderItem1">商品</span><span class="orderItem2">单价</span><span class="orderItem3">数量</span>
      <span class="orderItem4">收货方式</span><span class="orderItem5">优惠</span><span class="orderItem6">状态</span>
    </div>

      <div class="ordInfoCont" v-if="teamId" style="position:relative;float: left;width: 100%;border-bottom: 1px solid #ddd;">
        <div class="myOrderItemCont" v-for="item in orderInfo.detailsGoodsResults" :key="item.childOrderId">
          <div class="orderItem1 orderItemName"><img :src="item.proImg"/>
            <div class="oderItem_rg"><h3>{{item.proName}}</h3><p v-show="item.attrNames">{{item.attrNames}}：{{item.valueNames}}</p></div>
          </div>
          <div class="orderItem2"><p>￥{{item.perPrice}}<span style="color:#f7a53e; margin-left: 5px;" v-show="item.perPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{item.perPoint}}</span></p></div>
          <div class="orderItem3"><p>{{item.orderCount}}</p></div>
          <div class="orderItem4"><p v-if="item.trans === '0'">快递</p><p v-if="item.trans === '1'">自提</p></div>
        </div>
      <div style="position: absolute;width: 100%;top: 45px;left: 0;">
        <div class="orderItem5" style="margin-left:72%;height: 40px;"><p>优惠{{orderInfo.youhuiAmount}}元</p></div>
        <div class="orderItem6"><p>{{orderInfo.statusStr}}</p></div>
      </div>
  </div>
      <div class="ordInfoCont" v-if="!teamId">
         <div class="myOrderItemCont ">
            <div class="orderItem1 orderItemName"><img :src="orderInfo.proImg"/>
            <div class="oderItem_rg"><h3>{{orderInfo.proName}}</h3><p v-show="orderInfo.attrNames">{{orderInfo.attrNames}}：{{orderInfo.valueNames}}</p></div>
            </div>
            <div class="orderItem2"><p>￥{{orderInfo.perPrice}}<span style="color:#f7a53e; margin-left: 5px;" v-show="orderInfo.perPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{orderInfo.perPoint}}</span></p></div>
            <div class="orderItem3"><p>{{orderInfo.orderCount}}</p></div>
            <div class="orderItem4"><p v-if="orderInfo.trans === '0'">快递</p><p v-if="orderInfo.trans === '1'">自提</p></div>
           <div class="orderItem5 red"><p style="height: 40px;">优惠{{orderInfo.youhuiAmount}}元</p></div>
           <div class="orderItem6"><p>{{orderInfo.statusStr}}</p></div>
         </div>
      </div>
  <div class="orderCalc">
    <!--<span>返胡币10</span>-->
    <div class="orderCalcRg">
      <p><label>订单金额：</label><span>￥{{orderInfo.orderAmount}}</span></p>
      <p><label>运费：</label><span>￥{{orderInfo.luggageAmount}}</span></p>
      <p><label>胡币抵扣：</label><span>￥{{orderInfo.reduceAmount}}</span></p>
      <p><label>临时胡币：</label><span>￥{{orderInfo.huTempAmount}}</span></p>
      <p><label>优惠金额：</label><span>￥{{orderInfo.youhuiAmount}}</span></p>
      <p><label>总积分：</label><span>{{orderInfo.allPoint}}</span></p>
      <p v-show="orderInfo.discount>0"><label>折扣：</label><span>{{orderInfo.discount}}折</span></p>
      <p><label>实付款：</label><span class="red font18">￥{{orderInfo.allAmount}}</span></p>
    </div>
  </div>
  <div class="bg" v-if="dialogVisible"></div>
  <div class="codeBox" v-if="dialogVisible">
    <p>我的凭证<img src="../common/img/closed.png" @click="closeBox()"/> </p>
    <img :src="orderInfo.voucherCode" class="code"/>
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
    title="请完善您的订单信息"
    :visible.sync="completeAddr"
    width="50%">
    <div class="address" style="background: #fff;"><label class="lf">收货地址</label>
      <div class="addrOption">
        <h2 @click="showAddr()" >{{address}}</h2>
        <div v-show="isShowAddr">
          <p @click="getAttr(item)" v-for="item in addressList" :key="item.addressId"><span>{{item.name}}</span><span>{{item.province}}{{item.city}}{{item.area}}</span><span>{{item.addr}}</span><span>{{item.cell}}</span></p>
          <a @click="toAddr()">新增收货地址</a>
        </div>
      </div>
    </div>
    <div style="clear: both;"></div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="completeAddr = false">取 消</el-button>
    <el-button type="primary" @click="completeOrder()">确 定</el-button>
  </span>
  </el-dialog>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <addAddress v-on:refreshbizlines="tochildrenAdrr"></addAddress>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
    </div>
  </el-dialog>

</div>
</template>
<script type="text/ecmascript-6">
import addAddress from './address/addAddress.vue'
export default {
  name: '',
  components: {
    addAddress
  },
  data () {
    return {
      dialogVisible: false,
      orderId: '',
      errorBox: false,
      errMsg: '',
      orderInfo: {},
      teamId: '',
      completeAddr: false,
      address: '请选择收货地址',
      isShowAddr: false,
      name: '',
      province: '',
      city: '',
      area: '',
      addr: '',
      cell: '',
      addressList: [],
      dialogFormVisible: false,
      needAddress: false
    }
  },
  created () {
    this.getParams()
    if (this.teamId) {
      this.queryUserOrderDetails()
      this.addressQuery()
    } else {
      this.queryOrderDetails()
    }

    // this.queryOrderExpress()
  },
  mounted () {
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.orderId
      // 将数据放在当前组件的数据内
      this.orderId = routerParams
      this.teamId = this.$route.query.teamId
      console.log(this.orderId)
    },
    queryOrderDetails: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryOrderDetails,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          window.scrollTo(0, 0);
          _this.orderInfo = data.obj
        }
      })
    },
    queryUserOrderDetails: function () { // 待付款详情
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryUserOrderDetails,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          window.scrollTo(0, 0);
          _this.orderInfo = data.obj
          _this.needAddress = data.obj.needAddress
        }
      })
    },
    lookCode: function () {
      this.dialogVisible = true
    },
    closeBox: function () {
      this.dialogVisible = false
    },
    toEvaluate: function (orderId) {
      this.$router.push({path: '/evaluate', query: {orderId: orderId}})
    },
    returnGoods: function (orderId) {
      this.$router.push({path: '/returnGoods', query: {orderId: orderId}})
    },
    cancleOrder: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderId);
      params.append('teamId', this.teamId);
      this.axios({
        method: 'post',
        url: this.url.api.cancleOrder,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '订单取消成功！',
            type: 'success'
          });
          _this.queryUserOrderDetails()
        }
      })
    },
    receiveOrder: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.receiveOrder,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '交易完成！',
            type: 'success'
          });
          _this.queryOrderDetails()
        }
      })
    },
    queryOrderExpress: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryOrderExpress,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
          console.log('yicahng')
        } else {
          console.log(data)
        }
      })
    },
    toPayPage: function () {
      console.log(this.needAddress)
      if (this.needAddress) {
        this.completeAddr = true
      } else {
        this.$router.push({path: '/payOrder', query: {orderNo: this.orderId, type: '0'}})
      }
    },
    addressQuery: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      this.axios({
        method: 'post',
        url: this.url.api.addressQuery,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.addressList = data.listObject
        }
      })
    },
    showAddr: function () {
      this.isShowAddr = !this.isShowAddr
    },
    getAttr: function (item) {
      console.log(item)
      this.isShowAddr = false
      this.address = item.name + '  ' + item.province + item.city + item.area + item.addr + '  ' + item.cell
      this.name = item.name
      this.province = item.province
      this.city = item.city
      this.area = item.area
      this.addr = item.addr
      this.cell = item.cell
    },
    toAddr: function () {
      // this.$router.push({path: '/personal/address'})
      this.dialogFormVisible = true
    },
    tochildrenAdrr: function () {
      this.addressQuery()
      this.dialogFormVisible = false
    },
    completeOrder: function () {
      let _this = this;
      let msg = ''
      msg = this.name + ';' + this.cell + ';' + this.province + ';' + this.city + ';' + this.area + ';' + this.addr
      console.log(msg)
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderId);
      params.append('msg', msg);
      this.axios({
        method: 'post',
        url: this.url.api.completeOrder,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$router.push({path: '/payOrder', query: {orderNo: _this.orderId, type: '0'}})
        }
      })
    }
  },
  watch: {
    addressList: function (curVal, oldVal) {
      this.addressList = curVal
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .bg{
    width:100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index:10;
  }
  .codeBox{
    position: fixed;
    top:20%;
    left: 50%;
    margin-left: -290px;
    z-index:11;
    width:580px;
    background: #fff;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    padding: 25px;
    p{
     font-size: 24px;
      line-height: 60px;
      position: relative;
      img{
        position: absolute;
        top:0;
        right:0;
        width:38px;
      }
    }
  }
  .code{width:260px;
    margin-top:20px;
    margin-bottom: 50px;
  }
  .orange{
    color: #ff8a00;
    margin-left: 15px;
  }
.orderDetail{
  width:1150px;
  margin: 0 auto;
}
.curPosition{
  width:100%;
  padding: 20px 0 10px 0;
  color: #131313;
  font-size: 14px;
  border-bottom: 1px dashed #e2e2e2;
}
  .orderTime{
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #8e8e8e;
  }
  .orderContent{
    width:100%;
    height: auto;
    box-sizing: border-box;
    border:1px solid #ddd;
    float: left;
  }
  .order_lf{
    width:25%;
    float: left;
    border-right:1px solid #ddd;
    padding-bottom: 50px;
    h2{
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      background: #f3f3f3;
      font-size: 14px;
      color: #131313;
      font-weight: 100;
      border-bottom: 1px solid #ddd;
    }
    p{
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      margin-top:20px;
      float: left;
      span{
        float: left;
        &.ordCont_lf{
          display: block;
          width:80px;
        }
        &.ordCont_rg{
          display: block;
          width: calc(100% - 80px);
        }
      }
    }
  }
  .order_rg{
    width:74%;
    float: left;
  }
.orderTitle{
  box-sizing: border-box;
  height: 48px;
  line-height: 48px;
  border:1px solid #ddd;
  background: #f5f5f5;
  font-size:14px;
  margin-top: 25px;
  width:100%;
  float: left;
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
  width:12%;
}
.orderItem6{
  width:14%;
}
.myOrderItemCont{
  box-sizing: border-box;
  width:100%;
  padding: 20px 0;
  float: left;
  border:1px solid #ddd;
  border-top:0;
  border-bottom: 0;
  &:last-child{
    border-bottom:1px solid #ddd;
  }
  p{
    line-height: 80px;
  }
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
  width: 65%;
  text-align: left;
  h3{
    font-weight: 100;
    font-size: 14px;
    margin-bottom: 30px;
  }
  p{
    color: #8e8e8e;
    line-height: 22px;
  }
}
.orderCalc{
  width:100%;
  height: auto;
  background: #f3f3f3;
  padding: 30px;
  box-sizing: border-box;
  float: left;
  margin: 18px 0 50px 0;
}
  .orderCalcRg{
    float: right;
    width:270px;
    font-size: 16px;
    p{
      margin-top: 10px;
    label{
      width:100px;
      text-align: right;
      display: inline-block;
    }
    span{
      float:right;
    }
  }
  }
.red{
  color: #e70012;
}
  .font18{
    font-size: 18px;
  }
  .waitToDeliver{
    margin-top: 80px;
    h6{
      width:100%;
      text-align: center;
      font-weight: 100;
      font-size: 14px;
      margin-left: 25px;
    }
    p{
      text-align: center;
      line-height: 55px;
      &:last-child{
        margin-top: 30px;
      }
      img{
        vertical-align: middle;
        margin-right: 10px;
      }
      span{
        &.rtnGoodsBtn{
        display: inline-block;
        width:108px;
        height: 28px;
        line-height: 28px;
        text-align: center;
          background: #f5f5f5;
          border:1px solid #ddd;
          margin-left: 25px;

        }
        &.cancelBtn{
          margin-left: 25px;
          color: #000;
        }
      }
    }
  }
  .addrOption{
    float: left;
    width:65%;
    border: 1px solid #ccc;
    background: #fff;
    margin-left:15px;
    h2{
      width:100%;
      height: 30px;
      line-height: 35px;
      border-bottom: 1px solid #ccc;
      padding: 0 10px;
      font-weight:100;
      font-size: 12px;
      box-sizing: border-box;
    }
    p{
      font-size: 13px;
      padding:5px 10px;
      border-bottom: 1px solid #ddd;
      span{
        margin-right: 10px;
      }
    }
    a{
      padding:5px 10px;
      color: #dd0011;
      font-size:13px;
      display: block;
    }
  }
</style>

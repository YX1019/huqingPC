<template>
  <div class="orderDetail clearfix">
    <div class="curPosition">您现在的位置:首页>用户中心>门店订单>订单详情</div>
    <p class="orderTime">2018-06-21 12:20:10</p>
    <div class="orderContent">
      <div class="order_lf">
        <h2>订单信息</h2>
        <p><span class="ordCont_lf">收货地址：</span><span class="ordCont_rg">
         {{teamOrderInfo.receiveName}}，{{teamOrderInfo.receiveCell}}，{{teamOrderInfo.receiveProvince}} {{teamOrderInfo.receiveCity}} {{teamOrderInfo.receiveArea}} {{teamOrderInfo.receiveAddress}}</span>
        </p>
        <p><span class="ordCont_lf">订单编号：</span><span class="ordCont_rg">{{teamOrderInfo.orderId}}</span></p>
        <p><span class="ordCont_lf">商家：</span><span class="ordCont_rg">胡庆余堂滨江店</span></p>
        <p><span class="ordCont_lf">地址：</span><span class="ordCont_rg">杭州市滨江区</span></p>
        <p><span class="ordCont_lf">电话：</span><span class="ordCont_rg">158458784520</span></p>
      </div>
      <div class="order_rg">
        <div class="waitToPay" v-if="teamOrderInfo.statusEnum === '0'">
          <img src="../common/img/icon.png"/><span>订单状态：商品已拍下，等待买家付款</span>
        </div>
        <div class="waitToDeliver" v-else-if="teamOrderInfo.statusEnum === '1'">
          <p><img src="../common/img/icon.png"/><span>订单状态：商品已拍下，等待卖家发货</span></p>
          <p>您可以 <span class="rtnGoodsBtn" @click="sendGoods()">点击发货</span></p>
        </div>
        <div class="waitToDeliver" v-else-if="teamOrderInfo.statusEnum === '3'">
          <p style="margin-bottom:0;"><img src="../common/img/icon.png"/><span>订单状态：已确认收货等待买家评价</span></p>
          <h6>物流：{{wuliu.companyName}} 运单号：{{wuliu.nu}}<br/>{{wuliuNew.time}}<span class="orange"
                                                                                   style="margin-left: 10px;">{{wuliuNew.context}}</span>
          </h6>
        </div>
        <div class="waitToDeliver" v-else-if="teamOrderInfo.statusEnum === '6'">
          <p style="margin-bottom:0;"><img src="../common/img/icon.png"/><span>订单状态：买家已评价</span></p>
          <h6><i class="iconfont orange1" v-for="item in star" :key="item">&#xe694;</i>
            <!--<i class="iconfont orange1">&#xe694;</i>-->
            <!--<i class="iconfont orange1">&#xe694;</i>-->
            <!--<i class="iconfont orange1">&#xe694;</i>-->
            <!--<i class="iconfont orange1">&#xe694;</i>-->
            {{comment}}</h6>
        </div>
        <div class="waitToPay" v-else>
          <img src="../common/img/icon.png"/><span>订单状态：{{teamOrderInfo.statusStr}}</span>
        </div>
      </div>
    </div>
    <div class="orderTitle">
      <span class="orderItem1">商品</span><span class="orderItem2">单价</span><span class="orderItem3">数量</span>
      <span class="orderItem4">收货方式</span><span class="orderItem5">优惠</span><span class="orderItem6">状态</span>
    </div>
    <div class="ordInfoCont" v-if="way!= 'unpay'">
      <div class="myOrderItemCont ">
        <div class="orderItem1 orderItemName"><img :src="teamOrderInfo.proImg"/>
          <div class="oderItem_rg"><h3>{{teamOrderInfo.proName}}</h3>
            <p v-show="teamOrderInfo.attrNames">{{teamOrderInfo.attrNames}}：{{teamOrderInfo.valueNames}}</p></div>
        </div>
        <div class="orderItem2"><p>￥{{teamOrderInfo.perPrice}}<span style="color:#f7a53e; margin-left: 5px;" v-show="teamOrderInfo.perPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{teamOrderInfo.perPoint}}</span></p></div>
        <div class="orderItem3"><p>{{teamOrderInfo.orderCount}}</p></div>
        <div class="orderItem4"><p v-if="teamOrderInfo.trans === '0'">快递</p>
          <p v-if="teamOrderInfo.trans === '1'">自提</p></div>
        <div class="orderItem5"><p style="height: 40px;"></p></div>
        <div class="orderItem6"><p>{{teamOrderInfo.statusStr}}</p></div>
      </div>
    </div>
    <!--待付款-->
    <div class="ordInfoCont" v-if="way === 'unpay'" >
      <div style="position: relative;width: 100%;float: left;border-bottom: 1px solid #ccc;">
      <div class="myOrderItemCont " v-for="item in teamOrderInfo.detailsGoodsResults" :key="item.childOrderId" style="border-bottom:0;">
        <div class="orderItem1 orderItemName"><img :src="item.proImg"/>
          <div class="oderItem_rg"><h3>{{item.proName}}</h3>
            <p v-show="teamOrderInfo.attrNames">{{item.attrNames}}：{{item.valueNames}}</p></div>
        </div>
        <div class="orderItem2"><p>￥{{item.perPrice}}<span style="color:#f7a53e; margin-left: 5px;" v-show="item.perPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{item.perPoint}}</span></p></div>
        <div class="orderItem3"><p>{{item.orderCount}}</p></div>
        <div class="orderItem4"><p v-if="item.trans === '0'">快递</p>
          <p v-if="item.trans === '1'">自提</p>
        </div>
      </div>
        <div style="position: absolute;width: 100%;top: 45px;left: 0;">
        <div class="orderItem5" style="margin-left:72%;"><p>优惠{{teamOrderInfo.youhuiAmount}}元</p></div>
        <div class="orderItem6"><p>{{teamOrderInfo.statusStr}}</p></div>
        </div>
      </div>
    </div>
    <div class="orderCalc">
      <!--<span>返胡币10</span>-->
      <div class="orderCalcRg">
        <p><label>订单金额：</label><span>￥{{teamOrderInfo.orderAmount}}</span></p>
        <p><label>运费：</label><span>￥{{teamOrderInfo.luggageAmount}}</span></p>
        <p><label>胡币抵扣：</label><span>￥{{teamOrderInfo.reduceAmount}}</span></p>
        <p><label>临时胡币：</label><span>￥{{teamOrderInfo.huTempAmount}}</span></p>
        <p><label>优惠金额：</label><span>￥{{teamOrderInfo.youhuiAmount}}</span></p>
        <p><label>总积分：</label><span>{{teamOrderInfo.allPoint}}</span></p>
        <p v-show="teamOrderInfo.discount>0"><label>折扣：</label><span>{{teamOrderInfo.discount}}折</span></p>
        <p><label>实付款：</label><span class="red font18">￥{{teamOrderInfo.allAmount}}</span></p>
      </div>
    </div>
    <div class="bg" v-if="isShowBox"></div>
    <div class="deliveryBox" v-if="isShowBox">
      <h3>填写物流信息<img src="../common/img/closed.png" @click="close()"/></h3>
      <p><span>选择物流公司</span>
        <!--<select><option>请选择物流公司</option></select>-->
        <select v-model="expressCom">
          <option value="0">请选择</option>
          <option v-for="item in ExpressList" :value="item.expressNo" :key="item.expressNo">{{item.expressName}}
          </option>
        </select>
      </p>
      <p><span>填写物流单号</span><input type="text" v-model="carriNo"></p>
      <a @click="sendOrder()">发货</a>
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
  name: '',
  data () {
    return {
      isShowBox: false,
      orderId: '',
      teamOrderInfo: {},
      ExpressList: [],
      expressCom: '',
      carriNo: '',
      wuliu: {},
      wuliuNew: {},
      star: '',
      comment: '',
      way: '',
      errorBox: false,
      errMsg: ''
    }
  },
  created () {
    this.getParams()
    if (this.way === 'unpay') {
      this.queryTeamOrderDetailsForWaitPay()
    } else {
      this.queryTeamOrderDetails()
    }
  },
  mounted () {
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.orderId
      // 将数据放在当前组件的数据内
      this.orderId = routerParams
      this.way = this.$route.query.way
      console.log(this.orderId)
    },
    queryTeamOrderDetails: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryTeamOrderDetails,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          window.scrollTo(0, 0);
          _this.teamOrderInfo = data.obj
          if (_this.teamOrderInfo.statusEnum === '1') {
            _this.getExpress()
          }
          if (_this.teamOrderInfo.statusEnum === '3') {
            _this.queryTeamOrderExpress()
          }
          if (_this.teamOrderInfo.statusEnum === '6') {
            _this.queryEvaluate()
          }
        }
      })
    },
    queryTeamOrderDetailsForWaitPay: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryTeamOrderDetailsForWaitPay,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(res)
          _this.teamOrderInfo = data.obj
        }
      })
    },
    queryEvaluate: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('type', 1);
      params.append('childOrderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryEvaluate,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(res)
          if (data.listObject.length > 0) {
            _this.star = data.listObject[0].star
            _this.comment = data.listObject[0].commentWord
          }
        }
      })
    },
    sendGoods: function () {
      this.isShowBox = true
    },
    close: function () {
      this.isShowBox = false
    },
    sendOrder: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      params.append('carriCom', this.expressCom);
      params.append('carriNo', this.carriNo);
      console.log(this.expressCom, this.carriNo)
      this.axios({
        method: 'post',
        url: this.url.api.sendOrder,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.isShowBox = false
          _this.$message({
            message: '发货成功',
            type: 'success',
            duration: 1000
          })
          _this.queryTeamOrderDetails()
        }
      })
    },
    getExpress: function () {
      let _this = this;
      this.axios({
        method: 'post',
        url: this.url.api.getExpress
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.ExpressList = data.obj
        }
      })
    },
    queryTeamOrderExpress: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryTeamOrderExpress,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
          console.log('yicahng')
        } else {
          console.log(data)
          _this.wuliu = data.obj
          _this.wuliuNew = data.obj.data[0]
          console.log(_this.wuliu)
        }
      })
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
  .deliveryBox {
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -290px;
    z-index: 11;
    width: 580px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 45px 70px;
    font-size:18px;
    text-align: center;
    h3{
      font-size: 24px;
      width:100%;
      position: relative;
      text-align: center;
      margin-bottom: 60px;
      img{
        position: absolute;
        right:-50px;
        top:-30px;
      }
    }
    p{
      margin-bottom: 30px;
      input{
        width:300px;
        height:45px;
        border:1px solid #ddd;
        margin-left: 15px;
        box-sizing: border-box;
        padding-left: 10px;
      }
      select{
        width:300px;
        height:45px;
        border:1px solid #ddd;
        margin-left: 15px;
        box-sizing: border-box;
        padding-left: 10px;
      }
    }
    a{
      cursor: pointer;
      width:328px;
      height: 55px;
      margin:80px auto 0 auto;
      background:#dd0011 ;
      color: #fff;
      display: inline-block;
      text-align: center;
      line-height: 55px;
       border-radius: 5px;
    }
  }
  .orange1{
    color: #ff8a00;
    margin-right: 3px;
    &:last-child{
      margin-right: 10px;
    }
  }
  .orange{
    color: #ff8a00;
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
      line-height: 22px;
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
  width: 68%;
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
  .waitToPay{
    height: 338px;
    display: flex;
    justify-content:center;
    align-items: center;
    font-size: 16px;
    img{
      margin-right: 10px;
    }
  }
  .waitToDeliver{
    margin-top: 100px;
    h6{

      text-align: center;
      font-weight: 100;
      font-size: 14px;
      margin-left: 70px;
    }
    p{
      text-align: center;
      line-height: 55px;
      &:first-child{
        margin-bottom: 30px;
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
          cursor: pointer;
        }
      }
    }
  }
</style>

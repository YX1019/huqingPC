<template>
  <div class="personRg">
     <ul class="myOrderList">
       <li v-for="(item,index) in myOrderList" :key="item" @click="changeOrderState(index)" :class="{'cur':index == active}">{{item}}</li>
     </ul>
    <div class="orderTitle">
      <span class="orderItem1">产品</span><span class="orderItem2">单价</span><span class="orderItem3">数量</span>
      <span class="orderItem4">商品操作</span><span class="orderItem5">实付款</span><span class="orderItem6">交易状态</span><span class="orderItem7">交易操作</span>
    </div>
    <div v-show="!isList && !loading" style="width:100%;line-height: 80px;text-align: center;float: left;">暂无订单</div>
    <div class="loading" v-show="loading" style="text-align: center;margin: 50px auto;"><img src="../common/img/loading.gif"/></div>
    <div class="myOderItem " v-for="item in teamList" :key="item.childOrderId" v-show="isList && !loading && active!=1">
      <div class="myOrderTop">
        <input type="checkbox"/>
        <!--张三-->
        <span class="orderNo">订单号:{{item.childOrderId}}</span>
        <span @click="toShop(item.teamId)"><img src="../common/img/storeIcon.png" class="storeIcon"/> {{item.merchantName}}</span><span class="rg"><span v-if="item.trans === '0'">快递</span><span v-if="item.trans === '1'">自提</span></span>
      </div>
      <div class="myOrderItemCont ">
        <div class="orderItem1 orderItemName"><img :src="item.proImg"/>
          <div class="oderItem_rg"><h3>{{item.proName}}</h3><p v-show="item.attrNames">{{item.attrNames}}：{{item.valueNames}}</p></div>
        </div>
        <div class="orderItem2"><p class="oldProPrice">￥199.00</p><p>￥{{item.perPrice}}</p></div>
        <div class="orderItem3"><p>{{item.orderCount}}</p></div>
        <div class="orderItem4"></div>
        <div class="orderItem5"><p>￥{{item.allAmount}}</p></div>
        <div class="orderItem6"><p>{{item.statusStr}}</p><p @click="toOrderDetail(item.childOrderId)">订单详情</p></div>
        <!--<div class="orderItem6" v-if="item.statusEnum === '1'"><p>等待买家付款</p><p @click="toOrderDetail(item.childOrderId)">订单详情</p></div>-->
        <!--<div class="orderItem6" v-else-if="item.statusEnum === '3'"><p>待发货</p><p @click="toOrderDetail(item.childOrderId)">订单详情</p></div>-->
        <!--<div class="orderItem6" v-else-if="item.statusEnum === '4'"><p>退货代收</p><p @click="toOrderDetail(item.childOrderId)">订单详情</p></div>-->
        <!--<div class="orderItem6" v-else-if="item.statusEnum === '5'"><p>待评价</p><p @click="toOrderDetail(item.childOrderId)">订单详情</p></div>-->
        <!--<div class="orderItem6" v-else><p>{{item.statusStr}}</p><p @click="toOrderDetail(item.childOrderId)">订单详情</p></div>-->
        <div class="orderItem7" v-if="item.statusEnum === '1' && item.proType != 2  && item.trans == 0 "><a class="returnGoods" @click="sendGoods(item.childOrderId)">发货</a></div>
        <div class="orderItem7" v-if="item.statusEnum == 1 && (item.proType == 2  || item.trans == 1) "><a class="returnGoods" @click="receiveServiceOrder(item.childOrderId)">接单</a><p class="hand">取消订单</p></div>
        <div class="orderItem7" v-if="item.statusEnum == 2 && item.proType != 2  && item.trans == 0 ">
          <!--<a class="returnGoods">查看物流</a>-->
          <el-popover
            placement="left"
            width="300"
            trigger="click">
            <div class="wli">
              <h1>{{wli.companyName}}<br/>{{wli.nu}}</h1>
              <ul>
                <li v-for="(item,index) in wli.data" :key="index"><span>●</span><span>{{item.context}}<br/>{{item.date}}</span></li>
                <li><span>●</span><span>快件已到达杭州市滨江区，马上进行派请保持手机畅通。</span></li>
                <li><span>●</span><span>快件已到达杭州市滨江区，马上进行派请保持手机畅通。</span></li>
              </ul>
            </div>
            <el-button slot="reference" class="returnGoods" @click="queryTeamOrderExpress(item.childOrderId)">查询物流</el-button>
          </el-popover>
        </div>
        <div class="orderItem7" v-if="item.statusEnum == 6 "><a class="returnGoods" @click="toOrderDetail(item.childOrderId)">查看评价</a></div>
      </div>
    </div>
    <!--<div class="orderBottom"><input type="checkbox"/>全选 <span class="orderPayBtn">合并付款</span></div>-->
    <div class="myOderItem " v-for="item in teamListUnpay" :key="item.orderId" v-show="isList && !loading && active==1">
      <div class="myOrderTop">
        <input type="checkbox"/>
        <!--张三-->
        <span class="orderNo">订单号:{{item.orderId}}</span>
        <span @click="toShop(item.teamId)"><img src="../common/img/storeIcon.png" class="storeIcon"/> {{item.merchantName}}</span><span class="rg"><span v-if="item.trans === '0'">快递</span><span v-if="item.trans === '1'">自提</span></span>
      </div>
      <div style="position: relative;">
      <div class="myOrderItemCont" v-for="iitem in item.listDetailsResults" :key="iitem.childOrderId">
        <div class="orderItem1 orderItemName"><img :src="iitem.proImg"/>
          <div class="oderItem_rg"><h3>{{iitem.proName}}</h3><p v-show="item.attrNames">{{iitem.attrNames}}：{{iitem.valueNames}}</p></div>
        </div>
        <div class="orderItem2"><p class="oldProPrice">￥199.00</p><p>￥{{iitem.perPrice}}</p></div>
        <div class="orderItem3"><p>{{iitem.orderCount}}</p></div>
        <div class="orderItem4"></div>
      </div>
        <div style="position: absolute;left: 0;top: 20px;width:100%;">
        <div class="orderItem5" style="margin-left: 64%;"><p>￥{{item.allAmount}}</p></div>
        <div class="orderItem6"><p>{{item.statusStr}}</p><p @click="toOrderDetail2(item.orderId)">订单详情</p></div>
        </div>

      </div>
    </div>

    <div style="width: 100%;height: 50px;text-align: center;margin-top: 30px;float: left;" v-show="isList && !loading">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize">
      </el-pagination>
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
    <div class="bg" v-if="isShowBox"></div>
    <div class="deliveryBox" v-if="isShowBox">
      <h3>填写物流信息<img src="../common/img/closed.png" @click="close()"/> </h3>
      <p><span>选择物流公司</span>
        <!--<select><option>请选择物流公司</option></select>-->
        <select v-model="expressCom"><option value="0">请选择</option><option v-for="item in ExpressList" :value="item.expressNo" :key="item.expressNo">{{item.expressName}}</option></select>
      </p>
      <p><span>填写物流单号</span><input type="text" v-model="carriNo"></p>
      <a @click="sendOrder()">发货</a>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
export default {
  name: 'myOder',
  data () {
    return {
      myOrderList: ['所有订单', '待付款', '待接单', '待发货', '待收货', '评价'],
      active: 0,
      errorBox: false,
      errMsg: '',
      isList: true,
      pageSize: 10,
      total: 5,
      pageNo: 1,
      pageStation: '',
      teamList: [],
      wli: {},
      isShowBox: false,
      childOrderId: '',
      expressCom: '',
      carriNo: '',
      ExpressList: '',
      loading: false,
      teamListUnpay: []
    }
  },
  created () {
    this.queryTeamOrderList(0, 1)
    this.getExpress()
  },
  methods: {
    changeOrderState: function (index) {
      this.active = index
      this.pageNo = 1
      if (index === 0) {
        this.queryTeamOrderList(0, 1)
      } else if (index === 1) {
        // this.queryTeamOrderList(1, 1)
        this.queryTeamOrderListForWaitPay(1)
      } else if (index === 2) {
        this.queryTeamOrderList(2, 1)
      } else if (index === 3) {
        this.queryTeamOrderList(3, 1)
      } else if (index === 4) {
        this.queryTeamOrderList(4, 1)
      } else if (index === 5) {
        this.queryTeamOrderList(5, 1)
      }
    },
    toOrderDetail: function (orderId) {
      this.$router.push({path: '/storeOrderDetail', query: {orderId: orderId}})
    },
    toOrderDetail2: function (orderId) {
      this.$router.push({path: '/storeOrderDetail', query: {orderId: orderId, way: 'unpay'}})
    },
    toShop: function (teamId) {
      this.$router.push({path: '/shop', query: {teamId: teamId}})
    },
    queryTeamOrderList: function (orderStatus, pageNo) {
      let _this = this;
      _this.loading = true
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderStatus', orderStatus);
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.queryTeamOrderList,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        _this.loading = false
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.total = data.totalItems
          _this.teamList = data.listObject
          if (_this.teamList.length === 0) {
            _this.isList = false
          } else {
            _this.isList = true
          }
        }
      })
    },
    queryTeamOrderListForWaitPay: function (pageNo) {
      let _this = this;
      _this.loading = true
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.queryTeamOrderListForWaitPay,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        _this.loading = false
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.total = data.totalItems
          _this.teamListUnpay = data.listObject
          if (_this.teamListUnpay.length === 0) {
            _this.isList = false
          } else {
            _this.isList = true
          }
        }
      })
    },
    handleCurrentChange (val) {
      var pageNum = val
      this.pageStation = pageNum
      window.scrollTo(0, 0);
      if (this.active === 0) {
        this.queryTeamOrderList(0, pageNum)
      } else if (this.active === 1) {
        this.queryTeamOrderList(1, pageNum)
      } else if (this.active === 2) {
        this.queryTeamOrderList(2, pageNum)
      } else if (this.active === 3) {
        this.queryTeamOrderList(3, pageNum)
      } else if (this.active === 4) {
        this.queryTeamOrderList(4, pageNum)
      } else if (this.active === 5) {
        this.queryTeamOrderList(5, pageNum)
      }
    },
    queryTeamOrderExpress: function (orderId) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', orderId);
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
          _this.wli = data.obj
        }
      })
    },
    receiveServiceOrder: function (orderId) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', orderId);
      this.axios({
        method: 'post',
        url: this.url.api.receiveServiceOrder,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            message: '接单成功！',
            type: 'success'
          });
          console.log(_this.pageStation)
          if (_this.active === '0' || _this.active === 0) {
            _this.queryTeamOrderList(0, _this.pageStation)
          } else {
            _this.queryTeamOrderList(2, _this.pageStation)
          }
        }
      })
    },
    sendGoods: function (childOrderId) {
      this.isShowBox = true
      this.childOrderId = childOrderId
    },
    close: function () {
      this.isShowBox = false
    },
    sendOrder: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.childOrderId);
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
          if (_this.active === '0' || _this.active === 0) {
            _this.queryTeamOrderList(0, _this.pageStation)
          } else {
            _this.queryTeamOrderList(3, _this.pageStation)
          }
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
    width:150px;
    height: 38px;
    float: left;
    font-size: 16px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    &.cur{
      color: #e10a08;
      border-bottom: 2px solid #e10a08;
    }
  }
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
    cursor: pointer;
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
  .wli{
    h1{
      font-size: 14px;
      line-height: 30px;
      border-bottom: 1px solid #ccc;
      font-weight: 100;
    }
    ul{
      height: 250px;
      float: left;
      overflow: auto;padding: 10px;
      li{
        &:first-child{
          color: #dd0011;
        }
        margin-bottom: 10px;
        float: left;
        span{
          display: block;
          float: left;
          &:last-child{
            width: 86%;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>

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
        <input type="checkbox"/>{{item.createTime}}<span class="orderNo">订单号:{{item.childOrderId}}</span>
        <span @click="toShop(item.teamId)" class="hand"><img src="../common/img/storeIcon.png" class="storeIcon"/> {{item.merchantName}}</span>
        <span class="rg" v-if="item.trans === '0'">快递</span>
        <span class="rg" v-if="item.trans === '1'">自提</span>
      </div>
      <div class="myOrderItemCont ">
        <div class="orderItem1 orderItemName"><img :src="item.proImg"/>
          <div class="oderItem_rg"><h3>{{item.proName}}</h3><p v-show="item.attrNames">{{item.attrNames}}：{{item.valueNames}}</p></div>
        </div>
        <div class="orderItem2"><p class="oldProPrice">￥199.00</p><p>￥{{item.perPrice}}</p></div>
        <div class="orderItem3"><p>{{item.orderCount}}</p></div>
        <div class="orderItem4"></div>
        <div class="orderItem5"><p>￥{{item.allAmount}}</p></div>
        <div class="orderItem6" v-if="item.statusEnum == 0"><p>等待买家付款</p><p @click="toOderDteail(item.childOrderId)">订单详情</p></div>
        <div class="orderItem6" v-else-if="item.statusEnum == 1"><p>待发货</p><p @click="toOderDteail(item.childOrderId)">订单详情</p></div>
        <div class="orderItem6" v-else-if="item.statusEnum == 2"><p>待收货</p><p @click="toOderDteail(item.childOrderId)">订单详情</p></div>
        <div class="orderItem6" v-else-if="item.statusEnum == 3"><p>待评价</p><p @click="toOderDteail(item.childOrderId)">订单详情</p></div>
        <div class="orderItem6" v-else><p>{{item.statusStr}}</p><p @click="toOderDteail(item.childOrderId)">订单详情</p></div>
        <div class="orderItem7" v-if="item.statusEnum == 0"><a class="returnGoods">立即付款</a><p @click="cancleOrder(item.childOrderId)" class="hand">取消订单</p></div>
        <div class="orderItem7" v-else-if="item.statusEnum == 1 && item.proType != 2"><a class="returnGoods" @click="returnGoods(item.childOrderId)">申请退货</a></div>
        <div class="orderItem7" v-else-if="item.statusEnum == 2 && item.proType == 2"><a class="returnGoods">凭证</a></div>
        <div class="orderItem7" v-else-if="item.statusEnum == 2 && item.proType != 2 && item.trans == 0"><a class="returnGoods" @click="receiveOrder(item.childOrderId)">确认收货</a>
          <el-popover
            placement="bottom"
            width="200"
            trigger="click">
            <div class="wli">
              <h1>{{wli.companyName}}<br/>{{wli.nu}}</h1>
              <ul>
                <li v-for="(item,index) in wli.data" :key="index"><span>●</span><span>{{item.context}}<br/>{{item.date}}</span></li>
                <li><span>●</span><span>快件已到达杭州市滨江区，马上进行派请保持手机畅通。</span></li>
                <li><span>●</span><span>快件已到达杭州市滨江区，马上进行派请保持手机畅通。</span></li>
              </ul>
            </div>
            <el-button slot="reference" style="background: none;color: #333;border:none;font-size:14px;" @click="queryOrderExpress(item.childOrderId)">查询物流</el-button>
          </el-popover>
          <!--<p>查询物流</p>-->
        </div>
        <div class="orderItem7" v-else-if="item.statusEnum == 2 && item.proType != 2 && item.trans == 1"><a class="returnGoods">确认收货</a></div>
        <div class="orderItem7" v-else-if="item.statusEnum == 3 && item.proType != 2"><a class="returnGoods">待评价</a></div>
        <div class="orderItem7" v-else></div>
      </div>
    </div>
    <!--<div class="orderBottom"><input type="checkbox"/>全选 <span class="orderPayBtn">合并付款</span></div>-->

    <div style="width: 100%;height: 50px;text-align: center;margin-top: 30px;float: left;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        v-show="isList">
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
      isList: true,
      pageSize: 10,
      total: 5,
      pageNo: 1,
      pageStation: '',
      wli: {}
    }
  },
  created () {
    this.queryUserOrderList('', '', 1)
  },
  methods: {
    changeOrderState: function (index) {
      this.active = index
      this.pageNo = 1
      if (index === 0) {
        this.queryUserOrderList('', '', 1)
      } else if (index === 1) {
        this.queryUserOrderList('', 0, 1)
      } else if (index === 2) {
        this.queryUserOrderList('', 1, 1)
      } else if (index === 3) {
        this.queryUserOrderList('', 2, 1)
      } else if (index === 4) {
        this.queryUserOrderList('', 3, 1)
      }
    },
    toOderDteail: function (orderId) {
      this.$router.push({ path: '/orderDetail', query: {orderId: orderId} })
    },
    toShop: function (teamId) {
      this.$router.push({path: '/shop', query: {teamId: teamId}})
    },
    queryUserOrderList: function (payStatus, orderStatus, pageNo) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('payStatus', payStatus);
      params.append('orderStatus', orderStatus);
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
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
          _this.total = data.totalItems
          _this.myOrderList = data.listObject
          if (_this.myOrderList.length === 0) {
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
        this.queryUserOrderList('', '', pageNum)
      } else if (this.active === 1) {
        this.queryUserOrderList('', 0, pageNum)
      } else if (this.active === 2) {
        this.queryUserOrderList('', 1, pageNum)
      } else if (this.active === 3) {
        this.queryUserOrderList('', 2, pageNum)
      } else if (this.active === 4) {
        this.queryUserOrderList('', 3, pageNum)
      }
    },
    cancleOrder: function (orderId) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', orderId);
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
          console.log(_this.pageStation)
          if (_this.active === 0) {
            _this.queryUserOrderList('', '', _this.pageStation)
          } else if (_this.active === 1) {
            _this.queryUserOrderList('', 0, _this.pageStation)
          } else if (this.active === 2) {
            _this.queryUserOrderList('', 1, _this.pageStation)
          } else if (this.active === 3) {
            _this.queryUserOrderList('', 2, _this.pageStation)
          } else if (this.active === 4) {
            _this.queryUserOrderList('', 3, _this.pageStation)
          } else {
            _this.queryUserOrderList('', '', 1)
          }
        }
      })
    },
    receiveOrder: function (orderId) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', orderId);
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
          if (_this.active === 0) {
            _this.queryUserOrderList('', '', _this.pageStation)
          } else if (_this.active === 1) {
            _this.queryUserOrderList('', 0, _this.pageStation)
          } else if (this.active === 2) {
            _this.queryUserOrderList('', 1, _this.pageStation)
          } else if (this.active === 3) {
            _this.queryUserOrderList('', 2, _this.pageStation)
          } else if (this.active === 4) {
            _this.queryUserOrderList('', 3, _this.pageStation)
          } else {
            _this.queryUserOrderList('', '', 1)
          }
        }
      })
    },
    returnGoods: function (orderId) {
      this.$router.push({ path: '/returnGoods', query: {orderId: orderId} })
    },
    queryOrderExpress: function (orderId) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', orderId);
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
          _this.wli = data.obj
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
    cursor: pointer;
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
      text-align: left;
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
  .nocont{
    width:100%;
    padding: 30px 0;
    text-align: center;
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

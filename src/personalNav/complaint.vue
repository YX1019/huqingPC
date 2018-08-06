<template>
<div class="personRg">
  <div class="orderTitle2">
    <span class="orderItem1">产品</span><span class="orderItem2">单价</span><span class="orderItem3">数量</span>
    <span class="orderItem4">商品操作</span><span class="orderItem5">实付款</span><span class="orderItem6">交易状态</span><span class="orderItem7">交易操作</span>
  </div>
  <div class="nocont" v-show="!isList">暂无订单</div>
  <div class="myOderItem" v-for="item in complainList" :key="item.orderId">
    <div class="myOrderTop">
      <input type="checkbox"/>2018-06-21<span class="orderNo">订单号:{{item.orderId}}</span>
      <span><img src="../common/img/storeIcon.png" class="storeIcon"/> {{item.merchantName}}</span>
      <span class="rg" v-if="item.trans === '0'">快递</span>
      <span class="rg" v-if="item.trans === '1'">自提</span>
    </div>
    <div class="myOrderItemCont ">
      <div class="orderItem1 orderItemName"><img :src="item.proImg"/>
        <div class="oderItem_rg"><h3>{{item.proName}}</h3><p>{{item.attrNames}}：{{item.valueNames}}</p></div>
      </div>
      <div class="orderItem2"><p class="oldProPrice">￥199.00</p><p>￥{{item.perPrice}}</p></div>
      <div class="orderItem3"><p>{{item.orderCount}}</p></div>
      <div class="orderItem4"></div>
      <div class="orderItem5"><p>￥100.00</p></div>
      <div class="orderItem6"><p>{{item.statusStr}}</p><p @click="toComplainDetail(item.childOrderId)">订单详情</p></div>
      <div class="orderItem7" v-if="item.statusEnum === '6'"><a class="returnGoods" @click="toReturnGoods(item.childOrderId)">申请售后</a></div>
    </div>
  </div>
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
  name: '',
  data () {
    return {
      isList: true,
      pageSize: 10,
      total: 5,
      pageNo: 1,
      pageStation: '',
      errorBox: false,
      errMsg: '',
      complainList: []
    }
  },
  created () {
    this.queryUserComplaintsOrderList()
  },
  methods: {
    toReturnGoods: function (orderId) {
      this.$router.push({path: '/returnGoods', query: {orderId: orderId}})
    },
    toComplainDetail: function (orderId) {
      this.$router.push({path: '/complainDetail', query: {orderId: orderId}})
    },
    queryUserComplaintsOrderList: function (pageNo) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.queryUserComplaintsOrderList,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.total = data.totalItems
          _this.complainList = data.listObject
          if (_this.complainList.length === 0) {
            _this.isList = false
          } else {
            _this.isList = true
          }
        }
      })
    },
    handleCurrentChange (val) {
      var pageNum = val
      this.queryUserComplaintsOrderList(pageNum)
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
  .orderTitle2{
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

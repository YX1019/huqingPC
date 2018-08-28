<template>
<div class="order">
 <h3>确认订单信息</h3>
  <div class="address" style="background: #fff;"><label class="lf">收货地址</label>
    <div class="addrOption">
      <h2 @click="showAddr()" >{{address}}</h2>
      <div v-show="isShowAddr">
        <p @click="getAttr(item)" v-for="item in addressList" :key="item.addressId"><span>{{item.name}}</span><span>{{item.province}}{{item.city}}{{item.area}}</span><span>{{item.addr}}</span><span>{{item.cell}}</span></p>
        <a @click="toAddr()">新增收货地址</a>
      </div>
    </div>
  </div>
  <div class="fapai">
    <p>发票
      <el-switch
      v-model="isOpen"
      active-color="#ff4949"
      inactive-color="#ccc"
      style="float: right;margin-right: 30%;"
      @click="isNeedTax()"
      >
    </el-switch>
    </p>
    <div class="fpCont" v-show="isOpen">
      <h4>发票类型</h4>
      <p>普通发票</p>
      <h4>发票抬头</h4>
      <ul><li v-for="(item,index) in typeList" :class="{'cur': index == active}" :key="index" @click="chooseType(index)">{{item}}</li></ul>
      <div><span>发票抬头</span><input type="text" v-model="invoiceTitle"></div>
      <div v-show="active == 1"><span>税号</span><input type="text" v-model="taxNumber"></div>
      <h4>收票人信息</h4>
      <p>收票人手机号：{{fpCell}}</p>
    </div>
  </div>
  <div class="orderTitle">
    <span>店铺宝贝</span>
    <span>商品属性</span>
    <span>单价</span>
    <span>数量</span>
    <span>优惠方式</span>
    <span>小计</span>
  </div>
  <div class="orderItem clearfix" v-for="item in orderCartList" :key="item.merchantName">
    <h4>店铺:{{item.merchantName}}</h4>
    <div style="width: 100%;box-sizing: border-box;padding: 15px;float: left;" v-for="(itemm,index) in item.proMerchant" :key="index">
      <div class="orderItem1"><img :src="itemm.proImg"/><span>{{itemm.proName}}</span> </div>
      <div class="orderItem2" v-show="itemm.attrNames">{{itemm.attrNames}}:{{itemm.valueNames}}</div>
      <div class="orderItem2" v-show="itemm.attrNames == null ">无</div>
      <div class="orderItem3">{{itemm.perPrice}}<span style="color:#f7a53e; margin-left: 5px;" v-show="itemm.perPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{itemm.perPoint}}</span></div>
      <div class="orderItem4">{{itemm.perCount}}</div>
      <div class="orderItem5">&nbsp;</div>
      <div class="orderItem6">{{itemm.perPrice * itemm.perCount}}<span style="color:#f7a53e; margin-left: 5px;" v-show="itemm.perPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{itemm.perPoint * itemm.perCount}}</span></div>
    </div>
    <div class="methods">运送方式<select v-model="item.trans" disabled><option value="0">快递</option><option value="1">自提</option></select>
      <!--<select disabled class="rg" style="margin-right:12%"><option selected>{{item.giveMessage}}</option></select>-->
      <span class="rg" style="margin-right:12%;color: #dd0011;">{{item.giveMessage}}</span>
    </div>
    <!--<div class="address" v-show="isExpress"><label class="lf">收货地址</label>-->
      <!--<div class="addrOption">-->
        <!--<h2 @click="showAddr(item)" >{{item.address}}</h2>-->
        <!--<div v-show="item.isShowAddr">-->
        <!--<p @click="getAttr(item,itemm)" v-for="itemm in addressList" :key="itemm.addressId"><span>{{itemm.name}}</span><span>{{itemm.province}}{{itemm.city}}{{itemm.area}}</span><span>{{itemm.addr}}</span><span>{{itemm.cell}}</span></p>-->
        <!--<a @click="toAddr()">新增收货地址</a>-->
        <!--</div>-->
      <!--</div>-->
      <!--<p class="total">店铺合计:<span> ￥{{item.realAllAmount}}</span></p>-->
    <!--</div>-->
    <div class="address" v-show="!isExpress">门店地址 <span style="margin-left: 20px">浙江省杭州市滨江区胡庆余堂滨江店</span>
    </div>
    <div class="address"><p class="total">店铺合计:<span> ￥{{item.orderMerchantPrice}}</span><span style="color:#f7a53e; margin-left: 5px;" v-show="item.orderMerchantPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{item.orderMerchantPoint}}</span></p></div>
  </div>
  <p class="realPayment">实付款:<span>￥{{orderObj.orderAllAmount}}<span style="color:#f7a53e; margin-left: 5px;" v-show="orderObj.orderAllPoint > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{orderObj.orderAllPoint}}</span></span></p>
  <p class="clearfix"><button class="putOrder" @click="completeOrder()">提交订单</button></p>
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
  name: 'placeOrder',
  components: {
    addAddress
  },
  data () {
    return {
      isExpress: true,
      address: '请选择收货地址',
      orderCartList: [],
      orderObj: {},
      addressList: [],
      errorBox: false,
      errMsg: '',
      orderNo: '',
      isShowAddr: false,
      dialogFormVisible: false,
      name: '',
      province: '',
      city: '',
      area: '',
      addr: '',
      cell: '',
      mrAddrMsg: '',
      isOpen: false,
      typeList: ['个人', '单位'],
      active: 0,
      taxNumber: '',
      invoiceTitle: '',
      fpCell: '',
      hasInvoice: '0',
      invoiceType: '1'
    }
  },
  created () {
    this.queryCartOrderList()
    this.addressQuery()
  },
  mounted () {
  },
  methods: {
    tochildrenAdrr: function () {
      this.dialogFormVisible = false
      this.addressQuery()
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
    queryCartOrderList: function () {
      let _this = this;
      let orderNo = sessionStorage.getItem('orderNo')
      console.log(orderNo)
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', orderNo);
      this.axios({
        method: 'post',
        url: this.url.api.queryCartOrderList,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.orderObj = data.obj
          _this.orderCartList = data.obj.orderMerchantList
          _this.orderNo = data.obj.orderNo
          // _this.address = data.obj.reName + '  ' + data.obj.reProvince + data.obj.reCity + data.obj.reArea + data.obj.reAddr + '  ' + data.obj.reCell
          _this.name = data.obj.reName
          _this.province = data.obj.reProvince
          _this.city = data.obj.reCity
          _this.area = data.obj.reArea
          _this.addr = data.obj.reAddr
          _this.cell = data.obj.reCell
          _this.fpCell = data.obj.cell
        }
      })
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
    completeOrder: function () {
      let _this = this;
      let msg = ''
      msg = this.name + ';' + this.cell + ';' + this.province + ';' + this.city + ';' + this.area + ';' + this.addr
      console.log(msg)
      if (this.province === '') {
        this.$message({
          message: '请先选择地址！',
          type: 'warning',
          duration: '1000'
        });
        return
      }
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderNo', this.orderNo);
      params.append('msg', msg);
      if (this.isOpen) {
        _this.hasInvoice = '1'
      } else {
        _this.hasInvoice = '0'
        this.invoiceTitle = ''
        this.taxNumber = ''
      }
      if (this.active === 0 || this.active === '0') {
        _this.invoiceType = '2'
      } else {
        _this.invoiceType = '1'
      }
      params.append('hasInvoice', _this.hasInvoice);
      params.append('invoiceType', _this.invoiceType);
      params.append('invoiceTitle', this.invoiceTitle);
      params.append('taxNumber', this.taxNumber);
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
          _this.$router.push({path: '/payOrder', query: {orderNo: _this.orderNo, type: '0'}})
        }
      })
    },
    chooseType: function (index) {
      this.active = index
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
  width:55px;
  height: 55px;
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
    float: left;
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
  .fapai{
    width:100%;
    clear: both;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .fpCont{
    width:600px;
    height:auto;
    border: 1px solid #ccc;
    padding: 10px 20px 20px 20px;
    margin: 20px 0;
    h4{
      line-height: 25px;
      margin-top: 10px;
    }
    span{
      width:70px;
      display: inline-block;
    }
    input{
      width:300px;
      height:30px;
      padding: 2px 5px;
      border:1px solid #ccc;
      border-radius: 3px;
      margin-left: 10px;
      margin-bottom: 10px;
    }
    li{
      width:50px;
      height: 30px;
      border:1px solid #ccc;
      display: inline-block;
      margin-right: 10px;
      text-align: center;
      line-height: 30px;
      border-radius: 3px;
      margin-bottom: 10px;
      &.cur{
        border: 1px solid #d30d0d;
        color: #d30d0d;
      }
    }
  }
</style>

<template>
<div class="goodsAllocation">
  <h4>收银</h4>
  <div class="goodsOperate">
    <div>
    <span style="position: relative;"><el-input placeholder="会员手机号" class="gInput"></el-input><img src="../common/img/searchIcon.png" class="searchIcon" @click="showPhoneBox()"/></span>
    <el-input placeholder="会员名称" class="gInput"></el-input>
    <el-input placeholder="会员号" class="gInput"></el-input>
    <el-input placeholder="门店名称" class="gInput"></el-input>
    <el-input placeholder="商品条形码" class="gInput"></el-input>
    </div>
    <ul class="goodSort">
      <li :class="{'cur': active === index}" v-for="(item,index) in goodSortMenu" @click="getSort(index)" :key="index">{{item}}</li>
    </ul>
      <table class="goodsTable2" border="1" cellspacing="0" v-if="active === 0">
        <tr>
          <th>序号</th>
          <th>商品条形码</th>
          <th>商品ERP编码</th>
          <th>商品名称</th>
          <th>单价</th>
          <th>数量</th>
          <th>金额</th>
        </tr>
        <tr>
          <td>01</td>
          <td>564235135351252</td>
          <td>425757475284</td>
          <td>安宫牛黄丸</td>
          <td>50.00</td>
          <td><button @click="changeNum(-1)" class="hand">-</button><input type="text" v-model="num" readonly/><button @click="changeNum(1)" class="hand">+</button></td>
          <td>100.00</td>
        </tr>
      </table>
    <div class="ticketList clearfix" v-if="active === 1">
      <div class="ticketItem" v-for="(item,index) in 3" :key="item" :class="{'cur': tActive === index}" @click="getTicket(index)">
        <div class="tickectTop">
          <span>￥<b>10</b></span>
          <span>优惠券<br/><span style="font-size: 12px;">满99元可使用</span></span>
        </div>
        <div class="tickectBtm">
          有效期:2018-12-30
        </div>
      </div>
    </div>
  </div>
  <div class="allAmount2"><span>订单总额 135.00</span><span>折扣<input type="text" placeholder="请输入折扣"></span><span>优惠券金额 10.00</span></div>
  <div class="allAmount2"><span>已优惠 <b>￥10.00</b></span></div>
  <div class="realAmount">实付款：<b>￥125.00</b></div>
  <div class="operateBtns"><button @click="sureCollect()">完成</button></div>
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%">
    <div class="dBox"><img src="../common/img/suc.png"/><p>您的订单已提交成功，请在手机端确认！</p> </div>
  </el-dialog>
  <el-dialog
    title="会员列表"
    :visible.sync="centerDialogVisible"
    width="40%"
    center>
    <div class="searchPhone">
      <div class="searchPhoneInfo"><label>会员手机号</label><input type="text" placeholder="请输入手机号"/><button class="sucBtn">查找</button> </div>
      <table class="goodsTable2" border="1" cellspacing="0">
        <tr>
          <th>会员手机号</th>
          <th>会员名称</th>
          <th>会员编号</th>
        </tr>
        <tr>
          <td>11354125621</td>
          <td>安新华</td>
          <td>234562154</td>
        </tr>
      </table>
      <div style="width: 100%;height: 50px;text-align: right;clear: both;padding-top:50px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pageNo"
          :page-size="pageSize"
        >
        </el-pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button class="sucBtn2" @click="centerDialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>

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
      activityId: '',
      errorBox: false,
      errMsg: '',
      msgInfo: {},
      num: 2,
      dialogVisible: false,
      total: 5, // 总条数
      pageNo: 1,
      pageSize: 20,
      centerDialogVisible: false,
      goodSortMenu: ['商品列表', '优惠券'],
      active: 0,
      tActive: 0
    }
  },
  created () {
    this.getParams()
  },
  methods: {
    sureCollect: function () {
      this.dialogVisible = true
    },
    showPhoneBox: function () {
      this.centerDialogVisible = true
    },
    getSort: function (index) {
      this.active = index
    },
    getTicket: function (index) {
      this.tActive = index
    },
    changeNum: function (way) {
      if (way > 0) {
        this.num++
      } else {
        this.num--
        if (this.num < 1) {
          this.num = 1
        }
      }
    },
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.activityId
      // 将数据放在当前组件的数据内
      this.activityId = routerParams
    },
    activityDetailQuery: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('id', this.activityId);
      this.axios({
        method: 'post',
        url: this.url.api.activityDetailQuery,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .goodsAllocation{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    height:auto;
    margin: 0 auto 150px auto;
    h4{
      font-size:14px;
      font-weight: 100;
      padding: 22px 0 12px 0;
      color: #131313;
      margin-bottom: 20px;
    }
  }
  .gInput{
    width:150px;
    margin-right: 50px;
    margin-bottom: 10px;
  }
  .goodsOperate{
    width:100%;
    box-sizing: border-box;
    padding: 35px;
    border:1px solid #eee;
  }
  .goodsTable2{
    width:100%;
    border:1px solid #eee;
    margin-top: 30px;
    font-size: 14px;
    color: #000;
    tr{
      height: 45px;
      line-height:45px;
      text-align: center;
      td{
        border-bottom: 1px solid #eee;
        button{
          width: 18px;
          height: 16px;
          border:1px solid #ccc;
          background: #fff;
          margin: 0 3px;
        }
        input{
          width:30px;
          text-align: center;
        }
      }
      th{
        border-bottom: 1px solid #eee;
        font-weight: normal;
        background: #f5f5f5;
      }
    }
  }
  .allAmount2{
    width:100%;
    height: 50px;
    text-align: right;
    background: #fef2f3;
    line-height:50px;
    margin-bottom: 2px;
    span{
      margin:0 30px;
    }
    b{
      color: #dd0011;
      font-weight: normal;
    }
    input{
      width:80px;
      height:28px;
      margin-left: 5px;
      border:1px solid #ccc;
      padding: 0 5px;
    }
  }
  .realAmount{
    text-align: right;
    font-size: 14px;
    color: #181818;
    margin: 35px 30px 15px 0;
    b{
      color: #dd0011;
      font-weight: normal;
      font-size: 30px;
    }
  }
  .operateBtns{
    text-align: right;
    button{
    width:195px;
    height: 50px;
      border-radius: 5px;
      border:1px solid #dd0011;
      font-size: 18px;
      &:first-child{
        color: #dd0011;
        background: #fff;
        margin-right: 20px;
      }
      &:last-child{
        color: #fff;
        background: #dd0011;
      }
    }
  }
  .sucBtn{
    width:100px;
    height: 35px;
  }
  .sucBtn,.sucBtn2{
    border-radius: 5px;
    border:1px solid #dd0011;
    font-size: 14px;
    color: #fff;
    background: #dd0011;
  }
  .sucBtn2{
    width:200px;
    height: 45px;
  }
  .dBox{
    text-align: center;
    img{
      width:60px;
      margin-bottom: 20px;
    }
  }
  .searchIcon{
    position: absolute;
    right:55px;
    top:-6px;
  }
  .goodSort{
    width:200px;
    height:40px;
    margin: 20px auto 0 auto;
    li{
      display: inline-block;
      width:80px;
      height:40px;
      line-height:40px;
      margin-right: 20px;
      font-size: 14px;
      color: #717171;
      text-align: center;
      &:last-child{
        margin-right: 0;
      }
      &.cur{
        border-bottom: 2px solid #dd0011;
      }
    }
  }
  .searchPhoneInfo{
    margin-bottom: 25px;
    input{
      width:50%;
      height:35px;
      border:1px solid #ccc;
      margin-right: 30px;
      margin-left: 10px;
      padding-left: 10px;
    }
  }
  .ticketItem{
    position: relative;
    width:245px;
    height: 138px;
    background: url("../common/img/newticketBg.png") center center no-repeat;
    box-sizing: border-box;
    padding: 0 20px;
    color: #fff;
    float: left;
    margin-right: 125px;
    margin-top: 30px;
    &:nth-child(3n+3){
      margin-right: 0;
    }
    &.cur{
      background: url("../common/img/ticketSelect.png") center center no-repeat;
    }
  }
  .tickectBtm{
    line-height:35px;
    font-size: 12px;
    border-top:1px dashed #fff;
  }
  .tickectTop{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 5px;
    span{
      flex:1;
      b{
        font-size:60px;
      }
    }
  }
</style>

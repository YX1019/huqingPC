<template>
<div class="cancelGoods clearfix">
  <h4>您现在的位置：首页>用户中心>订单详情>退货</h4>
  <div class="returnCont clearfix">
    <div class="rCont_lf">
      <p><span class="rItem_lf">退货商品：</span><span class="rItem_rg"><img src="../common/img/productImg1.jpg"/>胡庆余堂鹿精蛹虫草膏</span></p>
      <p><span class="rItem_lf">退货原因：<span class="red">*</span></span><span class="rItem_rg">
        <select v-model="reasonId"><option selected value="0">请选择</option><option v-for="item in reasonList" :value="item.id" :key="item.id">{{item.reason}}</option></select>
      </span>
      </p>
      <p><span class="rItem_lf">申请售后：</span><span class="rItem_rg"><textarea placeholder="退货说明"></textarea></span></p>
      <p><span class="rItem_lf">物流公司：<span class="red">*</span></span>
        <span class="rItem_rg">
          <select v-model="expressNo"><option value="0">请选择</option><option v-for="item in ExpressList" :value="item.expressNo" :key="item.expressNo">{{item.expressName}}</option></select>
        </span>
      </p>
      <p><span class="rItem_lf">物流单号：<span class="red">*</span></span><span class="rItem_rg"><input type="text"></span></p>
       <p><button class="putReturnInfo" @click="submitReason()">提交</button></p>
    </div>
    <div class="rCont_rg">
      <h3>订单详情</h3>
      <h5 class="clearfix"><img src="../common/img/productImg1.jpg"/>胡庆余堂鹿精蛹虫草膏</h5>
      <p><span>卖家：</span><i class="bule">胡庆余堂滨江店</i></p>
      <p><span>订单编号：</span><i class="bule">12654879542131254</i></p>
      <p><span>单价：</span>￥100.00*1</p>
      <p><span>邮费：</span>￥0.00</p>
      <p><span>商品总价：</span>￥100.00</p>
    </div>
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
      errorBox: false,
      errMsg: '',
      orderId: '',
      reasonList: [],
      ExpressList: [],
      reasonId: '0',
      expressNo: '0'
    }
  },
  created () {
    this.getParams()
    this.getReturnReason()
    this.getExpress()
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.orderId
      // 将数据放在当前组件的数据内
      this.orderId = routerParams
      console.log(this.orderId)
    },
    returnOrder: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.returnOrder,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {

        }
      })
    },
    getReturnReason: function () {
      let _this = this;
      let params = new URLSearchParams();
      this.axios({
        method: 'post',
        url: this.url.api.getReturnReason,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.reasonList = data.obj
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
    submitReason: function () {
      console.log(this.reasonId, this.expressNo)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .bule{color: #1c7cff;font-style: normal;}
.cancelGoods{
  width:1150px;
  height:auto;
  margin: 0 auto 100px auto;
  h4{
    font-size:14px;
    font-weight: 100;
    padding: 22px 0 12px 0;
    color: #131313;
    border-bottom: 1px dashed #eee;
  }
}
  .returnCont{
    width:100%;
    box-sizing: border-box;
    border:1px solid #ddd;
  }
  .rCont_lf{
    width:68%;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    padding-left: 25px;
    float: left;
    padding-top: 30px;
    p{
      width:100%;
      margin-bottom: 15px;
      float: left;
    }
  }
  .rCont_rg{
    width:32%;
    float: left;
    box-sizing: border-box;
    padding: 0 20px;
    h3{
      height: 68px;
      line-height: 68px;
      border-bottom: 1px solid #ddd;
      font-weight: 100;
    }
    h5{
      padding: 20px 0 35px 0;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 30px;
      img{
        float: left;
        margin-right: 15px;
     }
    }
    p{
      margin-bottom: 20px;
      color: #474747;
      font-size: 14px;
      span{
        display: inline-block;
        width:70px;
        color: #6d6d6d;
        text-align: justify;
      }

    }
  }
  .rItem_lf{
    width:100px;
    float: left;
  }
  .rItem_rg select,.rItem_rg input{
    width:50%;
    height: 35px;
    padding: 0 10px;
    box-sizing: border-box;
    border:1px solid #ddd;
    float: left;
  }
.rItem_rg textarea{
  width:60%;
  height: 130px;
  border:1px solid #ddd;
  padding: 10px;
  float: left;
}
.rItem_rg img{
  vertical-align: middle;
  margin-right: 15px;
  width:90px;
}
  .putReturnInfo{
    width: 205px;
    height: 45px;
    color: #fff;
    border-radius: 3px;
    background: #dd0011;
    margin: 50px 0 30px 100px;
  }
</style>

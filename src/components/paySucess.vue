<template>
<div class="order">
    <div class="orderState">
      <p class="stateTxt">
      <img src="../common/img/suc.png"/>
      <span>您的订单已支付成功！</span>
      </p>
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
  name: 'paySucess',
  data () {
    return {
      errorBox: false,
      errMsg: ''
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.order{
  width:1150px;
  margin: 30px auto;
  h4{
    font-size: 18px;
    font-weight: 100;
    margin: 30px 0 20px 0;
  }
}
  .orderState{
    width:100%;
    box-sizing: border-box;
    border:1px solid #ddd;
    padding: 25px 65px;
  }
  .stateTxt{
    margin: 60px 0;
    color: #131313;
    font-size:24px;
    img{
      vertical-align: middle;
      margin-right: 45px;
    }
  }
  .orderInfo{
    width:100%;
    box-sizing: border-box;
    padding: 28px 35px;
    border:1px solid #ddd;
    color: #131313;
    h6{
      font-size: 18px;
     font-weight: 100;
      margin-bottom: 20px;
    }
    p{
      font-size: 16px;
      margin-left: 35px;
      margin-bottom: 15px;
    }
  }
  .payWay{
    box-sizing: border-box;
    padding: 40px 60px 30px 60px;
    border:1px solid #ddd;
    span{
      margin-right: 100px;
      input{
        margin-right: 10px;
      }
      img{
        vertical-align: middle;
      }
    }
  }
  .payMoney{
    margin: 20px 0;
    background: #e7e7e7;
    text-align: right;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    span{
      font-size: 22px;
      color: #e4393c;
      margin-right: 45px;
    }
    a{
      display: inline-block;
      width:210px;
      height: 56px;
      background: #dd0011;
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
  }
  .payMethod{
    width: 90%;
    margin: 0 auto;
  }
  .payMenu{
    width:100%;
    height: 40px;
    li{
      width:180px;
      text-align: center;
      line-height: 40px;
      background: #e4e4e4;
      float: left;
      color: #333;
      border-radius: 3px 3px 0 0;
      border-top:1px solid #a1a1a1;
      border-left:1px solid #a1a1a1;
      border-right:1px solid #a1a1a1;
      position: relative;
      &:first-child{
        border-right: 0;
      }
      &.cur{
        color: #000;
        background: #fff;
        border-bottom: 1px solid #fff;
        font-weight: bold;
        z-index:2;
      }
    }
  }
  .payCont{
    width: 100%;
    height:auto;
    float: left;
    padding: 40px 0;
    border:1px solid #a1a1a1;
    position: relative;
    margin-top: -1px;
    min-height:200px;
  }
  .payCont_lf{
    float: left;
    img{
      width:150px;
      margin-left: 20px;
      margin-right: 80px;
    }
  }
  .payCont_rg{
    float: left;
  }
  .wepayIcon{
    position: absolute;
    top:-18px;
    left:40%;
  }

</style>

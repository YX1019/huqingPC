<template>
<div class="personRg">
  <div class="putCashCont">
    <h1>提现</h1>
    <p><label>提现金额:</label><input type="text"/> 当前胡币:<span class="red">50</span> <span class="red marginLeft20">5胡币=1元</span></p>
    <p><label>提现至:</label><span class="payWay"><el-radio v-model="radio" label="1"><img src="../common/img/zfb.png"/> </el-radio></span><span><el-radio v-model="radio" label="2"><img src="../common/img/wechat.png"/> 微信</el-radio></span></p>
    <button>提现</button>
  </div>
  <div class="putCashCont">
    <h1>提现记录</h1>
    <ul class="puCashList">
      <li v-for="item in 3" :key="item"><div class="cashLf"><h2>提现成功</h2><h5>2018-06-10 09:00:00</h5></div>
        <div class="cashRg">50.00</div></li>
    </ul>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'putCash',
  data () {
    return {
      radio: '1'
    }
  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .marginLeft20{margin-left: 20px;}
  .el-radio__input.is-checked .el-radio__inner{
    border: #a6a6a6;
    background: #a6a6a6;
  }
  .el-radio__inner{
    background: #f0f0f0;
  }
  .personRg{
    margin-left: 250px;
    position: relative;
    color: #000;
  }
  .putCashCont{
    width:100%;
    height:auto;
    box-sizing: border-box;
    border:1px solid #ddd;
    margin-bottom: 25px;
    h1{
      padding-left: 25px;
      background:#f7f7f7 ;
      font-size: 18px;
      border-bottom:1px solid #ddd;
      line-height: 54px;
      font-weight: 100;
    }
    p{
      padding: 20px 25px;
      label{
        margin-right: 25px;
        width:70px;
        display: inline-block;
        font-size: 16px;
      }
     input{
       width:270px;
       height:35px;
       line-height: 35px;
       padding-left: 3px;
       border:1px solid #ddd;
       margin-right: 15px;
     }
    }
    button{
      width:135px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border:1px solid #ddd;
      background:#f4f4f4 ;
      margin: 50px 0 15px 95px;
      border-radius: 3px;
    }
  }
  .payWay{
    margin-right: 95px;
  }
  .puCashList li{
    width:100%;
    height: 80px;
    box-sizing: border-box;
    padding: 0 25px;
    border-bottom: 1px solid #ddd;
    &:last-child{
      border-bottom: none;
    }
  }
  .cashLf{
    float: left;
    h2{
      margin-top: 20px;
      font-size: 18px;
      font-weight: 100;
    }
    h5{
      font-size: 14px;
      color: #9f9f9f;
      margin-top: 12px;
      font-weight:100;
    }
  }
  .cashRg{
    float: right;
    font-size: 24px;
    color: #0883eb;
    line-height: 80px;
  }
.red{
  color: #e3130f;
}
</style>

<template>
<div class="personRg">
  <div class="myInfo">
    <div class="myAcountNum">
      <p>胡币</p>
      <h1>200</h1>
      <a class="putCash" @click="putCash();">提现</a>
    </div>
    <div class="myAcountTable">
      <table cellspacing="0">
        <tr>
          <th>来源/用途</th>
          <th>胡币变化</th>
          <th>日期</th>
        </tr>
        <tr>
          <td><img src="../common/img/productImg1.jpg" class="productImg"/>
            <div class="myTableRg"><h3>胡庆余堂枇杷膏</h3><p>订单编号：154652451254621</p></div>
          </td>
          <td class="proMoney">+10</td>
          <td class="proTime">2018年6月4日 09:20:30</td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .personRg{
    margin-left: 250px;
    position: relative;
    color: #000;
  }
  .myInfo,.myAcountNum,.myAcountTable{
    width:100%;
    height: auto;
  }
  .myAcountNum{
    position: relative;
    box-sizing: border-box;
    padding: 35px 0;
    text-align: center;
    background: #fef7f7;
    border: 1px solid #e3120e;
    margin: 10px 0 20px 0;
    p{
      font-size: 18px;
      color: #3e3e3e;
      line-height: 40px;
    }
    h1{
      font-size:36px;
      color: #e3120e;
    }
  }
  .myAcountTable{
    table{
      width:100%;
      height: auto;
      tr{
        width:100%;
      }
      th{
        height:40px;
        background: #f1f1f1;
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
        color: #727272;
        font-size: 14px;
        font-weight: 100;
        &:first-child{
          border-left: 1px solid #ddd;
        }
        &:last-child{
          border-right: 1px solid #ddd;
        }
      }
      td{
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        text-align: center;
        &:first-child{
          text-align: left;
          width:40%;
        }
      }
    }
  }
  .myTableRg{
    float: left;
    h3{
      font-size:14px;
      margin-bottom: 15px;
      font-weight: 100;
    }
    p{
      font-size: 13px;
      color: #686868;
    }
  }
  .productImg{
    float: left;
    width:62px;
    height: 62px;
    margin: 0 25px;
  }
  .proMoney{
    color: #e3120e;
    font-size: 24px;
  }
  .proTime{
    font-size: 13px;
    color: #686868;
  }
  .putCash{
    position: absolute;
    top:56px;
    right: 55px;
    color: #515151;
    font-size:18px;
    width:188px;
    height: 40px;
    line-height: 40px;
    display: block;
    border:1px solid #ddd;
    background: #fff;

  }
</style>

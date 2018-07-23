<template>
<div class="personRg">
  <div class="myDiscount">
    <ul class="discountList">
      <li v-for="(item,index) in discountList" :key="item" :class="{'cur' : index == active}">{{item}}</li>
    </ul>
    <div class="discountCont">
      <div class="discountItem" v-for="item in 6" :key="item">
        <h1>￥<span>20</span>代金券</h1>
        <h5>满116元使用</h5>
        <p>有效时间：2018.10.21至2018.12.16</p>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      active: 0,
      discountList: ['代金券', '红包', '生日特惠', '会员卡']
    }
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
  .discountList{
    width:100%;
    box-sizing: border-box;
    padding: 0 40px;
    height: 40px;
    line-height: 40px;
    border:1px solid #ddd;
    background: #f3f3f3;
    li{
      float: left;
      width:25%;
      cursor: pointer;
      &.cur{
        color: #e10808;
      }
    }
  }
.discountItem{
  width:30%;
  min-height: 200px;
  background: url(../common/img/tickctBg.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  text-align: center;
  margin-top: 20px;
  float: left;
  margin-right: 30px;
  h1{
    padding: 25px 0 10px 0;
    font-size: 24px;
    width:94%;
    margin-left: 3%;
    border-bottom: 1px solid #fff;
    font-weight: 100;
    span{
      font-size: 60px;
      margin-right: 20px;
    }
  }
  h5{
    font-size: 16px;
    font-weight: 100;
    margin: 20px 0 10px 0;
  }
  p{
    font-size: 14px;
  }
}
</style>

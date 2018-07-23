<template>
<div class="collect clearfix">
<div class="collectTop">
  <a class="cur">产品收藏</a>
  <a>店铺收藏</a>
  <div class="collectSearch"><input type="text"/><button>搜索</button> </div>
</div>
  <div class="collectTitle"><span>全部产品5</span></div>
  <ul class="collectList">
    <li v-for="item in 10" :key="item"><img src="../common/img/collectImg.jpg"/><p>胡庆堂枇杷膏</p><h5>￥100.00</h5></li>
  </ul>
</div>
</template>
<script type="text/ecmascript-6">

</script>
<style lang="scss" rel="stylesheet/scss">
.collect{
  width:1150px;
  height: auto;
  margin: 25px auto;
  padding-bottom: 100px;
}
  .collectTop{
    width:100%;
    height: 85px;
    line-height: 85px;
    background: #dd0011;
    a{
      display: inline-block;
      width:170px;
      height: 85px;
      text-align: center;
      color: #fff;
      &.cur{
        background: #97010c;
      }
    }
  }
  .collectSearch{
    float: right;
    margin-right: 40px;
    position: relative;
    input{
      width:315px;
      height: 40px;
    }
    button{
      border: 0;
      position: absolute;
      right: 0;
      top:25px;
      background: #f5f5f5;
      width:72px;
      height: 38px;
      font-size: 16px;
      color: #4b4848;
    }
  }
  .collectTitle{
    width:100%;
    margin-top: 30px;
    border-bottom: 2px solid #e5e5e5;
    span{
     display: inline-block;
      height: 40px;
      line-height: 40px;
      color: #dd0011;
      font-size: 16px;
      padding: 0 25px;
      border-bottom: 2px solid #dd0011;
    }
  }
  .collectList{
    width:100%;
    height:auto;
      li {
        width: 20%;
        box-sizing: border-box;
        padding: 20px;
        float: left;
        text-align: center;
        img {
          width: 100%;
          height: auto;
        }
        p {
          font-size: 14px;
          color: #101010;
          line-height: 40px;
        }
        h5 {
          font-size: 16px;
          color: #dd0011;
          font-weight: 100;
        }
      }

  }
</style>

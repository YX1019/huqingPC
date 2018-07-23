<template>
<div class="rightNav">
   <div class="rightItem1"><i class="iconfont">&#xe851;</i></div>
   <div class="rightItem2" @click="toCart();"><i class="iconfont">&#xe887;</i><p>购<br/>物<br/>车<br/>0</p></div>
   <div class="rightItem2"><i class="iconfont">&#xe618;</i><p>收藏</p></div>
   <div class="rightItem2"><i class="iconfont">&#xe607;</i><p>客服</p></div>
   <div class="rightItem2"><i class="iconfont">&#xe63b;</i></div>
   <div class="rightItem2"><i class="iconfont">&#xe733;</i><p>TOP</p></div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    toCart: function () {
      this.$router.push({ path: '/shopcart' })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .rightNav{
    width: 40px;
    position: fixed;
    height:100%;
    right: 0;
    top: 0;
    background: #2b2315;
    color: #fff;
    z-index:5;
    box-sizing: border-box;
    padding: 0 6px;
    font-size: 12px;
    cursor: pointer;
  }
  .rightItem1{
    width:28px;
    height: 28px;
    border-radius: 50%;
    background: #e70012;
    margin-bottom: 35px;
    text-align: center;
    line-height: 27px;
    margin-top: 250px;
  }
  .rightItem2{
    width:100%;
    text-align: center;
    margin-bottom: 35px;
  }
  .iconfont{
    font-size: 20px;
    color: #fff;
  }
</style>

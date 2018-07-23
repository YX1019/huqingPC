<template>
<div class="evaluate">
  <h4>您现在的位置：首页>用户中心>订单详情>评价</h4>
  <div class="evaluateCont">
    <h2><img src="../common/img/productImg1.jpg"/>胡庆余堂鹿精蛹虫草膏 </h2>
    <textarea placeholder="请写下您的评价内容"></textarea>
    <p><span>*</span>描述相符<i class="iconfont">&#xe618;</i><i class="iconfont">&#xe618;</i>
      <i class="iconfont">&#xe618;</i><i class="iconfont">&#xe618;</i></p>
  </div>
  <div style="text-align: center"><button class="putEva">提交评价</button></div>
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
.evaluate{
  width:1150px;
  height:auto;
  margin: 0 auto;
  h4{
    font-size:14px;
    font-weight: 100;
    padding: 22px 0 12px 0;
    color: #131313;
    border-bottom: 1px dashed #eee;
  }
}
  .evaluateCont{
    margin-top: 5px;
    width:100%;
    box-sizing: border-box;
    padding: 28px 10px;
    background: #f6f6f6;
    margin-bottom: 40px;
    border: 1px solid #ddd;
    h2{
      font-weight: 100;
      font-size: 14px;
      line-height: 90px;
      img{
        width:90px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
    textarea{
      width:100%;
      height: 450px;
      box-sizing: border-box;
      border:1px solid #ddd;
      background: #fff;
      padding:25px;
      margin: 25px 0;
    }
    p{
      color: #787878;
      font-size: 14px;
      span{
        color: #e70000;
      }
      i{
        margin-left: 15px;
        font-size: 24px;
      }
    }
  }
  .putEva{
    width:208px;
    height: 45px;
    border-radius: 3px;
    background:#e70000;
    color: #fff;
    margin: 0 auto 100px auto;
  }
</style>

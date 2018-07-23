<template>
  <div class="personRg">
    <div class="feedback">
    <h1>意见反馈</h1>
      <textarea placeholder="请填写您的宝贵意见">

      </textarea>
      <button>提交</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'feedbcak',
  data () {
    return {

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
  .feedback{
    width:100%;
    height: auto;
    text-align: center;
    h1{
      text-align: left;
      padding-left: 15px;
      background: #f0f0f0;
      font-size: 16px;
      font-weight: 100;
      line-height: 40px;
      margin-bottom: 15px;
    }
    textarea{
      width:100%;
      box-sizing: border-box;
      padding: 15px;
      height: 412px;
      border:1px solid #ddd;
    }
    button{
      width:245px;
      height: 55px;
      margin: 40px auto;
      background: #dd0011;
      color: #fff;
      font-size: 18px;
      border-radius: 3px;
    }
  }
</style>

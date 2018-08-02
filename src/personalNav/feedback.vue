<template>
  <div class="personRg">
    <div class="feedback">
    <h1>意见反馈</h1>
      <textarea placeholder="请填写您的宝贵意见" v-model="content">

      </textarea>
      <button @click="addFeedback()">提交</button>
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
  name: 'feedbcak',
  data () {
    return {
      content: '',
      errorBox: false,
      errMsg: ''
    }
  },
  methods: {
    addFeedback: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('content', _this.content);
      if (_this.content === '') {
        _this.errMsg = '请输入内容再提交哦！'
        _this.errorBox = true
        return
      }
      this.axios({
        method: 'post',
        url: this.url.api.newOption,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.errMsg = '提交成功'
          _this.errorBox = true
          _this.content = ''
        }
      })
    }
  }
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

<template>
<div class="evaluate">
  <h4>您现在的位置：首页>用户中心>订单详情>评价</h4>
  <div class="evaluateCont">
    <h2><img :src="orderInfo.proImg" style="width:90px;height: 90px;"/>{{orderInfo.proName}} </h2>
    <textarea placeholder="请写下您的评价内容" v-model="comment"></textarea>
    <div>
      <span>*</span>描述相符
      <ul class="star">
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" track-by="index" :key="index" @click="getIndex(index)"></span>
        <!--性能优化 track-by 数据不改变时不会重新渲染-->
      </ul>
    </div>
    <div class="photos" style="margin-top: 30px;">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
  <div style="text-align: center"><button class="putEva" @click="addOrderEvaluate()">提交评价</button></div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      score: 0,
      orderId: '',
      comment: '',
      orderInfo: {},
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created () {
    this.getParams()
    this.queryOrderDetails()
  },
  computed: { // 计算属性
    itemClasses () {
      let result = [];
      for (let i = 0; i < this.score; i++) {
        result.push('on');
      }
      while (result.length < 5) {
        result.push('off');
      }
      return result;
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.orderId
      // 将数据放在当前组件的数据内
      this.orderId = routerParams
      console.log(this.orderId)
    },
    getIndex: function (index) {
      this.score = parseInt(index) + 1
    },
    addOrderEvaluate: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      params.append('star', this.score);
      params.append('comment', this.comment);
      params.append('imgArr', '');
      this.axios({
        method: 'post',
        url: this.url.api.addOrderEvaluate,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.$message({
            showClose: true,
            message: '评价成功',
            type: 'success',
            duration: 1000
          })
          _this.$router.push({path: '/personal/myOder'})
        }
      })
    },
    queryOrderDetails: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('orderId', this.orderId);
      this.axios({
        method: 'post',
        url: this.url.api.queryOrderDetails,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          window.scrollTo(0, 0);
          _this.orderInfo = data.obj
        }
      })
    }
  }
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
 .star{
   font-size: 0;
   display: inline-block;
   margin-left: 10px;
 }
.star-item{
  display: inline-block;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 100%;
}
.star-item.on{
  background-image: url(../common/img/on.png);
}
.star-item.half{
  background-image: url(../common/img/on.png);
}
.star-item.off{
  background-image: url(../common/img/off.png);
}
</style>

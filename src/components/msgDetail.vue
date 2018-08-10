<template>
<div class="newsDetail">
  <h4>您现在的位置：活动消息>{{msgInfo.activityTitle}}</h4>
  <div class="newsDCont">
    <h1>{{msgInfo.activityTitle}}</h1>
    <h3>发布时间：{{msgInfo.time}}</h3>
    <div class="newsDcontInfo" v-html="msgInfo.activityUrl">
      我国大部门地区习惯自冬至起“数九”，每九天为一个小节，共分为九九八十一天。
      民间流传着一首歌谣：一九、二九不出手，三九、四九冰上走，五九、六九沿河看柳，七九河开，八九燕来，九九加一九耕牛遍地走。
      冬至后，阳气缓缓回升，白天慢慢变长，是阴阳转化的关键节气，也是夏病冬防、冬病冬治的最好时机。所有古时冬至也喻意为新生命的开始。
      冬至养生食谱
    </div>
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
  name: '',
  data () {
    return {
      activityId: '',
      errorBox: false,
      errMsg: '',
      msgInfo: {},
      title: ''
    }
  },
  created () {
    this.getParams()
    this.activityDetailQuery()
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.activityId
      // 将数据放在当前组件的数据内
      this.activityId = routerParams
    },
    activityDetailQuery: function () {
      let _this = this;
      let params = new URLSearchParams();
      // params.append('userId', this.$store.state.userId);
      params.append('id', this.activityId);
      this.axios({
        method: 'post',
        url: this.url.api.activityDetailQuery,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.msgInfo = data.obj
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .newsDetail{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    height:auto;
    margin: 0 auto 150px auto;
    h4{
      font-size:14px;
      font-weight: 100;
      padding: 22px 0 12px 0;
      color: #131313;
      border-bottom: 1px dashed #eee;
      margin-bottom: 20px;
    }
  }
  .newsDCont{
    width:100%;
    border-top:1px solid #e70012;
    margin-top: 8px;
    h1{
      font-size: 18px;
      text-align: center;
      color: #e60012;
      line-height: 60px;
      font-weight: 100;
    }
    h3{
      font-size: 14px;
      color: #131313;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      text-align: center;
      font-weight: 100;
      line-height: 38px;
    }
  }
  .newsDcontInfo{
    width:100%;
    box-sizing: border-box;
    padding: 30px;
    font-size: 14px;
    color: #3f3f3f;
    line-height:22px;
  }
  .zan{
    text-align: center;
    font-size:16px;
    color: #7b7b7b;
    span{
      padding: 12px 55px;
      display: inline-block;
      border:1px solid #ccc;
      background: #eee;
      border-radius: 35px;
      margin-right: 20px;
      i{
        margin-right: 10px;
        font-size: 20px;
        color: #a0a0a0;
        &.cur{
          color: #e60012;
        }
      }
    }
    b {
      font-weight:100;
      margin-right: 5px;
    }
  }
  .newsComment{
    width:90%;
    margin: 20px 5%;
    box-sizing: border-box;
    height: 100px;
    border:1px solid #ccc;
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.2) inset ;
    padding: 10px;
  }
.putComment{
  width:140px;
  height: 38px;
  line-height: 38px;
  background: #d40000;
  font-size:16px;
  color: #fff;
  float: right;
  margin-right: 5%;
}
  .putComment:after{clear: both;display: table;content: '';}
  .allComment{
    width: 94%;
    margin: 30px auto;
    h1{
      text-align: left;
      border-bottom: 2px solid #ccc;
      font-weight: 100;
      margin-bottom: 25px;
      span{
        font-size: 18px;
        color: #6e6e6e;
        display: inline-block;
        border-bottom: 2px solid #d40000;
      }
    }
    ul{
      li{
        margin-bottom: 25px;
        img{
          width:50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
          float: left;
        }
      }
    }
  }
  .n_rg{
    margin-left: 60px;
    h2{
      font-size: 18px;
      margin-bottom: 15px;
      span{
        font-size:14px;
        color: #7e7e7e;
        float: right;
      }
    }
    p{
      font-size:14px;
      color: #161616;
    }
  }
  .anotherNews{
    text-align: center;
    font-size: 14px;
    color: #d40000;
    border-top:1px solid #d40000;
    line-height: 50px;
    span{
      margin-right: 20px;
    }
  }
</style>

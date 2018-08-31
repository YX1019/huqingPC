<template>
  <div class="collect clearfix">
    <div class="collectTop">
      <a :class="{'cur' : collectType == 0}" @click="toCollect()">产品收藏</a>
      <a :class="{'cur' : collectType == 1}" @click="toCollectStore()">店铺收藏</a>
      <!--<div class="collectSearch"><input type="text"/><button>搜索</button> </div>-->
    </div>
    <div class="collectTitle"><span>全部<b>{{name}}</b>{{collectNum}}</span></div>
    <ul class="collectList" v-show="list && !loading">
      <li v-for="item in collectList" :key="item.collectId" @click="toProductDetail(item.collectId)"><img :src="item.image"/>
        <p v-if="collectType == 0">{{item.productName}}</p>
        <p v-if="collectType == 1">{{item.teamName}}</p>
        <h5 v-show="collectType == 0">￥{{item.productPrice}}</h5>
      </li>
    </ul>
    <div style="text-align: center;line-height: 80px;" v-show="!list && !loading">暂无收藏</div>
    <div class="loading" v-show="loading" style="text-align: center;margin: 50px auto;"><img src="../../common/img/loading.gif" style="width:40px;"/></div>
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
  name: 'comCollect',
  props: {
    collectType: {
      required: true
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      errMsg: '',
      errorBox: false,
      collectList: [],
      collectNum: 0,
      list: true,
      loading: false
    }
  },
  created () {
    this.getCollect()
  },
  methods: {
    toCollect: function () {
      this.$router.push({ path: '/collect' })
    },
    toCollectStore: function () {
      this.$router.push({ path: '/collectStore' })
    },
    getCollect: function () {
      let _this = this;
      _this.loading = true
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('type', this.collectType);
      this.axios({
        method: 'post',
        url: this.url.api.myCollect,
        data: params
      }).then(function (res) {
        let data = res.data
        _this.loading = false
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.collectList = data.listObject
          _this.collectNum = data.listObject.length
          if (_this.collectNum === 0) {
            _this.list = false
          } else {
            _this.list = true
          }
        }
      })
    },
    toProductDetail: function (id) {
      if (this.collectType === 0 || this.collectType === '0') {
        this.$router.push({path: '/productDetail', query: {'productId': id}})
      } else {
        this.$router.push({path: '/shop', query: {'teamId': id}})
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .collect{
    width:1150px;
    height: auto;
    min-height: 500px;
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
      b{
        font-weight: 100;
      }
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
        width: 190px;
        height: 190px;
      }
      p {
        font-size: 14px;
        color: #101010;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h5 {
        font-size: 16px;
        color: #dd0011;
        font-weight: 100;
      }
    }

  }
</style>

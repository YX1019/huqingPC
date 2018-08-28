<template>
<div class="coupon">
  <div class="curPosition">您现在的位置:首页>商城>我的优惠>代金券</div>
  <div class="offerMid" v-for="item in DiscountList" :key="item.discountId">
    <img src="../common/img/storeImg2.jpg"/>
    <div class="offerMidCont"><h1>代金券</h1>
      <p>{{item.title}}</p>
      <a @click="toCoupon(item.discountId)" class="hand">查看详情</a>
    </div>
  </div>
  <div style="width: 100%;height: 50px;text-align: center;margin: 30px auto;">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-size="pageSize"
      v-show="isList" >
    </el-pagination>
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
  name: 'couponList',
  data () {
    return {
      errorBox: false,
      errMsg: '',
      pageSize: 10,
      total: 6,
      pageNo: 1,
      DiscountList: [],
      isList: true
    }
  },
  created () {
    this.getDicountList(1)
  },
  methods: {
    handleCurrentChange (val) {
      var pageNum = val
      this.getDicountList(pageNum)
    },
    getDicountList: function (pageNo) {
      let _this = this
      let params = new URLSearchParams();
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.getDicountList,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.total = data.totalItems
          _this.DiscountList = data.listObject
          if (_this.DiscountList.length === 0) {
            _this.isList = false
          } else {
            _this.isList = true
          }
        }
      })
    },
    toCoupon: function (discountId) {
      this.$router.push({path: '/coupon', query: {discountId: discountId}})
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.coupon{
  width:1150px;
  margin: 0 auto;
}
.offerMid{
  width:46%;
  margin: 10px 2%;
  display: inline-block;
  position: relative;
  img{
    width:100%;
    height: auto;
  }
  a{
    display: inline-block;
    width:100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #fff;
    border-radius: 3px;
    margin-top:10px;
  }
}
.offerMidCont{
  position: absolute;
  width:100%;
  height:auto;
  left: 0;
  top:45px;
  color: #2065e5;
  text-align: left;
  margin-left: 50px;
  h1{
    font-size: 30px;
    font-weight: 100;
    line-height: 50px;
  }
  p{
    font-size: 18px;
  }
}
.curPosition{
  width:1150px;
  @media screen and (max-width: 1150px){
    width:760px;
  }
  height: 48px;
  line-height: 48px;
  color: #131313;
  font-size: 14px;
  margin: 0 auto;
  border-bottom:1px dashed #ccc;
}
</style>

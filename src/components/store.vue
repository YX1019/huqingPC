<template>
  <div class="store">
<div class="banner">
  <img src="../common/img/storeBanner.jpg"/>
</div>
  <div class="curPosition">您现在的位置:商城</div>
    <div class="myOffer">
      <div class="storeTitle">我的优惠 <i>MY OFFER</i>
        <span class="rg hand" @click="toCouponList()">查看更多</span>
      </div>
      <div class="offerCont clearfix">
        <div class="offerLf"><img src="../common/img/storeImg1.jpg"/><div class="offerLfCont"><h1>会员福利</h1><p>注册送好礼</p></div></div>
        <div class="offerMid"><img src="../common/img/storeImg2.jpg"/><div class="offerMidCont"><h1>代金券</h1><p>{{dicountList.title}}</p><a @click="toCoupon(dicountList.discountId)" class="hand">查看详情</a></div></div>
        <div class="offerRg"><img src="../common/img/storeImg3.jpg"/><div class="offerRgCont"><h1>活动名称</h1><p>活动详情简介</p></div></div>
      </div>
    </div>
    <div class="myOffer" style="margin-bottom: 60px;">
      <div class="storeTitle">活动信息 <i>ACTIVITY</i>
        <!--<span class="rg">查看更多</span>-->
        </div>
      <ul class="activityList clearfix">
        <li v-for =" item in filteredItems" :key="item.activityId" @click="toMsgDetail(item.activityId)"><img :src="item.activityImg"/><div><h1>{{item.activityTitle}}</h1><p>{{item.time}}</p></div> </li>
      </ul>
    </div>
    <div class="conditions">
      排序:<span class="conditionsItem" @click="getColligate();">综合</span>
      <span class="conditionsItem"><span @click="priceDesc()">价格</span><i class="iconfont" @click="priceDesc(1)" :class="{'cur': priceState === 1}">&#xe630;</i><i class="iconfont" @click="priceDesc(2)" :class="{'cur': priceState === 2}">&#xe62f;</i></span>
      <span class="conditionsItem"><span @click="saleSort()">销量</span><i class="iconfont" @click="saleSort(1)" :class="{'cur': saleState === 1}">&#xe630;</i><i class="iconfont" @click="saleSort(2)" :class="{'cur': saleState === 2}">&#xe62f;</i></span>
      <!--<span class="conditionsItem">人气<i class="iconfont">&#xe630;</i><i class="iconfont">&#xe62f;</i></span>-->
      <div class="comprehensive" v-show="isShowColligate">
        <!--<div v-for="(item,index) in cateList" :key="item.cateName">-->
        <!--<h2 class="cur">{{item.cateName}}</h2>-->
          <!--<ul><li v-for="(itemm,indexx) in item.childList" :key="itemm.cateId" :class="{'cur': sel[index] == indexx}" @click="getSubList(itemm.cateId,index,indexx)">{{itemm.cateName}}</li></ul>-->
          <!--<p><span v-for="(item,ind) in subCateArr" :key="item" :class="{'cur':active==ind}" @click="getSubTxt(item,ind)">{{item}}</span></p>-->
        <!--</div>-->
      <div>
        <h2 class="cur">{{cateList1.cateName}}</h2>
        <ul><li v-for="(item,index) in cateList1.childList" :key="item.cateId" :class="{'cur':active1===index}" @click="getSubList(item, index)">{{item.cateName}}</li></ul>
        <p><span v-for="(item,index) in subCateArr1" :key="index" :class="{'cur':subActive1==index}" @click="getSubTxt1(item, index)">{{item}}</span></p>
      </div>
        <div>
          <h2 class="cur">{{cateList2.cateName}}</h2>
          <ul><li v-for="(item,index) in cateList2.childList" :key="item.cateId" :class="{'cur':active2===index}" @click="getSubList2(item, index)">{{item.cateName}}</li></ul>
          <p><span v-for="(item,index) in subCateArr2" :key="item" :class="{'cur':subActive2==index}" @click="getSubTxt2(item,index)">{{item}}</span></p>
        </div>
        <!--<div>-->
          <!--<h2>功效分类</h2>-->
          <!--<ul><li v-for="(item,index) in 4" :key="item" :class="{'cur':active==index}">产品分类</li></ul>-->
          <!--<p><span v-for="(item,index) in 8" :key="item" :class="{'cur':active==index}">中草药1</span></p>-->
        <!--</div>-->
    <div>
        <h2 class="cur">价格区间</h2>
        <h3><span>不限</span> 自定义 <input type="text" v-model="leastPrice"/> -<input type="text" v-model="mostPrice"/> </h3>
    </div>
        <h4><button @click="reset()">重置</button><button @click="closeColligate()">确定</button></h4>
      </div>
    </div>
    <ul class="goodsList clearfix" v-show="list && !loading">
      <li v-for =" item in goodsList" :key="item.productId">
        <div @click="toProDetail(item.productId);">
          <img :src="item.imgList"/>
          <p>{{item.productName}}</p>
          <h5>￥{{item.productPrice}}元<span style="color:#f7a53e; margin-left: 5px;" v-show="item.pointPrice > 0"><b style="color: #333;font-weight: 300;">+</b><i class="iconfont" style="color:#f7a53e;margin:0 5px;">&#xe674;</i>{{item.pointPrice}}</span></h5>
          <h6><s>￥{{item.oldPrice}}元</s><span class="rg">月售{{item.mounthSales}}件</span></h6>
        </div>
        <div><button @click="addToCollect(item)" v-if="!item.collectionFlg"><i class="iconfont" style="margin-right:5px;">&#xe648;</i>加入收藏</button><button v-if="item.collectionFlg" @click="cancelCollect(item)"><i></i>取消收藏</button><button class="rg" @click="toProDetail(item.productId);"><i class="iconfont" style="margin-right: 5px;">&#xe625;</i>放入购物车</button></div>
      </li>
    </ul>
    <div v-show="!list && !loading" style="text-align: center;line-height: 80px;">暂无商品</div>
    <div class="loading" v-show="loading" style="text-align: center;margin: 50px auto;"><img src="../common/img/loading.gif"/></div>
    <div style="width: 100%;height: 50px;text-align: center;margin-bottom: 30px;" v-show="list && !loading">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalNum"
        :current-page.sync="pageNo"
        :page-size="pageSize">
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
  name: 'store',
  data () {
    return {
      active: 0,
      active1: -1,
      active2: -1,
      isShowColligate: false,
      pageNo: 1,
      totalNum: 5,
      pageSize: 10,
      goodsList: [],
      teamId: '', // 搜索条件
      productName: '',
      fatherCate: '',
      childCate: '',
      fatherEfectCate: '',
      childEfectCate: '',
      salesSort: '',
      priceSort: '',
      leastPrice: '',
      mostPrice: '',
      proType: '', // 搜索条件结束
      cateList: [],
      cateSubList: [],
      errorBox: false,
      errMsg: '',
      subCateArr1: [],
      subCateArr2: [],
      subActive1: -1,
      subActive2: -1,
      priceState: 0,
      saleState: 0,
      list: true,
      cateList1: {},
      cateList2: {},
      msgList: [],
      curPage: 1,
      loading: false,
      dicountList: {}
    }
  },
  created () {
    this.getcategory()
    this.getProList()
    this.getMsgList()
    this.getDicountList()
  },
  mounted () {

  },
  computed: {
    filteredItems: function () {
      return this.msgList.slice(0, 2)
    }
  },
  methods: {
    toProDetail: function (productId) {
      this.$router.push({path: '/productDetail', query: {productId: productId}})
    },
    toCoupon: function (discountId) {
      this.$router.push({path: '/coupon', query: {discountId: discountId}})
    },
    getColligate: function () {
      this.isShowColligate = true
      this.priceState = ''
      this.priceSort = ''
      this.saleState = ''
      this.salesSort = ''
    },
    closeColligate: function () {
      this.isShowColligate = false
      this.getProList(1)
    },
    handleCurrentChange: function (val) {
      this.curPage = val
      this.getProList(val)
    },
    getProList: function (pageNo) {
      this.loading = true
      console.log(this.priceSort, this.salesSort)
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('priceSort', this.priceSort);
      params.append('salesSort', this.salesSort);
      params.append('fatherCate', this.fatherCate);
      params.append('childCate', this.childCate);
      params.append('fatherEfectCate', this.fatherEfectCate);
      params.append('childEfectCate', this.childEfectCate);
      params.append('leastPrice', this.leastPrice);
      params.append('mostPrice', this.mostPrice);
      params.append('pageNum', pageNo);
      console.log(this.priceSort, this.salesSort)
      this.axios({
        method: 'post',
        url: this.url.api.queryProduct,
        data: params
      }).then(function (res) {
        let data = res.data
        _this.loading = false
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(res)
          _this.totalNum = data.totalItems
          _this.goodsList = data.listObject
          if (_this.goodsList.length === 0) {
            _this.list = false
          } else {
            _this.list = true
          }
        }
      })
    },
    getcategory: function () {
      let _this = this
      this.axios.get(this.url.api.categoryQuery).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(res)
          _this.cateList = data.obj.cateList
          _this.cateList1 = _this.cateList[0]
          _this.cateList2 = _this.cateList[1]
          _this.cateSubList = data.obj.cateSubList
        }
      })
    },
    addToCollect: function (item) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('collectId', item.productId);
      params.append('collectType', '0');
      this.axios({
        method: 'post',
        url: this.url.api.addToCollect,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.$set(item, 'collectionFlg', true);
          // _this.getProList(_this.curPage)
        }
      })
    },
    cancelCollect: function (item) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('collectId', item.productId);
      params.append('collectType', '0');
      this.axios({
        method: 'post',
        url: this.url.api.cancelCollect,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.$set(item, 'collectionFlg', false);
        }
      })
    },
    getSubList: function (item, index) {
      this.active1 = index
      let cateId = item.cateId
      this.fatherCate = item.cateName
      let len = this.cateSubList.length
      for (var i = 0; i < len; i++) {
        if (cateId === this.cateSubList[i].cateId) {
          this.subCateArr1 = this.cateSubList[i].cateName
        }
      }
    },
    getSubList2: function (item, index) {
      this.active2 = index
      this.fatherEfectCate = item.cateName
      let cateId = item.cateId
      let len = this.cateSubList.length
      for (var i = 0; i < len; i++) {
        if (cateId === this.cateSubList[i].cateId) {
          this.subCateArr2 = this.cateSubList[i].cateName
        }
      }
    },
    getSubTxt1: function (item, index) {
      this.subActive1 = index
      this.childCate = item
    },
    getSubTxt2: function (item, index) {
      this.subActive2 = index
      this.childEfectCate = item
    },
    reset: function () {
      this.subActive1 = -1
      this.subActive2 = -1
      this.active2 = -1
      this.active1 = -1
      this.fatherCate = ''
      this.fatherEfectCate = ''
      this.childCate = ''
      this.childEfectCate = ''
      this.leastPrice = ''
      this.mostPrice = ''
      this.pageNo = 1
    },
    priceDesc: function (index) {
      this.saleState = ''
      this.salesSort = ''
      this.fatherCate = ''
      this.fatherEfectCate = ''
      this.childCate = ''
      this.childEfectCate = ''
      this.leastPrice = ''
      this.mostPrice = ''
      this.priceState = index
      if (index === 1) {
        this.priceSort = 'priceDesc'
      } else if (index === 2) {
        this.priceSort = 'priceAsc'
      } else {
        this.priceSort = ''
      }
      console.log(this.saleState, this.priceState)
      this.getProList(1)
      this.pageNo = 1
    },
    saleSort: function (index) {
      this.priceState = ''
      this.priceSort = ''
      this.fatherCate = ''
      this.fatherEfectCate = ''
      this.childCate = ''
      this.childEfectCate = ''
      this.leastPrice = ''
      this.mostPrice = ''
      this.saleState = index
      if (index === 1) {
        this.salesSort = 'salesDesc'
      } else if (index === 2) {
        this.salesSort = 'salesAsc'
      } else {
        this.salesSort = ''
      }
      console.log(this.saleState, this.priceState)
      this.getProList(1)
      this.pageNo = 1
    },
    getMsgList: function () {
      let _this = this;
      let params = new URLSearchParams();
      // params.append('userId', this.$store.state.userId);
      params.append('type', 1);
      this.axios({
        method: 'post',
        url: this.url.api.activityQuery,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.msgList = data.listObject
        }
      })
    },
    toMsgDetail: function (activityId) {
      this.$router.push({path: '/msgDetail', query: {activityId: activityId}})
    },
    toCouponList: function () {
      this.$router.push({path: '/couponList'})
    },
    getDicountList: function () {
      let _this = this
      this.axios.get(this.url.api.getDicountList).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(res)
          _this.dicountList = data.listObject[0]
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .banner{
    width:100%;
    height: auto;
    img {
      width:100%;
      height: auto;
      display: block;
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
  }
 .myOffer{
   width:1150px;
   @media screen and (max-width: 1150px){
     width:760px;
   }
   height: auto;
   margin: 0 auto;
 }
  .storeTitle{
    width:100%;
    height: 40px;
    margin:40px 0 30px 0;
    color: #595959;
    font-size:20px;
    i{
      font-size: 22px;
      color: #b3b3b3;
      margin-left: 15px;
    }
    span{
      font-size: 16px;
    }
  }
  .offerCont{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    margin: 0 auto;
  }
  .offerLf{
    width:21%;
    position: relative;
    float: left;
    img{
      width:100%;
      height: auto;
    }
  }
  .offerMid{
    width:52%;
    margin: 0 3%;
    position: relative;
    float: left;
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
  .offerRg{
    width:21%;
    position: relative;
    float: left;
    img{
      width:100%;
      height: auto;
    }
  }
  .offerLfCont,.offerMidCont,.offerRgCont{
    position: absolute;
    width:100%;
    height:auto;
    left: 0;
    top:45px;
    text-align: center;
  }
  .offerLfCont{
    color: #d30d0d;
    h1{
      font-size:30px;
      font-weight: 100;
      line-height: 50px;
    }
    p{
      font-size: 18px;
    }
  }
  .offerMidCont{
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
  .offerRgCont{
    color: #179510;
    h1{
      font-size:30px;
      font-weight: 100;
      line-height: 50px;
    }
    p{
      font-size: 18px;
    }
  }
  .activityList{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    margin: 0 auto;
    li{
      width:48%;
      box-sizing: border-box;
      cursor: pointer;
      &:nth-child(2n+1){
        float: left;
      }
      &:nth-child(2n+2){
        float: right;
      }
      img{
        width:210px;
        height: 130px;
        float: left;
      }
      div{
        margin-left: 230px;
        h1{
          color: #030303;
          font-size: 22px;
          line-height: 40px;
          margin-bottom: 30px;
          font-weight: 100;
          height: 80px;
          overflow: hidden;
        }
        p{
          font-size: 16px;
          color: #a5a5a5;
        }
      }
    }
  }
  .goodsList{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    height: auto;
    margin: 0 auto;
    li{
      cursor: pointer;
      width:214px;
      margin-right:20px;
      @media screen and (max-width: 1150px){
        width:144px;
        margin-right:10px;
      }
      margin-bottom: 34px;
      float: left;
      &:nth-child(5n+5){
        margin-right: 0;
      }
      img{
        width:100%;
        height: 214px;
        @media screen and (max-width: 1150px){
          height:144px;
        }
      }
      p{
        font-size: 14px;
        color: #020202;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h5{
        font-size: 18px;
        color: #de0000;
        line-height: 24px;
        font-weight: 100;
      }
      h6{
        color: #8c8c8c;
        font-size: 16px;
        font-weight: 100;
        span{
          font-size: 12px;
          color: #aaa;
        }
      }
      div{
        button{
          width:48%;
          text-align: center;
          height: 28px;
          border:1px solid #e5e5e5;
          background: #f6f6f6;
          border-radius: 2px;
          font-size: 12px;
          color: #171717;
          cursor: pointer;
        }
      }
    }
  }
  .conditions{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    margin: 30px auto;
    border:1px solid #ddd;
    padding: 5px 30px;
    font-size:14px;
    box-sizing: border-box;
    background: #f5f5f5;
    position: relative;
  }
  .conditionsItem{
    color: #343434;
    padding: 5px 8px;
    border:1px solid #ddd;
    margin-left: 10px;
    display: inline-block;
    background: #fff;
    cursor: pointer;
    i{
      font-size: 12px;
      color: #ddd;
      &.cur{
        color: #de0000;
      }
    }
  }
  .comprehensive{
    position: absolute;
    left: 0;
    top:42px;
    width:100%;
    box-sizing: border-box;
    padding: 30px 20px;
    border:1px solid #ddd;
    border-top: 0;
    background:rgba(255,255,255,0.95);
    div{
      margin-bottom: 10px;
    }
    h2{
      width:105px;
      height: 38px;
      border: 1px solid #ddd;
      font-size: 14px;
      line-height: 38px;
      text-align: center;
      border-radius: 3px;
      color: #343434;
      font-weight: 100;
      margin-bottom: 20px;
      &.cur{
        background: #e60c0c;
        color: #fff;
      }
    }
    li{
      display: inline-block;
      margin: 0 15px 10px 15px;
      padding: 10px;
      border-radius: 35px;
      border:1px solid #ddd;
      font-size: 14px;
      &.cur{
        color: #e60c0c;
        border:1px solid #e60c0c;
      }
    }
    p{
      span{
        margin: 10px 0 10px 30px;
        display: inline-block;
        &.cur{
          color: #e60c0c;
        }
      }
    }
    h3{
      font-weight: 100;
      font-size: 14px;
      color: #171717;
      span{
        color: #6f6f6f;
        margin-right: 90px;
        margin-left: 20px;
      }
      input{
        display: inline-block;
        width:95px;
        height: 30px;
        border:1px solid #ddd;
        margin: 0 10px;
        padding-left: 10px;
      }
    }
    h4{
      text-align: center;
      button{
        display: inline-block;
        width:100px;
        height: 35px;
        border:1px solid #ddd;
        font-weight: 100;
        font-size: 14px;
        background: #fff;
        border-radius: 3px;
        &:last-child{
          background: #e60c0c;
          color: #fff;
          border:1px solid #e60c0c;
          margin-left: 30px;
        }
      }
    }
  }
</style>

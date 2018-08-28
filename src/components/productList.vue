<template>
  <div class="store" style="border-top:1px solid #e70012;">
  <div class="curPosition">您现在的位置:商城</div>
    <div class="clearfix pList">
      <div style="margin: 30px 15px 30px 0;float: left;width: 220px;">
        <leftSort></leftSort>
      </div>
    <div class="pList_rg">
    <div class="conditions1">
      排序:
      <span class="conditionsItem"><span @click="priceDesc()">价格</span><i class="iconfont" @click="priceDesc(1)" :class="{'cur': priceState === 1}">&#xe630;</i><i class="iconfont" @click="priceDesc(2)" :class="{'cur': priceState === 2}">&#xe62f;</i></span>
      <span class="conditionsItem"><span @click="saleSort()">销量</span><i class="iconfont" @click="saleSort(1)" :class="{'cur': saleState === 1}">&#xe630;</i><i class="iconfont" @click="saleSort(2)" :class="{'cur': saleState === 2}">&#xe62f;</i></span>
    </div>
    <ul class="goodsList1 clearfix" v-show="list">
      <li v-for =" item in goodsList" :key="item.productId">
        <div @click="toProDetail(item.productId);">
          <img :src="item.imgList"/>
          <p>{{item.productName}}</p>
          <h5>￥{{item.productPrice}}元</h5>
          <h6><s>￥{{item.oldPrice}}元</s><span class="rg">月售{{item.mounthSales}}件</span></h6>
        </div>
        <div><button @click="addToCollect(item.productId)" v-if="!item.collectionFlg"><i></i>加入收藏</button><button v-if="item.collectionFlg" @click="cancelCollect(item.productId)"><i></i>取消收藏</button><button class="rg" @click="toProDetail(item.productId);"><i></i>放入购物车</button></div>
      </li>
    </ul>
    <div v-show="!list" style="text-align: center;line-height: 80px;">暂无商品</div>
    <div style="width: 100%;height: 50px;text-align: center;margin-bottom: 30px;" v-show="list">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalNum"
        :current-page.sync="pageNo"
        :page-size="pageSize">
      </el-pagination>
    </div>
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
import leftSort from './leftSort/leftSort'
export default {
  name: 'productList',
  components: {
    leftSort
  },
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
      sortList: [
        {
          name: '药食同源',
          isSubShow: false,
          subItems: [
            {
              name: '五味子'
            },
            {
              name: '大黄'
            },
            {
              name: '枸杞'
            }
          ]
        },
        {
          name: '养生汤料',
          isSubShow: false,
          subItems: [
            {
              name: '汤料1'
            },
            {
              name: '汤料2'
            },
            {
              name: '汤料3'
            }
          ]
        }
      ],
      sort: '',
      subSort: '',
      sortName: ''
    }
  },
  created () {
    this.getParams()
    this.getProList(1)
  },
  mounted () {

  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.searchCont
      // 将数据放在当前组件的数据内
      this.productName = routerParams
      this.sort = this.$route.query.sort
      this.subSort = this.$route.query.subSort
      this.sortName = this.$route.query.sortName
    },
    toProDetail: function (productId) {
      this.$router.push({path: '/productDetail', query: {productId: productId}})
    },
    handleCurrentChange: function (val) {
      this.getProList(val)
    },
    getProList: function (pageNo) {
      if (!this.$store.state.userId) {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({ path: '/login' })
        return
      }
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('priceSort', this.priceSort);
      params.append('salesSort', this.salesSort);
      if (this.productName) {
        params.append('productName', this.productName);
      }
      if (this.sortName === '商品分类') {
        if (this.sort) {
          params.append('fatherCate', this.sort);
          params.append('childCate', this.subSort);
        }
      } else {
        if (this.sort) {
          params.append('fatherEfectCate', this.sort);
          params.append('childEfectCate', this.subSort);
        }
      }
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
          _this.cateSubList = data.obj.cateSubList
        }
      })
    },
    addToCollect: function (id) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('collectId', id);
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
          _this.getProList(1)
        }
      })
    },
    cancelCollect: function (id) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('collectId', id);
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
          _this.getProList(1)
        }
      })
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
    },
    showToggle: function (item) {
      item.isSubShow = !item.isSubShow
    }
  },
  watch: {
    $route: {
      handler: function (val) {
        console.log(val);
        this.getParams()
        this.getProList(1)
      }
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
        height: auto;
        float: left;
      }
      div{
        margin-left: 230px;
        h1{
          color: #030303;
          font-size: 22px;
          line-height: 40px;
          margin-bottom: 60px;
          font-weight: 100;
        }
        p{
          font-size: 16px;
          color: #a5a5a5;
        }
      }
    }
  }
  .goodsList1{
    width:100%;
    @media screen and (max-width: 1150px){
      width:520px;
    }
    height: auto;
    margin: 0 auto;
    li{
      cursor: pointer;
      width:214px;
      margin-right:15px;
      @media screen and (max-width: 1150px){
        width:144px;
        margin-right:10px;
      }
      margin-bottom: 34px;
      float: left;
      &:nth-child(4n+4){
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
  .conditions1{
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
  .pList{
    width:1150px;
    margin: 0 auto;
    @media screen and (max-width: 1150px){
      width:760px;
    }
  }
  .pList_lf{
    width:220px;
    float: left;
    box-sizing: border-box;
    border:1px solid #ccc;
  }
  .pList_rg{
    width:70%;
    width:calc(100% - 240px);
    float: left;
  }
  .firstUl{
    width:100%
  }
  .firstLi{
    width:100%;
    height:auto;
    line-height: 50px;
    cursor: pointer;
    box-sizing: border-box;
    p{
      padding: 0 15px;
    }
    &:nth-child(2n+2){
     background: #f5f5f5;
    }
  }
  .secondLi{
    padding: 0 15px;
    border-top:1px dashed #ccc;
    background: #fff;
    &:first-child{
      border-top:none
    }
  }
</style>

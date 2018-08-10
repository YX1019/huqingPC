<template>
  <div class="store" style="border-top:1px solid #e70012;">
    <div class="shopName"><div class="shopNameCont"><img src="../common/img/shopIcon.png"/><span>胡庆余堂滨江店</span></div> </div>
    <div class="clearfix pList">
    <div class="pList_lf">
     <img src="../common/img/shopLogo.png"/>
      <h4>胡庆余堂滨江店</h4>
      <p>营业时间：9:00-21:00</p>
      <p>店铺地址：杭州市滨江区伟业路1号</p>
      <p>联系电话：0571-8888888</p>
      <div class="collectShop"><i class="iconfont collectIcon" v-show="!isCollect" @click="addToCollect(teamId, '1')">&#xe618;</i><i class="iconfont collectIcon" :class="{'collectRed': isCollect}" v-show="isCollect" @click="cancelCollect(teamId, '1')">&#xe694;</i><span :class="{'collectRed': isCollect}">收藏本店</span></div>
    </div>
    <div class="pList_rg">
      <div class="shopItem">
        <div class="conditions2" >商家推荐</div>
         <ul class="goodsList2 clearfix" v-show="list">
            <li v-for =" item in goodsList" :key="item.productId">
               <div @click="toProDetail(item.productId);">
                 <img :src="item.imgList"/>
                 <p>{{item.productName}}</p>
                 <h5>￥{{item.productPrice}}元</h5>
                 <h6><s>￥{{item.oldPrice}}元</s><span class="rg">月售{{item.mounthSales}}件</span></h6>
               </div>
               <div><button @click="addToCollect(item.productId, '0')" v-if="!item.collectionFlg"><i></i>加入收藏</button><button v-if="item.collectionFlg" @click="cancelCollect(item.productId, '0')"><i></i>取消收藏</button><button class="rg" @click="toProDetail(item.productId);"><i></i>放入购物车</button></div>
            </li>
         </ul>
         <div v-show="!list" style="text-align: center;line-height: 80px;">暂无商品</div>
       </div>
      <div class="shopItem">
        <div class="conditions2" >商家服务</div>
        <ul class="goodsList2 clearfix" v-show="list">
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
export default {
  name: 'productList',
  data () {
    return {
      goodsList: [],
      errorBox: false,
      errMsg: '',
      list: true,
      isCollect: false,
      teamId: ''
    }
  },
  created () {
    this.getParams()
    this.getProList()
    this.queryMerchantDetails()
  },
  mounted () {

  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.teamId
      // 将数据放在当前组件的数据内
      this.teamId = routerParams
      console.log(this.teamId)
    },
    toProDetail: function (productId) {
      this.$router.push({path: '/productDetail', query: {productId: productId}})
    },
    getProList: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
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
          _this.goodsList = data.listObject
          if (_this.goodsList.length === 0) {
            _this.list = false
          } else {
            _this.list = true
          }
        }
      })
    },
    queryMerchantDetails: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('teamId', this.teamId);
      this.axios({
        method: 'post',
        url: this.url.api.queryMerchantDetails,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
        }
      })
    },
    addToCollect: function (id, type) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('collectId', id);
      params.append('collectType', type);
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
    cancelCollect: function (id, type) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('collectId', id);
      params.append('collectType', type);
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
  .goodsList2{
    width:100%;
    border:1px solid #ccc;
    box-sizing: border-box;
    padding: 20px 30px;
    @media screen and (max-width: 1150px){
      width:520px;
    }
    height: auto;
    margin: 0 auto;
    li{
      box-sizing: content-box;
      cursor: pointer;
      width:200px;
      margin-right:15px;
      @media screen and (max-width: 1150px){
        width:130px;
        margin-right:10px;
      }
      margin-bottom: 34px;
      float: left;
      &:nth-child(4n+4){
        margin-right: 0;
      }
      img{
        width:100%;
        height: 200px;
        @media screen and (max-width: 1150px){
          height:130px;
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
  .conditions2{
    margin: 30px auto 0 auto;
    border:1px solid #ddd;
    padding: 0 30px;
    font-size:18px;
    box-sizing: border-box;
    background: #f5f5f5;
    position: relative;
    height: 60px;
    line-height: 60px;
    color: #da0004;
    border-bottom: 0;
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
  .pList,.shopNameCont{
    width:1150px;
    margin: 0 auto;
    @media screen and (max-width: 1150px){
      width:760px;
    }
  }
  .pList_lf{
    width:220px;
    float: left;
    margin-right: 15px;
    box-sizing: border-box;
    border:1px solid #ccc;
    margin-top: 30px;
    background: #f4f4f4;
    margin-bottom: 100px;
    img{
      display: block;
      margin: 20px auto 10px auto;
      width:48%;
    }
    h4{
      text-align: center;
      font-size: 16px;
      color: #df0000;
      font-weight: 100;
      margin-bottom: 35px;
    }
    p{
      color: #4d4d4d;
      line-height: 35px;
      font-size: 14px;
      padding: 0 10px;

    }
  }
  .pList_rg{
    width:70%;
    width:calc(100% - 240px);
    float: left;
    margin-bottom: 50px;
  }
 .shopName{
   width: 100%;
   height: 130px;
   background: url(../common/img/shopNameBg.jpg) repeat-x;
   background-size: cover;
   font-size: 30px;
   color: #fff;
   line-height: 130px;
   font-weight: 100;
   img{
     float: left;
     margin-top: 42px;
     margin-right: 10px;
   }
 }
.collectShop{
  margin: 45px auto 180px auto;
  width:160px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  background: #fff;
  border-radius: 3px;
  color: #333;
  font-size: 18px;
  border:1px solid #ccc;
}
  .collectIcon{
    font-size:20px;
    margin-right: 5px;
  }
  .collectRed{
    color: #da0004;
  }
</style>

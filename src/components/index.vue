<template>
<div>
  <div class="banner">
  <el-carousel :height="bannerHeight + 'px'">
    <el-carousel-item v-for="item in bannerList" :key="item.bannerImg">
      <img :src="item.bannerImg" style="width:100%;display: block;"/>
    </el-carousel-item>
  </el-carousel>
  </div>
  <img src="../common/img/line2.png" class="hqLine"/>
  <div class="profile">
    <h1 class="title">胡庆余堂</h1>
    <div class="profileCont clearfix">
      <div class="pro_lf"><div class="part1"><img src="../common/img/img1.jpg"/></div><div class="part2"><img src="../common/img/img2.jpg"/><img src="../common/img/img3.jpg"/></div> </div>
      <div class="pro_rg">
        <h2>始于1974年</h2>
        <p> "江南药王"胡庆余堂，系清末"红顶商人"胡雪岩于公元一八七四年(清同治十三年)创建，地处杭州历史文化街区清河坊，
          是国内保存最完好的晚清工商型古建筑群，系徽派建筑风格之典范。整个建筑形制宛如一只仙鹤，栖居于吴山脚下，寓示"长寿"。
          恢宏的建筑，辉煌的大厅，精湛的雕刻，以及它特立独行的经营格局至今风貌犹存</p>
        <p>一百四十多年过去了，胡庆余堂国药号始终秉承"戒欺"祖训、"真不二价"的经营方针，已成为保护、继承、发展、传播祖国五千年中药文化精萃的重要场所，是杭州人文历史文化不可或缺的重要组成部分。</p>
        <p>胡雪岩开创的经营之道、经营技巧以及胡庆余堂百余年沉淀的深遂中药文化，也多有著书立说或拍成电视剧广于颂扬称道。</p>
        <p>1988年胡庆余堂被国务院定为全国重点文物保护单位、2002年，胡</p>
      </div>
    </div>
  </div>
  <div class="newsPart">
    <h1 class="title">新闻通知</h1>
    <div class="newsCont">
    <el-carousel :interval="4000" type="card" height="320px" arrow="always">
      <el-carousel-item v-for="item in newsBannerList" :key="item.knowId">
        <div class="newsItem">
          <div class="newsItemLf"><h1>{{item.title}}</h1><h3>{{item.subTitle}}</h3><p>{{item.time}}</p></div>
          <div class="newsItemRg"><img :src="item.imgList[0]"/></div>
        </div>
      </el-carousel-item>
    </el-carousel>
    </div>
  </div>
  <div class="knowledgePart">
    <h1 class="title">养生知识</h1>
    <div class="KnowCont">
      <div class="v_out v_out_p">
        <div class="v_show">
          <div class="v_cont">
            <ul>
              <li v-bind:index="index" v-for="(item,index) in knowBannerList" :key="item.knowId"><img :src="item.imgList[0]"/><p>{{item.title}}</p></li>
              <!--<li index="1" style="background:#ff0">[第2讲]</li>-->
              <!--<li index="2" style="background:#f0f">[第3讲]</li>-->
              <!--<li index="3" style="background:#999">[第4讲]</li>-->
              <!--<li index="4" style="background:#666">[第5讲]</li>-->
            </ul>
          </div>
        </div>
        <div style="width:200px;margin:0 auto;text-align:center;">
          <div class="prev" @click="prev()">
            <a href="javascript:void(0)"><i class="iconfont">&#xe629;</i></a>
          </div>
          <ul class="circle">
            <li @click="toAnypage(index)" v-for="(item,index) in knowBannerList" :class="{'circle-cur':index==isActive}" :key="item.knowId"></li>
            <!--<li @click="toAnypage()">2</li>-->
            <!--<li @click="toAnypage()">3</li>-->
            <!--<li @click="toAnypage()">4</li>-->
            <!--<li @click="toAnypage()">5</li>-->
          </ul>
          <div class="next" @click="next()">
            <a href="javascript:void(0)"><i class="iconfont">&#xe62a;</i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="productPart">
    <h1 class="title">精选商品</h1>
    <div class="productCont">
    <ul class="productList clearfix">
      <li v-for="item in pickGoodsList" :key="item.productId">
        <div class="proItem">
        <div class="proImg"><img :src="item.listImg"/></div>
        <h4>{{item.productName}}</h4>
        <h5>￥{{item.amount}}</h5>
        <p>月售{{item.mounthCount}}<span class="joinCart"><i class="iconfont">&#xe887;</i></span></p>
        <a>立即购买</a>
        </div>
      </li>
    </ul>
      <div style="width: 100%;height: 50px;float: left;text-align: center;position: relative;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPages"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="pageSize"
        >
        </el-pagination>
        <span class="lookMore" @click="toStore();">查看更多>></span>
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
import {next, prev, toAnypage} from '../../static/js/silder'
export default {
  name: 'index',
  data () {
    return {
      bannerHeight: '300',
      bannerList: [
        {bannerImg: require('../common/img/banner1.jpg')},
        {bannerImg: require('../common/img/banner2.jpg')}
      ],
      isActive: 0,
      errorBox: false,
      errMsg: '',
      newsBannerList: [{
        'title': 'JAVA实战基础',
        'subTitle': '副标题',
        'imgList': [
          'http://39.104.50.94:8090/images/1520668515669061.jpg',
          'http://39.104.50.94:8090/images/1520668515669061.jpg'
        ],
        'time': '2018.06.28'
      }],
      knowBannerList: [{
        'title': 'JAVA实战基础',
        'subTitle': '副标题',
        'imgList': [
          'http://39.104.50.94:8090/images/1520668515669061.jpg',
          'http://39.104.50.94:8090/images/1520668515669061.jpg'
        ],
        'time': '2018.06.28'
      }],
      pickGoodsList: [ {
        'productId': '002',
        'listImg': 'http://39.104.50.94:8090/images/1520668515669061.jpg',
        'productName': '测试二号',
        'amount': '101',
        'oldAmount': '101',
        'reduceStr': '1折',
        'saleCount': 0,
        'mounthCount': 0
      }],
      totalPages: 0,
      pageNo: 1,
      pageSize: 6
    }
  },
  created () {
    this.getBanner()
    this.getNewsBanner(1)
    this.getNewsBanner(2)
    this.getPickGoods(1)
  },
  mounted () {
    this.setSize()
    const that = this
    window.addEventListener('resize', function () {
      that.screenWidth = window.screen.availWidth
      that.setSize()
    }, false)
    this.$nextTick(function () {
    })
  },
  methods: {
    setSize: function () {
      this.bannerHeight = 486 * this.screenWidth / 1920
    },
    next: function () {
      next()
    },
    prev: function () {
      prev()
    },
    toAnypage: function (index) {
      this.isActive = index
      toAnypage()
    },
    getBanner: function () {
      this.axios.get(this.url.api.bannerQuery, {params: {bannerPosition: 0, status: 'ENABLED'}}).then(res => {
        let data = res.data
        if (!data.bizSucc) {
          this.errMsg = data.errMsg
          this.errorBox = true
        } else {
          this.bannerList = data.obj
        }
      }).catch(error => console.log(error))
    },
    getNewsBanner: function (type) {
      this.axios.get(this.url.api.knowledgeQuery, {params: {type: type, pageNo: 1, pageSize: 5}}).then(res => {
        let data = res.data
        if (!data.bizSucc) {
          this.errMsg = data.errMsg
          this.errorBox = true
        } else {
          if (type === 1) {
            this.newsBannerList = data.listObject
          } else {
            this.knowBannerList = data.listObject
          }
        }
      }).catch(error => console.log(error))
    },
    toStore: function () {
      this.$router.push({ path: '/store' })
    },
    getPickGoods: function (pageNo) {
      this.axios.get(this.url.api.pickGoods, {params: {pageNum: pageNo, pageSize: this.pageSize, type: 2}}).then(res => {
        let data = res.data
        if (!data.bizSucc) {
          this.errMsg = data.errMsg
          this.errorBox = true
        } else {
          console.log(data)
          this.pickGoodsList = data.listObject
          this.totalPages = parseInt(data.totalItems)
        }
      }).catch(error => console.log(error))
    },
    handleCurrentChange (val) {
      var pageNum = val
      this.getPickGoods(pageNum)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #e60012;
  }
  $pageWidth:1150px;
  .banner{
  .el-carousel__button{
    width:10px;
    height: 10px;
    border-radius: 50%;
  }
  }
  .hqLine{
    width: 100%;
    height: auto;
    display: block;
  }
  .profile{
    overflow: hidden;
    width:100%;
    height: auto;
    background: url(../common/img/proBg.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .title{
    width:254px;
    height: 74px;
    margin: 60px auto;
    background: url(../common/img/titleBg.png) no-repeat;
    background-size: 100% 100%;
    font-size:30px;
    color: #fff;
    text-align: center;
    line-height: 74px;
    font-weight: 100;
  }
  .profileCont{
    width:$pageWidth;
    height:auto;
    box-sizing: border-box;
    padding: 20px;
    background: #d5cab6;
    margin: 0 auto 120px auto;
    @media screen and (max-width: 1500px){
      width:815px;
    }
  }
  .pro_lf,.pro_rg{
    float: left;
    width:50%;
  }
  .part1{
    float: left;
    width:34%;
    height: auto;
    margin-right: 8px;
    img{
      width:100%;
    }
  }
  .part2{
    float: left;
    width:63%;
    height:auto;
    img{
      display: block;
      &:first-child{
        margin-bottom: 8px;
      }
      width:100%;
    }
  }
  .pro_rg{
    box-sizing: border-box;
    padding-left: 35px;
    @media screen and (max-width: 1500px){
      padding-left: 20px;
    }
    h2{
      font-size: 30px;
      color: #000;
      line-height:64px;
      margin-bottom: 10px;
      font-weight: 100;
      @media screen and (max-width: 1500px){
        font-size: 22px;
        line-height:48px;
        margin-bottom: 5px;
      }
    }
    p{
      text-indent: 2em;
      font-size: 18px;
      color: #0e0e0e;
      @media screen and (max-width: 1500px){
        font-size: 13px;
        line-height: 17px;
      }

    }
  }
  .newsPart{
    width:100%;
    height: auto;
    background: url(../common/img/newsBg.jpg) repeat-y;
    overflow: hidden;
    padding-bottom: 80px;
  }
  .knowledgePart{
    width:100%;
    height: auto;
    background: url(../common/img/knowBg.jpg) repeat-y;
    overflow: hidden;
    padding-bottom: 20px;
  }
  .KnowCont{
    width:1100px;
    margin: 0 auto;
  }
  .productPart{
    width:100%;
    height: auto;
    background: url(../common/img/newsBg.jpg) repeat-y;
    overflow: hidden;
    padding-bottom: 20px;
  }
  .newsItem{
     box-sizing: border-box;
    padding: 70px 20px;
  }
  .newsItemLf,.newsItemRg{
    float: left;
    width:50%;
  }
  .newsItemRg img{
    max-width:100%;
    max-height: 200px;
  }
  .newsItemLf {
    color: #151515;
    h1{
    font-size: 24px;
      margin-bottom: 25px;
    }
    h3{
      font-size: 18px;
      margin-bottom: 45px;
    }
    p{
      font-size: 14px;
      color: #bcbcbc;
    }
  }
  .newsCont{
    width:1150px;
    margin:0 auto;
    @media screen and (max-width: 1150px){width:760px;}
    .el-carousel__mask{
      background: rgba(238,235,230,0.8);
    }
    .el-carousel__item{
      background: rgba(238,235,230,0.8);
      &.is-active{
        background: #fff;
      }
    }
    .el-carousel__arrow{
      background: rgba(0,0,0,0.2);
      width:50px;
      height: 50px;
      border-radius: 0;
      display: block;
    }
  }
  .productCont{
    width:$pageWidth;
    @media screen and (max-width: 1150px){width:760px;}
    height: auto;
    margin: 0 auto;
  }
  .productList{
    width:100%;
    height:auto;
    float: left;
    li{
      width:350px;
      height: 424px;
      @media screen and (max-width: 1150px){width: 230px;height: 320px;margin-right: 10px;}
      background:url('../common/img/productBg.png') no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      float: left;
      margin-right: 50px;
      margin-bottom: 50px;
      &:nth-child(3n){
        margin-right: 0;
      }
    }
  }
  .proItem{
    width:79%;
    margin:10% 10% 0 10%;
    .proImg{
      width:100%;
      height: 190px;
      @media screen and (max-width: 1150px){height:135px;}
      background: #fff;
      overflow:hidden;
      text-align: center;
      img{
        width:100%;
        height: 100%;
      }
    }
    h4{
      font-size: 22px;
      color: #313131;
      line-height: 35px;
      font-weight: 100;
      padding-left: 10px;
      margin-top: 10px;
      @media screen and (max-width: 1150px){font-size: 16px;line-height: 25px;}
    }
    h5{
      font-size: 22px;
      color: #e60012;
      line-height: 40px;
      font-weight: 100;
      padding-left: 10px;
      @media screen and (max-width: 1150px){font-size: 16px;line-height: 25px;}
    }
    p{
      font-size: 14px;
      color: #959595;
      padding-left: 10px;
      position: relative;
    }
    a{
      display: block;
      font-size: 20px;
      color: #ffffff;
      background: #e60012;
      width: 130px;
      height:32px;
      line-height:32px;
      text-align: center;
      margin:7px auto 10px auto;
      border-radius: 10px;

    }
  }
.joinCart{
  position: absolute;
  right:10px;
  top:-25px;
  background: #e60012;
  display: block;
  width:40px;
  height:40px;
  font-size:20px;
  color: #fff;
  line-height:40px;
  border-radius: 50%;
  text-align: center;
  .iconfont{
    font-size: 23px;
    line-height: 44px;
  }
}
  .lookMore{
    position: absolute;
    top:0;
    right: 0;
    display: block;
    font-size: 12px;
    color: #1b1b1b;
    width:90px;
    height:32px;
    text-align: center;
    line-height: 32px;
    background: #fff;
    border-radius: 3px;
    @media screen and (max-width: 1150px) {
      right: 75px;
    }
  }
  .swiper-slide img{
    width:100%;
  }
  /**{margin:0px;padding:0px;list-style-type:none;}*/
  .v_out{width:1150px;margin:20px auto;overflow:hidden;}
  .v_show{width:1150px;overflow:hidden;position:relative;height:310px;float:left;}
  .v_cont{ width:6650px;position:absolute;left:0px;top:0px;}
  .v_cont ul{float:left;text-align:center;line-height:50px;}
  .v_cont ul li{width:358px;height:245px;background:#f8f8f8;float:left;margin-right: 38px;}
  @media screen and (max-width: 1150px){
    .v_out{width: 760px;}
    .v_show{width: 760px;height: 210px;}
    .v_cont ul li{width:236px;height: 162px;}
  }
  .v_cont ul li img{width:100%;height: auto;}
  .v_cont ul li p{line-height: 30px;}
  /*---圆圈---*/
  .v_out_p{position:relative;overflow:visible}
  .circle li{width:15px;height:15px;float:left;margin-right:10px;background:#ccc;border-radius: 50%;}
  .circle .circle-cur{background:#d00000}
  .circle{float: left;margin-top: 7px;}
  /*---切换---*/
  .prev,.next{float:left;}
  .prev{margin-right: 10px;}
  .prev,.prev a,.next,.next a{width:21px;height:28px; display:block;text-align: center;color: #ccc5bf;}
  .prev a i,.next a i{font-size: 28px;}
</style>

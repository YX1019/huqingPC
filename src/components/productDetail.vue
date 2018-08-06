<template>
<div class="proDetail">
  <h4>您现在的位置：首页>养生汤料>补血补气>桃红四物汤</h4>
  <div class="proTop clearfix">
  <div class="proLf">
    <div class="goods_img">
      <div class="gimg" id="1">
        <!--<img :src="item" width="300" height="300" v-for="item in headImgList" :key="item"/>-->
        <img :src="item" width="300" height="300" v-for="item in headImgList" :key="item"/>
        <!--<img src="" width="300" height="300" />-->
      </div>
      <div id="showsum" class="showsum" ></div>
      <!--展示图片里边-->
      <p class="showpage">
        <a href="javascript:void(0);" id="showlast" class="showlast"> &lt; </a>
        <a href="javascript:void(0);" id="shownext" class="shownext"> &gt; </a>
      </p>

    </div>
  </div>
  <div class="proMid">
   <h1>{{obj.productName}}</h1>
    <div class="proPrice">
      <p>价格<span class="p_newPrice">{{obj.productPrice}}</span></p>
      <p>原价<span class="p_oldPrice">{{obj.oldPrice}}</span></p>
    </div>
    <h5>累计销量<span class="red">{{obj.sales}}</span></h5>
    <div class="sortItem" v-for="(item,index) in attrAndValuees" :key="item.attrId"><span>{{item.attrName}}:</span>
      <ul><li v-for="(itemm,ind) in item.valuees" :key="itemm.attrId" :class="{'cur':sel[index] == ind}" @click="select(index,ind)" class="hand" >{{itemm.value}}</li></ul>
    </div>
    <p>数量: <button @click="changeNum(-1)" class="hand">-</button><input type="text" v-model="num"/><button @click="changeNum(1)" class="hand">+</button> 剩余{{goodsNum}}</p>
    <p><a class="proBtn1 hand" @click="addCart(0)">立即购买</a><a class="proBtn2 hand" @click="addCart(1)">加入购物车</a><a class="proBtn3 hand" v-show="!collectionFlg" @click="addToCollect(obj.productId)">收藏</a><a class="proBtn3 hand" v-show="collectionFlg" @click="cancelCollect(obj.productId)">取消收藏</a></p>
  </div>
  <div class="proRg">
    <h5>胡庆余堂滨江店</h5>
    <p>联系电话：0571-2222222</p>
    <p>地址：杭州市滨江区2号</p>
  </div>
  </div>
  <div class="proBottom clearfix">
    <div class="proBtm_lf">
      <ul>
        <li v-for="item in 8" :key="item">药食同源</li>
      </ul>
    </div>
    <div class="proBtm_rg">
      <h3>商品名称：桃红四物汤<span>重量：0.25kg</span>体积：0.00m³</h3>
      <h5>桃红四物汤为调经要方之一，是《玉机微义》转引的《医垒元戎》中的一个方子，也称加味四物汤，桃红四物汤这一方名始于见《医宗金鉴》。该方由四物汤加味桃仁、红花而成，功效为养血活血。现代研究表明，桃红四物汤具有扩张血管、抗炎、抗疲劳、抗休克、调节免疫功能、降脂、补充微量元素、抗过敏等作用。</h5>
    <ul class="proBtmListName">
      <li class="cur">商品详情</li>
      <li>售后服务</li>
      <li>用户评价</li>
    </ul>
      <div class="proBtmCont" v-html="obj.imgDetails">
        桃红四物汤为调经要方之一，是《玉机微义》转引的《医垒元戎》中的一个方子，也称加味四物汤，桃红四物汤这一方名始于见《医宗金鉴》。该方由四物汤加味桃仁、红花而成，功效为养血活血。现代研究表明，桃红四物汤具有扩张血管、抗炎、抗疲劳、抗休克、调节免疫功能、降脂、补充微量元素、抗过敏等作用。
      </div>
      <div class="proComment">
        <h1>商品评价</h1>
        <div class="commentCont">
          <div class="clearfix">
          <div class="commentLf"><p>与描述相符</p><h2>5.0</h2></div>
          <div class="commentRg"><img src="../common/img/grade.jpg"/> </div>
          </div>
          <ul class="commentList clearfix">
            <li v-for="item in commentList" :key="item.commnetUserId"><div class="comList_lf">{{item.commentWord}}</div><div class="comList_rg"><h6>{{item.nickName}}</h6><p>{{item.dateStr}}</p></div></li>

          </ul>
          <div style="width: 100%;height: 50px;text-align: center;margin-top: 30px;">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              :page-size="pageSize">
            </el-pagination>
          </div>
        </div>
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
  name: '',
  data () {
    return {
      productId: '',
      errorBox: false,
      errMsg: '',
      selected: -1,
      selectItem: {},
      headImgList: [],
      obj: {},
      idString: '',
      goodsNum: 0,
      priceStocks: [],
      commentList: [],
      attrAndValuees: [
        {
          'attrId': 1,
          'attrName': '味道',
          'valuees': [
            {
              'attrId': 1,
              'value': '橘子味'
            },
            {
              'attrId': 2,
              'value': '草莓味'
            }
          ]
        },
        {
          'attrId': 2,
          'attrName': '容量',
          'valuees': [
            {
              'attrId': 4,
              'value': '100ml'
            },
            {
              'attrId': 6,
              'value': '300ml'
            }
          ]
        }],
      sel: [],
      id: [],
      options: [],
      num: 1,
      stockId: '',
      collectionFlg: false,
      pageSize: 10,
      total: 5,
      pageNo: 1
    }
  },
  beforeCreated () {
  },
  created () {
    this.goTop()
    this.getParams()
    this.getProDetail()
    this.queryEvaluate()
    console.log(this.headImgList)
  },
  mounted () {
    this.$nextTick(function () {
    })
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.productId
      // 将数据放在当前组件的数据内
      this.productId = routerParams
      console.log(this.productId)
    },
    getProDetail: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('productId', _this.productId);
      this.axios({
        method: 'post',
        url: this.url.api.queryProductDetails,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          // _this.totalNum = data.totalItems
          console.log(data)
          _this.obj = data.obj
          _this.headImgList = data.obj.headImgList
          console.log(_this.headImgList)
          _this.attrAndValuees = data.obj.attrAndValuees
          _this.priceStocks = data.obj.priceStocks
          _this.goodsNum = data.obj.stock
          _this.collectionFlg = data.obj.collectionFlg
        }
      })
    },
    pcGlasses: function () {
      var showproduct = {
        'boxid': '1',
        'sumid': 'showsum',
        'boxw': 300, // 宽度,该版本中请把宽高填写成一样
        'boxh': 300, // 高度,该版本中请把宽高填写成一样
        'sumw': 60, // 列表每个宽度,该版本中请把宽高填写成一样
        'sumh': 60, // 列表每个高度,该版本中请把宽高填写成一样
        'sumi': 5, // 列表间隔
        'sums': 3, // 列表显示个数
        'sumsel': 'sel',
        'sumborder': 1, // 列表边框，没有边框填写0，边框在css中修改
        'lastid': 'showlast',
        'nextid': 'shownext'

      }// 参数定义
      $.ljsGlasses.pcGlasses(showproduct) // 方法调用，务必在加载完后执行
    },
    goTop: function () {
      window.scrollTo(0, 0);
    },
    select: function (index, ind) {
      this.sel[index] = ind; // 让数组sel的第index+1的元素的值等于ind
      this.sel = this.sel.concat([]); // 因为数组是引用类型，对其中一个变量直接赋值不会影响到另一个变量（并未操作引用的对象），使用concat（操作了应用对象）
      this.id[index] = this.attrAndValuees[index].valuees[ind].attrId; // 获取选中的id
      this.id = this.id.concat([]);
      var idArr = []
      for (var i = 0; i < this.id.length; i++) {
        if (typeof (this.id[i]) !== 'undefined') {
          idArr.push(this.id[i])
        }
      }
      this.idString = idArr.join(',')
      console.log(this.id, this.sel, this.idString);
      for (let i = 0; i < this.priceStocks.length; i++) {
        if (this.idString === this.priceStocks[i].valueIds) {
          this.goodsNum = this.priceStocks[i].stock
          this.stockId = this.priceStocks[i].stockId
          return
        }
      }
    },
    changeNum: function (way) {
      if (way > 0) {
        this.num++
      } else {
        this.num--
        if (this.num < 1) {
          this.num = 1
        }
      }
    },
    addCart: function (type) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('productId', this.productId);
      params.append('productNum', this.num);
      params.append('stockId', this.stockId);
      this.axios({
        method: 'post',
        url: this.url.api.addCart,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          let goodsNum = _this.$store.state.goodsNum
          var goodsNum1 = parseInt(goodsNum) + 1
          console.log(goodsNum, goodsNum1)
          window.localStorage.setItem('goodsNum', goodsNum1)
          _this.$store.commit('changeGoodsNum', goodsNum1)
          if (type === 1) {
            _this.$message({
              showClose: true,
              message: '成功加入购物车',
              type: 'success',
              duration: 1000
            });
          } else {
            _this.$router.push({path: '/shopcart'})
          }
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
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.collectionFlg = true
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
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.collectionFlg = false
        }
      })
    },
    queryEvaluate: function (pageNum) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('linkId', this.productId);
      params.append('type', 1);
      params.append('pageNum', pageNum);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.queryEvaluate,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.total = data.totalItems
          _this.commentList = data.listObject
        }
      })
    },
    handleCurrentChange (val) {
      var pageNum = val
      this.queryEvaluate(pageNum)
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams',
    headImgList: function () {
      this.$nextTick(function () {
        this.pcGlasses()
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.proDetail{
  width:1150px;
  @media screen and (max-width: 1150px){
    width:900px;
  }
  height:auto;
  margin: 0 auto 100px auto;
  box-sizing: border-box;
  h4{
    font-size:14px;
    font-weight: 100;
    padding: 22px 0 12px 0;
    color: #131313;
    border-bottom: 1px dashed #eee;
  }
}
  .proTop{
    width:100%;
    height: auto;
    margin-top: 20px;
  }
  .proLf{
    width:330px;
    height: 330px;
    @media screen and (max-width: 1150px){
      width:305px;
      height:305px;
    }
    float: left;
  }
  .proMid{
    width:calc(100% - 660px);
    @media screen and (max-width: 1150px){
      width:calc(100% - 600px);
    }
    float: left;
    margin: 0 25px;
    h1{
      font-size: 20px;
      color: #131313;
      margin-bottom: 20px;
    }
    h5{
      font-size: 16px;
      color: #737373;
      font-weight: 100;
      margin-bottom: 20px;
    }
    p{
      font-size: 16px;
      margin-bottom: 20px;
      button{
        box-sizing: border-box;
        border:1px solid #ccc;
        background: #fff;
        width:20px;
        height: 20px;
      }
      input{
        width:70px;
        height: 20px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        margin: 0 5px;
        text-align: center;
      }
    }
  }
  .proPrice{
    width:100%;
    padding: 20px 25px;
    background: url(../common/img/priceBg.jpg) no-repeat;
    p{
      font-size: 14px;
      color: #5e5e5e;
      margin-bottom: 10px;
    }
  }
  .p_newPrice{
    font-size: 30px;
    color: #e60c0c;
    margin-left: 45px;
  }
.p_oldPrice{
  text-decoration: line-through;
  margin-left: 45px;
}
  .proRg{
    width:200px;
    height:auto;
    float: left;
    @media screen and (max-width: 1150px){
      float: right;
    }
    box-sizing: border-box;
    border:1px solid #ddd;
    padding: 0 10px;
    min-height: 355px;
    h5{
      font-size: 14px;
      color: #131313;
      line-height: 45px;
      border-bottom:1px solid #ddd;
    }
    p{
      padding-left: 10px;
      font-size: 12px;
      margin-top: 15px;
    }
  }
  .proBtn1,.proBtn2{
    width:175px;
    height:40px;
    @media screen and (max-width: 1150px){
      width:100px;}
    display: inline-block;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
.proBtn1{
  background: #ff6500;
}
.proBtn2{
  background: #e60c0c;
  margin: 0 20px;
}
.proBtn3{
  height:40px;
  display: inline-block;
  box-sizing: border-box;
  border:1px solid #ddd;
  line-height: 40px;
  padding: 0 5px;
}
  .proBottom{
    width:100%;
    height:auto;
    margin-top: 35px;
    @media screen and (max-width: 1150px){
      margin-top:40px;}
  }
  .proBtm_lf{
    width:225px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    float: left;
    li{
      width:100%;
      box-sizing: border-box;
      padding: 0 15px 0 25px;
      height:55px;
      line-height: 55px;
      font-size: 16px;
      &:nth-child(2n+2){
        background: #f5f5f5;
      }
    }
  }
  .proBtm_rg{
    position: relative;
    margin-left: 250px;
    top:0;
    h3{
      width:100%;
      box-sizing: border-box;
      height: 50px;
      line-height:50px;
      padding: 0 25px;
      font-size: 14px;
      font-weight: 100;
      border:1px solid #ddd;
      margin-bottom: 20px;
      span{
        margin: 0 190px 0 190px;
      }
    }
    h5{
      font-size: 14px;
      font-weight: 100;
      line-height: 30px;
      border-top: 1px solid #ddd;
      padding: 15px;
    }
  }
  .proBtmListName{
    width:100%;
    height: 30px;
    border-bottom: 1px solid #e60c0c;
    li{
      float: left;
      width:110px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      margin-right: 3px;
      box-sizing: border-box;
      border:1px solid #ddd;
      border-bottom: none;
      border-radius: 3px 3px 0 0;
      &.cur{
        color: #fff;
        background: #e60c0c;
        border:none;
      }
    }
  }
  .proComment{
    width:100%;
    height:auto;
    h1{
      width:110px;
      color: #e60c0c;
      font-size: 18px;
      font-weight: 100;
      border-bottom: 1px solid #e60c0c;
      margin-top: 30px;
      padding-left: 10px;
    }
  }
  .commentCont{
    width:100%;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ddd;
  }
  .commentLf{
    width:110px;
    float: left;
    padding: 30px;
    text-align:center;
    border-right: 1px dashed #ccc;
    h2{
      font-size: 36px;
      color: #ff6600;
      font-weight: 100;
    }
  }
.commentRg{
  float: right;
  img{
    @media screen and (max-width: 1150px){
      width:400px;
    }
  }
}
  .commentList{
    width:100%;
    height: auto;
    margin: 50px 0 30px 0;
    li{
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      width:100%;
      float: left;
    }
  }
  .comList_lf{
    float: left;
    font-size: 13px;
    width:80%;
  }
.comList_rg{
  float: right;
  font-size: 13px;
  h6{
    margin-bottom: 10px;
    font-weight: 100;
  }
  p{
    color: #ccc;
  }
}
.proBtmCont{
  font-size: 14px;
  line-height:28px;
}

.sortItem{
  width:100%;
  height: auto;
  margin-bottom: 10px;
  font-size: 12px;
  span{
    float: left;
    margin-right: 10px;
    font-size: 14px;
  }
  li{
    float: left;
    padding: 3px 5px;
    border:1px solid #ccc;
    margin-right: 5px;
    &.cur{
      border:1px solid #e60012;
      color: #e60012;
    }
  }
  &:after{
    display: table;
    content: '';
    clear: both;
  }
}
/*kk*/
.goods_img{width:302px;float: left;margin-right: 20px;}
.goods_info{width:678px;float: left;border-bottom: 1px solid #e5e5e5;}
.goods_info:last-child{border: none;}
.goods_img img{width: 300px;height: 300px;border: 1px solid #e6e6e6;}
.gimg span{background:url(../common/img/whitebg.png);}
.showsum { left:25px; margin-top:10px;}
.showsum span { border:1px solid #ddd;}
.showsum span.sel { border:1px solid #f60;}

.showpage { width:300px; position:relative;}
.showpage a { display:block; width:15px; border:1px solid #ddd; height:60px; line-height:60px; background:#eee; text-align:center; font-size:18px; position:absolute; left:0; top:-62px; text-decoration:none; color:#999;}
.showpage a.shownext { left:auto; right:0;}
.showpage a:hover { background:#ccc; color:#777;}

</style>

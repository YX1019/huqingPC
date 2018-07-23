<template>
<div class="proDetail">
  <h4>您现在的位置：首页>养生汤料>补血补气>桃红四物汤</h4>
  <div class="proTop clearfix">
  <div class="proLf">
    <div class="goods_img">
      <div class="gimg" id="1"><img src="../common/img/product.jpg" width="300" height="300" />
        <img src="../common/img/product.jpg" width="300" height="300" />
        <img src="../common/img/product.jpg" width="300" height="300" />
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
   <h1>桃红四物汤</h1>
    <div class="proPrice">
      <p>价格<span class="p_newPrice">4.5</span></p>
      <p>原价<span class="p_oldPrice">6.7</span></p>
    </div>
    <h5>累计销量<span class="red">10</span></h5>
    <p>数量: <button>-</button><input type="text" value="1"/><button>+</button> </p>
    <p><a class="proBtn1">立即购买</a><a class="proBtn2">加入购物车</a><a class="proBtn3">收藏</a></p>
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
      <div class="proBtmCont">
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
            <li><div class="comList_lf">怕上火让客服把熟地换成了生地，喝了不上火，不错</div><div class="comList_rg"><h6>白交互</h6><p>2016-02-11 12:00</p></div></li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {}
  },
  mounted () {
    function pcGlasses () {
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
    }
    pcGlasses()
  },
  methods: {}
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
    width:400px;
    height: 400px;
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
      margin-bottom: 45px;
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
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      width:100%;
      float: left;
    }
  }
  .comList_lf{
    float: left;
    font-size: 13px;
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

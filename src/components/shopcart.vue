<template>
<div class="shopCart clearfix">
  <h1><span>全部商品0</span></h1>
  <div class="noGoods" v-show="noGoods">
    <img src="../common/img/nogoods.png"/>
    <p>对不起，当前购物车为空</p>
    <a @click="toStore()">去商城逛逛</a>
  </div>
  <div class="goods" v-show="!noGoods">
    <h5 class="goodsTitle">
      <span>单价</span>
      <span>数量</span>
      <span>金额</span>
      <span>操作</span>
    </h5>
    <div class="goodsPart" v-for="item in cartList" :key="item.cartId">
    <div class="goodStore">
      <h4>
        <div class="hand lf">
          <img src="../common/img/storeIcon.png" class="storeIcon"/><span @click="showStore(item)">{{item.teamName}}<i class="iconfont">&#xe602;</i></span>
          <img src="../common/img/ticket.png" class="ticket"/></div>
        <span style="margin-left:15px;">运送方式<select  @change="chooseMothod(item)" class="kdWay" v-model="item.delivery"><option value="0">快递</option><option value="1">自提</option></select></span>
      </h4>
    </div>
    <div class="goodsItem">
      <div class="goodsItem1"><i class="checkIcon" :class="{checked:item.checked}" @click="selectedProduct(item)"></i> <img :src="item.productImg"/><span>{{item.productName}}</span></div>
      <div class="goodsItem2"><p v-for="itemm in item.attrValue" :key="itemm.attrName">{{itemm.attrName}}：{{itemm.values}}</p></div>
      <div class="goodsItem3"><p>￥299.00</p><p>￥{{item.price}}</p></div>
      <div class="goodsItem4"><button @click="updateCartSum(item, 0)">-</button><input type="text" v-model="item.productNum" readonly/><button @click="updateCartSum(item, 1)">+</button> </div>
      <div class="goodsItem5 red">￥{{item.price * item.productNum}}</div>
      <div class="goodsItem6"><p class="hand" @click="addToCollect(item.productId)">移入收藏夹</p><p @click="delCart(item.cartId)" class="hand">删除</p></div>
    </div>
    </div>
    <div class="goodsOpera">
      <i class="checkIcon" :class="{'checked':checkAllFlag}" @click="checkAll()"></i>全选
      <!--<span class="opera1 hand">删除</span>-->
      <!--<span class="hand">移入收藏夹</span>-->
      <span class="opera3" style="margin-left: 45%;">已选商品<span class="red">{{selectGoodsNum}}</span>件</span>
      <span class="opera4">合计（不含运费）:<span class="red">{{totalMoney | formatMoney}}</span></span>
      <a @click="createOrder()" :class="{'balance':isBanlance}">结算</a>
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
  <div class="storeBox" v-show="dialogVisible">
    <h2>店铺列表</h2>
    <ul class="storeList">
      <li @click="chooseStore(item)" v-for="item in storeLists" :key="item.teamId"><img src="../common/img/product.jpg"/><span>{{item.teamName}}</span> </li>
    </ul>
  </div>

</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      errorBox: false,
      errMsg: '',
      cartList: [],
      checkAllFlag: false,
      totalMoney: 0,
      selectGoodsNum: 0,
      isBanlance: false,
      noGoods: false,
      way: '快递',
      dialogVisible: false,
      storeLists: []
    }
  },
  filters: {
    formatMoney: function (value) {
      return '¥' + value.toFixed(2);
    }
  },
  created () {
    this.lookMyCart()
  },
  methods: {
    toStore: function () {
      this.$router.push({ path: '/store' })
    },
    lookMyCart: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      this.axios({
        method: 'post',
        url: this.url.api.myCart,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.cartList = data.obj
          var goodsNum = 0
          for (var i = 0; i < _this.cartList.length; i++) {
            goodsNum = parseInt(goodsNum) + parseInt(_this.cartList[i].productNum)
          }
          window.localStorage.setItem('goodsNum', data.obj.goodsNum)
          _this.$store.commit('changeGoodsNum', goodsNum)
          if (goodsNum === 0) {
            _this.noGoods = true
          } else {
            _this.noGoods = false
          }
        }
      })
    },
    delCart: function (cartId) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('cartId', cartId);
      this.$confirm('此操作将删除商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'post',
          url: this.url.api.delCart,
          data: params
        }).then(function (res) {
          let data = res.data
          if (!res.data.bizSucc) {
            _this.errMsg = data.errMsg
            _this.errorBox = true
          } else {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
            _this.lookMyCart()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateCartSum: function (item, sumType) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('cartId', item.cartId);
      params.append('sumType', sumType);
      this.axios({
        method: 'post',
        url: this.url.api.updateCartSum,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          if (sumType === 0) {
            if (item.productNum > 1) {
              item.productNum--
              let goodsNum = _this.$store.state.goodsNum
              var goodsNum1 = parseInt(goodsNum) - 1
              window.localStorage.setItem('goodsNum', goodsNum1)
              _this.$store.commit('changeGoodsNum', goodsNum1)
            }
          } else {
            item.productNum++
            let goodsNum = _this.$store.state.goodsNum
            var goodsNum2 = parseInt(goodsNum) + 1
            window.localStorage.setItem('goodsNum', goodsNum2)
            _this.$store.commit('changeGoodsNum', goodsNum2)
          }
          _this.calcTotalPrice()
        }
      })
    },
    selectedProduct: function (item) {
      if (typeof item.checked === 'undefined') {
        // Vue.set(item, "checked", true)
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
      this.isAllChecked()
      this.calcTotalPrice()
    },
    checkAll: function (flag) {
      if (this.checkAllFlag) {
        this.isBanlance = true
      } else {
        this.isBanlance = false
      }
      this.checkAllFlag = !this.checkAllFlag
      var _this = this;
      this.cartList.forEach(function (item) {
        if (typeof item.checked === 'undefined') {
          _this.$set(item, 'checked', _this.checkAllFlag)
        } else {
          item.checked = _this.checkAllFlag
        }
      })
      _this.calcTotalPrice()
    },
    isAllChecked: function () {
      var t = 0
      var len = this.cartList.length
      this.cartList.forEach(function (item) {
        if (item.checked) {
          t++
        }
      })
      if (t === len) {
        this.checkAllFlag = true
      } else {
        this.checkAllFlag = false
      }
      if (t === 0) {
        this.isBanlance = false
      } else {
        this.isBanlance = true
      }
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
          _this.$message({
            message: '恭喜你，收藏成功！',
            duration: 1000,
            type: 'success'
          });
        }
      })
    },
    calcTotalPrice: function () {
      var _this = this;
      _this.totalMoney = 0;
      _this.selectGoodsNum = 0;
      _this.cartList.forEach(function (item) {
        if (item.checked) {
          _this.totalMoney += item.price * item.productNum
          _this.selectGoodsNum += parseInt(item.productNum)
        }
      });
    },
    createOrder: function () {
      let _this = this;
      let cartIdsArr = []
      let cartIds
      _this.cartList.forEach(function (item) {
        if (item.checked) {
          cartIdsArr.push(item.cartId)
        }
      });
      cartIds = cartIdsArr.join(',')
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('cartIds', cartIds);
      this.axios({
        method: 'post',
        url: this.url.api.createOrder,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          if (sessionStorage.orderNo) {
            sessionStorage.orderNo = data.obj
          } else {
            sessionStorage.setItem('orderNo', data.obj)
          }
          _this.$router.push({ path: '/placeOrder' })
        }
      })
    },
    chooseMothod: function (item) {
      let _this = this;
      let params = new URLSearchParams();
      console.log(item.delivery)
      params.append('cartId', item.cartId);
      params.append('delivery', item.delivery);
      this.axios({
        method: 'post',
        url: this.url.api.updateCartDelivery,
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
    showStore: function (item) {
      this.dialogVisible = true
      let _this = this;
      let params = new URLSearchParams();
      params.append('cartId', item.cartId);
      this.axios({
        method: 'post',
        url: this.url.api.nearQuery,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.storeLists = data.listObject
        }
      })
    },
    chooseStore: function (item) {
      this.dialogVisible = false
    }

  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .red{
    color: #dd0011;
  }
  .goodsPart{
    width:100%;
    height: auto;
    float: left;
  }
.shopCart{
  width: 1150px;
  height:auto;
  margin: 0 auto;
  h1{
    margin-top: 35px;
    height: 50px;
    border-bottom: 2px solid #dcdcdc;
    box-sizing: border-box;
    span{
      box-sizing: border-box;
      display: inline-block;
      padding: 0 15px;
      line-height: 48px;
      border-bottom: 2px solid #dd0011;
      color: #dd0011;
      font-size: 18px;
    }
  }
}
  .noGoods{
    width:100%;
    text-align: center;
    margin: 150px 0 300px 0;
    p{
      font-size: 16px;
      color: #000;
      margin: 15px 0;
    }
    a{
      display: inline-block;
      width:230px;
      height: 56px;
      line-height: 56px;
      color: #fff;
      background: #dd0011;
      border-radius: 3px;
      font-size: 18px;
    }
  }
  .goods{
    width:100%;
    .goodsTitle{
      height:40px;
      width:48%;
      margin-left: 49%;
      span{
        display: inline-block;
        text-align: center;
        font-weight: 100;
        width:24%;
        line-height:40px;
      }
    }
  }
  .goodStore{
    h4{
      height: 55px;
      line-height:55px;
      vertical-align: middle;
      span{
        display: inline-block;
        line-height: 55px;
      }
    }
  }
  .storeIcon{
    width:22px;
    height:22px;
    margin-right: 15px;
    margin-left: 10px;
    vertical-align: middle;
  }

  .goodsItem{
    width:100%;
    height: auto;
    padding:25px;
    border:1px solid #ddd;
    float: left;
    font-size: 14px;
    margin-bottom: 35px;
    box-sizing: border-box;
    &:after{
      display: table;
      content: '';
      clear: both;
    }
  }
  .goodsItem1{
    width:40%;float: left;
    img{
      width:88px;
      margin-right: 10px;
      float: left;
    }
    span{
      float: left;
      font-size: 14px;
    }
  }
  .goodsItem2{width:12%;float: left;
    color: #818181;}
  .goodsItem3{
    width:12%;float: left;
    p{
      &:first-child{
        text-decoration: line-through;
        color: #818181;}
    }
  }
  .goodsItem4{
    width:12%;
    float: left;
    button{
      float: left;
      width:27px;
      height:27px;
      border: 1px solid #ddd;
      background: #f0f0f0;
      box-sizing: border-box;
    }
    input{
      box-sizing: border-box;
      float: left;
      width:48px;
      height:27px;
      border: 1px solid #aaa;
      text-align: center;
    }
  }
  .checkIcon{
    display: block;
    width:18px;
    height: 18px;
    margin-right: 5px;
    background:url(../common/img/unselect.png);
    background-size: 18px 18px;
    float: left;
    margin-top: 15px;
    &.checked{
      background:url(../common/img/selected.png);
    }
  }
  .goodsItem5{width:12%;float: left;}
  .goodsItem6{width:12%;float: left;}
  .goodsOpera{
    box-sizing: border-box;
    float: left;
    background: #e5e5e5;
    margin-bottom: 35px;
    width:100%;padding-left:15px;height: 50px;line-height: 50px;
    a{
      width: 128px;
      height: 50px;
      line-height:50px;
      display: inline-block;
      float: right;
      background: #b0b0b0;
      color: #fff;
      text-align: center;
      &.balance{
        background:#dd0011;
      }
    }
  }
  .opera1{
    margin: 0 60px;
  }
  .opera3{
    margin-left: 20%;
    margin-right: 50px;
  }
  .ticket{
    vertical-align: middle;
    margin-left: 25px;
  }
  .kdWay{
    border:1px solid #ccc;
    width:100px;
    height: 35px;
    border-radius: 3px;
    margin-left: 10px;
  }
  .storeBtn{
    padding: 0 10px;
    border:0;
    height: 50px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
  .storeList{
    height: 350px;
    overflow-y: auto;
    li{
      width:100%;
      height: 60px;
      padding: 5px 0;
      border-bottom: 1px solid #ccc;
      img{
        float: left;
        width: 100px;
        height: 60px;
        margin-right: 10px;
      }
      span{
        float: left;
        font-size: 14px;
        line-height: 30px;
        color: #333;
      }
    }
  }
  .storeBox{
    position: fixed;
    top:20%;
    width:40%;
    left: 30%;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
    padding: 15px;
    h2{
      font-size: 16px;
      font-weight: 100;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
</style>

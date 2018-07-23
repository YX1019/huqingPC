<template>
<div class="person">
  <div class="curPosition">您现在的位置:首页>用户中心{{position}}</div>
  <div class="pLeftNav">
     <h1 class="pLeftNav_title" @click="toUserCenter();">用户中心</h1>
     <div class="plNavItem" v-for="(item,index) in plNavItemList" :key="item.title">
        <h1>{{item.title}}<i class="iconfont black rg">&#xe602;</i></h1>
        <ul>
           <li v-for="(IItem,indexx) in item.content" :key="IItem" @click="selectItem(index,indexx,IItem)" :class="{cur: isActive == index && isActive2 == indexx}">{{IItem}}</li>
        </ul>
     </div>
  </div>
  <router-view></router-view>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'personal',
  data () {
    return {
      isActive: -1,
      isActive2: 0,
      position: '',
      plNavItemList: [{'title': '账户管理', 'content': ['个人信息', '我的账户', '团队账户']},
        {'title': '商品管理', 'content': ['我的订单', '门店订单', '收货地址']},
        {'title': '会员中心', 'content': ['我的优惠', '我的收藏', '意见反馈']},
        {'title': '服务管理', 'content': ['投诉维权', '兑换现金']}]
    }
  },
  methods: {
    selectItem: function (index, indexx, IItem) {
      this.position = '>' + IItem
      this.isActive = index
      this.isActive2 = indexx
      if (index === 0 && indexx === 0) {
        this.$router.push({ path: '/personal/personInfo' })
      } else if (index === 0 && indexx === 1) {
        this.$router.push({ path: '/personal/myAcount' })
      } else if (index === 0 && indexx === 2) {
        this.$router.push({ path: '/personal/teamAcount' })
      } else if (index === 1 && indexx === 0) {
        this.$router.push({ path: '/personal/myOder' })
      } else if (index === 1 && indexx === 1) {
        this.$router.push({ path: '/personal/storeOder' })
      } else if (index === 1 && indexx === 2) {
        this.$router.push({ path: '/personal/address' })
      } else if (index === 2 && indexx === 0) {
        this.$router.push({ path: '/personal/myDiscount' })
      } else if (index === 2 && indexx === 1) {
        this.$router.push({ path: '/collect' })
      } else if (index === 2 && indexx === 2) {
        this.$router.push({ path: '/personal/feedback' })
      } else if (index === 3 && indexx === 0) {
        this.$router.push({ path: '/personal/complaint' })
      } else if (index === 3 && indexx === 1) {
        this.$router.push({ path: '/personal/cashExchange' })
      }
    },
    toUserCenter: function () {
      this.position = ''
      this.$router.push({ path: '/personal/userCenter' })
    }
  }
}

</script>
<style lang="scss" rel="stylesheet/scss">
  .curPosition{
    width:100%;
    padding: 20px 0 10px 0;
    color: #131313;
    font-size: 14px;
    border-bottom: 1px dashed #e2e2e2;
    margin-bottom: 25px;
  }
  .black{
    color: #000;
  }
.pLeftNav{
  width:235px;
  border-bottom: 1px solid #ddd;
  float: left;
}
  .pLeftNav_title{
    width:100%;
    height: 40px;
    line-height:40px;
    box-sizing: border-box;
    padding: 0 15px;
    color: #fff;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #f56346 , #e00706); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #f56346 , #e00706); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right,#f56346 , #e00706); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #f56346 , #e00706); /* 标准的语法 */
  }
  .plNavItem{
    width:100%;
    h1{
      box-sizing: border-box;
      padding: 0 15px 0 28px;
      height:35px;
      line-height: 35px;
      color: #000;
      font-size:16px;
      background: #f0f0f0;
    }
    ul{
      width:100%;
      padding: 10px 25px;
      box-sizing: border-box;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      li{
        height: 35px;
        line-height: 35px;
        list-style: disc;
        color: #000;
        margin-left: 20px;
        cursor: pointer;
        &.cur{
          color: #e70012;
        }
      }
    }
  }

</style>

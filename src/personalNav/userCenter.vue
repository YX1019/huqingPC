<template>
  <div class="personRg">
    <div class="personBanner"><img src="../common/img/personImg1.jpg"/></div>
    <div class="personCont">
      <p>{{userCell}} 欢迎您回到胡庆余堂商城！</p>
      <p>您的上一次登录时间：{{loginTime}}</p>
      <p>您的会员等级是 <span class="grade">V{{grade}}</span></p>
      <div class="serverLine">
        <a><img src="../common/img/myIcon1.png" @click="toCollectMoney()"/>收银</a>
        <a><img src="../common/img/myIcon2.png" @click="toShopTickect()"/>购物券</a>
        <a @click="toGoodsAllocation()"><img src="../common/img/myIcon3.png"/>商品调拨</a>
      </div>
      <div class="profile2">
        胡庆余堂商城是中药材一站式网购服务平台，配送各类常用药1000余种，包括各类中药饮片，养生药膳和名贵药材，品种齐全，质量可靠，价格实惠，是您放心的网上中药店。
        因为药材品种的繁多，请使用本站搜索您需要的品种，如果搜索不到你所需要的药材，请直接联系客服详细咨询，本店还提供按方抓药服务！ 本店的网上支付方式为支付宝，提供安全有保障的交易服务。
      </div>
      <div class="personInfoItem">
        <h1>您的账户</h1>
        <div class="perItemCont">
          <p>您的贡献值:<span>{{devoteAmount}}</span></p>
          <p>积分:<span>{{huPoint}}</span>临时积分:<span>{{huPointTemp}}</span></p>
          <p>胡币:<span>{{huBalance}}</span>临时胡币:<span>{{huBalanceTemp}}</span></p>
        </div>
      </div>
      <div class="personInfoItem">
        <h1>用户提醒</h1>
        <div class="perItemCont">
          <p>您最近30天内提交了{{orderCount}}个订单</p>
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
      userCell: '138****5420',
      loginTime: '2018-06-21 11:20:10',
      grade: '1',
      errorBox: false,
      errMsg: '',
      userAccountInfo: {},
      devoteAmount: '',
      huPoint: '',
      huPointTemp: '',
      huBalance: '',
      huBalanceTemp: '',
      orderCount: ''
    }
  },
  created () {
    this.getMineInfo()
  },
  mounted () {
  },
  methods: {
    getMineInfo: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      this.axios({
        method: 'post',
        url: this.url.api.mineInfo,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.userCell = data.obj.userAllInfo.cell
          _this.grade = data.obj.userAllInfo.level
          _this.userAccountInfo = data.obj.userAccountInfo
          _this.devoteAmount = data.obj.userAccountInfo.devoteAmount.amount
          _this.huPoint = data.obj.userAccountInfo.huPoint.amount
          _this.huPointTemp = data.obj.userAccountInfo.huPointTemp.amount
          _this.huBalance = data.obj.userAccountInfo.huBalance.amount
          _this.huBalanceTemp = data.obj.userAccountInfo.huBalanceTemp.amount
          _this.loginTime = data.obj.lastLoginTime
          _this.orderCount = data.obj.orderCount
        }
      })
    },
    toGoodsAllocation: function () {
      this.$router.push({path: '/goodsAllocation'})
    },
    toCollectMoney: function () {
      this.$router.push({path: '/collectMoney'})
    },
    toShopTickect: function () {
      this.$router.push({path: '/shopTicket'})
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .personRg{
    margin-left: 250px;
    position: relative;
    color: #000;
  }
  .personBanner{
    width:100%;
    height: auto;
    img{
      width:100%;
      height:auto;
    }
  }
  .personCont{
    width:100%;
    box-sizing: border-box;
    border:1px solid #ddd;
    padding: 16px;
    position: relative;
    p{
      font-size: 14px;
      color: #000;
      line-height:24px;
    }
  }
  .profile2{
    width:100%;
    box-sizing: border-box;
    padding: 20px;
    text-indent:2em;
    font-size: 13px;
    border:1px solid #e70012;
    margin: 20px 0;
  }
  .personInfoItem{
    width:310px;
    h1{
      font-size:16px;
      font-weight: 100;
      line-height: 35px;
      padding-left: 15px;
      background: #f0f0f0;
    }
  }
  .perItemCont{
    width:100%;
    min-height: 140px;
    p{
      font-size: 14px;
      padding-top: 10px;
      span{
        color: #e62017;
        margin: 0 40px 0 5px;
      }
    }
  }
  .grade{
    color: #f7ba00;
  }
  .serverLine{
    position: absolute;
    right: 10px;
    top:30px;
    a{
      display: inline-block;
      color: #fff;
      background: #dd0011;
      padding: 6px 10px;
      margin-right: 10px;
      border-radius: 3px;
      font-size: 14px;
      img{
        height: 15px;
        width:auto;
        margin-right: 6px;
        vertical-align: text-top;
      }
    }
  }
</style>

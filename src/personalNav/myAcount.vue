<template>
<div class="personRg">
<ul class="myAcountList">
  <li v-for="(item,index) in myAcountList" :key="item" @click="choseItem(index,item)" :class="{'cur':index == isCur}">{{item}}</li>
</ul>
  <div class="myInfo">
    <div class="myAcountNum">
      <p>{{name}}</p>
      <h1>{{amount}}</h1>
      <a class="putCash" v-if="name === '胡币' " @click="putCash();">提现</a>
    </div>
    <div class="myAcountTable">
      <table cellspacing="0">
        <tr>
          <th>来源/用途</th>
          <th>{{name}}变化</th>
          <th>日期</th>
        </tr>
        <tr v-for="(item,index) in tableList" :key="index">
          <td>
            <!--<img src="../common/img/productImg1.jpg" class="productImg"/>-->
            <div class="myTableRg" style="margin-left: 20px;"><h3>{{item.typeMsg}}</h3>
              <!--<p>订单编号：154652451254621</p>-->
            </div>
          </td>
          <td class="proMoney">{{item.amountStr}}</td>
          <td class="proTime">{{item.time}}</td>
        </tr>
      </table>
    </div>
  </div>
  <div style="width: 100%;height: 50px;text-align: center;margin-top: 30px;">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-size="pageSize"
    >
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
  name: 'personal',
  data () {
    return {
      isCur: 0,
      name: '贡献值',
      myAcountList: ['贡献值', '胡币', '积分'],
      tableList: [],
      pageNo: 1,
      pageSize: 10,
      total: 5,
      errMsg: '',
      errorBox: false,
      state: 1,
      amount: '200'
    }
  },
  created () {
    this.getMyAcount(1)
  },
  mounted () {
    this.isCur = sessionStorage.getItem('isCur') || 0
    this.state = sessionStorage.getItem('state') || 1
    console.log(this.state)
  },
  methods: {
    choseItem: function (index, item) {
      this.isCur = index
      this.state = index + 1
      sessionStorage.setItem('isCur', this.isCur)
      sessionStorage.setItem('state', this.state)
      this.name = item
      this.getMyAcount(1)
    },
    putCash: function () {
      this.$router.push({ path: '/personal/putCash' })
    },
    getMyAcount: function (pageNo) {
      console.log(this.$store.state.userId, this.state)
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('logType', this.state);
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.accountLogList,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data, _this.state)
          _this.tableList = data.listObject
          if (_this.state === 1 || _this.state === '1') {
            _this.amount = data.accountResult.devoteAmount.amount
          } else if (_this.state === 2 || _this.state === '2') {
            _this.amount = data.accountResult.huBalance.amount
          } else {
            _this.amount = data.accountResult.huPoint.amount
          }
        }
      })
    },
    handleCurrentChange (val) {
      var pageNum = val
      this.getMyAcount(pageNum)
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
  .myAcountList{
    width:100%;
    height: 35px;
    border-bottom: 1px solid #ddd;
    li{
      float: left;
      width: 155px;
      height: 33px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      &.cur{
        color: #e3120e;
        border-bottom: 2px solid #e3120e;
      }
    }
  }
  .myInfo,.myAcountNum,.myAcountTable{
    width:100%;
    height: auto;
  }
  .myAcountNum{
    position: relative;
    box-sizing: border-box;
    padding: 35px 0;
    text-align: center;
    background: #fef7f7;
    border: 1px solid #e3120e;
    margin: 10px 0 20px 0;
    p{
      font-size: 18px;
      color: #3e3e3e;
      line-height: 40px;
    }
    h1{
      font-size:36px;
      color: #e3120e;
    }
  }
  .myAcountTable{
    table{
      width:100%;
      height: auto;
      tr{
        width:100%;
      }
      th{
        height:40px;
        background: #f1f1f1;
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
        color: #727272;
        font-size: 14px;
        font-weight: 100;
        &:first-child{
          border-left: 1px solid #ddd;
        }
        &:last-child{
          border-right: 1px solid #ddd;
        }
      }
      td{
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        text-align: center;
        &:first-child{
          text-align: left;
          width:40%;
        }
      }
    }
  }
  .myTableRg{
    float: left;
    @media screen and (max-width: 1150px) {
      width: 65%;
    }
    h3{
      font-size:14px;
      margin-bottom: 15px;
      font-weight: 100;
    }
    p{
      font-size: 13px;
      color: #686868;
    }
  }
  .productImg{
    float: left;
    width:62px;
    height: 62px;
    @media screen and (max-width: 1150px){
      margin: 0 10px;
    }
    margin: 0 25px;
  }
  .proMoney{
    color: #e3120e;
    font-size: 24px;
  }
  .proTime{
    font-size: 13px;
    color: #686868;
  }
  .putCash{
    position: absolute;
    top:56px;
    right: 55px;
    color: #515151;
    font-size:18px;
    width:188px;
    height: 40px;
    line-height: 40px;
    display: block;
    border:1px solid #ddd;
    background: #fff;

  }
</style>

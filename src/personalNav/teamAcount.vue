<template>
<div class="personRg">
<ul class="myAcountList">
  <li v-for="(item,index) in myAcountList" :key="item" @click="choseItem(index,item)" :class="{'cur':index == isCur}">{{item}}</li>
</ul>
  <div class="myInfo">
    <div class="myAcountNum">
      <p>{{name}}</p>
      <h1>200</h1>
      <a class="putCash" v-if="name === '胡币' " @click="putCash();">提现</a>
    </div>
    <ul class="teamNav">
      <li v-for="(item,index) in teamList" :key="item" @click="getTeamInfo(index)" :class="{'cur':index == teamName}">{{item}}</li>
    </ul>
    <div class="teamCont" v-show="teamName === 1 ">
    <div class="myAcountTable">
      <table cellspacing="0">
        <tr>
          <th>来源/用途</th>
          <th>{{name}}变化</th>
          <th>日期</th>
        </tr>
        <tr>
          <td><img src="../common/img/productImg1.jpg" class="productImg"/><span style="line-height: 55px;">张三</span>
          </td>
          <td class="proMoney">+10</td>
          <td class="proTime">2018年6月4日 09:20:30</td>
        </tr>
      </table>
    </div>
    </div>
    <div class="teamCont" v-show="teamName === 0 ">
       <ul class="teamList">
         <li><img src="../common/img/productImg1.jpg" class="productImg"/>张三</li>
       </ul>
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
  name: 'teamAcount',
  data () {
    return {
      isCur: 0,
      teamName: 0,
      name: '贡献值',
      myAcountList: ['贡献值', '胡币', '积分'],
      teamList: ['团队人员', '明细记录'],
      errorBox: false,
      errMsg: '',
      pageNo: 1,
      pageSize: 10,
      total: 5
    }
  },
  created () {
    this.accountLogTeam(1)
  },
  mounted () {
    this.isCur = sessionStorage.getItem('isCur') || 0
    this.state = sessionStorage.getItem('state') || 1
    console.log(this.state)
  },
  methods: {
    choseItem: function (index, item) {
      this.isCur = index
      this.name = item
      this.state = index + 1
      sessionStorage.setItem('isCur', this.isCur)
      sessionStorage.setItem('state', this.state)
      this.accountLogTeam(1)
    },
    putCash: function () {
      this.$router.push({ path: '/personal/putCash' })
    },
    getTeamInfo: function (index) {
      this.teamName = index
    },
    accountLogTeam: function (pageNo) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('logType', this.state);
      params.append('pageNum', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.accountLogTeam,
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
    handleCurrentChange (val) {
      var pageNum = val
      this.accountLogTeam(pageNum)
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
      }
    }
  }
  .productImg{
    width:55px;
    height: 55px;
    border-radius: 50%;
    margin-right:18px;
    vertical-align: middle;
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
  .teamNav{
    width:100%;
    height: 40px;
    line-height:40px;
    background: #fdf7f7;
    font-size: 16px;
    border:1px solid #fdd8db;
    box-sizing: border-box;
    margin-bottom: 5px;
    li{
      float: left;
      margin: 0 200px 0 50px;
      @media screen and (max-width: 1150px){margin: 0 100px 0 50px;}
      &.cur{
        color: #e00807;
      }
    }
  }
  .teamList{
    width:100%;
    height: auto;
    li{
      width:100%;
      height:88px;
      padding: 0 20px;
      line-height: 88px;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      img{
        margin-top: 16px;
      }
    }
  }
</style>

<template>
<div class="goodsAllocation">
  <h4>商品调拨</h4>
  <div class="goodsOperate">
    <div>
    <el-input placeholder="调入门店名称" class="gInput"></el-input>
    <el-input placeholder="调出门店名称" class="gInput"></el-input>
    <span style="position: relative;"><el-input placeholder="商品条形码" class="gInput"></el-input><i class="iconfont sysIcon">&#xe600;</i></span>
    </div>
      <table class="goodsTable" border="1" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>商品条形码</th>
          <th>商品ERP编码</th>
          <th>商品名称</th>
          <th>数量</th>
        </tr>
        <tr>
          <td>01</td>
          <td>564235135351252</td>
          <td>425757475284</td>
          <td>安宫牛黄丸</td>
          <td><button @click="changeNum(-1)" class="hand">-</button><input type="text" v-model="num" @change="setNum()" readonly/><button @click="changeNum(1)" class="hand">+</button></td>
        </tr>
      </table>
  </div>
  <div class="allAmount">总数量 <span>3</span></div>
  <div class="operateBtns"><button>取消</button><button @click="sureAllocation()">确定</button></div>
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%">
    <div class="dBox"><img src="../common/img/suc.png"/><p>商品库存已成功完成调拨</p> </div>
  </el-dialog>

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
      activityId: '',
      errorBox: false,
      errMsg: '',
      msgInfo: {},
      num: 2,
      dialogVisible: false
    }
  },
  created () {
    this.getParams()
  },
  methods: {
    sureAllocation: function () {
      this.dialogVisible = true
    },
    setNum: function () {
      if (this.num < 1) {
        this.num = 1
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
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.activityId
      // 将数据放在当前组件的数据内
      this.activityId = routerParams
    },
    activityDetailQuery: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('id', this.activityId);
      this.axios({
        method: 'post',
        url: this.url.api.activityDetailQuery,
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
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .goodsAllocation{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:760px;
    }
    height:auto;
    margin: 0 auto 150px auto;
    h4{
      font-size:14px;
      font-weight: 100;
      padding: 22px 0 12px 0;
      color: #131313;
      margin-bottom: 20px;
    }
  }
  .gInput{
    width:150px;
    margin-right: 50px;
  }
  .goodsOperate{
    width:100%;
    box-sizing: border-box;
    padding: 35px;
    border:1px solid #eee;
  }
  .goodsTable{
    width:100%;
    border:1px solid #eee;
    margin-top: 70px;
    font-size: 14px;
    color: #000;
    tr{
      height: 45px;
      line-height:45px;
      text-align: center;
      td{
        border-bottom: 1px solid #eee;
        button{
          width: 18px;
          height: 16px;
          border:1px solid #ccc;
          background: #fff;
          margin: 0 3px;
        }
        input{
          width:30px;
          text-align: center;
        }
      }
      th{
        border-bottom: 1px solid #eee;
        font-weight: normal;
        background: #f5f5f5;
      }
    }
  }
  .allAmount{
    width:100%;
    height: 50px;
    text-align: right;
    background: #fef2f3;
    line-height:50px;
    margin: 40px 0;
    span{
      margin:0 30px;
    }
  }
  .operateBtns{
    text-align: right;
    button{
    width:195px;
    height: 50px;
      border-radius: 5px;
      border:1px solid #dd0011;
      font-size: 18px;
      &:first-child{
        color: #dd0011;
        background: #fff;
        margin-right: 20px;
      }
      &:last-child{
        color: #fff;
        background: #dd0011;
      }
    }
  }
  .dBox{
    text-align: center;
    img{
      width:60px;
      margin-bottom: 20px;
    }
  }
  .sysIcon{
    position: absolute;
    top: 0;
    right: 58px;
  }
</style>

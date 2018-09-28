<template>
<div class="goodsAllocation">
  <h4>购物券</h4>
  <div class="goodsOperate">
    <div>
    <el-input placeholder="会员手机号" class="gInput"></el-input>
    <el-input placeholder="会员名称" class="gInput"></el-input>
    <el-input placeholder="会员号" class="gInput"></el-input>
    <el-input placeholder="开始时间" style="width:150px;"></el-input> -
    <el-input placeholder="结束时间" class="gInput"></el-input>
    </div>
    <div class="operateBtns2"><button>查找</button><button @click="addTicket()">添加</button></div>
      <table class="goodsTable" border="1" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>会员名称</th>
          <th>手机号</th>
          <th>购物券金额</th>
          <th>备注</th>
          <th>充值时间</th>
        </tr>
        <tr>
          <td>01</td>
          <td>安杰</td>
          <td>15262535642</td>
          <td>10000.00</td>
          <td>备注一下</td>
          <td>2018-08-20</td>
        </tr>
      </table>
    <div style="width: 100%;height: 50px;text-align: right;clear: both;padding-top:50px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="pageNo"
        :page-size="pageSize"
      >
      </el-pagination>
    </div>
  </div>
  <el-dialog
    title="添加购物券"
    :visible.sync="centerDialogVisible"
    width="40%"
    center>
    <div>
      <div class="addTicketItem"><label>会员手机号</label><input type="text"/></div>
      <div class="addTicketItem"><label>会员名称</label><input type="text"/></div>
      <div class="addTicketItem"><label>充值金额</label><input type="text"/></div>
      <div class="addTicketItem"><label>备注</label><input type="text"/></div>
      <div class="addTicketItem"><label>充值时间</label><input type="text"/></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancelBtn2" @click="centerDialogVisible = false">取消</el-button>
    <el-button class="sucBtn2" @click="centerDialogVisible = false">确 定</el-button>
  </span>
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
      centerDialogVisible: false,
      total: 5, // 总条数
      pageNo: 1,
      pageSize: 20
    }
  },
  created () {
    this.getParams()
  },
  methods: {
    addTicket: function () {
      this.centerDialogVisible = true
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
  .operateBtns2{
    text-align: center;
    margin-top:30px;
    font-size: 14px;
    button{
    width:145px;
    height: 42px;
      border-radius: 5px;
      border:1px solid #dd0011;
      &:last-child{
        color: #dd0011;
        background: #fff;
      }
      &:first-child{
        color: #fff;
        background: #dd0011;
        margin-right: 20px;
      }
    }
  }
  .cancelBtn2{
    width:145px;
    height: 42px;
    border-radius: 5px;
    border:1px solid #dd0011;
    color: #dd0011;
    background: #fff;
    margin-right: 20px;
  }
.sucBtn2{
    width:145px;
    height: 42px;
    border-radius: 5px;
    border:1px solid #dd0011;
    font-size: 14px;
    color: #fff;
    background: #dd0011;
  }
  .dBox{
    text-align: center;
    img{
      width:60px;
      margin-bottom: 20px;
    }
  }
  .addTicketItem{
    margin-bottom: 15px;
    label{
      width:75px;
      margin-right: 20px;
      text-align: right;
      display: inline-block;
    }
    input{
      width:70%;
      height:35px;
      border:1px solid #eee;
    }
  }
</style>

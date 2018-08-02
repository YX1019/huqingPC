<template>
<div class="news clearfix">
  <h4>您现在的位置：新闻公告>全部</h4>
  <div class="news_lf">
   <h2>文章分类</h2>
    <ul class="newsSubList">
      <li class="level1" v-for="item in 2" :key="item">
        <span class="add">+</span>中药医方
        <ul>
          <li><span></span>妇产科</li>
          <li><span></span>口腔秘方</li>
          <li><span></span>心胸血管</li>
          <li><span></span>儿科秘方</li>
          <li><span></span>内分泌</li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="news_rg">
   <ul>
     <li v-for="item in newsList" :key="item.knowId" @click="toNewsDetail(item.knowId)"><a class="hand"><span class="newsList_lf"><i>●</i>{{item.title}}</span><span class="newsList_rg">{{item.time}}</span></a></li>
   </ul>
  </div>
  <div style="width: 100%;height: 50px;text-align: center;clear: both">
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
  name: '',
  data () {
    return {
      total: 5, // 总条数
      pageNo: 1,
      pageSize: 20,
      newsList: [],
      errorBox: false,
      errMsg: ''
    }
  },
  created () {
    this.getNewsList(1, 1)
  },
  methods: {
    handleCurrentChange (val) {
      var pageNum = val
      console.log(pageNum)
    },
    getNewsList: function (pageNo, type) {
      let _this = this;
      let params = new URLSearchParams();
      // params.append('userId', this.$store.state.userId);
      params.append('type', type);
      params.append('pageNo', pageNo);
      params.append('pageSize', this.pageSize);
      this.axios({
        method: 'post',
        url: this.url.api.knowledgeQuery,
        data: params
      }).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(data)
          _this.newsList = data.listObject
        }
      })
    },
    toNewsDetail: function (knowId) {
      this.$router.push({path: '/newsDetail', query: {knowId: knowId}})
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.news{
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
    border-bottom: 1px dashed #eee;
    margin-bottom: 20px;
  }
}
  .news_lf{
    width:210px;
    float: left;
    box-sizing: border-box;
    border: 1px solid #ccc;
    h2{
      background: #f4f4f4;
      padding-left:15px;
      height: 45px;
      line-height: 45px;
      color: #131313;
      font-size: 16px;
      font-weight: 100;
    }
  }
.news_rg{
  width:75%;
  width: calc(100% - 210px);
  float: left;
  ul{
    width:100%;
    float: left;
    li{
      width:46%;
      @media screen and (max-width: 1150px){
        width:45%;
      }
      float: left;
      margin-left: 25px;
      line-height: 35px;
      border-bottom: 1px solid #ccc;
      a{
        font-size: 14px;
        color: #494949;
        i{
         margin-right: 5px;
          color: #e60012;
        }
      }
    }
  }

}
  .newsList_rg{
    float: right;
  }
  .newsSubList{
    margin: 25px 20px;
    border-left: 1px dashed #ccc;
    li{
      font-size: 16px;
      color: #636363;
      ul{
        li{
          font-size: 14px;
          margin-top: 20px;
          span{
            display: inline-block;
            border-top:1px dashed #ccc;
            width:25px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .level1{
    padding-bottom: 25px;
  }
  .add{
    position: relative;
    left:-7px;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
  }
</style>

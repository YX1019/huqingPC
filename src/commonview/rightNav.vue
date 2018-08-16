<template>
<div>
   <div class="rightNav">
      <div class="rightItem1" @click="toPerson();"><i class="iconfont">&#xe851;</i></div>
      <div class="rightItem2" @click="toCart();"><i class="iconfont">&#xe887;</i><p>购<br/>物<br/>车<br/>{{this.$store.state.goodsNum}}</p></div>
      <div class="rightItem2" @click="toCollect()"><i class="iconfont">&#xe618;</i><p>收藏</p></div>
      <div class="rightItem2" @click="openBox()"><i class="iconfont">&#xe607;</i><p>客服</p></div>
      <div class="rightItem2"><i class="iconfont">&#xe63b;</i></div>
      <div class="rightItem2" @click="toTop()"><i class="iconfont">&#xe733;</i><p>TOP</p></div>
   </div>
  <div class="customerBox" v-show="isShowCustomer">
    <h1><img :src="headImg"/><span>{{nickName}}</span><span class="rg" style="font-size: 24px;" @click="closeBox()">×</span></h1>
    <div class="customerCont" id="chat">
      <div class="customerItem" v-for="item in chatRecordList" :key="item.id">
        <h3 style="color: #0071b8;" v-if="item.chatObj == 2">胡庆余堂({{item.chatTime}})</h3>
        <p v-if="item.chatObj == 2">{{item.chatContent}}</p>
        <h3 style="color: #de3323;" v-if="item.chatObj == 1">{{item.nickName}}({{item.chatTime}})</h3>
        <p v-if="item.chatObj == 1">{{item.chatContent}}</p>
      </div>
    </div>
    <div class="customerBtm">
      <textarea v-model="chatComment">

      </textarea>
      <button @click="closeBox()">关闭</button><button @click="createUserChatRecord()">发送</button>
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
      isShowCustomer: false,
      chatId: '',
      chatRecordList: [],
      chatComment: '',
      errMsg: '',
      errorBox: false,
      nickName: '',
      headImg: ''
    }
  },
  methods: {
    toCart: function () {
      if (this.$store.state.isLogin) {
        this.$router.push({ path: '/shopcart' })
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({ path: '/login' })
      }
    },
    toCollect: function () {
      if (this.$store.state.isLogin) {
        this.$router.push({ path: '/collect' })
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({path: '/login'})
      }
    },
    toPerson: function () {
      if (this.$store.state.isLogin) {
        this.$router.push({ path: '/personal' })
        sessionStorage.setItem('pIndex', -1)
        sessionStorage.setItem('pIndexx', 0)
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({ path: '/login' })
      }
    },
    toTop: function () {
      window.scrollTo(0, 0);
    },
    closeBox: function () {
      this.isShowCustomer = false
    },
    openBox: function () {
      if (this.$store.state.isLogin) {
        this.isShowCustomer = true
        this.getUserChatRecord()
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        });
        this.$router.push({path: '/login'})
      }
    },
    getUserChatRecord: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      this.axios({
        method: 'post',
        url: this.url.api.getUserChatRecord,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log('111')
          _this.chatId = data.obj.chatId
          _this.headImg = data.obj.headImg
          _this.nickName = data.obj.nickName
          _this.chatRecordList = data.obj.chatRecordList
          let chat = document.getElementById('chat')
          chat.scrollTop = chat.scrollHeight
        }
      })
    },
    createUserChatRecord: function () {
      let _this = this;
      let params = new URLSearchParams();
      params.append('userId', this.$store.state.userId);
      params.append('chatId', this.chatId);
      params.append('chatComment', this.chatComment);
      this.axios({
        method: 'post',
        url: this.url.api.createUserChatRecord,
        data: params
      }).then(function (res) {
        console.log(res)
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          _this.getUserChatRecord()
          _this.chatComment = ''
        }
      })
    }
  },
  watch: {
    chatRecordList: function () {
      this.$nextTick(function () {
        let chat = document.getElementById('chat')
        chat.scrollTop = chat.scrollHeight
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .rightNav{
    width: 40px;
    position: fixed;
    height:100%;
    right: 0;
    top: 0;
    background: #2b2315;
    color: #fff;
    z-index:5;
    box-sizing: border-box;
    padding: 0 6px;
    font-size: 12px;
    cursor: pointer;
  }
  .rightItem1{
    width:28px;
    height: 28px;
    border-radius: 50%;
    background: #e70012;
    margin-bottom: 35px;
    text-align: center;
    line-height: 27px;
    margin-top: 250px;
  }
  .rightItem2{
    width:100%;
    text-align: center;
    margin-bottom: 35px;
  }
  .iconfont{
    font-size: 20px;
    color: #fff;
  }
  .customerBox{
    width:620px;
    height: 600px;
    position: fixed;
    bottom: 5%;
    right:10%;
    background: #fff;
    box-shadow:0 0 2px rgba(0,0,0,0.2);
    z-index: 9;
    h1{
      width:100%;
      font-weight: 100;
      padding: 10px;
      line-height: 48px;
      font-size: 14px;
      box-sizing: border-box;
      background: #f8f8f8;
      img{
        margin-right: 10px;
        float: left;
        width:48px;
        height: 48px;
        border-radius: 50%;
      }
    }
  }
  .customerCont{
    width:100%;
    box-sizing: border-box;
    padding: 0 10px;
    height: 400px;
    overflow: auto;
    h3{
      font-weight: 100;
      font-size: 13px;
      line-height: 40px;
    }
    p{
      font-size: 14px;
      color: #000;
      padding: 5px 0
    }
  }
  .customerBtm{
    width:100%;
    border-top:1px solid #ccc;
    textarea{
      height: 80px;
      width:100%;
      box-sizing: border-box;
      padding: 5px 10px;
      border:0;
    }
    button{
      width:80px;
      height: 35px;
      text-align: center;
      background: #f25555;
      color: #fff;
      border-radius: 3px;
      float: right;
      margin-right: 20px;
    }
  }
</style>

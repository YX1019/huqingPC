<template>
  <div>
    <div class="pList_lf">
      <ul class="firstUl">
        <li v-for="(item,index) in sortList" :key="index" class="firstLi">
          <p @click="showToggle(item)">{{item.name}}<i class="iconfont rg" v-show="!item.isSubShow">&#xe62a;</i><i
            class="iconfont rg" v-show="item.isSubShow" style="font-size:28px;">&#xe602;</i></p>
          <ul class="secondUl" v-show="item.isSubShow">
            <li class="secondLi" v-for="subItem in item.subItems" :key="subItem.name">{{subItem.name}}</li>
          </ul>
        </li>
      </ul>
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
  name: 'productList',
  data () {
    return {
      active: 0,
      errorBox: false,
      errMsg: '',
      sortList: [
        {
          name: '药食同源',
          isSubShow: false,
          subItems: [
            {
              name: '五味子'
            },
            {
              name: '大黄'
            },
            {
              name: '枸杞'
            }
          ]
        },
        {
          name: '养生汤料',
          isSubShow: false,
          subItems: [
            {
              name: '汤料1'
            },
            {
              name: '汤料2'
            },
            {
              name: '汤料3'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.getcategory()
    this.getProList()
    console.log(this.cateList)
  },
  mounted () {

  },
  methods: {
    getcategory: function () {
      let _this = this
      this.axios.get(this.url.api.categoryQuery).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(res)
          _this.cateList = data.obj.cateList
          _this.cateSubList = data.obj.cateSubList
        }
      })
    },
    showToggle: function (item) {
      item.isSubShow = !item.isSubShow
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .pList_lf{
    width:220px;
    float: left;
    box-sizing: border-box;
    border:1px solid #ccc;
  }
  .pList_rg{
    width:70%;
    width:calc(100% - 240px);
    float: left;
  }
  .firstUl{
    width:100%
  }
  .firstLi{
    width:100%;
    height:auto;
    line-height: 50px;
    cursor: pointer;
    box-sizing: border-box;
    p{
      padding: 0 15px;
    }
    &:nth-child(2n+2){
     background: #f5f5f5;
    }
  }
  .secondLi{
    padding: 0 15px;
    border-top:1px dashed #ccc;
    background: #fff;
    &:first-child{
      border-top:none
    }
  }
</style>

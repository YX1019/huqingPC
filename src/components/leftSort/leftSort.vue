<template>
  <div>
    <div class="pList_lf">

      <ul class="firstUl">
        <li v-for="(item,index) in sortList" :key="index" class="firstLi">
          <p @click="showToggle(item)">{{item.cateName}}<i class="iconfont rg" v-show="!item.isSubShow">&#xe62a;</i><i
            class="iconfont rg" v-show="item.isSubShow" style="font-size:28px;">&#xe602;</i></p>
          <transition name="slide-fade">
          <ul class="secondUl" v-show="item.isSubShow">
            <li class="secondLi" v-for="(subItem,indexx) in item.childList" :key="subItem" @click="selectProduct(item, subItem, index, indexx)" :class="{'cur': (isActive==index && isActive2 == indexx)}">{{subItem}}</li>
          </ul>
          </transition>
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
      isActive: -1,
      isActive2: -1,
      errorBox: false,
      errMsg: '',
      sortList: [
        {
          cateName: '药食同源',
          isSubShow: false,
          childList: ['汤料1', '汤料2', '汤料3']
        },
        {
          cateName: '养生汤料',
          isSubShow: false,
          childList: ['汤料1', '汤料2', '汤料3']
        }
      ]
    }
  },
  created () {
    this.getcategory()
  },
  mounted () {

  },
  methods: {
    getcategory: function () {
      let _this = this
      this.axios.get(this.url.api.categoryQueryWeb).then(function (res) {
        let data = res.data
        if (!res.data.bizSucc) {
          _this.errMsg = data.errMsg
          _this.errorBox = true
        } else {
          console.log(res)
          _this.sortList = data.obj.cateList
          _this.sortList.forEach(function (item) {
            _this.$set(item, 'isSubShow', false)
          })
        }
      })
    },
    selectProduct: function (item, subItem, index, indexx) {
      this.isActive = index
      this.isActive2 = indexx
      this.$router.push({path: '/productList', query: {sort: item.cateName, subSort: subItem, sortName: item.cateFatherName}})
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
    &.cur{
      background: #f85c5c;
      color: #fff;
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>

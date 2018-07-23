<template>
<div class="personal clearfix">
  <personalLeftNav></personalLeftNav>
</div>
</template>
<script type="text/ecmascript-6">
import personalLeftNav from '@/commonview/personalLeftNav'
export default {
  name: 'personal',
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    personalLeftNav
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .personal{
    width:1150px;
    @media screen and (max-width: 1150px){
      width:850px;
    }
    height:auto;
    margin:0 auto 50px auto;
  }

</style>

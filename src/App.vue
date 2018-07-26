<template>
  <div id="app">
    <top></top>
    <router-view/>
    <foot></foot>
    <rightNav></rightNav>
  </div>
</template>

<script>
import top from '@/commonview/top'
import foot from '@/commonview/foot'
import rightNav from '@/commonview/rightNav'
export default {
  name: 'App',
  components: {
    top,
    foot,
    rightNav
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style>
  *{
    margin:0;border: 0;padding: 0;
  }
  ul,li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  .clearfix:after{display: table;content: '';clear: both;}

#app {
  font-family: 'PingFang Sc Medium', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #151515;
}
  .lf{
    float: left;
  }
  .rg{
    float: right;
  }
  .hand{
    cursor: pointer;
  }
</style>

<template>
  <newsList :newsType="newsType"></newsList>
</template>
<script type="text/ecmascript-6">
import newsList from './newsList/newsList'
export default {
  name: 'news',
  components: {
    newsList
  },
  data () {
    return {
      newsType: 1
    }
  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>

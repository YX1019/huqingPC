<template>
<newsList :newsType="newsType"></newsList>
</template>
<script type="text/ecmascript-6">
import newsList from './newsList/newsList'
export default {
  name: 'knowledge',
  components: {
    newsList
  },
  data () {
    return {
      newsType: 2
    }
  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>

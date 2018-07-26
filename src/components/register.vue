<template>
  <regComponents :title="title" :type="type"></regComponents>
</template>
<script type="text/ecmascript-6">
import regComponents from './register/regComponents'
export default {
  name: 'register',
  components: {
    regComponents
  },
  data () {
    return {
      title: '注册新用户',
      type: 1
    }
  },
  mounted () {
  },
  computed: {

  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>

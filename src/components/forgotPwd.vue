<template>
  <regComponents :title="title" :type="type"></regComponents>
</template>
<script type="text/ecmascript-6">
import regComponents from './register/regComponents'
export default {
  name: 'forgotPwd',
  components: {
    regComponents
  },
  data () {
    return {
      title: '忘记密码',
      type: 2
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

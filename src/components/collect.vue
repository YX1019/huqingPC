<template>
<comCollect :collectType="collectType" :name="name"></comCollect>
</template>
<script type="text/ecmascript-6">
import comCollect from './collect/comCollect.vue'
export default {
  name: 'collect',
  components: {
    comCollect
  },
  data () {
    return {
      collectType: 0,
      name: '产品'
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

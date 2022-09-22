<template>
  <div>登录页</div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
      const a = this.$common.getUrlParams('a') || ''
  }
}
</script>

<style scoped>

</style>

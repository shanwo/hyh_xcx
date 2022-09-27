<template>
  <view class="main" :style="{height: status ? '44rpx':0}" />
</template>

<script>
export default {
  name: 'SafeAreaCom',
  data() {
    return {
      status: false
    }
  },
  mounted() {
    const res = uni.getSystemInfoSync()
    console.log('设备信息', res)
    if (res.windowHeight >= 812) {
      this.status = true
    }
  }
}
</script>

<style lang="less" scoped>
  .main{
    width: 100%;
  }
</style>

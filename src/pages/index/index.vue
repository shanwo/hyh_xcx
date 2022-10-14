<template>
  <view class="body_bg">
    <getLocationCom @errorBack="getLocationErrorBack" @successBack="getLocationSuccessBack" />
    <view class="content" @click="handleNextPage">
      <skiHeader />
      <div>
        dasd
      </div>
      <safeAreaCom />
    </view>
  </view>

</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
import getLocationCom from '@/components/common/getLocationCom'
export default {
  components: {
    skiHeader,
    getLocationCom,
    safeAreaCom
  },
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad() {
    // uni.showToast({
    //   title: '标题',
    //   duration: 2000
    // })
    // uni.showLoading({
    //   title: '加载中'
    // })
    this.$common.showLoading()
    setTimeout(() => {
      this.$common.hideLoading()
    }, 3000)
  },
  methods: {
    getLocationErrorBack() {

    },
    getLocationSuccessBack() {

    },
    handleNextPage() {
      this.$common.redirect({ url: '/pages/login/login', params: { a: 3, b: 5 }})
    }
  }
}
</script>

<style>

</style>

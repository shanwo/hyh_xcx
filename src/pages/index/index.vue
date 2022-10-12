<template>
  <view class="body_bg">
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
export default {
  components: {
    skiHeader,
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
    handleNextPage() {
      this.$common.redirect({ url: '/pages/login/login', params: { a: 3, b: 5 }})
    }
  }
}
</script>

<style>

</style>

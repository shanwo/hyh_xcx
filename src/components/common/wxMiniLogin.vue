<template>
  <view class="btn_wrap">
    <div style="height: 300rpx" />
    <button v-if="!version" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">授权用户基础信息</button>
    <button v-if="version" @click="getUserInfo">授权用户信息</button>
  </view>
</template>

<script>

export default {
  data() {
    return {
      version: true
    }
  },
  mounted() {
    if (wx.getUserProfile) {
      this.version = true
    } else {
      this.version = false
    }

    wx.login({
      success(e) {
        console.log(e)
      }
    })
  },
  methods: {
    getUserInfo(e) {
      this.$common.showLoading()
      if (this.version) {
        uni.getUserProfile({
          desc: '用于个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log('res', res)
          },
          fail: (res) => {
            this.$common.toast('授权失败')
          }
        })
      } else {
        console.log(e)
      }
    },
    decryptPhoneNumber(e) {
      console.log('手机号校验信息', e)
    }
  }
}
</script>

<style scoped>
  /*.btn{*/
  /*  color: #333;*/
  /*}*/
</style>

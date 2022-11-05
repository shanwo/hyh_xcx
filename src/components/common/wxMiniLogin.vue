<template>
  <view class="btn_wrap">
    <!--    <button v-if="!version" class="btns" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>-->
    <!--    <button v-if="version" class="btns" @click="getUserInfo">微信登录</button>-->
    <button class="btns" @click="handleNewLogin">微信登录</button>
  </view>
</template>

<script>
import { ajaxLogin } from '@/api/loginApi'

export default {
  data() {
    return {
      version: true,
      backUrl: ''
    }
  },
  mounted() {
    this.backUrl = this.$common.getUrlParams('backUrl')
    console.log('backUrl', this.backUrl)
    // console.log(this.backUrl)
    // if (wx.getUserProfile) {
    //   this.version = true
    // } else {
    //   this.version = false
    // }
    // wx.login({
    //   success(e) {
    //     console.log('code', e.code)
    //     ajaxLogin({ code: e.code }).then(res => {
    //       console.log('res', res)
    //     }).catch(err => {
    //       console.log('err', err)
    //     })
    //   }
    // })
  },
  methods: {
    handleNewLogin() {
      const that = this
      that.$common.showLoading('登录中')
      wx.login({
        success(e) {
          console.log('code', e.code)
          ajaxLogin({ code: e.code }).then(res => {
            console.log('res', res.data.data)
            uni.setStorageSync('userId', res.data.data.id)
            uni.setStorageSync('token', res.data.data.api_token)
            that.$common.hideLoading()
            if (that.backUrl) {
              console.log('4444444444')
              that.$common.redirect({
                url: that.backUrl
              })
            } else {
              console.log('2333333333333')
              that.$common.redirect({
                url: '/pages/index/index'
              })
            }
          }).catch(err => {
            console.log('err', err)
          })
        }
      })
    },
    getUserInfo(e) {
      console.log('getUserInfogetUserInfo', e)
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
  .btns{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 680rpx;
    height: 92rpx;
    background: #F8B800;
    border-radius: 10rpx;
    font-size: 32rpx;
    color: #060606;
  }
</style>

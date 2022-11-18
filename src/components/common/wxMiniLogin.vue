<template>
  <view>
    <view class="box_main">
      <view class="btns" @click="handleNewLogin">
        <!--    <button v-if="!version" class="btns" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>-->
        <!--    <button v-if="version" class="btns" @click="getUserInfo">微信登录</button>-->
        <image class="img_icon" src="https://cdn.shanwo.cc/xcx/Wechat%402x%20%281%29.png" />
        <view class="bvs">微信登录</view>
      </view>
    </view>
    <view class="xieyi_box">
      <img v-if="status == 1" class="choose_icon" src="https://cdn.shanwo.cc/xcx/%E9%80%89%E6%8B%A9.png" alt="" @click="status = 0">
      <img v-else class="choose_icon" src="https://cdn.shanwo.cc/xcx/%E9%80%89%E6%8B%A9%E6%A1%86_%E9%BB%98%E8%AE%A4%20%281%29.png" alt="" @click="status = 1">
      <div class="a_box">
        <view>我已阅读并同意</view>
        <view style="color: #F8B800" @click="handleNextBox">《用户协议》</view>
      </div>
    </view>
  </view>

</template>

<script>
import { ajaxLogin } from '@/api/loginApi'

export default {
  data() {
    return {
      version: true,
      backUrl: '',
      status: 0
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
      if (that.status == 0) {
        that.$common.toast('请勾选用户协议')
        return
      }

      that.$common.showLoading('登录中')
      wx.login({
        success(e) {
          console.log('code', e.code)
          ajaxLogin({ code: e.code }).then(res => {
            console.log('res', res)

            console.log('res', res.data.code)
            if (res.data.code == 200) {
              uni.setStorageSync('userId', res.data.data.id)
              uni.setStorageSync('token', res.data.data.api_token)
              that.$common.hideLoading()
              if (that.backUrl) {
                console.log('4444444444')
                that.$common.redirect({
                  url: that.backUrl
                })
              } else {
                uni.navigateBack()
              }
            } else {
              that.$common.toast('登录失败')
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
    },
    handleNextBox() {
      this.$u.route({
        url: '/pages/aggrement/aggrement'
      })
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
  .bvs{
    background: #F8B800;
  }
  .img_icon{
    width: 48rpx;
    height: 48rpx;
    margin-right: 20rpx;
  }
  .box_main{
    display: flex;
    justify-content: center;
  }
  .a_box{
    color: #fff;
    display: flex;
  }
  .choose_icon{
    width: 36rpx;
    height: 36rpx;
    display: block;
    margin-right: 5rpx;
  }
  .xieyi_box{
    margin-top: 15rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rpx;
    box-sizing: border-box;
  }
</style>

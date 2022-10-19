<template>
  <view>
    <view class="body_bg">
      <!--      <getLocationCom @errorBack="getLocationErrorBack" @successBack="getLocationSuccessBack" />-->
      <view class="content" @click="handleNextPage">
        <skiHeader :show-back="false" :show-back-home="false" :fl-bg-color="'#000000'" :logo="'/static/images/index/homelogo.png'" />
        <div class="head flexbox">张三的滑雪相册</div>
        <div class="flexbox_s_center hxc_label">
          <image class="icon_left" src="/static/images/index/gps@2x.png" />
          <div class="active">爱神滑雪场</div>
          <image class="icon_right" src="/static/images/index/arrow@2x.png" />
        </div>
        <div class="desc_box">北京市昌平区龙泽啊实打实第三方的风格</div>
        <div class="photo_box">
          <div v-for="(item,index) in 3" :key="index" class="photo_list">
            <div class="list_label">
              <div class="fl">
                2022年10月6日
              </div>
              <div class="fr">
                <span>已有</span>
                <span class="active">232</span>
                <span>张照片</span>
                <image class="icon_right" src="/static/images/index/arrow_white@2x.png" />
              </div>
            </div>
            <nineCom />
          </div>

        </div>
        <safeAreaCom />
      </view>
    </view>

  </view></template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
// import getLocationCom from '@/components/common/getLocationCom'
import nineCom from '@/components/common/nineCom'
export default {
  components: {
    skiHeader,
    // getLocationCom,
    safeAreaCom,
    nineCom
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
    // this.$common.showLoading()
    // setTimeout(() => {
    //   this.$common.hideLoading()
    // }, 3000)
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

<style lang="scss" scoped>
@import "/src/static/theme.scss";

.head{
  color: $titleColor;
  font-size: 36rpx;
  font-weight: 600;
  padding-left: 20rpx;
  box-sizing: border-box;
}
.desc_box{
  height: 34rpx;
  font-size: 24rpx;
  font-weight: 400;
  padding-left: 20rpx;
  box-sizing: border-box;
  color: $descColor;
}
.hxc_label{
  padding-left: 20rpx;
  box-sizing: border-box;
  margin: 24rpx 0 4rpx 0;
  .icon_right{
    width: 24rpx;
    height: 24rpx;
  }
  .active{
    line-height: 32rpx;
    color:$titleColor;
    font-size: 28rpx;
    font-weight: 600;
    margin: 0 4rpx;
  }
  .icon_left{
    width: 32rpx;
    height: 32rpx;
  }
}
.photo_box{
  margin-top: 80rpx;
}
.photo_list{
  margin-bottom: 32rpx;
  .list_label{
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    box-sizing: border-box;
    margin-bottom: 18rpx;
    .fl{
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $titleColor;
      line-height: 40rpx;
    }
    .fr{
      display: flex;
      color: $descColor;
      font-weight: 400;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      .active{
        font-weight: 600;
        color: $titleColor;
        margin: 0 4rpx;
      }
      .icon_right{
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
}

</style>

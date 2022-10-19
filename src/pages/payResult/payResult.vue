<template>
  <div class="body_bg">
    <skiHeader />
    <div class="main_box">
      <image src="/static/images/pay/succeed@2x.png" class="icon1" />
      <div class="pay_text">支付成功</div>
    </div>
    <div class="btn_box">
      <div class="list list_ac">
        <image class="icon1" src="/static/images/pay/potos@2x.png" />
        <div>查看照片</div>
      </div>
      <div class="list list_n">
        <image class="icon2" src="/static/images/pay/home@2x.png" />
        <div style="color: #fff">回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import skiHeader from '@/components/common/skiHeader'
export default {
  name: 'PayResult',
  components: {
    skiHeader
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "/src/static/theme";
  .main_box{
    margin-top: 128rpx;
    .icon1{
      display: block;
      margin: 0 auto;
      width: 168rpx;
      height: 168rpx;
    }
    .pay_text{
      text-align: center;
      height: 50rpx;
      font-size: 36rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $descColor;
      margin-top: 20rpx;
    }
  }
  .btn_box{
    margin-top: 148rpx;
    .list{
      width: 680rpx;
      margin: 0 auto 32rpx;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32rpx;
      font-weight: 600;
      color: #060606;
      height: 92rpx;
      .icon1{
        width: 46rpx;
        height: 36rpx;
        margin-right: 8rpx;
      }

      .icon2{
        width: 42rpx;
        height: 40rpx;
        margin-right: 28rpx;
      }
    }
    .list_ac{
      background: $titleColor;
    }
    .list_n{
      background: #171b20;
    }
  }
</style>

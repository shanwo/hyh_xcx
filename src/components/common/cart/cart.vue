<template>
  <div class="footer_box">
    <div class="flexbox" @click="handleNextCart">
      <div style="position: relative">
        <image class="img_sa" src="https://cdn.shanwo.cc/xcx/shoppingssad.png" />
        <div v-if="num" class="num">
          {{ num }}
        </div>
      </div>

      <div class="title">购物车</div>
      <image class="img_sad" src="https://cdn.shanwo.cc/xcx/arrow_white@2x.png" />
    </div>
    <div>
      <safeAreaCom />
    </div>
  </div>

</template>

<script>
import safeAreaCom from '@/components/common/safeAreaCom'
export default {
  name: 'Cart',
  components: {
    safeAreaCom
  },
  data() {
    return {
      num: 1
    }
  },
  methods: {
    handleNextCart() {
      this.$common.push({
        url: '/pages/cart/cart'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "src/static/theme.scss";
  .footer_box{
    width: 750rpx;
    background: rgba(0,0,0,0.6);
    opacity: 0.6;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .flexbox{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120rpx;
  }
  .img_sa{
    width: 48rpx;
    height: 48rpx;

  }
  .img_sad{
    width: 32rpx;
    height: 32rpx;
  }
  .title{
    margin: 0 16rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #fff;
  }
  .num{
    position: absolute;
    top: -19rpx;
    width: 34rpx;
    height: 28rpx;
    font-size: 24rpx;
    text-align: center;
    line-height: 28rpx;
    background: #FF4444;
    border: 3rpx solid #FFFFFF;
    color: #fff;
    left: 35rpx;
  }
</style>

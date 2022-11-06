<template>
  <view class="main_box">
    <image class="big_img" style="position: fixed;bottom: -200rpx;width: 20px;height: 20px" mode="widthFix" :src="imgList[imgShowIndex].url" @load="imgLoad" />
    <view class="header_box">
      <image class="close_img" src="/static/images/cart/close@2x.png" @click="handleClose" />
    </view>
    <swiper class="swiper_box" :style="{height:sHeight+'px'}" :circular="true" :current="currentIndex" @transition="swipertransition" @animationfinish="animationfinish" @change="listenSwiperChange">
      <swiper-item v-for="(item,index) in imgList" :key="index" class="swiperitem">
        <image class="shuiyin1" src="/static/images/cart/shuiyin.png" />
        <image class="shuiyin2" :style="{top: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />
        <image class="shuiyin3" :style="{bottom: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />
        <image v-if="sWidth && imgStatus&& sHeight" class="big_img" :style="{width:sWidth+'px',height:sHeight+'px' }" :src="imgList[imgShowIndex].url" />
        <image v-if="!imgStatus" mode="aspectFit" class="big_img" :src="imgList[imgShowIndex].url" />
      </swiper-item>
    </swiper>
    <view class="num_box">
      {{ imgShowIndex + 1 }}/{{ imgList.length }}
    </view>

    <!--    <view class="mid_box">-->
    <!--      <image class="shuiyin1" src="/static/images/cart/shuiyin.png" />-->
    <!--      <image class="shuiyin2" :style="{top: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />-->
    <!--      <image class="shuiyin3" :style="{bottom: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />-->
    <!--      <image v-if="sWidth && imgStatus&& sHeight" class="big_img" :style="{width:sWidth+'px',height:sHeight+'px' }" :src="photoObj.url" />-->
    <!--      <image v-if="!imgStatus" mode="aspectFit" class="big_img" :src="photoObj.url" />-->
    <!--    </view>-->
    <view class="footer_box">
      <view class="cart_box" @click="handleAddCart">
        <image class="cart_icon" src="https://cdn.shanwo.cc/xcx/shoppingssad.png" />
        <view class="title-1">加入购物车</view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  name: 'PhotoDetailDialog',
  props: {
    photoObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loadingStatus: true,
      imgShowIndex: 0,
      currentIndex: 0,
      sWidth: 0,
      sHeight: 0,
      imgStatus: false,
      status: false,
      swiperVal: '',
      imgList: []
    }
  },
  methods: {
    init(data, index) {
      // data = [
      //   {
      //     url: 'https://sw-img-1255862984.cos.ap-beijing.myqcloud.com/picture/7/2022-11/01-thumbnail/DSC03947.JPG'
      //   }, {
      //     url: 'https://sw-img-1255862984.cos.ap-beijing.myqcloud.com/picture/7/2022-11/01-thumbnail/DSC03943.JPG'
      //   },
      //   {
      //     url: 'https://sw-img-1255862984.cos.ap-beijing.myqcloud.com/picture/7/2022-11/01-thumbnail/DSC03939.JPG'
      //   }
      // ]
      this.imgShowIndex = index
      this.imgList = data
    },
    swipertransition(e) {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus) {
        // this.$common.showLoading('')
        this.loadingStatus = false
      }
      // console.log('swipertransition', e)
      this.swiperVal = e.detail.dx
    },
    animationfinish(e) {
      if (Math.abs(this.swiperVal) > 0) {
        if (this.swiperVal > 0) {
          this.imgShowIndex++
          console.log('左滑')
          if (this.imgShowIndex == this.imgList.length) {
            console.log('最后一张了')
            this.imgShowIndex = 0
          }
        } else {
          this.imgShowIndex--
          if (this.imgShowIndex == -1) {
            this.imgShowIndex = this.imgList.length - 1
          }

          console.log('this.imgShowIndex', this.imgShowIndex)
          console.log('右滑')
        }
        this.$common.hideLoading()
        this.loadingStatus = true
        console.log('animationfinish', e)
      }
    },
    listenSwiperChange(e) {
      this.currentIndex = e.detail.current
      // if (e.detail.current - this.currentIndex > 0 && e.detail.current - this.currentIndex < 2) {
      //   console.log('左滑')
      //   if (this.currentIndex == this.imgList.length - 1) {
      //     this.currentIndex = this.imgList.length - 1
      //   } else {
      //     this.currentIndex += 1
      //   }
      // } else {
      //   console.log('右滑')
      //   this.currentIndex--
      // }
    },
    imgLoad(e) {
      const sys = uni.getSystemInfoSync()
      console.log(sys, e.detail.width)
      if (e.detail.width > e.detail.height) {
        this.sWidth = sys.screenWidth
        this.sHeight = this.sWidth * e.detail.height / e.detail.width
        this.status = true
        this.imgStatus = true
        console.log('代表长图', this.sHeight)
      } else if (e.detail.width < e.detail.height) {
        this.status = false
        this.imgStatus = false
      }
    },
    handleAddCart() {
      const cartList = uni.getStorageSync('cartList') || []
      const cartIdArr = []
      cartList.forEach(val => {
        cartIdArr.push(val.id)
      })
      if (cartIdArr.includes(this.photoObj.id)) {
        this.$common.toast('购物车已存在该照片')
        return
      } else {
        this.$common.toast('添加成功')
        cartList.push(this.photoObj)
        uni.setStorageSync('cartList', cartList)
      }
      uni.$emit('changeCartNum', { msg: '页面更新' })
    },
    handleClose() {
      this.$emit('listenClose')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "/src/static/theme";
  .main_box{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
    background: $bgColor;

    .title-1{
      font-size: 32rpx;
      font-weight: 600;
      color: #FFFFFF;
    }
    .cart_box{
      width: 272rpx;
      height: 68rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 34rpx;
      background: #171b20;
      opacity: 0.8;
      margin-top: 10rpx;
      border: 2rpx solid #4E5969;

    }
  }
.cart_icon{
  width: 48rpx;
  height: 48rpx;
  display: block;
}
.big_img{
  display: block;
}
.footer_box{
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 20rpx;
}
.header_box{
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 40rpx;
  box-sizing: border-box;
  margin-bottom: 6rpx;
  .close_img{
    width: 48rpx;
    height: 48rpx;
    display: block;
  }
}
.mid_box{
  position: relative;
  overflow: hidden;
  max-height: 860rpx;

}
.shuiyin1{
  position: absolute;
  left:50%;
  top: 50%;
  margin-top: -83rpx;
  margin-left: -290rpx;
  z-index: 1;
  width: 598rpx;
  height: 166rpx;
}
.shuiyin2{
  position: absolute;
  top: 100rpx;
  left:50%;
  z-index: 1;
  width: 598rpx;
  height: 166rpx;
}
.shuiyin3{
  position: absolute;
  left:-50%;
  bottom: 100rpx;
  z-index: 1;
  width: 598rpx;
  height: 166rpx;
}
.swiper_box{
  width: 100%;
  position: relative;
}
.swiperitem{
  position: relative;

}
.num_box{
  text-align: center;
  color: #fff;
  font-size: 24rpx;
  margin: 20rpx 0;
}
</style>

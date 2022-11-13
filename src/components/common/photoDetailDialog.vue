<template>
  <view class="main_box">
    <image class="big_img" style="position: fixed;bottom: -200rpx;width: 20px;height: 20px" mode="widthFix" :src="imgList[imgShowIndex].url" @load="imgLoad" />
    <view class="header_box">
      <image class="close_img" src="/static/images/cart/close@2x.png" @click="handleClose" />
    </view>
    <block v-if="imgList.length > 1">
      <swiper class="swiper_box" :style="{height:sHeight+'px'}" :circular="true" :current="currentIndex" @transition="swipertransition" @animationfinish="animationfinish" @change="listenSwiperChange">
        <swiper-item v-for="(item,index) in 3" :key="index" class="swiperitem">
          <!--          <image class="shuiyin1" src="/static/images/cart/shuiyin.png" />-->
          <!--          <image class="shuiyin2" :style="{top: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />-->
          <!--          <image class="shuiyin3" :style="{bottom: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />-->
          <image class="new_shuiyin" mode="widthFix" src="https://cdn.shanwo.cc/xcx/sdjfhsdkf.png" />

          <image v-if="sWidth && imgStatus&& sHeight" class="big_img" :style="{width:sWidth+'px',height:sHeight+'px' }" :src="imgList[imgShowIndex].url" />
          <image v-if="!imgStatus" mode="aspectFit" :style="{width:sWidth+'px',height:sHeight+'px' }" class="big_img" :src="imgList[imgShowIndex].url" />
        </swiper-item>
      </swiper>
    </block>
    <view v-if="imgList.length==1" class="mid_box">
      <image class="big_img" style="position: fixed;bottom: -200rpx;width: 20px;height: 20px" mode="widthFix" :src="imgList[0].url" @load="imgLoad" />
      <!--      <image class="shuiyin1" src="/static/images/cart/shuiyin.png" />-->
      <!--      <image class="shuiyin2" :style="{top: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />-->
      <!--      <image class="shuiyin3" :style="{bottom: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />-->
      <image class="new_shuiyin" mode="widthFix" src="https://cdn.shanwo.cc/xcx/sdjfhsdkf.png" />
      <image v-if="sWidth && imgStatus&& sHeight" class="big_img" :style="{width:sWidth+'px',height:sHeight+'px' }" :src="imgList[0].url" />
      <image v-if="!imgStatus" mode="aspectFit" :style="{width:sWidth+'px',height:sHeight+'px' }" class="big_img" :src="imgList[0].url" />
    </view>

    <view v-if="pageFrom == 'timePhoto'" class="footer_box1">
      <view class="cart_box1" @click="handleAddCart">
        <view v-if="imgList.length > 1" class="num_box">
          {{ imgShowIndex + 1 }}/{{ imgList.length }}
        </view>
        <view v-else class="num_box">
          1/1
        </view>
        <image class="cart_icon1" src="https://cdn.shanwo.cc/xcx/asdjhasduirel.png" />
      </view>
    </view>
    <!--购物车的弹窗 选择的按钮-->
    <view v-if="pageFrom == 'cart'" class="footer_box1">
      <view class="cart_box1">
        <view v-if="imgList.length > 1" class="num_box">
          {{ imgShowIndex + 1 }}/{{ imgList.length }}
        </view>
        <view v-else class="num_box">
          1/1
        </view>
        <image v-if="imgList[imgShowIndex].chooseStatus == 1" class="cart_icon1" src=" https://cdn.shanwo.cc/xcx/choosetrue.png" @click.stop="handleChoose" />
        <image v-else class="cart_icon1" src="https://cdn.shanwo.cc/xcx/choosenone.png" @click.stop="handleChoose" />
      </view>
    </view>

    <!--    <view v-if="pageFrom == 'my'" class="footer_box">-->
    <!--      <view class="cart_box" @click="handleSaveImg">-->
    <!--        <image class="cart_icon" src="https://cdn.shanwo.cc/xcx/bianzu.png" />-->
    <!--        <view class="title-1">下载照片</view>-->
    <!--      </view>-->
    <!--    </view>-->

  </view>
</template>

<script>
export default {
  name: 'PhotoDetailDialog',
  props: {
    photoObj: {
      type: Object,
      default: () => {}
    },
    pageFrom: {
      type: String,
      default: ''
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
      allImgList: [],
      imgList: []
    }
  },
  methods: {
    init(data, index) {
      this.imgShowIndex = index
      this.imgList = data
    },
    swipertransition(e) {
      // console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus) {
        this.loadingStatus = false
      }
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
        if (this.pageFrom == 'cart') {
          // 如果是购物车页面 需要更新选择状态
          console.log('this.imgList[index]', this.imgList[this.imgShowIndex])
        }
      }
    },
    listenSwiperChange(e) {
      this.currentIndex = e.detail.current
    },
    imgLoad(e) {
      console.log('图片加载', e)
      const sys = uni.getSystemInfoSync()
      console.log(sys, e.detail.width)
      if (e.detail.width > e.detail.height) {
        this.sWidth = sys.screenWidth
        this.sHeight = this.sWidth * e.detail.height / e.detail.width
        this.status = true
        this.imgStatus = true
        console.log('代表宽图')
      } else if (e.detail.width < e.detail.height) {
        console.log('代表长图')
        this.sHeight = sys.screenHeight - 320
        this.sWidth = sys.screenWidth
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
    },
    handleSaveImg() {
      console.log('photoObj', this.photoObj)
      uni.setStorageSync('downImgs', [this.photoObj])
      this.$common.push({ url: '/pages/downLoadFile/downLoadFile' })
    },
    handleChoose() {
      if (this.imgList[this.imgShowIndex].chooseStatus == 1) {
        this.imgList[this.imgShowIndex].chooseStatus = 0
        this.$emit('listenCancel', this.imgList[this.imgShowIndex])
      } else {
        this.imgList[this.imgShowIndex].chooseStatus = 1
        this.$emit('listenSuccess', this.imgList[this.imgShowIndex])
      }
      console.log(this.imgList[this.imgShowIndex])
      this.$forceUpdate()
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
      margin-right: 40rpx;
    }
  }
.cart_icon1{
  width: 64rpx;
  height: 64rpx;
  display: block;
  position: absolute;
  right: 40rpx;
  top: 0;
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
  position: fixed;
  z-index: 100;
  bottom: 150rpx;
}
.footer_box1{
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  z-index: 100;
  bottom: 150rpx;
}
.header_box{
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 40rpx;
  box-sizing: border-box;
  margin-bottom: 6rpx;
  position: fixed;
  z-index: 100;
  top: 200rpx;
  .close_img{
    width: 64rpx;
    height: 64rpx;
    display: block;
  }
}
.mid_box{
  position: relative;
  overflow: hidden;
  max-height: 860rpx;

}
.new_shuiyin{
  position: absolute;
  left: 100rpx;
  top: 0;
  z-index: 1;
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
.cart_icon1{
  width: 64rpx;
  height: 64rpx;
  display: block;
  position: absolute;
  right: 40rpx;
  top: 0;
}
</style>

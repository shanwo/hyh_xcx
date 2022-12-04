<template>
  <view class="main_box">
    <image class="big_img" style="position: fixed;bottom: -200rpx;width: 20px;height: 20px" mode="widthFix" :src="photoObj.thumbnail_url" @load="imgLoad" />

    <view class="header_box">
      <image class="close_img" src="/static/images/cart/close@2x.png" @click="handleClose" />
    </view>
    <view class="mid_box">
      <image class="shuiyin1" src="/static/images/cart/shuiyin.png" />
      <image class="shuiyin2" :style="{top: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />
      <image class="shuiyin3" :style="{bottom: status ? '0':'20px'}" src="/static/images/cart/shuiyin.png" />
      <image v-if="sWidth && imgStatus&& sHeight" class="big_img" :style="{width:sWidth+'px',height:sHeight+'px' }" :src="photoObj.thumbnail_url" />
      <image v-if="!imgStatus" mode="aspectFit" class="big_img" :src="photoObj.thumbnail_url" />
    </view>
    <view class="footer_box">
      <view class="cart_box" @click="handleSaveImg">
        <image class="cart_icon" src="https://cdn.chillman.cc/xcx/bianzu.png" />
        <view class="title-1">下载照片</view>
      </view>
    </view>

  </view>
</template>

<script>
import { checkAuth } from '../../utils/downFile'
export default {
  name: 'PhotoDown',
  props: {
    photoObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sWidth: '',
      sHeight: '',
      imgStatus: false,
      status: false,
      saveNum: 0,
      oTimer: null,
      imgUrl: [],
      numArr: [],
      tempFile: [] // 下载下来的临时文件
    }
  },
  methods: {
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
    handleSaveImg() {
      console.log('photoObj', this.photoObj)
      uni.setStorageSync('downImgs', [this.photoObj])
      this.$common.push({ url: '/pages/downLoadFile/downLoadFile' })
      // console.log(this)
      // checkAuth(() => {
      //   wx.showLoading({
      //     title: '保存中',
      //     mask: true
      //   })
      //   this.downloadSaveFile(this.photoObj.original_url)
      // })
    },
    saveImgFileTool() {
      // const _this = this
      // wx.saveImageToPhotosAlbum({
      //   filePath: _this.tempFile[0],
      //   success: res => {
      //     _this.$common.toast('保存成功')
      //   },
      //   fail: res => {
      //     console.log('保存失败', res)
      //     wx.showToast({
      //       title: '保存失败',
      //       icon: 'none'
      //     })
      //   }
      // })
    },
    downloadSaveFile(url) {
      console.log('----------------')
      const _this = this
      this.$common.showLoading('正在下载图片')
      wx.downloadFile({
        url: url,
        success: res => {
          if (res.statusCode === 200) {
            _this.tempFile.push(res.tempFilePath)
            console.log('临时路径', this.tempFile)
            _this.saveImgFileTool()
          }
        }
      })
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
}

</style>

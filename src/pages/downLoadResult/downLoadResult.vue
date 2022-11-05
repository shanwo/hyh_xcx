<template>
  <div class="body_bg">
    <skiHeader />
    <div class="main_box">
      <image src="/static/images/pay/succeed@2x.png" class="icon1" />
      <div class="pay_text">下载成功!</div>
    </div>
    <div v-if="showImgs.length > 1">
      <nine-com :img-list="showImgs" />
    </div>
    <div v-else>
      <img style="width: 428rpx;margin: 100rpx auto 0;display: block" :src="showImgs[0].url" mode="widthFix" alt="">
    </div>
    <div class="btn_box" @click="handleSaveImg">
      <div class="list list_ac">
        <image class="icon1" src="/static/images/pay/potos@2x.png" />
        <div>全部保存到相册</div>
      </div>
    </div>
  </div>
</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import nineCom from '@/components/common/nineCom'
import { checkAuth } from '@/utils/downFile'
export default {
  name: 'PayResult',
  components: {
    skiHeader,
    nineCom
  },
  data() {
    return {
      saveNum: 0,
      showImgs: [],
      tempFile: [],
      downTempFile: []

    }
  },
  onLoad() {
    this.init()
  },
  methods: {
    init() {
      this.downTempFile = uni.getStorageSync('tempFile')
      this.tempFile = uni.getStorageSync('tempFile')
      this.tempFile.forEach(val => {
        this.showImgs.push({
          url: val
        })
      })
    },
    handleSaveImg() {
      checkAuth(() => {
        wx.showLoading({
          title: '保存中',
          mask: true
        })
        this.saveImgFileTool()
      })
    },
    saveImgFileTool() {
      if (this.saveNum == this.tempFile.length) {
        console.log('不需要递归了')
        try {
          uni.removeStorageSync('tempFile')
          uni.removeStorageSync('downImgs')
        } catch (e) {
          console.log('清除失败e', e)
        }
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
        return
      }
      const _this = this

      wx.saveImageToPhotosAlbum({
        filePath: _this.tempFile[_this.saveNum],
        success: res => {
          _this.saveNum++
          console.log('保存成功', res)
          this.saveImgFileTool()
        },
        fail: res => {
          console.log('保存失败', res)
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      })
    }
  }
}
</script>
<style>
  page{
    background-color:#000000;
  }
</style>
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

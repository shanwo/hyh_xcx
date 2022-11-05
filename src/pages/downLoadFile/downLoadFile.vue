<template>
  <div class="body_bg">
    <skiHeader />
    <!--    <div style="color: #fff" @click="handleCeshi">点击</div>-->
    <div class="top_box">
      <img class="icon" src="https://cdn.shanwo.cc/xcx/xiazaiicon213123.png" alt="">
      <div class="title">正在下载请勿关闭...</div>
    </div>
    <div>
      <div v-for="(item,index) in showImgs" :key="index" class="main_box">
        <img :src="item.thumbnail_url" alt="" class="fl_icon">
        <div class="fr">
          <div>{{ item.name }}</div>
          <u-line-progress :percentage="numArr[index]" height="8" />
        </div>
      </div>
    </div>
    <div class="footer_btn" @click="handleClose">取消</div>
    <!--    <div style="margin-top: 100px" @click="handleDown">点击下载</div>-->
    <!--    <div>-->
    <!--      <image v-for="(item,index) in tempFile" :key="index" :src="item" />-->
    <!--    </div>-->
    <!--    <div @click="handleSaveImg">保存</div>-->
  </div>
</template>

<script>
import { checkAuth } from '@/utils/downFile'
import skiHeader from '@/components/common/skiHeader'
export default {
  name: 'DownLoadFile',
  components: {
    skiHeader
  },
  data() {
    return {
      downTasks: [],
      status: true,
      saveNum: 0,
      oTimer: null,
      showImgs: [],
      numArr: [],
      tempFile: [] // 下载下来的临时文件
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //
    // handleCeshi() {
    //   uni.setStorageSync('downImgs', [{ 'name': 'hy', 'original_url': 'https://sw-img-1255862984.cos.ap-beijing.myqcloud.com/picture/7/2022-11/01-thumbnail/DSC03939.JPG', 'thumbnail_url': '' }, { 'name': 'hy', 'original_url': 'https://sw-img-1255862984.cos.ap-beijing.myqcloud.com/picture/7/2022-11/01-thumbnail/DSC03939.JPG', 'thumbnail_url': 'https://cdn.shanwo.cc/xcx/homelogo.png' }])
    //   this.init()
    // },
    handleClose() {
      try {
        this.status = false
        this.downTasks.forEach(val => {
          val.abort()
        })
        uni.navigateBack()
      } catch (e) {
        uni.navigateBack()
      }
    },
    init() {
      this.showImgs = uni.getStorageSync('downImgs')
      const downImgs = uni.getStorageSync('downImgs')
      const imgs = []
      downImgs.forEach(val => {
        imgs.push(val.original_url)
      })
      this.imgUrl = imgs
      setTimeout(() => {
        this.handleDown()
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
      if (this.saveNum === this.tempFile.length) {
        console.log('不需要递归了')
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
    },
    handleDown() {
      const obj = [0, 0]
      this.imgUrl.forEach((v, i) => {
        this.downloadSaveFile(v, i, obj)
      })
    },
    downloadSaveFile(url, k, obj) {
      console.log('----------------')
      const _this = this
      // this.$common.showLoading('正在下载图片')

      _this.downTasks[k] = wx.downloadFile({
        url: url,
        success: res => {
          if (res.statusCode === 200) {
            this.tempFile.push(res.tempFilePath)
            console.log('临时路径', this.tempFile)
            uni.setStorageSync('tempFile', _this.tempFile)
          }
        },
        fail: err => {
          console.log('下载失败', err)
        },
        complete: res => {
          console.log('下载complete', res)
        }
      })
      // console.log('keyName', keyName)
      _this.downTasks[k].onProgressUpdate(res => {
        _this.numArr[k] = res.progress
        _this.$forceUpdate()
        // console.log(`第${k}张照片的下载进度`, res.progress / 100)
        console.log('照片进度', _this.numArr)
        let sum = 0
        for (let i = 0; i < _this.numArr.length; i++) {
          sum += _this.numArr[i] * 1
          console.log('总进度', sum)
          if (sum === this.numArr.length * 100 && this.numArr.length) {
            console.log('所有图片下载完成了', _this.tempFile)
            this.$common.hideLoading()
            _this.$common.redirect({ url: '/pages/downLoadResult/downLoadResult' })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .top_box{
    .icon{
      display: block;
      width: 90rpx;
      height: 90rpx;
      margin: 124rpx auto 24rpx;
    }
    .title{
      font-size: 28rpx;
      font-weight: 400;
      color: #fff;
      text-align: center;
    }
  }
  .main_box{
    display: flex;
    align-items: center;
    padding: 0 98rpx;
    box-sizing: border-box;
    margin-bottom: 16rpx;

    .fl_icon{
      width: 64rpx;
      height: 64rpx;
      margin-right: 8rpx;
    }
    .fr{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #fff;
    }
  }
  .footer_btn{
    position: fixed;
    left: 36rpx;
    right: 36rpx;
    height: 92rpx;
    background: #F8B800;
    border-radius: 10px;
    font-size: 32rpx;
    font-weight: 600;
    color: #060606;
    text-align: center;
    line-height: 92rpx;
    bottom: 184rpx;
  }
</style>

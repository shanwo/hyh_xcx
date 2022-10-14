<template>
  <div>
    <div style="margin-top: 100px" @click="handleDown">点击下载</div>
    <div>
      <image v-for="(item,index) in tempFile" :key="index" :src="item" />
    </div>
    <div @click="handleSaveImg">保存</div>
  </div>
</template>

<script>
import { downloadFiles, saveImgFile, checkAuth } from '@/utils/downFile'

export default {
  name: 'DownLoadFile',
  data() {
    return {
      saveNum: 0,
      oTimer: null,
      imgUrl: [],
      numArr: [],
      tempFile: [] // 下载下来的临时文件
    }
  },
  mounted() {
    this.imgUrl = [
      'https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png',
      'https://cdn3custom-mall.zengapp.cn/yfy/goods/flowerTravel/main/main.png',
      'https://cdn3custom-mall.zengapp.cn/yfy/goods/jinsimudan22tou/main/main.png',
      'https://cdn3custom-mall.zengapp.cn/yfy/goods/celebration-cup/main/main.jpg',
      'https://cdn3custom-mall.zengapp.cn/yfy/goods/constellation-cup/main/main.jpg',
      'https://cdn3custom-mall.zengapp.cn/yfy/goods/jinsimudan9/xiangwu/main.png'
    ]
  },
  methods: {
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
      this.imgUrl.forEach((v, i) => {
        this.downloadSaveFile(v, i)
      })
    },
    downloadSaveFile(url, k) {
      console.log('----------------')
      const _this = this
      this.$common.showLoading('正在下载图片')
      wx.downloadFile({
        url: url,
        success: res => {
          if (res.statusCode === 200) {
            this.tempFile.push(res.tempFilePath)
            console.log('临时路径', this.tempFile)
          }
        }
      }).onProgressUpdate(res => {
        _this.numArr[k] = res.progress
        // console.log(`第${k}张照片的下载进度`, res.progress / 100)
        console.log('照片进度', _this.numArr)
        let sum = 0
        for (let i = 0; i < _this.numArr.length; i++) {
          sum += _this.numArr[i] * 1
          console.log('总进度', sum)
          if (sum === this.numArr.length * 100 && this.numArr.length) {
            console.log('所有图片下载完成了')
            setTimeout(() => {
              this.$common.hideLoading()
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

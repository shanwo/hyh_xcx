<template>
  <div>
    <skiHeader title="测试" />
    <image src="https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png" />
    <div>
      <tabsCom />
    </div>
    <div>
      啊实打实
      阿斯达撒所
    </div>
    <div @click="handleDownImg">下载图片</div>
  </div>
</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import tabsCom from '@/components/common/tabsCom'
import { downloadFiles } from '@/utils/downFile'
export default {
  name: 'Demo',
  components: {
    skiHeader,
    tabsCom
  },
  methods: {
    handleDownImg() {
      this.reiveIamge()
    },
    reiveIamge() {
      const that = this
      downloadFiles(['https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png', 'https://cdn3custom-mall.zengapp.cn/yfy/goods/flowerTravel/main/main.png', 'https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png', 'https://cdn3custom-mall.zengapp.cn/yfy/goods/flowerTravel/main/main.png', 'https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png', 'https://cdn3custom-mall.zengapp.cn/yfy/goods/flowerTravel/main/main.png'])
      // wx.downloadFile({ // 下载图片到本地
      //
      //   url: 'https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png',
      //
      //   success(res) {
      //     if (res.statusCode === 200) {
      //       const img = res.tempFilePath
      //       console.log('图片临时路径', img)
      //       wx.saveImageToPhotosAlbum({ // 只支持本地图片所以要先把图片下载下来
      //
      //         filePath: img,
      //
      //         success(result) {
      //           wx.showToast({
      //
      //             title: '已保存至相册',
      //
      //             icon: 'success'
      //
      //           })
      //         }, fail(res) {
      //           wx.showToast({
      //
      //             title: '保存失败',
      //
      //             icon: 'error'
      //
      //           })
      //         }
      //
      //       })
      //     }
      //   }
      // })
    }
  }
}
</script>

<style scoped>

</style>

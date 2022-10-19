<template>
  <div>
    <skiHeader title="测试" />
    <div class="parent_box" @click="handleAdd">
      <image
        src="https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png"
      />
      <image

        :class="[status === true?'move_left':'','son_box']"
        src="https://cdn3custom-mall.zengapp.cn/yfy/goods/xfhmaster/main/main.png"
        @click="handleAdd"
      />
    </div>

    <div>
      <tabsCom :current="0" :list="list" />
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
  data() {
    return {
      status: false,
      list: [{
        name: '12:00'
      },
      {
        name: '13:00'
      }, {
        name: '14:00'
      },
      {
        name: '15:00'
      },
      {
        name: '16:00'
      }, {
        name: '17:00'
      },
      {
        name: '18:00'
      },
      {
        name: '19:00'

      }
      ]
    }
  },
  methods: {
    handleAdd() {
      this.status = true
    },
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
/*animation: name duration timing-function delay iteration-count direction fill-mode;*/
/*去前面两个属性 name duration一定要写      默认的你不用改的可以不用写*/
/*animation: move 2s linear 0s 2 alternate forwards ;*/
.parent_box{
  position: relative;
}
.son_box{
  position: absolute;
  left: 0;
  top: 0;
}
.move_left {

  animation: moveleft 200ms linear;
}

@keyframes moveleft {
  from {
    opacity: 1;
    top: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 0;
    left: 100px;
    top: 1000px;
    transform: rotate(180deg);
  }
}

</style>

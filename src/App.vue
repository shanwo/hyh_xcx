<script>
import baseUrl from '@/request/baseUrl'
export default {
  globalData: {
    statusBarHeight: Number, // 状态栏高度
    isIphoneX: Boolean, // 是否iphoneX
    jsonDetail: null // 设备信息
  },
  onLaunch: function() {
    this.getstatusBarHeightMiXin()
  },
  onShow: function() {
    console.log('App Show')
    // #ifdef MP-WEIXIN
    // 小程序版本更新
    this.upDateApp()
    // #endif
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    upDateApp() {
      console.log('版本更新函数')
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        console.log('res', res)
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            updateManager.applyUpdate()
          })
        }
      })
    },
    // 全局获取状态栏高度
    getstatusBarHeightMiXin() {
      uni.getSystemInfo({
        success: (res) => {
          this.globalData.statusBarHeight = res.statusBarHeight
          this.globalData.jsonDetail = res
          let xBarHeight = 0
          // #ifdef H5
          if (res.model.includes('iPhone')) {
            uni.setStorageSync('originUrl', window.location.href.split('#')[0])
          }
          // #endif
          if (res.model && res.model.includes('iPhone X') || res.safeArea.top >= 40) {
            this.globalData.isIphoneX = true
            xBarHeight = 34
          }
          this.globalData.xBarHeight = xBarHeight
        }
      })
    }
  }
}

</script>

<style>
	/*每个页面公共css */
</style>

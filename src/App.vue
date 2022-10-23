<script>
import baseObj from '@/request/baseUrl'
export default {
  globalData: {
    statusBarHeight: '', // 状态栏高度
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
          console.log('12342')
          this.globalData.statusBarHeight = res.statusBarHeight
          this.globalData.jsonDetail = res
          let xBarHeight = 0
          // #ifdef H5
          if (res.model.includes('iPhone')) {
            uni.setStorageSync('originUrl', window.location.href.split('#')[0])
          }
          // #endif
          if (res.model && res.model.includes('iPhone X') || res.safeArea.top >= 40) {
            xBarHeight = 34
          }
          this.globalData.xBarHeight = xBarHeight
        }
      })
    }
  }
}

</script>

<style lang="scss">
	/*每个页面公共css */
  @import "static/theme.scss";
  .body_bg{
    background: $bgColor;
    min-height: 100vh;
  }
  .flexbox{
    display: flex;
    flex: 1;
  }
  .flexbox_h_center{
    display: flex;
    justify-content: center;
  }
  .flexbox_s_center{
    display: flex;
    align-items: center;
  }
  .flexbox_center{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

</style>

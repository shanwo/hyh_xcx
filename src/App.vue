<script>
import baseUrl from '@/request/baseUrl'
export default {
  onLaunch: function() {
    this.getstatusBarHeightMiXin()
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    getstatusBarHeightMiXin() {
      uni.getSystemInfo({
        success: (res) => {
          // #ifdef H5
          if (res.model.includes('iPhone')) {
            uni.setStorageSync('localShareUrl', window.location.href.split('#')[0])
          }
          // #endif
        }
      })
    }
  }
}

</script>

<style>
	/*每个页面公共css */
</style>

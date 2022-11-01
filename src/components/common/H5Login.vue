<template>
  <div />
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      backUrl: ''
    }
  },
  mounted() {
    this.backUrl = this.$common.getUrlParams('backUrl') || '/pages/index/index'
    // #ifdef H5
    this.wxH5Login()
    // #endif
  },
  methods: {
    wxH5Login() {
      const token = sessionStorage.getItem('token')
      if (token) { // 如果用户已经登录了
        console.log('已登录')
        this.$common.push({ url: this.backUrl })
      } else { // 用户未登录的情况下
        const code = this.$common.getUrlParams('code') || ''
        // TODO 这里要记得测试一下从安卓浮窗进入
        if (this.$common.isNull(code)) {

        } else {
          // 拿到code，但是没有token(也就是没有登陆注册或者再次进入平台)
          this.wxAuthLogin() // 微信授权
        }
      }
    },
    wxAuthLogin(way = 'snsapi_userinfo') {
      // 当前 url
      let currentUrl = window.location.href
      // 删除 url 中 code，防止多次拼接
      currentUrl = this.$common.removeURLParameter(currentUrl, 'code')
      // 公众号 appId
      const appid = localStorage.getItem('appId')
      // 授权方式 snsapi_userinfo: 显示授权；snsapi_base: 静默授权
      const scope = way
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
        currentUrl
      )}&response_type=code&scope=${scope}&state=1&connect_redirect=1#wechat_redirect`
    }
  }
}

</script>

<style scoped>

</style>

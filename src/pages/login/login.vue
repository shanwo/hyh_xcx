
<template>
  <div>
    <!-- #ifdef H5 -->
    <H5Login />
    <!-- #endif-->
    <!-- #ifdef MP-WEIXIN -->
    <wx-mini-login />
    <!-- #endif-->
    <!--    <button type="default" open-type="getUserInfo" @getuserinfo="listengetuserinfo">立即登录</button>-->

  </div>
</template>

<script>
import H5Login from '@/components/common/H5Login'
import wxMiniLogin from '@/components/common/wxMiniLogin'
export default {
  components: {
    H5Login,
    wxMiniLogin
  },
  data() {
    return {

    }
  },
  methods: {
    listengetuserinfo(e) {

    }
  }
}

</script>
<style>

</style>

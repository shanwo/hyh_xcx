
<template>
  <div class="body_bg">
    <div class="main_box" :style="{top:top1}">
      <image class="shandian" src="https://cdn.shanwo.cc/xcx/asjdkas.png" />
    </div>
    <div class="logo_box" :style="{top:top2}">
      <image class="logo" src="https://cdn.shanwo.cc/xcx/skier2x.png" />
    </div>
    <!--    &lt;!&ndash; #ifdef H5 &ndash;&gt;-->
    <!--    <H5Login />-->
    <!--    &lt;!&ndash; #endif&ndash;&gt;-->
    <div class="login_box" :style="{top:top3}">
      <image class="desc_logo" src="https://cdn.shanwo.cc/xcx/jsahffbs.png" />
      <wx-mini-login />
    </div>
  </div>
</template>

<script>
import wxMiniLogin from '@/components/common/wxMiniLogin'

export default {
  components: {
    wxMiniLogin
  },
  data() {
    return {
      top1: '',
      top2: '',
      top3: ''
    }
  },
  mounted() {
    const sys = uni.getSystemInfoSync()
    console.log('sys', sys)
    if (sys.screenHeight < 812) {
      this.top1 = '200rpx'
      this.top2 = '80rpx'
      this.top3 = '890rpx'
    } else {
      this.top1 = '300rpx'
      this.top2 = '200rpx'
      this.top3 = '1010rpx'
    }
  },
  methods: {
    listengetuserinfo(e) {
      console.log(e)
    }
  }
}

</script>
<style lang="scss">
  .body_bg{
    height: 100vh;
    overflow: hidden;
    background: #101010;
    position: relative;
  }
  .shandian{
    width: 508rpx;
    height: 568rpx;
    display: block;
    right: 0;
  }
  .main_box{
    width: 100%;
    position: absolute;
    z-index: 1;
    top: 300rpx;
    display: flex;
    flex-direction: row-reverse;
  }

  .logo_box{
    width: 100%;
    position: absolute;
    top: 200rpx;
    z-index: 2;
  }
  .logo{
    width: 750rpx;
    height: 816rpx;
  }
  .desc_logo{
    width: 520rpx;
    height: 132rpx;
    display: block;
    margin: 0 auto 80rpx;
  }
  .login_box{
    width: 100%;
    position: absolute;
    top: 1010rpx;
    z-index: 3;
  }
</style>

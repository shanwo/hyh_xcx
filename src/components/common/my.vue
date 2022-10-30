<template>
  <div class="my_box" @click="handleMy">
    我的
  </div>
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

  },
  methods: {
    handleMy() {
      this.$u.throttle(() => {
        this.$common.push({
          url: '/pages/my/my'
        })
      }, 300)
    }
  }
}

</script>

<style lang="scss" scoped>
 @import "/src/static/theme.scss";
 .my_box{
  position: fixed;
  right: 20rpx;
  bottom: 200rpx;
  z-index: 99;
  width: 88rpx;
  height: 88rpx;
  background: #F8B800;
  opacity: 0.8;
  font-size: 28rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
 }
</style>

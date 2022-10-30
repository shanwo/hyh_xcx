<template>
  <div>
    <image class="icon1" src="https://cdn.shanwo.cc/xcx/sfddgfgfg98.png" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'EmptyCom',
  props: {
    title: {
      type: String,
      default: '暂无数据~'
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon1{
    width: 112rpx;
    height: 88rpx;
    display: block;
    margin: 80rpx auto 0;
  }
  .title{
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FAFBFA;
    text-align: center;
    margin-top: 18rpx;
  }
</style>

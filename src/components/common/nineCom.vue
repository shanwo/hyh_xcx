<template>
  <div class="main_box">
    <image v-for="(item,index) in imgList" :key="item.id" :src="item.url || item.thumbnail_url" :class="[ index %3 == 2 ?'mr0':'' ,'big_img']" />
  </div>
</template>

<script>
export default {
  name: 'NineCom',
  props: {
    imgList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .big_img{
    width: 224rpx;
    height: 224rpx;
    display: block;
    margin-right: 6rpx;
    margin-bottom: 4rpx;
  }
  .mr0{
    margin-right: 0;
  }
  .main_box{
    display: flex;
    flex-wrap: wrap;
    width: 684rpx;
    //height: 684rpx;
    overflow: hidden;
    margin: 0 auto;
  }
</style>

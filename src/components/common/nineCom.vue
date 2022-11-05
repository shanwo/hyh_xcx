<template>
  <div>
    <div class="main_box">
      <image v-for="(item,index) in imgList" :key="index" mode="aspectFill" :src="item.url || item.thumbnail_url" :class="[ index %3 == 2 ?'mr0':'' ,'big_img']" @click="handleClickShow(item)" />
    </div>
    <photoDown v-if="photoDownStatus" :photo-obj="photoObj" @listenClose="listenClose" />
  </div>

</template>

<script>
import photoDown from './photoDown.vue'
export default {
  name: 'NineCom',
  components: {
    photoDown
  },
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    pageStatus: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      photoObj: {},
      photoDownStatus: false
    }
  },
  mounted() {
    setTimeout(() => {
      console.log('imgList', this.imgList)
    })
  },
  methods: {
    handleClickShow(item) {
      console.log('item', item)
      if (this.pageStatus == 1) {
        this.photoObj = item
        this.photoDownStatus = true
      }
    },
    listenClose() {
      this.photoDownStatus = false
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

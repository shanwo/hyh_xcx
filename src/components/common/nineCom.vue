<template>
  <div>
    <div class="main_box">
      <image v-for="(item,index) in imgList" :key="index" mode="aspectFill" :src="item.url || item.thumbnail_url" :class="[ index %3 == 2 ?'mr0':'' ,'big_img']" @click="handleClickShow(item)" />
    </div>
    <!--    <photoDown v-if="photoDownStatus" :photo-obj="photoObj" @listenClose="listenClose" />-->
    <photoDetailDialog v-if="photoDownStatus" ref="refPhotoDetailDialog" :page-from="'my'" :img-list="imgList" :photo-obj="photoObj" @listenClose="listenClose" />
  </div>

</template>

<script>
import photoDown from './photoDown.vue'
import photoDetailDialog from '@/components/common/photoDetailDialog'
export default {
  name: 'NineCom',
  components: {
    photoDetailDialog,
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
      if (this.pageStatus == 1) { //  如果是我的页面
        console.log('item', item)
        const index = this.imgList.findIndex(val => val.name == item.name)
        this.photoDownStatus = true
        this.photoObj = item
        setTimeout(() => {
          this.$refs['refPhotoDetailDialog'].init(this.imgList, index)
        })
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

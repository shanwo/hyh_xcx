<template>
  <div>
    <zeroWaList :list="storeData" @goodInfo="goodInfo" />
    <view style="position: fixed;top: -100px;left: -100px;height: 100px;width: 100px">
      <image v-for="(item,index) in allStoreData" :src="item" style="width: 100px;height: 100px" />
    </view>
  </div>
</template>

<script>
import zeroWaList from '@/pages/demo/zeroWaList/zeroWaList'
export default {
  name: 'List2',
  components: {
    zeroWaList
  },
  data() {
    return {
      storeData: [],
      allStoreData: [],
      pageIndex: 1
    }
  },
  onLoad() {

  },
  mounted() {
    const storeData = []
    this.allStoreData = storeData
    this.storeData = this.allStoreData[this.pageIndex]
  },
  methods: {
    goodInfo(id) {
      uni.navigateTo({
        url: './goodInfo?id=' + id + '&score=' + this.score
      })
    },
    onReachBottom() {
      this.pageIndex += 1
      this.storeData = this.storeData.concat(this.allStoreData[this.pageIndex])
    }
  }
}
</script>

<style scoped>

</style>

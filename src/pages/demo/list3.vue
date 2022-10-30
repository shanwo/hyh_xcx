<template>
  <div>
    <waterfall-list
      :status="waterfall.status"
      :list="waterfall.list"
      :reset="waterfall.reset"
      @click="onClick"
      @done="onDone"
    />
  </div>
</template>

<script>
// import zeroWaList from '@/pages/demo/zeroWaList/zeroWaList'
import waterfallList from '@/components/common/watterLayout/waterfall-list'
export default {
  name: 'List3',
  components: {
    waterfallList
  },
  data() {
    return {
      // 瀑布流组件相关
      waterfall: {
        status: '',
        reset: false,
        list: []
      },
      storeData: [],
      allStoreData: [],
      pageIndex: 0
    }
  },
  onLoad() {

  },
  mounted() {
    const storeData = []
    this.allStoreData = storeData
    console.log('this.waterfall', this.waterfall)
    this.getList()
  },
  methods: {
    getList() {
      this.waterfall.status = 'loading'
      setTimeout(() => {
        const arr = []
        console.log('当前页', this.pageIndex)
        const currentData = this.storeData.concat(this.allStoreData[this.pageIndex])
        currentData.forEach(val => {
          arr.push({
            url: val
          })
        })

        this.waterfall.list = arr
        this.waterfall.status = 'success'
      }, 1000)
    },
    onClick() {

    },
    onDone() {

    },
    goodInfo(id) {
      uni.navigateTo({
        url: './goodInfo?id=' + id + '&score=' + this.score
      })
    },
    onReachBottom() {
      this.pageIndex += 1
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>

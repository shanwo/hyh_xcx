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
    const storeData = [
      [
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/1.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/2.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/3.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/4.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/5.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/6.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/7.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/8.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/9.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/乐扣保温杯-吾皇联名款/商品详情图/10.jpg'
      ],
      [
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/1.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/2.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/3.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/4.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/5.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/6.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/7.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/8.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/9.png',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/保温杯商品/康宁保温杯-吾皇联名款/商品详情页/10.png'
      ],
      [
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/01.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/02.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/03.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/04.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/05.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/06.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/07.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/08.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/09.jpg',
        'https://desk-calenda.oss-cn-beijing.aliyuncs.com/static-h5/haowu-mall/staticData/台历商品/普通客户横版台历/商品详情图/10.jpg'
      ]
    ]
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

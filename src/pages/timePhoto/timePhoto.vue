<template>
  <div class="body_bg">
    <skiHeader />
    <div class="header_box">
      <div class="title">2022年10月7日</div>
      <div class="desc flexbox">
        <image class="icon" src="/static/images/chooseSkiList/gps_white@2x.png" />
        <div>
          北京阿啥都静安寺按适当滑雪场
        </div>
      </div>
    </div>
    <tabsCom
      :line-width="50"
      :current="0"
      :list="list"
      :line-color="'#F8B800'"
      :active-style="{
        color: '#F8B800',
        fontWeight: 'bold',
      }"
      :inactive-style="{
        color: '#ffffff',
      }"
    />

    <waterfall-list
      :status="waterfall.status"
      :list="waterfall.list"
      :reset="waterfall.reset"
      @click="listenClick"
      @done="onDone"
    />
    <photoDetailDialog v-if="photoStatus" @listenClose="listenClose" />
  </div>
</template>

<script>
// import zeroWaList from '@/pages/demo/zeroWaList/zeroWaList'
import waterfallList from '@/components/common/watterLayout/waterfall-list'
import tabsCom from '@/components/common/tabsCom'
import skiHeader from '@/components/common/skiHeader'
import photoDetailDialog from '@/pages/timePhoto/components/photoDetailDialog'

export default {
  name: 'List3',
  components: {
    tabsCom,
    skiHeader,
    photoDetailDialog,
    waterfallList
  },
  data() {
    return {
      list: [{
        name: '12:00'
      },
      {
        name: '13:00'
      }, {
        name: '14:00'
      },
      {
        name: '15:00'
      },
      {
        name: '16:00'
      }, {
        name: '17:00'
      },
      {
        name: '18:00'
      },
      {
        name: '19:00'

      }
      ],
      // 瀑布流组件相关
      waterfall: {
        status: '',
        reset: false,
        list: []
      },
      photoStatus: false,
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
    listenClick(obj) {
      this.photoStatus = true
    },
    listenClose() {
      this.photoStatus = false
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

<style lang="scss" scoped>
  @import "src/static/theme.scss";
  .header_box{
    padding-left: 20rpx;
    box-sizing: border-box;
    .title{
      color: $titleColor;
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 600;
      line-height: 40rpx;
      margin: 0 0 4rpx 0;
    }
    .desc{
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: #FFFFFF;
      .icon{
        width: 32rpx;
        height: 32rpx;
        margin-right: 4rpx;
      }
    }
  }
</style>

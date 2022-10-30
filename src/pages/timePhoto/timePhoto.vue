<template>
  <div class="body_bg">
    <skiHeader />
    <div class="header_box">
      <div class="title">{{ timeStr }}</div>
      <div class="desc flexbox">
        <image class="icon" src="https://cdn.shanwo.cc/xcx/gps_white@2x.png" />
        <div v-if="skiObj">
          {{ skiObj.merger_name }}
          {{ skiObj.address }}
        </div>
      </div>
    </div>
    <block v-if="hoursList.length">
      <tabsCom
        :line-width="50"
        :current="0"
        :list="hoursList"
        :line-color="'#F8B800'"
        :active-style="{
          color: '#F8B800',
          fontWeight: 'bold',
        }"
        :inactive-style="{
          color: '#ffffff',
        }"
        @change="listenTabComChange"
      />
    </block>

    <scroll-view
      :style="{height:sHeight+'px'}"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      refresher-background="'#000000'"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >

      <view>
        <waterfall-list
          :status="waterfall.status"
          :list="waterfall.list"
          :reset="waterfall.reset"
          @click="listenClick"
          @done="onDone"
        />
      </view>

    </scroll-view>

    <photoDetailDialog v-if="photoStatus" :photo-obj="photoObj" @listenClose="listenClose" />
    <cartCom />
  </div>
</template>

<script>
// import zeroWaList from '@/pages/demo/zeroWaList/zeroWaList'
import waterfallList from '@/components/common/watterLayout/waterfall-list'
import tabsCom from '@/components/common/tabsCom'
import skiHeader from '@/components/common/skiHeader'
import cartCom from '@/components/common/cart/cart'
import photoDetailDialog from '@/pages/timePhoto/components/photoDetailDialog'
import { ajaxVenueHour } from '@/api/timePhotoApi'
import { ajaxVenueLists } from '@/api/chooseSkiList'

export default {
  name: 'List3',
  components: {
    tabsCom,
    cartCom,
    skiHeader,
    photoDetailDialog,
    waterfallList
  },
  data() {
    return {
      sHeight: 0,
      photoObj: {},
      skid: '',
      timeStr: '',
      skiObj: '',
      hoursList: [],
      hourVal: '',
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
  onLoad(options) {
    this.init(options)
  },
  mounted() {
    const storeData = []
  },
  methods: {
    init(options) {
      this.skid = options.skid
      this.timeStr = options.timeStr
      this.getScrollViewHeight()
      this.getScrollViewHeight()
      this.getWxHoursList()
      this.getSkiList()
    },
    getScrollViewHeight() {
      const sysInfo = uni.getSystemInfoSync()
      console.log('sysInfo', sysInfo)
      if (sysInfo.safeArea) {
        const sHeight = sysInfo.safeArea.height - 46 - 44 - 44
        this.sHeight = sHeight
      }
    },
    listenTabComChange(obj) {
      console.log(obj)
      this.hourVal = obj.time
      this.waterfall.list = []
      this.waterfall.reset = true
      this.getList()
    },
    getSkiList() {
      ajaxVenueLists().then(res => {
        console.log('场景', res.data.data)
        const lists = res.data.data.lists
        this.skiObj = lists.filter(val => val.id == this.skid)[0]
      })
    },
    getWxHoursList(hour) {
      ajaxVenueHour({ venue_id: this.skid, day: this.timeStr, hour: this.hourVal }).then(res => {
        if (!this.hoursList.length) {
          const hoursList = []
          res.data.data.hours.forEach(val => {
            hoursList.push({
              name: val + ':00',
              time: val
            })
          })
          this.hoursList = hoursList
          this.hourVal = this.hoursList[0].time
          this.getList()
        }
      })
    },
    getList() {
      this.$common.showLoading()
      this.waterfall.status = 'loading'
      ajaxVenueHour({ venue_id: this.skid, day: '10-22', hour: this.hourVal }).then(res => {
        this.waterfall.list = res.data.data.lists
        if (this.waterfall.list.length == 0) {
          this.waterfall.status = 'finish'
        } else {
          this.waterfall.status = 'success'
        }
        this.$common.hideLoading()
      })
    },
    // getList() {
    //   this.waterfall.status = 'loading'
    //   setTimeout(() => {
    //     const arr = []
    //     console.log('当前页', this.pageIndex)
    //     const currentData = this.storeData.concat(this.allStoreData[this.pageIndex])
    //     currentData.forEach(val => {
    //       arr.push({
    //         url: val
    //       })
    //     })
    //
    //     this.waterfall.list = arr
    //     this.waterfall.status = 'success'
    //   }, 1000)
    // },
    listenClick(obj) {
      this.photoObj = obj
      setTimeout(() => {
        this.photoStatus = true
      })
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
      // this.pageIndex += 1
      // this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/static/theme.scss";
  .header_box{
    padding-left: 20rpx;
    box-sizing: border-box;
    height: 46px;
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

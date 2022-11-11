<template>
  <div class="body_bg">
    <skiHeader />

    <view v-if="cartStatus && !addLeftStatus" :class="['fix_box',aniStatus? 'move_left':'' ]" :style="{'left':leftVal+'px','top':topVal+'px'}" />
    <view v-if="cartStatus && addLeftStatus" :class="['fix_box',aniStatus? 'move_right':'' ]" :style="{'left':leftVal+'px','top':topVal + 'px'}" />

    <div class="header_box">
      <div class="title">{{ timeStr }}</div>
      <div class="desc flexbox">
        <image class="icon" src="https://cdn.shanwo.cc/xcx/gps_white@2x.png" />
        <div v-if="skiObj" class="text_line1">
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
    <!--      @refresherpulling="onPulling"
-->
    <scroll-view
      :style="{height:sHeight+'px'}"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      refresher-background="'#000000'"
      @refresherrefresh="onRefresh"
    >

      <waterfall-list
        :status="waterfall.status"
        :list="waterfall.list"
        :reset="waterfall.reset"
        @click="listenClick"
        @done="onDone"
      />

    </scroll-view>

    <photoDetailDialog v-if="photoStatus" ref="refPhotoDetailDialog" :page-from="'cart'" :img-list="waterfall.list" :photo-obj="photoObj" @listenClose="listenClose" />
    <cartCom ref="refCartCom" />
  </div>
</template>

<script>
// import zeroWaList from '@/pages/demo/zeroWaList/zeroWaList'
import waterfallList from '@/components/common/watterLayout/waterfall-list'
import tabsCom from '@/components/common/tabsCom'
import skiHeader from '@/components/common/skiHeader'
import cartCom from '@/components/common/cart/cart'
import photoDetailDialog from '@/components/common/photoDetailDialog'
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
      addLeftStatus: false, // 动画方向
      aniStatus: false, // 是否运行动画效果
      cartStatus: false, // 是否显示dom
      leftVal: 0,
      topVal: 0,
      triggered: false,
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
  onShow() {
    this.$refs['refCartCom'].changeNum()
  },
  mounted() {
    const that = this
    uni.$on('changeCartNum', res => {
      console.log('res', res)
      that.$refs['refCartCom'].changeNum()
    })
  },
  beforeDestroy() {
    uni.$off('changeCartNum')
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
    onRefresh() {
      this.triggered = true
      this.waterfall.list = []
      this.waterfall.reset = true
      this.getList()
    },
    getScrollViewHeight() {
      const sysInfo = uni.getSystemInfoSync()
      console.log('sysInfo', sysInfo)
      if (sysInfo.safeArea) {
        const sHeight = sysInfo.screenHeight - sysInfo.statusBarHeight - 46 - 44 - 44 - 60
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
      ajaxVenueHour({ venue_id: this.skid, day: this.timeStr, hour: this.hourVal }).then(res => {
        // if (this.hourVal == 13) {
        //   this.waterfall.list = []
        // } else {
        //   this.waterfall.list = res.data.data.lists
        // }
        this.waterfall.list = res.data.data.lists
        if (this.waterfall.list.length == 0) {
          this.waterfall.status = 'success'
          setTimeout(() => {
            this.waterfall.status = 'empty'
          })
        } else {
          this.waterfall.status = 'success'
        }
        this.$common.hideLoading()
        this.triggered = false
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
      this.photoStatus = true
      const data = JSON.parse(JSON.stringify(this.waterfall.list))
      const index = this.waterfall.list.findIndex(val => val.id == obj.id)
      console.log('index', index)
      setTimeout(() => {
        this.$refs['refPhotoDetailDialog'].init(data, index)
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
    },
    handleClickAdd(index) {
      const that = this
      const sys = uni.getSystemInfoSync()
      console.log('sys.width', sys.screenWidth)
      this.$uGetRect('.ani').then(size => {
        console.log('得到布局位置信息size', size)
      })
      const query = uni.createSelectorQuery().in(this)
      query.selectAll('.ani').boundingClientRect(data => {
        console.log('得到布局位置信息', data)

        console.log('节点离页面顶部的距离为' + data[index].top)
        that.leftVal = data[index].left
        that.topVal = data[index].top
        console.log('得到布局位置信息左边', data[index].left)
        if (that.leftVal > sys.screenWidth / 2) { // 如果距离左边的位置大于屏幕的一半 就是从右边往左边慢慢销售
          that.addLeftStatus = true
          console.log('往左')
        } else {
          console.log('往右')
          that.addLeftStatus = false
        }
        that.cartStatus = true
        setTimeout(() => {
          this.aniStatus = true
          setTimeout(() => {
            that.cartStatus = false
            this.aniStatus = false
          }, 800)
        })
      }).exec()
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
      width: 552rpx;
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
  .move_left {
    animation: moveleft 200ms linear;
  }

  @keyframes moveleft {
    from {
      opacity: 1;
      top: 0;
      transform: rotate(0deg);
    }
    to {
      opacity: 0;
      left: 100px;
      top: 1000px;
      width: 0;
      height: 0;
      transform: rotate(180deg);
    }
  }
</style>

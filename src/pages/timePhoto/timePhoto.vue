<template>
  <div class="body_bg">
    <skiHeader />

    <view v-if="cartStatus && !addLeftStatus" :class="['fix_box',aniStatus? 'move_left':'' ]" :style="{'left':leftVal+'px','top':topVal+'px'}" />
    <view v-if="cartStatus && addLeftStatus" :class="['fix_box',aniStatus? 'move_right':'' ]" :style="{'left':leftVal+'px','top':topVal + 'px'}" />

    <div class="header_box">
      <div class="title">{{ timeStr }}</div>
      <!--      <div class="desc flexbox">-->
      <!--        <image class="icon" src="https://cdn.chillman.cc/xcx/gps_white@2x.png" />-->
      <!--        <div v-if="skiObj" class="text_line1">-->
      <!--          {{ skiObj.merger_name }}-->
      <!--          {{ skiObj.address }}-->
      <!--        </div>-->
      <!--      </div>-->
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
      :refresher-threshold="120"
      lower-threshold="120"
      @scrolltolower="scrolltolower"
    >
      <view v-if="waterfall.reset" class="lan_box">
        <wxwaterfall ref="uWaterfall" v-model="waterfall.list">
          <template #left="{leftList}">
            <view v-for="(item, index) in leftList" :key="index" @click="listenClick(item)">
              <view class="left_box">
                <div class="jiahao_img_box" @click.stop="handleAddCart(item)">
                  <image class="jiahao" src="https://cdn.chillman.cc/xcx/jiahao.png" />
                </div>
                <wxlazyload threshold="0" :height="200" :loading-img="'/static/images/kongs.png'" :image="item.url" :index="index" />
              </view>
            </view>
          </template>
          <template #right="{rightList}">
            <view v-for="(item, index) in rightList" :key="index" @click="listenClick(item)">
              <view class="right_box">
                <div class="jiahao_img_box" @click.stop="handleAddCart(item)">
                  <image class="jiahao" src="https://cdn.chillman.cc/xcx/jiahao.png" />
                </div>
                <wxlazyload threshold="0" :height="200" :loading-img="'/static/images/kongs.png'" :image="item.url" :index="index" />
              </view>
            <!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
            </view>
          </template>
        </wxwaterfall>
      </view>

      <!--      <waterfall-list-->
      <!--        :status="waterfall.status"-->
      <!--        :list="waterfall.list"-->
      <!--        :reset="waterfall.reset"-->
      <!--        @click="listenClick"-->
      <!--        @done="onDone"-->
      <!--      />-->
      <div class="loading_box_d" />

    </scroll-view>

    <photoDetailDialog v-if="photoStatus" ref="refPhotoDetailDialog" :page-from="'timePhoto'" :img-list="waterfall.list" :photo-obj="photoObj" @listenClose="listenClose" />
    <cartCom ref="refCartCom" />
  </div>
</template>

<script>
// import zeroWaList from '@/pages/demo/zeroWaList/zeroWaList'
import wxwaterfall from '@/components/common/wxwaterfall'
import wxlazyload from '@/components/common/wxlazyload'
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
    wxlazyload,
    wxwaterfall,
    tabsCom,
    cartCom,
    skiHeader,
    photoDetailDialog
  },
  data() {
    return {
      page: 1,
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
        reset: true,
        list: []
      },
      pageNo: 1, // 分页
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
    const that = this
    uni.$on('changeCartNum', res => {
      console.log('res', res)
      that.$refs['refCartCom'].changeNum()
    })
  },
  beforeDestroy() {
    uni.$off('changeCartNum')
  },
  onShow() {
    this.$refs['refCartCom'].changeNum()
  },
  onHide() {
    this.photoStatus = false
  },
  methods: {
    init(options) {
      this.skid = options.skid
      this.timeStr = options.timeStr
      this.getScrollViewHeight()
      this.getWxHoursList()
      this.getSkiList()
    },
    getScrollViewHeight() {
      const sysInfo = uni.getSystemInfoSync()
      console.log('sysInfo', sysInfo)
      if (sysInfo.safeArea) {
        const sHeight = sysInfo.screenHeight - sysInfo.statusBarHeight - 26 - 44 - 44 - 60
        this.sHeight = sHeight
      }
    },
    listenTabComChange(obj) {
      console.log(obj)
      this.hourVal = obj.time
      this.$forceUpdate()
      this.$refs.uWaterfall.clear()
      setTimeout(() => {
        this.waterfall.reset = true
        this.waterfall.list = []
        this.pageNo = 1
        this.waterfall.status = 'success'
        this.getList()
      })
    },
    getSkiList() {
      ajaxVenueLists().then(res => {
        console.log('场景', res.data.data)
        const lists = res.data.data.lists
        this.skiObj = lists.filter(val => val.id == this.skid)[0]
      })
    },
    getWxHoursList(hour) {
      ajaxVenueHour({ page: 1, size: 15, venue_id: this.skid, day: this.timeStr, hour: this.hourVal }).then(res => {
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
      ajaxVenueHour({ page: this.pageNo, size: 15, venue_id: this.skid, day: this.timeStr, hour: this.hourVal }).then(res => {
        this.waterfall.list = this.waterfall.list.concat(res.data.data.lists)
        if (this.waterfall.list.length == 0) {
          this.waterfall.status = 'success'
          this.waterfall.reset = false
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
    async handleAddCart(params) {
      const cartList = uni.getStorageSync('cartList') || []
      const cartIdArr = []
      cartList.forEach(val => {
        cartIdArr.push(val.id)
      })
      if (cartIdArr.includes(params.id)) {
        this.$common.toast('购物车已存在该照片')
        return
      } else {
        this.$common.toast('添加成功')
        cartList.push(params)
        uni.setStorageSync('cartList', cartList)
      }
      this.$refs['refCartCom'].changeNum()
    },
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
    scrolltolower() {
      this.pageNo += 1
      this.getList()
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
    height: 26px;
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
  .lan_box{
    padding: 0 20rpx;
    box-sizing: border-box;
    .left_box{
      position: relative;
      margin-bottom: 15rpx;
      padding-right: 8rpx;
      box-sizing: border-box;

    }
    .right_box{
      position: relative;
      margin-bottom: 15rpx;
      padding-left: 8rpx;
      box-sizing: border-box;
    }
  }
  .jiahao_img_box{
    padding: 20rpx;
    position: absolute;
    z-index: 11;
    right: 0;
    bottom: 0;
    .jiahao{
      width: 40rpx;
      height: 40rpx;
    }
  }
  .loading_box_d{
    height: 180rpx;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>

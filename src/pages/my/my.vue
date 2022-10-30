<template>
  <view v-if="showStatus">
    <view class="body_bg">
      <view class="content">
        <skiHeader :show-back="true" :show-back-home="true" />
        <div class="head flexbox">
          <div>张三</div>
          <image class="head_icon" src="https://cdn.shanwo.cc/xcx/logo.png" />
        </div>
        <div class="desc_box">
          <div>已购</div>
          <div style="color: #fff;font-weight: 600;margin: 0 3rpx">120</div>
          <div>张照片</div>
        </div>
        <div class="photo_box">
          <div v-for="(item,index) in venDayList" :key="index" class="photo_list">
            <div />
            <div class="list_label">
              <div class="fl flexbox">
                <image class="icon1" src="https://cdn.shanwo.cc/xcx/crux.png" />
                <div>{{ item.date }}</div>
                <image class="icon" src="https://cdn.shanwo.cc/xcx/arrow_crux_down.png" />
              </div>
              <div class="fr" @click="handleNextPage(0,item)">
                <span>已购买</span>
                <span class="active">{{ item.images.length }}张</span>
                <span>张</span>
                <span>共￥{{ item.pay_price }}</span>
              </div>
            </div>
            <div class="main_box">
              <div class="main_box_line" />
              <nineCom :img-list="item.images" />
              <view class="footer_box">
                <view class="cart_box">
                  <image class="cart_icon" src="https://cdn.shanwo.cc/xcx/bianzu.png" />
                  <view class="title-1">下载全部</view>
                </view>
              </view>
            </div>
          </div>
          <div class="loading_box_d">
            <u-loadmore
              :status="loadingObj.status"
              :loading-text="loadingObj.loadingText"
              :loadmore-text="loadingObj.loadmoreText"
              :nomore-text="loadingObj.nomoreText"
            />
          </div>

        </div>
        <safeAreaCom />
      </view>
    </view>

  </view></template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
// import getLocationCom from '@/components/common/getLocationCom'
import nineCom from '@/components/common/nineCom'
import { ajaxVenueDay } from '@/api/indexApi'
import { ajaxOrderList } from '@/api/myApi'

export default {
  components: {
    skiHeader,
    // getLocationCom,
    safeAreaCom,
    nineCom
  },
  data() {
    return {
      loadingObj: {
        status: 'loadmore',
        loadingText: '努力加载中',
        loadmoreText: '加载中',
        nomoreText: '没有更多了'
      },
      skid: '',
      skiObj: '',
      pageNo: 1,
      pageSize: 10,
      venDayList: [],
      showStatus: false,
      title: 'Hello',
      options: ''
    }
  },
  onLoad(options) {
    this.options = options
    this.init(options)
  },
  methods: {
    init(options) {
      if (uni.getStorageSync('skid')) {
        this.showStatus = true
        this.skid = uni.getStorageSync('skid')
        this.skiObj = uni.getStorageSync('skiObj')
        this.getDayPhoto()
      } else {
        this.$common.push({ url: '/pages/chooseSkiList/chooseSkiList' })
      }
    },
    getDayPhoto() {
      if (this.loadingObj.status == 'nomore') {
        return
      }
      ajaxOrderList({ page: this.pageNo }).then(res => {
        const list = res.data.data.lists
        uni.stopPullDownRefresh()
        if (res.data.data.page * 10 > res.data.data.total) {
          this.venDayList = this.venDayList.concat(list)
          this.loadingObj.status = 'nomore'
        } else {
          this.loadingObj.status = 'loading'
          this.venDayList = this.venDayList.concat(list)
        }
      })
    },
    handleChooseSki() {
      // this.$common.push({ url: '' })
      uni.navigateTo({
        url: '/pages/chooseSkiList/chooseSkiList'
      })
    },
    handleNextPage(status, obj) {
      console.log(obj)
      if (status == 0) {
        this.$common.push({
          url: '/pages/timePhoto/timePhoto',
          params: {
            timeStr: obj.date,
            skid: uni.getStorageSync('skid')
          }
        })
      }
    },
    getLocationErrorBack() {

    },
    getLocationSuccessBack() {

    },
    onReachBottom() {
      console.log('---------')
      if (this.loadingObj.status == 'nomore') {
        return
      }
      this.pageNo += 1
      this.getDayPhoto()
    },
    onPullDownRefresh() {
      this.pageNo = 1
      this.getDayPhoto()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "/src/static/theme.scss";

.head{
  color: $titleColor;
  font-size: 36rpx;
  font-weight: 600;
  padding-left: 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: 50rpx;
  .head_icon{
    width: 52rpx;
    height: 44rpx;
    margin-left: 10rpx;
  }
}
.desc_box{
  height: 34rpx;
  font-size: 24rpx;
  font-weight: 400;
  padding-left: 20rpx;
  box-sizing: border-box;
  color: $descColor;
  display: flex;
}
.hxc_label{
  padding-left: 20rpx;
  box-sizing: border-box;
  margin: 24rpx 0 4rpx 0;
  .icon_right{
    width: 24rpx;
    height: 24rpx;
  }
  .active{
    line-height: 32rpx;
    color:$titleColor;
    font-size: 28rpx;
    font-weight: 600;
    margin: 0 4rpx;
  }
  .icon_left{
    width: 32rpx;
    height: 32rpx;
  }
}
.photo_box{
  margin-top: 80rpx;
}
.photo_list{
  margin-bottom: 32rpx;
  .list_label{
    display: flex;
    justify-content: space-between;
    padding: 0 16rpx;
    box-sizing: border-box;
    margin-bottom: 18rpx;
    .fl{
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $descColor;
      line-height: 40rpx;
      align-items: center;
      .icon{
        width: 24rpx;
        height: 24rpx;
        margin-left: 8rpx;
      }
      .icon1{
        width: 24rpx;
        height: 24rpx;
        margin-right: 8rpx;
      }
    }
    .fr{
      display: flex;
      color: $titleColor;
      font-weight: 400;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      .active{
        font-weight: 600;
        color: $titleColor;
        margin: 0 4rpx;
      }
      .icon_right{
        width: 24rpx;
        height: 24rpx;
      }
    }
  }

}
.loading_box_d{
  box-sizing: border-box;
  overflow: hidden;
}
.main_box{
  position: relative;
  .main_box_line{
    position: absolute;
    left: 25rpx;
    top: -24rpx;
    bottom: -40rpx;
    z-index: 1;
    width: 1rpx;
    background-color: $descColor;
  }
}
.footer_box{
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 20rpx;
  .title-1{
    font-size: 24rpx;
    font-weight: 600;
    color: #FFFFFF;
  }
  .cart_icon{
    width: 32rpx;
    height: 32rpx;
    display: block;
    margin-right: 4rpx;
  }
  .cart_box{
    margin-right: 22rpx;
    width: 200rpx;
    height: 52rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 34rpx;
    background: #171b20;
    opacity: 0.8;
    margin-top: 10rpx;
    border: 2rpx solid #4E5969;

  }
}

</style>

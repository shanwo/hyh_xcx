<template>
  <view v-if="showStatus" class="body_bg">
    <view>
      <!--      <getLocationCom @errorBack="getLocationErrorBack" @successBack="getLocationSuccessBack" />-->
      <view class="content">
        <skiHeader :show-back="false" :show-back-home="false" :fl-bg-color="'#000000'" :logo="'https://cdn.shanwo.cc/xcx/logo%402xxiaoasd.png'" />
        <div class="main_title">照片墙</div>
        <div class="flexbox_s_center hxc_label" @click="handleChooseSki">
          <img class="right_sd" src="https://cdn.shanwo.cc/xcx/asdsa5634x.png" alt="">
          <image class="icon_left" src="https://cdn.shanwo.cc/xcx/gps@2x.png" />
          <div class="active">{{ skiObj.name }}</div>
          <image class="icon_right" src="https://cdn.shanwo.cc/xcx/arrow@2x.png" />
        </div>
        <div class="desc_box text_line1">{{ skiObj.merger_name }}{{ skiObj.address }}</div>
        <div class="photo_box">
          <div v-for="(item,index) in venDayList" :key="index" class="photo_list" @click="handleNextPage(0,item)">
            <div class="list_label">
              <div class="fl">
                {{ item.date }}
              </div>
              <div class="fr">
                <span>已有</span>
                <span class="active">{{ item.total }}</span>
                <span>张照片</span>
                <image class="icon_right" src="https://cdn.shanwo.cc/xcx/arrow_white@2x.png" />
              </div>
            </div>
            <nineCom :img-list="item.images" />
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

      </view>
    </view>
    <myCom />
    <cart ref="cartCom" />
  </view>
</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
import myCom from '@/components/common/my'
import cart from '@/components/common/cart/cart'
// import getLocationCom from '@/components/common/getLocationCom'
import nineCom from '@/components/common/nineCom'
import { ajaxVenueDay } from '@/api/indexApi'

export default {
  components: {
    skiHeader,
    // getLocationCom,
    safeAreaCom,
    cart,
    myCom,
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
  onShow() {
    if (this.showStatus) {
      try {
        this.$refs['cartCom'].changeNum()
      } catch (e) {
        setTimeout(() => {
          this.$refs['cartCom'].changeNum()
        })
      }
    }
  },
  methods: {
    init(options) {
      if (uni.getStorageSync('token')) {
        if (uni.getStorageSync('skid')) {
          this.showStatus = true
          this.skid = uni.getStorageSync('skid')
          this.skiObj = uni.getStorageSync('skiObj')
          console.log('已经选择雪场1')
          this.getDayPhoto()
        } else {
          console.log('进入选择雪场页面')
          this.$common.redirect({ url: '/pages/chooseSkiList/chooseSkiList' })
        }
      } else {
        this.$common.redirect({ url: '/pages/login/login' })
      }
    },
    getDayPhoto() {
      if (this.loadingObj.status == 'nomore') {
        return
      }
      ajaxVenueDay({ venue_id: this.skid, page: this.pageNo }).then(res => {
        const list = res.data.data.lists
        uni.stopPullDownRefresh()
        if (res.data.data.page * 5 > res.data.data.total) {
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
      this.loadingObj.status = 'loadmore'
      this.venDayList = []
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
}
.desc_box{
  width: 552rpx;
  height: 34rpx;
  font-size: 24rpx;
  font-weight: 400;
  padding-left: 20rpx;
  box-sizing: border-box;
  color: $descColor;
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
.content{
  padding-bottom: 180rpx;
}
.photo_box{
  margin-top: 80rpx;
}
.photo_list{
  margin-bottom: 32rpx;
  .list_label{
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx ;
    box-sizing: border-box;
    margin-bottom: 18rpx;
    .fl{
      height: 40rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $titleColor;
      line-height: 40rpx;
    }
    .fr{
      display: flex;
      color: $descColor;
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
.main_title{
  font-size: 36rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #F8B800;
  line-height: 50rpx;
  margin: 15rpx 0 0 20rpx;
}
.flexbox_s_center{
  position: relative;
}
.right_sd{
  width: 134rpx;
  height: 170rpx;
  position: absolute;
  right: 0;
  z-index: 1;
}
</style>

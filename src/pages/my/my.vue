<template>
  <view v-if="showStatus">
    <view class="body_bg">
      <view class="content">
        <skiHeader :show-back="true" :show-back-home="true" />
        <div class="flexbox" style="justify-content: space-between">
          <div>
            <div class="head flexbox">
              <div>我的照片</div>
              <!--              <image class="head_icon" src="https://cdn.shanwo.cc/xcx/logo.png" />-->
            </div>
          </div>
          <!--          <div class="avatar_box">-->
          <!--            <img src="https://cdn.shanwo.cc/xcx/morentouxiang.png" class="avatar_icon" alt="">-->
          <!--          </div>-->
        </div>
        <div v-if="venDayList.length == 0" style="margin-top: 150rpx">
          <emptyCom :title="'暂时没有图片~'" />
        </div>
        <div v-else class="photo_box">
          <div v-for="(item,index) in venDayList" :key="index" class="photo_list">
            <div :class="[item.statusHeight == 1 ? 'height0':'heightauto']">
              <div class="list_label" @click="handleHideBox(index)">
                <div class="fl flexbox">
                  <image class="icon1" src="https://cdn.shanwo.cc/xcx/crux.png" />
                  <div>{{ item.venue.name }}</div>
                  <!--                  <image v-if="item.statusHeight != 1" class="icon" src="https://cdn.shanwo.cc/xcx/arrow_crux_down.png" />-->
                  <!--                  <image v-if="item.statusHeight == 1" class="icon" src="https://cdn.shanwo.cc/xcx/arrow_crux_right%402x.png" />-->
                </div>
                <div class="fl_time">{{ item.created_at }}</div>
                <!--                <div class="fr">-->
                <!--                  <span>已购买</span>-->
                <!--                  <span class="active">{{ item.images.length }}张</span>-->
                <!--                  <span>张</span>-->
                <!--                  <span>共￥{{ item.pay_price }}</span>-->
                <!--                </div>-->
              </div>
              <div class="main_box">
                <div v-if="venDayList.length > 1 && !item.statusHeight && index != venDayList.length - 1" class="main_box_line" />
                <nineCom :img-list="item.images" :page-status="'1'" @clickImg="handleClickImg" />
                <view class="footer_box">
                  <view class="cart_box" @click="handleNextPage(1,item.images)">
                    <image class="cart_icon" src="https://cdn.shanwo.cc/xcx/bianzu.png" />
                    <view class="title-1">下载全部</view>
                  </view>
                </view>
              </div>
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
    <!-- <photoDown v-if="photoDownStatus" :photo-obj="photoObj" @listenClose="listenClose" /> -->
  </view>
</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
// import getLocationCom from '@/components/common/getLocationCom'
import nineCom from '@/components/common/nineCom'
import emptyCom from '@/components/common/emptyCom'
// import photoDown from './components/photoDown.vue'
import { ajaxVenueDay } from '@/api/indexApi'
import { ajaxOrderList } from '@/api/myApi'

export default {
  components: {
    skiHeader,
    emptyCom,
    // getLocationCom,
    // photoDown,
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
      photoObj: {},
      photoDownStatus: false,
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
    // 显示隐藏照片
    handleHideBox(index) {
      this.venDayList[index].statusHeight = !this.venDayList[index].statusHeight
    },
    getDayPhoto() {
      if (this.loadingObj.status == 'nomore') {
        return
      }
      ajaxOrderList({ page: this.pageNo }).then(res => {
        const list = res.data.data.lists

        list.forEach(val => {
          val['statusHeight'] = 0
          val.images.forEach(v => {
            v['url'] = v.thumbnail_url
          })
        })

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
      if (status == 1) {
        // obj.forEach(val => {
        //   val['original_url'] = 'https://cdn.shanwo.cc/xcx/cecececece.jpg'
        // })
        uni.setStorageSync('downImgs', obj)
        this.$common.push({
          url: '/pages/downLoadFile/downLoadFile'
        })
      }
    },
    handleClickImg(obj) {
      this.photoDownStatus = true
      this.photoObj = obj
    },
    // 监听下载弹框的关闭事件
    listenClose() {
      this.photoDownStatus = false
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
  margin-top: 40rpx;
}
.photo_list{
  margin-bottom: 32rpx;
  .list_label{
    //display: flex;
    //justify-content: space-between;
    padding: 0 16rpx;
    box-sizing: border-box;
    margin-bottom: 18rpx;
    .fl_time{
      color: $descColor;
      height: 40rpx;
      font-size: 28rpx;
      padding: 0 34rpx;
      box-sizing: border-box;
    }
    .fl{
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $descColor;
      line-height: 40rpx;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
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
    top: -65rpx;
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
.avatar_box{
  width: 187rpx;
  height: 222rpx;
  background: url("https://cdn.shanwo.cc/xcx/asjdkas.png") no-repeat left top;
  background-size: cover;
  position: relative;
  .avatar_icon{
    width: 132rpx;
    height: 132rpx;
    border: 4rpx solid #E1E1E1;
    border-radius: 50%;
    position: absolute;
    top: 52rpx;
    left: 0;
    background: #E1E1E1;
  }
}
.height0{
  //transition: height 2s;
  //-moz-transition: height 2s; /* Firefox 4 */
  //-webkit-transition: height 2s; /* Safari 和 Chrome */
  //-o-transition: height 2s; /* Opera */
  //
  height: 40rpx;
  overflow: hidden;
  //animation: moveHeight1 1s;
  //-webkit-animation: moveHeight1 1s; /* Safari 与 Chrome */
  //animation-fill-mode:forwards;

}
.heightauto{
  //transition: height 2s;
  //-moz-transition: height 2s; /* Firefox 4 */
  //-webkit-transition: height 2s; /* Safari 和 Chrome */
  //-o-transition: height 2s; /* Opera */
  height: auto;
  //animation: moveHeight0 1s;
  //-webkit-animation: moveHeight0 1s; /* Safari 与 Chrome */
  //animation-fill-mode:forwards;

}
@keyframes moveHeight0 {
  from{
    height: 40rpx;
  }
  to{
    height: 100rpx;
  }
}
@keyframes moveHeight1 {
  from{
    height: 100rpx;
  }
  to{
    height: 40rpx;
    overflow: hidden;
  }
}

</style>

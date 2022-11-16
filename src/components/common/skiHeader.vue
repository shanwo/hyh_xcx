<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="header_container">
      <view class="fiexed_view" :style="{ background: bgColor }">
        <image v-if="bgImg" class="bg_img" :src="bgImg" />
        <!-- 状态栏 -->
        <view class="fixheight" :style="{ height: statusBarHeight + 'px' }" />
        <!-- header 主体 -->
        <view class="header_content flexbox" :style="{ height: (navbarHeight + 'px') }">
          <view class="header_content_fl_box btn_dv" :style="{'background-color':flBgColor}">
            <view v-if="pageLength">
              <view class="back_btn flexbox_cen" @click="handleBackPage">
                <image class="back_icon" :src="backIcon" />
              </view>
            </view>
            <view v-if="pageLength && showBackHome" class="shuxian" />
            <view v-if="showBackHome">
              <view class="back_btn flexbox_cen" @click="handleBackHome">
                <image class="back_icon" :src="backHomeIcon" />
              </view>
            </view>
            <view v-if="logo" style="margin-top: 14rpx">
              <image class="logo_icon" :src="logo" />
            </view>
          </view>
          <view v-if="titleAlign != null && titleAlign.trim() == 'center'" class="btn_dv" />
          <text class="text fz32 text_line1" :style="{ color: titleColor, 'text-align': titleAlign }">{{ title }}</text>
          <view class="btn_dv" />
        </view>
        <slot />
        <!-- 圆角 -->
      </view>
      <!-- 头部占位高度-->
      <view
        v-if="showSpaceEl"
        :style="{ width: '100%' }"
      >
        <view :style="{ width: '100%', height: statusBarHeight + 'px'}" />
        <view :style="{ width: '100%', height: navbarHeight + 'px'}" />
      </view>
    </view>
    <!--#endif-->
  </view>
</template>

<script>
export default {
  props: {
    pageBack: {
      type: String,
      default: '0'
    },
    logo: {
      type: String,
      default: ''
    },
    // 页面标题
    title: {
      type: String,
      default: ''
    },
    // 标题颜色
    titleColor: {
      type: String,
      default: '#333'
    },
    flBgColor: {
      type: String,
      default: '#d6d6d6'
    },
    // 标题位置
    titleAlign: {
      type: String,
      default: 'center'
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#000'
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否显示返回首页按钮
    showBackHome: {
      type: Boolean,
      default: true
    },
    // 是否显示占位高度
    showSpaceEl: {
      type: Boolean,
      default: true
    },
    // 控制状态栏颜色 true白 false黑
    isLight: {
      type: Boolean,
      default: false
    },
    // 背景图
    bgImg: {
      type: String,
      default: '' // /
    },
    // 返回按钮图片
    backIcon: {
      type: String,
      default: '/static/images/houtuihei.png'
    },
    // 返回首页图片
    backHomeIcon: {
      type: String,
      default: '/static/images/shouyexiaofangzi.png'
    }
  },
  data() {
    return {
      pageLength: false,
      // 状态栏高度
      statusBarHeight: getApp().globalData.statusBarHeight,
      // 导航栏高度
      navbarHeight: 44,
      titleColorWhiteList: ['#fff', '#ffffff'],
      backHomeBlackIcon: '' // 黑色返回按钮
    }
  },
  computed: {},
  watch: {
    // 监听设置状态栏
    isLight() {
      this.setStatusBar()
    }
  },
  mounted() {
    // #ifdef H5
    this.navbarHeight = 0
    // #endif
    const pages = getCurrentPages() // 获取当前页面js里面的pages里的所有信息。
    console.log('页面pages', pages)
    if (pages.length > 1) {
      this.pageLength = true
    }

    this.statusBarHeight = getApp().globalData.statusBarHeight
    this.setStatusBar()
  },
  options: {
    // 微信小程序中 options 选项
    addGlobalClass: true //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
  },
  methods: {
    // 返回上一页
    handleBackPage() {
      if (this.pageBack == 0) {
        this.$common.back()
      } else {
        this.$emit('listenCallBack')
      }
    },
    // 返回首页
    handleBackHome() {
      uni.reLaunch({
        url: '/pages/index/index'
      })
    },
    // 设置状态栏
    setStatusBar() {
      // 状态栏颜色
      const statusBarTextColor = this.isLight ? '#ffffff' : '#000000'
      wx.setNavigationBarColor({
        frontColor: statusBarTextColor,
        backgroundColor: statusBarTextColor,
        animation: {
          duration: 30,
          timingFunc: 'linear'
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>

.header_container {
  position: relative;
  z-index: 100;
}

.fiexed_view {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9;
}

.bg_img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.header_content {
  overflow: hidden;
  height: 44px;
  box-sizing: border-box;
  padding: 0 16rpx;
  position: relative;

  .btn_dv {
    height: 64rpx;
    border-radius: 50rpx;
    position: absolute;
    left: 20rpx;
    top: 6rpx;
  }

  /* text改为.text 低版本组件样式不能用标签选择器 */
  .text {
    flex: 1;
    padding: 0 6rpx;
  }
}

.header_radius {
  height: 40rpx;
  border-radius: 24rpx 24rpx 0 0;
}

.back_icon {
  width: 48rpx;
  height: 48rpx;
}

.fz32 {
  font-size: 32rpx;
}

.flexbox {
  display: flex;
  align-items: center;
}

.flexbox_cen {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_content_fl_box{
  display: flex;
  padding-right: 15rpx;
  padding-left: 10rpx;
  align-items: center;
  justify-content: space-evenly;
  background-color: #d6d6d6;
  box-sizing: border-box;
}
.shuxian{
  height: 30rpx;
  width: 2rpx;
  margin: 0 20rpx;
  background-color: #e9e9e9;
}
.logo_icon{
  width: 190rpx;
  height: 80rpx;
}
</style>

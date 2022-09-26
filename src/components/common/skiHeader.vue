
<template>
  <view class="header_container">
    <view class="fiexed_view" :style="{ background: bgColor }">
      <image v-if="bgImg" class="bg_img" :src="bgImg" />
      <!-- 状态栏 -->
      <view :style="{ height: statusBarHeight + 'px' }" />
      <!-- header 主体 -->
      <view class="header_content flexbox" :style="{ height: (navbarHeight + 'px') }">
        <view v-if="showBackHome" class="btn_dv">
          <view class="back_btn flexbox_cen" @click="backHome">
            <image class="back_icon" :src="backHomeBlackIcon || backHomeIcon" />
          </view>
        </view>
        <view v-else-if="showBack" class="btn_dv">
          <view class="back_btn flexbox_cen" @click="backUpPage">
            <image class="back_icon" :src="backIcon" />
          </view>
        </view>
        <view v-else class="btn_dv" />
        <view v-if="titleAlign != null && titleAlign.trim() == 'center'" class="btn_dv" />
        <text class="text fz32 text_line1" :style="{ color: titleColor, 'text-align': titleAlign }">{{ title }}</text>
        <view class="btn_dv" />
      </view>
      <slot />
      <!-- 圆角 -->
      <view v-if="showBdra" class="header_radius" :style="{ background: bdraColor,height:bdraHeight + 'rpx' }" />
      <slot name="bottomSlot" />
    </view>
    <!-- 是否显示头部占位高度（显示时是否计算圆角高度） -->
    <view
      v-if="showSpaceEl"
      :style="{ width: '100%' }"
    >
      <view :style="{ width: '100%', height: statusBarHeight + 'px'}" />
      <view :style="{ width: '100%', height: navbarHeight + 'px'}" />
      <view :style="{ width: '100%', height: showBdra ? bdraHeight + soltHeight + bottomSoltHeight + 'rpx' : soltHeight + bottomSoltHeight + 'rpx'}" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
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
    // 标题位置
    titleAlign: {
      type: String,
      default: 'center'
    },
    // 返回类型，默认返回上一页；若需其他在此添加
    backType: {
      type: Number,
      default: 0
    },
    // 返回页数
    backNum: {
      type: Number,
      default: 1
    },
    // 插槽高度(匿名插槽)
    soltHeight: {
      type: Number,
      default: 0
    },
    // 插槽高度(具名插槽)
    bottomSoltHeight: {
      type: Number,
      default: 0
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#fff'
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否显示返回首页按钮
    showBackHome: {
      type: Boolean,
      default: false
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
      default: '/static/images/backhei.png'
    },
    // 返回首页图片
    backHomeIcon: {
      type: String,
      default: '/static/images/shouyebai.png'
    },
    // 圆角背景颜色
    bdraColor: {
      type: String,
      default: '#ebf2fb'
    },
    // 是否显示圆角
    showBdra: {
      type: Boolean,
      default: false
    },
    // 圆角高度
    bdraHeight: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      // 状态栏高度
      statusBarHeight: getApp().globalData.statusBarHeight,
      // 导航栏高度
      navbarHeight: 44,
      viewHeight: 0,
      titleColorWhiteList: ['#fff', '#ffffff'],
      beforePage: true, // 页面栈是否有上一页
      backHomeBlackIcon: '' // 黑色返回按钮
    }
  },
  computed: {

  },
  watch: {
    // 监听设置状态栏
    isLight() {
      this.setStatusBar()
    }
  },
  mounted() {
    // 实例挂载后赋值
    // #ifdef H5
    this.navbarHeight = 0
    // #endif
    this.statusBarHeight = getApp().globalData.statusBarHeight
    this.viewHeight = this.showBdra ? this.statusBarHeight * 2 + 140 + this.soltHeight + this.bottomSoltHeight : this.statusBarHeight * 2 + 100 + this.soltHeight + this.bottomSoltHeight
    this.setStatusBar()
  },
  options: {
    // 微信小程序中 options 选项
    addGlobalClass: true //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
  },
  methods: {
    // 返回上一页
    backUpPage() {

    },
    // 返回首页
    backHome() {
      uni.switchTab({
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

  .btn_dv {
    position: absolute;
    left: 20rpx;
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

.back_btn {
  width: 76rpx;
  height: 100rpx;
}

.back_icon {
  width: 36rpx;
  height: 36rpx;
}
.fz32{
  font-size: 32rpx;
}
.flexbox{display: flex;align-items: center;}
.flexbox_cen{display:flex;align-items:center;justify-content:center;}
</style>

<template>
  <view class="waterfall-item-container">
    <view class="waterfall-item" @tap="onTap">
      <!--status ==1?'move_left':'','son_box'-->
      <div :class="[status == 1? 'fix_box_active':'', 'fix_box', ]" />
      <div v-if="status == 0" class="img_box" @click.stop="handleAddCart">
        <image class="jiahao" src="https://cdn.shanwo.cc/xcx/jiahao.png" />
      </div>
      <div v-if="status == 1" class="img_box" @click.stop="handleRemoveCart">
        <image class="jiahao" src="https://cdn.shanwo.cc/xcx/choosetrue.png" />
      </div>

      <image :src="params.url" mode="widthFix" @load="emitHeight" @error="emitHeight" />
      <!--      <view class="content">-->
      <!--        <view>{{ params.title }}</view>-->
      <!--        <view class="money">{{ params.money }}元</view>-->
      <!--        <view style="margin: 0 0 8rpx 0;">-->
      <!--          <text class="label">{{ params.label }}</text>-->
      <!--        </view>-->
      <!--        <view class="shop-name">{{ params.shop }}</view>-->
      <!--      </view>-->
    </view>
  </view>
</template>

<script>
export default {
  name: 'HelangWaterfall',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    tag: {
      type: String | Number,
      default: ''
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      status: 0
    }
  },
  methods: {
    // 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
    emitHeight(e) {
      const query = uni.createSelectorQuery().in(this)
      query.select('.waterfall-item-container').boundingClientRect(data => {
        const height = Math.floor(data.height)
        this.$emit('height', height, this.$props.tag)
      }).exec()
    },
    onTap() {
      this.$emit('click', this.$props.index, this.$props.tag)
    },
    handleAddCart() {
      const cartList = uni.getStorageSync('cartList') || []
      const cartIdArr = []
      cartList.forEach(val => {
        cartIdArr.push(val.id)
      })
      if (cartIdArr.includes(this.params.id)) {
        this.$common.toast('购物车已存在该照片')
        return
      } else {
        this.$common.toast('添加成功')
        cartList.push(this.params)
        uni.setStorageSync('cartList', cartList)
      }
      uni.$emit('changeCartNum', { msg: '页面更新' })
      // this.status = !this.status
    },
    handleRemoveCart() {
      this.status = !this.status
      // if (this.status == 0) {
      //   console.log('移除')
      //   const cartList = uni.getStorageSync('cartList') || []
      //   const id = this.params.id
      //   const arr = []
      //   cartList.forEach(val => {
      //     if (val.id != id) {
      //       arr.push(val)
      //     }
      //   })
      //   uni.setStorageSync('cartList', arr)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.waterfall-item {
  padding: 16 rpx;
  background-color: #fff;
  border-radius: 4px;
  font-size: 28 rpx;
  color: #666;
  position: relative;

  image {
    display: block;
    width: 100%;
    // 默认设置一个图片的大约值
    height: 350 rpx;
  }

  .content {
    margin-top: 16 rpx;

    .money {
      color: #fa3534;
      margin-top: 8 rpx;
    }

    .label {
      background-color: #fa3534;
      color: #fff;
      font-size: 20 rpx;
      padding: 4 rpx 16 rpx;
      border-radius: 20 rpx;
    }

    .shop-name {
      font-size: 20 rpx;
      color: #999;
    }
  }
}
.fix_box{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}
.fix_box_active{
  background: rgba(0,0,0,0.2);

}
.img_box{
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
.move_left {
  position: fixed;
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

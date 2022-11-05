<template>
  <div class="body_bg">
    <skiHeader />
    <emptyCom v-if="cartList.length == 0" />
    <view v-if="cartList.length > 0">
      <div class="ski_main">
        <div v-for="(item,index) in cartList" :key="item.id" class="cart_list">
          <div :class="[index %2 == 0 ? 'mr4':'']" class="main_box">
            <image :src="item.url" class="main_img" mode="aspectFill" />
            <div v-if="item.chooseStatus == 1" class="choose_box flexbox_center" @click.stop="handleChoose(index)">
              <image class="icon" src="https://cdn.shanwo.cc/xcx/choosetrue.png" />
            </div>
            <div v-else class="choose_box flexbox_center">
              <image class="icon" src="https://cdn.shanwo.cc/xcx/choosenone.png" @click.stop="handleChoose(index)" />
            </div>
          </div>
        </div>
      </div>
      <div class="edit_box" @click.stop="handleEdit">编辑</div>
      <div class="footer_box">
        <div v-if="editStatus == 1" class="footer_box_1">
          <div class="fl">
            <div>已选 <span style="color: #ff253a;margin: 0 8rpx">{{ num }}</span>张</div>
          </div>
          <div class="fr">
            <div class="btn cancel" style="margin-right: 8rpx" @click.stop="handleCancel">取消</div>
            <div class="btn del" @click.stop="handleDelete">删除</div>
          </div>
        </div>
        <div v-if="editStatus == 0" class="footer_box_2">
          <div class="fl">
            <div class="flexbox" @click.stop="handleChooseAll">
              <image v-if="chooseStatus == 1" class="icon" src="https://cdn.shanwo.cc/xcx/choosetrue.png" />
              <image v-else class="icon" src="https://cdn.shanwo.cc/xcx/choosenone.png" />
              <div style="font-weight: 400;margin-left: 6rpx">全选</div>
            </div>
            <div style="width: 100%;">
              <span>已选</span>
              <span style="color: #ff253a;margin: 0 8rpx">{{ num }}</span>
              <span>张，</span>
              <span>合计<span style="color: #ff253a;margin: 0 2rpx">￥{{ totalPrice }}</span>
              </span>
            </div>
          </div>
          <div class="fr" @click.stop="handleNextPage">
            <div class="btn cancel">结算</div>
          </div>
        </div>
        <safeAreaCom />
      </div>
    </view>

  </div>

</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
import emptyCom from '@/components/common/emptyCom'
export default {
  name: 'ChooseSkiList',
  components: {
    skiHeader,
    safeAreaCom,
    emptyCom
  },
  data() {
    return {
      num: 0,
      editStatus: 0,
      totalPrice: 0,
      cartList: [],
      chooseStatus: 0
    }
  },
  onLoad() {
    this.getCartList()
  },
  methods: {
    setPrice() {
      const price = uni.getStorageSync('skiObj').price * 1
      const idArr = []
      this.cartList.forEach(val => {
        if (val['chooseStatus'] == 1) {
          idArr.push(val.id)
        }
      })
      const totalPrice = (idArr.length * price / 100).toFixed(2)
      this.num = idArr.length
      this.totalPrice = totalPrice
      if (idArr.length == this.cartList.length) { // 如果选择的长度 等于购物车的长度 就代表全选了
        this.chooseStatus = 1
      } else {
        this.chooseStatus = 0
      }
    },
    handleChooseAll() {
      if (this.cartList.length) {
        if (this.chooseStatus == 1) {
          this.cartList.forEach(val => {
            val['chooseStatus'] = 0
          })
        } else {
          this.cartList.forEach(val => {
            val['chooseStatus'] = 1
          })
        }
        this.setPrice()
      }
    },
    handleChoose(index) {
      if (this.cartList[index].chooseStatus) {
        this.cartList[index].chooseStatus = 0
      } else {
        this.cartList[index].chooseStatus = 1
      }
      this.setPrice()
    },
    getCartList() {
      const cartList = uni.getStorageSync('cartList') || []
      cartList.forEach(val => {
        val['chooseStatus'] = 0
      })
      this.cartList = cartList
    },
    // 编辑
    handleEdit() {
      this.chooseStatus = 0
      this.totalPrice = 0
      this.num = 0
      if (this.editStatus == 1) {
        this.editStatus = 0
      } else {
        this.editStatus = 1
        this.cartList.forEach(val => {
          val['chooseStatus'] = 0
        })
      }
    },
    handleDelete() {
      const that = this
      uni.showModal({
        title: '提示',
        content: '确认要删除选中的图片吗?',
        success(res) {
          if (res.confirm) {
            const newArr = []
            that.cartList.forEach(val => {
              if (val['chooseStatus'] == 1) {
              } else {
                newArr.push(val)
              }
            })
            that.cartList = newArr
            uni.setStorageSync('cartList', newArr)
            that.num = 0
          } else if (res.cancel) {
            console.log('点击取消')
          }
        }
      })
    },
    handleCancel() {
      this.cartList.forEach(val => {
        val['chooseStatus'] = 0
      })
      this.num = 0
      this.totalPrice = 0
      this.editStatus = 0
      this.chooseStatus = 0
    },
    handleNextPage() {
      // if (this.cartList.length == 0) {
      //   this.$common.showToast('请选择结算的照片')
      //   return
      // }
      const idArr = []
      this.cartList.forEach(val => {
        if (val['chooseStatus'] == 1) {
          idArr.push(val.id)
        }
      })
      if (idArr.length == 0) {
        this.$common.toast('请选择结算的照片')
        return
      }
      this.$common.push({
        url: `/pages/confirmOrder/confirmOrder?idArr=${idArr}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "/src/static/theme.scss";

.body_bg {
  padding-bottom: 150rpx;
}

.mr4 {
  margin-right: 4rpx;
}

.ski_main {
  padding: 0 4rpx 0 6rpx;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  .cart_list {
    margin-bottom: 4rpx;

    .main_box {
      position: relative;
    }

    .main_img {
      width: 368rpx;
      height: 244rpx;
      display: block;
    }
  }

}

.choose_box {
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;

  .icon {
    width: 40rpx;
    height: 40rpx;
    display: block;
  }
}

.footer_box {
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0,0,0,0.6);
  padding: 15rpx 24rpx;
  box-sizing: border-box;

.footer_box_1{
    display: flex;
    justify-content: space-between;
    .fl{
      display: flex;
      align-items: center;
      font-size: 32rpx;
      font-weight: 600;
      color: #FFFFFF;
    }
  .fr{
    display: flex;
  }
  .btn{
    width: 154rpx;
    height: 68rpx;
    line-height: 68rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: #000000;
    background: $titleColor;
    text-align: center;
    border-radius: 34rpx;
  }
  .del{
    color: #fff;
    background: #ff253a;
  }
  }
  .footer_box_2{
    display: flex;
    justify-content: space-between;
    .fl{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: 32rpx;
      font-weight: 600;
      color: #FFFFFF;
      .icon{
        width: 40rpx;
        height: 40rpx;
      }
    }
    .fr{
      display: flex;
    }
    .btn{
      width: 154rpx;
      height: 68rpx;
      line-height: 68rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: #000000;
      background: $titleColor;
      text-align: center;
      border-radius: 34rpx;
    }
    .del{
      color: #fff;
      background: #ff253a;
    }
  }
}
.edit_box{
  position: fixed;
  z-index: 100;
  left:0;
  color: #fff;
  bottom: 300rpx;
  text-align: center;
  line-height: 60rpx;
  font-size: 32rpx;
  width: 144rpx;
  height: 60rpx;
  border-radius: 0px 29rpx 29rpx 0px;
  background: rgba(0,0,0,0.6);
}

</style>

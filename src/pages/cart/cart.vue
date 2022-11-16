<template>
  <div class="body_bg">
    <skiHeader />
    <div v-if="cartList.length == 0" style="margin-top: 150px">
      <emptyCom />
    </div>
    <view>
      <template>
        <view class="container">
          <view class="left">
            <view v-for="(item,index) in leftList" :key="index" class="left_box">
              <image :src="item.url" alt="" mode="widthFix" @click="hanleClickImg(item)" />
              <div v-if="item.chooseStatus == 1" class="choose_box flexbox_center" @click.stop="handleChoose('left',index)">
                <image class="icon" src="https://cdn.shanwo.cc/xcx/choosetrue.png" />
              </div>
              <div v-else class="choose_box flexbox_center">
                <image class="icon" src="https://cdn.shanwo.cc/xcx/choosenone.png" @click.stop="handleChoose('left',index)" />
              </div>
            </view>
          </view>
          <view class="right">
            <view v-for="(item,index) in rightList" :key="index" class="right_box">
              <image :src="item.url" alt="" mode="widthFix" @click="hanleClickImg(item)" />
              <div v-if="item.chooseStatus == 1" class="choose_box flexbox_center" @click.stop="handleChoose('right',index)">
                <image class="icon" src="https://cdn.shanwo.cc/xcx/choosetrue.png" />
              </div>
              <div v-else class="choose_box flexbox_center">
                <image class="icon" src="https://cdn.shanwo.cc/xcx/choosenone.png" @click.stop="handleChoose('right',index)" />
              </div>
            </view>
          </view>
        </view>
      </template>

      <div class="my_box" @click.stop="handleEdit">编辑</div>
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
    <photoDetailDialog v-if="photoStatus" ref="refPhotoDetailDialog" :page-from="'cart'" :img-list="cartList" :photo-obj="photoObj" @listenCancel="listenCancel" @listenSuccess="listenSuccess" @listenClose="listenClose" />

  </div>

</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'
import emptyCom from '@/components/common/emptyCom'
import photoDetailDialog from '@/components/common/photoDetailDialog'
export default {
  name: 'ChooseSkiList',
  components: {
    skiHeader,
    safeAreaCom,
    photoDetailDialog,
    emptyCom
  },
  data() {
    return {
      photoObj: '',
      photoStatus: false,
      leftList: [],
      rightList: [],
      // 初始化左右盒子高度
      leftH: 0,
      rightH: 0,
      num: 0,
      editStatus: 0,
      totalPrice: 0,
      cartList: [],
      chooseStatus: 0
    }
  },
  onLoad() {
  },
  onShow() {
    this.getCartList()
  },
  onHide() {
    this.photoObj = ''
    this.photoStatus = false
    this.leftList = []
    this.rightList = []
    // 初始化左右盒子高度
    this.leftH = 0
    this.rightH = 0
  },
  methods: {
    hanleClickImg(obj) {
      this.photoObj = obj
      this.photoStatus = true
      const data = JSON.parse(JSON.stringify(this.cartList))
      const index = this.cartList.findIndex(val => val.id == obj.id)
      console.log('index', index)
      setTimeout(() => {
        this.$refs['refPhotoDetailDialog'].init(data, index)
      })
    },
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
      if (this.leftList.length) {
        if (this.chooseStatus == 1) {
          this.leftList.forEach(val => {
            val['chooseStatus'] = 0
          })
        } else {
          this.leftList.forEach(val => {
            val['chooseStatus'] = 1
          })
        }
      }
      if (this.rightList.length) {
        if (this.chooseStatus == 1) {
          this.rightList.forEach(val => {
            val['chooseStatus'] = 0
          })
        } else {
          this.rightList.forEach(val => {
            val['chooseStatus'] = 1
          })
        }
      }
      this.setPrice()
    },
    handleChoose(decrition, index) {
      if (decrition == 'left') {
        if (this.leftList[index].chooseStatus) {
          this.leftList[index].chooseStatus = 0
        } else {
          this.leftList[index].chooseStatus = 1
        }
      } else {
        if (this.rightList[index].chooseStatus) {
          this.rightList[index].chooseStatus = 0
        } else {
          this.rightList[index].chooseStatus = 1
        }
      }

      this.setPrice()
    },
    getCartList() {
      this.cartList = []
      const cartList = uni.getStorageSync('cartList') || []
      cartList.forEach(val => {
        val['chooseStatus'] = 0
      })
      this.cartList = cartList
      this.doList()
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
            that.leftList = []
            that.rightList = []
            that.leftH = 0
            that.rightH = 0
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
      const that = this
      if (uni.getStorageSync('token')) {
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
      } else {
        uni.showModal({
          title: '提示',
          content: '您当前未登录,您是否立即登录',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.$common.push({
                url: `/pages/login/login`
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },
    doList() {
      const that = this
      this.cartList.forEach(res => {
        // 获取图片宽高
        const url = res.url.includes('https') ? res.url : 'https:' + res.url
        uni.getImageInfo({
          src: url,
          success: (image) => {
            // console.log(res.url)
            // 计算图片渲染高度
            const showH = (50 * image.height) / image.width
            // 判断左右盒子高度
            if (that.leftH <= that.rightH) {
              that.leftList.push(res)
              that.leftH += showH
            } else {
              that.rightList.push(res)
              that.rightH += showH
            }
          }
        })
      })
    },
    listenClose() {
      this.photoStatus = false
    },
    // 监听取消
    listenCancel(obj) {
      const fIndex = this.leftList.findIndex(val => val.id == obj.id)
      console.log('fIndex', fIndex)
      if (fIndex >= 0) {
        this.leftList[fIndex].chooseStatus = 0
      } else {
        const rIndex = this.rightList.findIndex(val => val.id == obj.id)
        console.log('fIndex', fIndex)
        this.rightList[rIndex].chooseStatus = 0
      }
    },
    // 监听选中
    listenSuccess(obj) {
      const fIndex = this.leftList.findIndex(val => val.id == obj.id)
      console.log('fIndex', fIndex)
      if (fIndex >= 0) {
        this.leftList[fIndex].chooseStatus = 1
      } else {
        const rIndex = this.rightList.findIndex(val => val.id == obj.id)
        console.log('fIndex', fIndex)
        this.rightList[rIndex].chooseStatus = 1
      }
    },
    onDone() {

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

.my_box{
  position: fixed;
  right: 20rpx;
  bottom: 200rpx;
  z-index: 99;
  width: 88rpx;
  height: 88rpx;
  background: #F8B800;
  opacity: 0.8;
  font-size: 28rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.container {
  padding: 0 30rpx;
  font-size: 14rpx;
  line-height: 24rpx;
}
.right,
.left{display: inline-block; width: 49%;vertical-align: top;}
.left{margin-right: 2%;}
.left image,
.right image{width: 100%;margin-bottom: 10rpx;}
.left_box,.right_box{
  position: relative;
}
</style>

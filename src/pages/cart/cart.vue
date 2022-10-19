<template>
  <div class="body_bg">
    <skiHeader />
    <div class="ski_main">
      <div v-for="(item,index) in 18" :key="index" class="cart_list">
        <div :class="[index %2 == 0 ? 'mr4':'']" class="main_box">
          <image src="" class="main_img" />
          <div class="choose_box flexbox_center">
            <image class="icon" src="/static/images/cart/choosenone.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="edit_box">编辑</div>
    <div class="footer_box">
      <!--      <div class="footer_box_1">-->
      <!--        <div class="fl">-->
      <!--          <div>已选 <span style="color: #ff253a;margin: 0 8rpx">18</span>张</div>-->
      <!--        </div>-->
      <!--        <div class="fr">-->
      <!--          <div class="btn cancel" style="margin-right: 8rpx">取消</div>-->
      <!--          <div class="btn del">删除</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="footer_box_2">
        <div class="fl">
          <div class="flexbox">
            <image class="icon" src="/static/images/cart/choosenone.png" />
            <div style="font-weight: 400;margin-left: 6rpx">全选</div>
          </div>
          <div style="width: 100%;">
            <span>已选</span>
            <span style="color: #ff253a;margin: 0 8rpx">18</span>
            <span>张，</span>
            <span>合计<span style="color: #ff253a;margin: 0 2rpx">￥18</span>
            </span>
          </div>
        </div>
        <div class="fr">
          <div class="btn cancel">结算</div>
        </div>
      </div>
      <safeAreaCom />
    </div>
  </div>

</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import safeAreaCom from '@/components/common/safeAreaCom'

export default {
  name: 'ChooseSkiList',
  components: {
    skiHeader,
    safeAreaCom
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
      background: red;
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

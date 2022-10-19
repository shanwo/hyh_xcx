<template>
  <div class="body_bg">
    <skiHeader />
    <div class="title">请选择你所在的雪场</div>
    <div class="ski_main">
      <div v-for="(item,index) in 5" class="ski_list">
        <image src="" class="main_img" />
        <div class="flexbox_s_center hxc_label">
          <image class="icon_left" src="/static/images/index/gps@2x.png" />
          <div class="active">爱神滑雪场</div>
        </div>
        <div class="desc_box">北京市昌平区龙泽啊实打实第三方的风格</div>
      </div>
    </div>
  </div>

</template>

<script>
import skiHeader from '@/components/common/skiHeader'
export default {
  name: 'ChooseSkiList',
  components: {
    skiHeader
  }
}
</script>

<style lang="scss" scoped>
@import "/src/static/theme.scss";
  .body_bg{
    padding-bottom: 150rpx;
  }
  .ski_list{
    margin: 0 32rpx 32rpx;
    .main_img{
      min-width: 684rpx;
      background: #fff;
    }
  }
.title{
  height: 50rpx;
  font-size: 36rpx;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 50rpx;
  margin-top: 32rpx;
  margin-left: 20rpx;
  margin-bottom: 28rpx;
}
  .desc_box{
    height: 34rpx;
    font-size: 24rpx;
    font-weight: 400;
    box-sizing: border-box;
    color: $descColor;
  }
  .hxc_label{
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
</style>

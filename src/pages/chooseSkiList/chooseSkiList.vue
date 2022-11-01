<template>
  <div class="body_bg">
    <skiHeader />
    <div class="title">请选择你所在的雪场</div>
    <div class="ski_main">
      <div v-for="(item,index) in venueLists" :key="item.id" class="ski_list">
        <image :src="item.image" class="main_img" />
        <div class="flexbox_s_center hxc_label">
          <image v-if="item.id == skid" class="icon_left" src="https://cdn.shanwo.cc/xcx/gps@2x.png" />
          <image v-else class="icon_left" src="https://cdn.shanwo.cc/xcx/nochoose.png" />
          <div v-if="item.id == skid" class="active">{{ item.name }}</div>
          <div v-else class="active" style="color: #ffffff">{{ item.name }}</div>
        </div>
        <div class="desc_box">{{ item.merger_name }}{{ item.address }}</div>
        <template>
          <div v-if="item.id == skid" class="choose_box_active">
            <image class="icon" src="https://cdn.shanwo.cc/xcx/choose@2x.png" />
            <div>当前选择</div>
          </div>
          <div v-else class="choose_box" @click="handleChoose(item)">选择</div>
        </template>

      </div>
    </div>
  </div>

</template>

<script>
import skiHeader from '@/components/common/skiHeader'
import { ajaxVenueLists } from '@/api/chooseSkiList'
export default {
  name: 'ChooseSkiList',
  components: {
    skiHeader
  },
  data() {
    return {
      skid: '', //  被选中的雪场id
      venueLists: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.skid = uni.getStorageSync('skid') || ''
      this.getList()
    },
    handleChoose(obj) {
      uni.setStorageSync('skid', obj.id)
      uni.setStorageSync('skiObj', obj)
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 2]
      console.log('前一个页面', currentPage)
      currentPage.$vm.init() // 调用首页的初始化方法
      this.$common.back()
    },
    getList() {
      ajaxVenueLists().then(res => {
        console.log('雪场列表', res.data.data.lists)
        this.venueLists = res.data.data.lists
      })
    }

  }

}
</script>

<style lang="scss" scoped>
@import "/src/static/theme.scss";
  .body_bg{
    padding-bottom: 150rpx;
  }
  .ski_list{
    position: relative;
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
    margin-top: 20rpx;
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
  .choose_box{
    position: absolute;
    right: 0;
    bottom: 38rpx;
    width: 154rpx;
    height: 68rpx;
    background: #F8B800;
    border-radius: 34rpx;
    text-align: center;
    line-height: 68rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: #000000;
  }
  .choose_box_active{
    display: flex;
    align-items: center;
    position: absolute;
    color: $titleColor;
    font-size: 28rpx;
    right: 0;
    bottom: 30rpx;
    .icon{
      width: 36rpx;
      height: 36rpx;
      display: block;
    }
  }
</style>

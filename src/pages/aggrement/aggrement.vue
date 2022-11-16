<template>
  <view class="box_1">
    <skiHeader :title="tName" :title-color="'#fff'" />
    <div v-html="desc" />
  </view>
</template>

<script>
import { ajaxProtocol } from '@/api/commonApi'
import skiHeader from '@/components/common/skiHeader'
export default {
  name: 'Aggrement',
  components: {
    skiHeader
  },
  data() {
    return {
      desc: '',
      tName: '',
      skiHeader
    }
  },
  mounted() {
    ajaxProtocol({ type: 1 }).then(res => {
      console.log('res', res)
      // console.log('res,', res.data.data.desc)
      this.desc = res.data.data.desc
      this.tName = res.data.data.name
    })
  }

}
</script>
<style>
page {
  background-color:#fff;
}
</style>
<style scoped>
  .box_1{
    padding: 20rpx;
    box-sizing: border-box;
  }
</style>

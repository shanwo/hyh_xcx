<template>
  <div>
    <view :id="virtualId">
      <block v-if="isShow">
        <slot />
      </block>
      <view v-else :style="{height: height +'px'}" />
    </view>
  </div>
</template>

<script>
export default {
  name: 'VirtualItem',
  props: {
    virtualId: {
      type: String,
      default: ''
    }
  //   // 父级滚动容器ID，如果需要以指定容器处理
  //   wrapId: {
  //     type: String,
  //     default: ''
  //   },
  //   // 离可见区域的距离，单位px
  //   observeDistance: {
  //     type: Number,
  //     default: 1500
  //   }
  },
  data() {
    return {
      observeDistance: 1500,
      wrapId: '',
      // virtualId: '',
      height: 0,
      isShow: true
    }
  },
  mounted() {
    this.getCurrentItemHeight()
  },
  methods: {
    getCurrentItemHeight() {
      const query = this.createSelectorQuery()
      const virtualId = this.virtualId
      // debugger
      query.select(`#${virtualId}`).boundingClientRect()
      query.exec((res) => {
        this.height = res[0].height
        this.observePage()
      })
    },
    observePage() {
      const virtualId = this.virtualId
      const observeDistance = this.observeDistance
      const wrapId = this.wrapId

      const IntersectionObserver = wx.createIntersectionObserver(this);
      (wrapId ? IntersectionObserver.relativeTo(`#${wrapId}`) : IntersectionObserver.relativeToViewport({ top: observeDistance, bottom: observeDistance }))
        .observe(`#${virtualId}`, ({ intersectionRatio }) => {
          this.isShow = intersectionRatio > 0
        })
    }
  }
}
</script>

<style scoped>

</style>

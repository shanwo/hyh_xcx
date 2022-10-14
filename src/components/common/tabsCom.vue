<template>
  <view class="scroll_box">
    <scroll-view scroll-with-animation :scroll-left="scrollLeft" class="category_box" scroll-x>
      <view v-for="(item,index) in list" :key="index" :class="['category_list', 'category_list_'+index]" @click="handleTab(index)">
        <view :class="['name','text_line1',index== tabIndex? 'name_active' :'' ]">{{ item.name }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>

export default {
  name: 'CategoryCom',
  data() {
    return {
      innerCurrent: 0,
      arrDomReact: [],
      scrollLeft: 0,
      scrollViewWidth: 0,
      tabIndex: 0,
      tabsRect: {
        left: 0
      },
      list: [
        {
          name: '11:00'
        },
        {
          name: '11:00'
        },
        {
          name: '11:00'
        }, {
          name: '11:00'
        }, {
          name: '11:00'
        }, {
          name: '11:00'
        }, {
          name: '11:00'
        }, {
          name: '11:00'
        }

      ]
    }
  },
  computed: {
  },
  mounted() {
    this.$nextTick(() => {
      this.resize()
    })
  },
  methods: {
    handleTab(index) {
      this.tabIndex = index
      // this.$emit('categoryClick')
      this.resize()
    },
    // 获取所有标签的尺寸
    resize() {
      // 如果不存在list，则不处理
      if (this.list.length === 0) {
        return
      }
      Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
        // console.log('this.tabsRect', this.tabsRect)
        this.tabsRect = tabsRect
        this.scrollViewWidth = 0
        itemRect.map((item, index) => {
          // 计算scroll-view的宽度，这里
          this.scrollViewWidth += item.width
          // 另外计算每一个item的中心点X轴坐标
          this.list[index].rect = item
        })
        this.setScrollLeft()
      })
    },
    setScrollLeft() {
      // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
      const tabRect = this.list[this.tabIndex]
      // console.log('u_tab_tanRect', tabRect)
      // 累加得到当前item到左边的距离
      const offsetLeft = this.list
        .slice(0, this.tabIndex)
        .reduce((total, curr) => {
          return total + curr.rect.width
        }, 0)
      // 此处为屏幕宽度
      const windowWidth = uni.getSystemInfoSync().windowWidth
      // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
      let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 - (windowWidth - this.tabsRect
        .right) / 2 + this.tabsRect.left / 2
      // 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
      // console.log('u_tab_scrollViewWidth', this.scrollViewWidth)
      scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width)
      this.scrollLeft = Math.max(0, scrollLeft)
      // console.log('u_tab_scrollLeft', this.scrollLeft)
    },
    // 获取导航菜单的尺寸
    getTabsRect() {
      return new Promise(resolve => {
        this.queryRect('scroll_box').then(size => resolve(size))
      })
    },
    // 获取所有标签的尺寸
    getAllItemRect() {
      return new Promise(resolve => {
        const promiseAllArr = this.list.map((item, index) => this.queryRect(
          `category_list_${index}`, true))
        Promise.all(promiseAllArr).then(sizes => resolve(sizes))
      })
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect(selector, all) {
      return new Promise(resolve => {
        uni.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    },
    // 获取各个标签的尺寸
    queryRect(el, item) {
      // 组件内部一般用this.$uGetRect，对外的为uni.$u.getRect，二者功能一致，名称不同
      return new Promise(resolve => {
        this.$uGetRect(`.${el}`).then(size => {
          resolve(size)
        })
      })
    },
    // 获取每一个 category_list_ 的宽度
    uGetRect(index) {
      const arrDomReact = []
      uni.createSelectorQuery().in(this).select('.category_list_' + index)
        .boundingClientRect(rect => {
          // console.log('el', rect)
          arrDomReact.push(rect)
          this.arrDomReact.push(rect)
        }).exec()
    }
  }
}
</script>

<style  scoped>
.category_box{
  height: 162rpx;
  width: auto;
  overflow:hidden;
}
.category_list{
  display: inline-block;
  padding: 0 22rpx;
}
.category_icon{
  width: 110rpx;
  height: 112rpx;
  display: block;
}
.name{
  text-align: center;
  width: 110rpx;
  height: 50rpx;
  line-height: 56rpx;
  font-size: 28rpx;
  margin-top: -10rpx;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  color: #333333;
}
.name_active{
  color: #fa4535;
  background-size: 110rpx 48rpx;
}
.scroll_box{
  width: 100%;
  height: 272rpx;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}
.scroll_box scroll-view{
  width: auto;
  height: 168rpx;
  overflow:hidden;
}
.item_list{
  width: 160rpx;
  height: 100%;
  margin-right: 23rpx;
  display: inline-block;
  margin-left: 10px;
  background-color: blue;

}
</style>

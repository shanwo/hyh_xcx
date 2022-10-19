<template>
  <view>
    <scroll-view class="virtualScrollView" eventhandle scroll-y @scrolltolower="onScrollLower">
      <block v-for="(screenItem,screenIndex) in listData" :key="screenIndex">
        <virtualItem :virtual-id="'virtual_'">
          <view class="fall">
            <block v-for="(column,columnIndex) in screenItem.columns " :key="columnIndex">
              <view :style="{'margin-top': -screenItem.columnOffset[columnIndex]+'px'}" class="fallCol">
                <view v-for="(item,index) in column" :key="index" :style="{height: item.height + 'px', 'background-color': item.color }">
                  screen: {{ screenIndex }}, column: {{ columnIndex }}
                </view>
              </view>
            </block>
          </view>
        </virtualItem>
      </block>
    </scroll-view>
  </view>
</template>

<script>
import virtualItem from '@/components/common/virtualItem'
export default {
  name: 'List',
  components: {
    virtualItem
  },
  data() {
    return {
      listQuery: {
        pageIndex: 0,
        pageSize: 30
      }, // 列表请求参数
      listData: [], // 列表数据
      column: 3, // 列数
      columnsHeights: [0, 0, 0] // 每列高度
    }
  },
  onLoad() {
    this.getList()
  },
  methods: {
    getList() {
      const pageIndex = this.listQuery.pageIndex
      const columnsHeights = [0, 0, 0]
      const columns = []
      // 上一组的高度数据，用于计算偏移值
      const lastHeights = [...columnsHeights]
      // 获取数据
      const list = this.getListData()
      console.log('list', list)
      // 初始化当前屏数据
      for (let i = 0; i < this.column; i++) {
        columns.push([])
      }
      // 遍历新数据，分配至各列
      for (let i = 0; i < list.length; i++) {
        const position = this.computePosition(columnsHeights)
        columns[position].push(list[i])
        columnsHeights[position] += Number(list[i].height)
      }
      // this.setData({
      //   [`listData[${pageIndex}]`]: {
      //     columns,
      //     columnOffset: this.computeOffset(lastHeights)
      //   }
      // })
      this.listData[pageIndex] = {
        columns,
        columnOffset: this.computeOffset(lastHeights)
      }
      console.log('listData', this.listData)
      this.listQuery.pageIndex = pageIndex + 1
      this.columnsHeights = columnsHeights
    },

    /**
     * 获取列表数据
     */
    getListData() {
      const result = []
      for (let i = 0; i < this.listQuery.pageSize; i++) {
        const height = Math.floor(Math.random() * 300)
        const item = {
          height: height < 150 ? height + 150 : height,
          color: this.randomRgbColor()
        }
        result.push(item)
      }
      return result
    },

    /**
     * 随机生成RGB颜色
     */
    randomRgbColor() {
      var r = Math.floor(Math.random() * 256) // 随机生成256以内r值
      var g = Math.floor(Math.random() * 256) // 随机生成256以内g值
      var b = Math.floor(Math.random() * 256) // 随机生成256以内b值
      return `rgb(${r},${g},${b})` // 返回rgb(r,g,b)格式颜色
    },

    /**
     * 获取最小高度列下标
     */
    computePosition(heights) {
      const min = Math.min(...heights)
      return heights.findIndex((item) => item === min)
    },

    /**
     * 计算偏移量
     */
    computeOffset(heights) {
      const max = Math.max(...heights)
      return heights.map((item) => max - item)
    },

    onScrollLower() {
      this.getList()
    }
  }
}
</script>

<style scoped>
.virtualScrollView {
  height: 100vh;
}
.fall {
  position: relative;
  display: flex;
}
.fallCol {
  flex: 1;
  display: flex;
  flex-direction: column;
}

</style>

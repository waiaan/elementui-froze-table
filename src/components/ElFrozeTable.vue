<template>
  <div class="el-froze-table-container" ref="container" @scroll="handleScroll">
    <div class="el-froze-table-wrapper" :style="{ width: wrapperWidth }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'

const transCamelToClassName = str => {
  const match = str.match(/[A-Z]/)
  if (match) {
    const ch = match[0]
    const strArr = str.split(ch)
    return strArr[0] + '-' + ch.toLowerCase() + strArr[1]
  } else {
    return str
  }
}

export default {
  props: {
    // top right bottom left
    froze: {
      type: Array,
      default () {
        return [1]
      }
    }
  },
  data () {
    return {
      wrapperWidth: '100%'
    }
  },
  computed: {
    left () {
      return this.froze[3] || 0
    },
    right () {
      return this.froze[1] || 0
    },
    top () {
      return this.froze[0] || 0
    },
    bottom () {
      return this.froze[2] || 0
    }
  },
  watch: {
    froze: {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.setWrapperWidth()
        let leftWidth = 0
        let rightWidth = 0
        let topHeight = 0
        let bottomHeight = 0
        if (this.left) {
          leftWidth = this.getColsWidth(this.left)
        }
        if (this.right) {
          rightWidth = this.getColsWidth(-this.right)
        }
        if (this.top) {
          topHeight = this.getRowsHeight(this.top)
        }
        if (this.bottom) {
          bottomHeight = this.getRowsHeight(-this.bottom)
        }
        this.createLeftTopTable({ width: leftWidth, height: topHeight })
        this.createLeftBottomTable({ width: leftWidth, height: bottomHeight })
        this.createRightTopTable({ width: rightWidth, height: topHeight })
        this.createRightBottomTable({ width: rightWidth, height: bottomHeight })
        this.createTopTable({ height: topHeight })
        this.createBottomTable({ height: bottomHeight })
        this.createRightTable({ width: rightWidth })
        this.createLeftTable({ width: leftWidth })
      })
    },
    setWrapperWidth () {
      const table = this.getSlot()
      this.tableWidth = table.find('.el-table__body').width()
      this.tableHeight = table.find('.el-table__header-wrapper').height() + table.find('.el-table__body').height()
      this.wrapperWidth = this.tableWidth + 'px'
    },
    getSlot () {
      return $(this.$slots.default[0].elm)
    },
    getColsWidth (colNum) {
      const table = this.getSlot()
      const cols = table.find('.el-table__body-wrapper colgroup col')
      let width = 0
      let start = 0
      let end = 0
      if (colNum > 0) {
        start = 0
        end = colNum
      }
      if (colNum < 0) {
        start = cols.length + colNum
        end = cols.length
      }
      for (let i = start; i < end; i++) {
        width += Number($(cols[i]).attr('width'))
      }
      return width
    },
    getRowsHeight (rowNum) {
      const table = this.getSlot()
      const rows = table.find('.el-table__body-wrapper tr')
      let height = 0
      let start = 0
      let end = 0
      if (rowNum > 0) {
        start = 0
        end = rowNum
      }
      if (rowNum < 0) {
        start = rows.length + rowNum
        end = rows.length
      }
      for (let i = start; i < end; i++) {
        height += Number($(rows[i]).outerHeight())
      }
      return height
    },
    createCloneTable (position, size) {
      const { width = 0, height = 0 } = size
      const initialCSS = {
        left: {
          left: 0,
          top: 0,
          width: width + 'px'
        },
        top: {
          left: 0,
          top: 0,
          height: height + 'px'
        },
        bottom: {
          left: 0,
          bottom: 0,
          height: height + 'px'
        },
        right: {
          right: 0,
          top: 0,
          width: width + 'px'
        },
        leftTop: {
          left: 0,
          top: 0,
          width: width + 'px',
          height: height + 'px'
        },
        leftBottom: {
          left: 0,
          bottom: 0,
          width: width + 'px',
          height: height + 'px'
        },
        rightTop: {
          right: 0,
          top: 0,
          width: width + 'px',
          height: height + 'px'
        },
        rightBottom: {
          right: 0,
          bottom: 0,
          width: width + 'px',
          height: height + 'px'
        }
      }
      const table = this.getSlot()
      const tableContainer = $(this.$refs.container)
      const className = transCamelToClassName(position)
      const wrapper = $('<div class="fixed-table ' + className + '"></div>')
      tableContainer.find('.' + className).remove()
      wrapper.css(initialCSS[position])
      const cloneTable = table.clone(true)
      cloneTable.find('.el-table__body-wrapper').css({ 'overflow-x': 'hidden' })
      if (position.toLowerCase().indexOf('bottom') > -1) {
        cloneTable.css({ top: -(this.tableHeight - height) + 'px' })
      }
      wrapper.append(cloneTable)
      tableContainer.append(wrapper)
      if (position.toLowerCase().indexOf('right') > -1) {
        cloneTable.find('.el-table__body-wrapper').scrollLeft(this.tableWidth)
        cloneTable.find('.el-table__header-wrapper').scrollLeft(this.tableWidth)
      }
    },
    createLeftTopTable (size) {
      this.createCloneTable('leftTop', size)
    },
    createLeftBottomTable (size) {
      this.createCloneTable('leftBottom', size)
    },
    createRightTopTable (size) {
      this.createCloneTable('rightTop', size)
    },
    createRightBottomTable (size) {
      this.createCloneTable('rightBottom', size)
    },
    createTopTable (size) {
      this.createCloneTable('top', size)
    },
    createBottomTable (size) {
      this.createCloneTable('bottom', size)
    },
    createRightTable (size) {
      this.createCloneTable('right', size)
    },
    createLeftTable (size) {
      this.createCloneTable('left', size)
    },
    handleScroll (e) {
      const { scrollTop, scrollLeft } = e.target
      $(this.$refs.container).find('.left-top').css({ top: scrollTop + 'px', left: scrollLeft + 'px' })
      $(this.$refs.container).find('.left-bottom').css({ bottom: -scrollTop + 'px', left: scrollLeft + 'px' })
      $(this.$refs.container).find('.right-top').css({ top: scrollTop + 'px', right: -scrollLeft + 'px' })
      $(this.$refs.container).find('.right-bottom').css({ bottom: -scrollTop + 'px', right: -scrollLeft + 'px' })
      $(this.$refs.container).find('.top').css({ top: scrollTop + 'px' })
      $(this.$refs.container).find('.left').css({ left: scrollLeft + 'px' })
      $(this.$refs.container).find('.bottom').css({ bottom: -scrollTop + 'px' })
      $(this.$refs.container).find('.right').css({ right: -scrollLeft + 'px' })
    }
  }
}
</script>
<style>
.el-froze-table-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
.el-froze-table-container .fixed-table {
  position: absolute;
  overflow: hidden;
}
.el-froze-table-container .left-top,
.el-froze-table-container .left-bottom,
.el-froze-table-container .right-top,
.el-froze-table-container .right-bottom {
  z-index: 10;
}
</style>

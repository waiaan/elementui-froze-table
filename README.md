# elementui-froze-table

## Usage
```js
<template>
  <div id="app">
    <el-froze-table :froze="froze">
      <el-table :data="tableData" ref="dataTable" class="data-table">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="date" label="日期" width="150"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
        <el-table-column prop="province" label="省份" width="120"> </el-table-column>
        <el-table-column prop="city" label="市区" width="120"> </el-table-column>
        <el-table-column prop="address" label="地址" width="300"> </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-froze-table>
  </div>
</template>

<script>
import ElFrozeTable from '@/components/ElFrozeTable'

export default {
  name: 'App',
  components: {
    ElFrozeTable
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }, {
          date: '2016-05-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1526 弄',
          zip: 200333
        }, {
          date: '2016-05-23',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1596 弄',
          zip: 200333
        }
      ],
      froze: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.froze = [].concat([2, 2, 1, 1])
    }, 1000)
  }
}
</script>
```
### the prop 'froze' is an array as '[top,right,bottom,left]' to set which row/col want to be frozen,you should set 0 if you do not want a row/col to be frozen.

### ElFrozeTable outer container element (like '#app' in demo above) must have width and height,and should not set attribute 'height' in ElTable.

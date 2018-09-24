<template>
  <div class="tablelist-box">
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
    </div>
    <el-table
      :data="searching ? data.slice((cur_page - 1) * page_size, cur_page * page_size): tableData.slice((cur_page - 1) * page_size, cur_page * page_size)"
      style="width: 100%">
      <el-table-column
        label="规则名称"
        prop="name">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small">
          查看规则
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        @current-change ="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next"
        :page-size=page_size
        :page-sizes="[10, 20, 50]"
        :total=data.length>
      </el-pagination>
    </div>
  </div>
</template>
<!-- 此处添加scropd 样式不生效 ？？-->
<style lang="stylus">
  .el-table .cell {
    height: 25px;
    line-height : 205x;
  }
  .tablelist-box {
    width: 60%;
    min-width 700px;
    margin: 0 auto;
    padding-top: 30px;
    .handle-box {
      width: 30%;
      margin-bottom: 20px;
    }
    .pagination {
      margin-top: 20px;
    }
  }


</style>

<script>
  import list from './data.js'
  export default {
    data () {
      return {
        select_word: '',
        tableData: [],
        interfaceData: [],
        cur_page: 1,
        page_size: 10
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      searching () {
        return this.select_word
      },
      data () {
        const self = this
        return self.tableData.filter(function (d) {
          if (d.name.indexOf(self.select_word) > -1) {
            return d
          }
        })
      }
    },
    methods: {
      handleSizeChange (val) {
        this.page_size = val
      },
      handleCurrentChange (val) {
        this.cur_page = val
      },
      getData () {
        var data = list.data
        var tableData = []
        data.forEach((item) => {
          tableData.push({
            id: item.id,
            name: item.name
          })
        })
        this.tableData = tableData
      }
    }
  }
</script>

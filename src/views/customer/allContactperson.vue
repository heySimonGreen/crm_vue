<template>
  <div class="el-container">
    <!--    <el-table-->
    <!--      v-if="contactpersonList[0]"-->
    <!--      :key="tableKey"-->
    <!--      :row-key="getRowKeys"-->
    <!--      :header-cell-style="{background: '#EBEEF3'}"-->
    <!--      :data="contactpersonList.slice((currentPage-1)*pageSize,currentPage*pageSize)"-->
    <!--      border-->
    <!--      fit-->
    <!--      highlight-current-row-->
    <!--      style="width: 100%"-->
    <!--      @selection-change="handleSelectionChange"-->
    <!--    >-->
    <!--      <el-table-column-->
    <!--        type="selection"-->
    <!--        width="55"-->
    <!--        :reserve-selection="true"-->
    <!--      />-->

    <!--      <el-table-column-->
    <!--        label="编号"-->
    <!--        type="index"-->
    <!--        width="50"-->
    <!--        min-width="50"-->
    <!--        align="center"-->
    <!--      />-->
    <!--      <el-table-column label="guid" min-width="80" align="center">-->
    <!--        <template slot-scope="{row}">-->
    <!--          <span>{{ row.guid }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="username" min-width="80" align="center">-->
    <!--        <template slot-scope="{row}">-->
    <!--          <span>{{ row.username }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="username" min-width="80" align="center">-->
    <!--        <el-button type="success">查看所有联系人</el-button>-->
    <!--        <el-button type="success">查看所有联系地址</el-button>-->
    <!--        <el-button type="warning">添加联系地址</el-button>-->
    <!--        <el-button type="warning">添加联系人</el-button>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->
    <!--    <el-pagination-->
    <!--      :current-page="currentPage"-->
    <!--      :page-sizes="[3,5,10,8,15, 30, 50, 100]"-->
    <!--      :page-size="pageSize"-->
    <!--      layout="total, sizes, prev, pager, next, jumper"-->
    <!--      :total="currentTotal"-->
    <!--      @size-change="handleSizeChange"-->
    <!--      @current-change="handleCurrentChange"-->
    <!--    />-->
    fasfasdf
    {{ this.$route.params }}
  </div>
</template>

<script>
export default {
  name: 'AllContactperson',
  data() {
    return {
      tableKey: 0,
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0,
      contactpersonList: ''
    }
  },
  methods: {
    getRowKeys(row) {
      return row.id
    },
    handleSelectionChange(val) {
      console.log('handleSelectionChange:')
      console.log(val)
    },
    getContactpersonList() {
      return this.$axios.get('')
    }
  }
}
</script>

<style scoped>

</style>

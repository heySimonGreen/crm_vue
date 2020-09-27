<template>
  <div class="el-container" style="display: block">
    <el-button type="warming">添加客户</el-button>
    <el-span>{{ listcontactperson }}</el-span>
    <el-span>...........................</el-span>
    <el-span>{{ listcontactaddress }}</el-span>
    <el-table
      v-if="list[0]"
      :key="tableKey"
      :row-key="getRowKeys"
      :header-cell-style="{background: '#EBEEF3'}"
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        :reserve-selection="true"
      />

      <el-table-column
        label="编号"
        type="index"
        width="50"
        min-width="50"
        align="center"
      />
      <el-table-column label="guid" min-width="80" align="center">
        <template slot-scope="{row}">
          <span>{{ row.guid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="username" min-width="80" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="username" min-width="80" align="center">
        <el-button type="success">查看所有联系人</el-button>
        <el-button type="success">查看所有联系地址</el-button>
        <el-button type="warning">添加联系地址</el-button>
        <el-button type="warning">添加联系人</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[3,5,10,8,15, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="currentTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'CustomerManage',
  data() {
    return {
      tableKey: 0,
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0,
      list: '',
      list2: null,
      listcontactaddress: '',
      listcontactperson: '',
      base_api: null
    }
  },
  mounted() {
  },
  created() {
    this.$axios
      .all([this.getcustomerList(), this.getcontactaddressList(), this.getcontactpersonList()])
      .then(this.$axios.spread(function(acct, perms) {
        console.log('两个请求完成')
      }))
  },
  updated() {
    this.getCurrentTotal()
    console.log('this.list:.....................................')
    console.log(this.list)
    console.log('this.listcontactaddress:')
    console.log(this.listcontactaddress)
    console.log('this.listcontactperson:')
    console.log(this.listcontactperson)
  },
  methods: {
    getcustomerList() {
      this.$axios
        .get('customer/selectAll')
        .then(response => (this.list = response.data))
        .catch((response) => console.log(response))
    },
    getcontactaddressList() {
      this.$axios
        .get('contactaddress/selectAll')
        .then(response => (this.listcontactaddress = response.data))
        .catch((response) => console.log(response))
    },
    getcontactpersonList() {
      this.$axios
        .get('contactperson/selectAll')
        .then(response => (this.listcontactperson = response.data))
        .catch((response) => console.log(response))
    },
    getRowKeys(row) {
      return row.id
    },
    handleSelectionChange(val) {
      console.log('handleSelectionChange:')
      console.log(val)
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },
    getCurrentTotal() {
      this.currentTotal = this.list.length
    }
  }
}
</script>

<style scoped>
</style>

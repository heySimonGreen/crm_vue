<template>
  <div class="el-container" style="display: block">
    <el-button type="warming" @click="addCustomer">添加客户</el-button>
    <el-table
      v-if="list[0]"
      :key="tableKey"
      :row-key="getRowKeys"
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
        align="center"
      />
      <el-table-column label="username" min-width="100" align="center" fixed>
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人">
        <!--        <el-table-column label="姓名" align="center" min-width="60">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row['contactperson'][0]['name'] }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column label="姓名" align="center" min-width="150">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row['contactperson'][0]['name']"
              placeholder="请选择联系人"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in scope.row['contactperson']"
                :key="index"
                :label="item.name"
                :value="index"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row['contactperson'][contactpersonRowId]['gender'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" align="center" min-width="150">
          <template slot-scope="{row}">
            <span>{{ row['contactperson'][0]['phonenumber'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="座机号码" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactperson'][0]['homephonenumber'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信" align="center" min-width="150">
          <template slot-scope="{row}">
            <span>{{ row['contactperson'][0]['wechat'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="email" align="center" min-width="150">
          <template slot-scope="{row}">
            <span>{{ row['contactperson'][0]['email'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactperson'][0]['identity'] }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="联系地址">
        <el-table-column label="title" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactaddress'][0]['title'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮编" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactaddress'][0]['stampnumber'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="国家" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactaddress'][0]['country'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="省份" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactaddress'][0]['province'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="城市" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactaddress'][0]['city'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="详细地区" align="center">
          <template slot-scope="{row}">
            <span>{{ row['contactaddress'][0]['district'] }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="{row}">
          <el-button type="warning" @click="testEdit(row)">编辑</el-button>
          <el-button type="success" @click="testEdit(row)">删除</el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column label="下拉测试" align="center" min-width="200">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-select v-model="scope.row['contactaddress'][0]['city']" placeholder="请选择出产国别">-->
      <!--            <el-option-->
      <!--              v-for="item in scope.row['contactaddress']"-->
      <!--              :key="item.city"-->
      <!--              :label="item.city"-->
      <!--              :value="item.city"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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

    <!--    dialog添加客户-->
    <el-dialog title="添加客户" width="80%" :visible.sync="addCustomerDialogFormVisible" @close="CloseDialogAddCustomer()" @open="OpenDialogAddCustomer()"> <!--重置表单数据这里好像不行，因为我是写死在数据里面的吧-->
      <el-form ref="addCustomerForm" :rules="rules" :model="addCustomerForm" label-position="left">
        <el-form-item label="姓名" prop="username" label-width="100px">
          <el-input v-model="addCustomerForm.username" />
        </el-form-item>
        <el-form-item label="备注" prop="notes" label-width="100px">
          <el-input v-model="addCustomerForm.notes" />
        </el-form-item>
        <div style="display: flex;flex-direction: column">
          <h3 style="text-align: center">联系地址</h3>
          <el-button icon="el-icon-circle-plus-outline" type="primary" style="float: left;width: 200px" @click="addContactaddressList">添加联系地址</el-button>
        </div>
        <!--        table1-->
        <el-table :data="addCustomerForm.contactaddressList" stripe border style="width: 100%" size="mini">
          <el-table-column label="title" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactaddressList.' +scope.$index +'.title'" :rules="rules.contactaddressList.title">
                <el-input v-model="scope.row.title" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="邮编" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.stampnumber'" :rules="rules.contactaddressList.stampnumber">
                <el-input v-model.number="scope.row.stampnumber" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="country" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.country'" :rules="rules.contactaddressList.country">
                <el-input v-model="scope.row.country" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="province" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.province'" :rules="rules.contactaddressList.province">
                <el-input v-model="scope.row.province" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="city" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.city'" :rules="rules.contactaddressList.city">
                <el-input v-model="scope.row.city" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="district" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.district'" :rules="rules.contactaddressList.district">
                <el-input v-model="scope.row.district" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="20">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-delete" size="small" @click="delRowTable1(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;flex-direction: column">
          <h3 style="text-align: center">联系人</h3>
          <el-button icon="el-icon-circle-plus-outline" type="primary" style="float: left;width: 200px" @click="addContactpersonList">添加联系人</el-button>
        </div>
        <!--        table2-->
        <el-table :data="addCustomerForm.contactpersonList" stripe border style="width: 100%" size="mini">
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.name'" :rules="rules.contactpersonList.name">
                <el-input v-model="scope.row.name" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="性别" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.gender'" :rules="rules.contactpersonList.gender">
                <el-input v-model="scope.row.gender" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.phonenumber'" :rules="rules.contactpersonList.phonenumber">
                <el-input v-model.number="scope.row.phonenumber" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="座机号码" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.homephonenumber'" :rules="rules.contactpersonList.homephonenumber">
                <el-input v-model.number="scope.row.homephonenumber" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="微信" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.wechat'" :rules="rules.contactpersonList.wechat">
                <el-input v-model="scope.row.wechat" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.email'" :rules="rules.contactpersonList.email">
                <el-input v-model="scope.row.email" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="角色" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.identity'" :rules="rules.contactpersonList.identity">
                <el-input v-model="scope.row.identity" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="20">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-delete" size="small" @click="delRowTable2(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCustomerDialogFormVisible = false && CloseDialogAddCustomer()">
          取消
        </el-button>
        <el-button type="primary" @click="testEditConfirm() && CloseDialogAddCustomer()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
// import json from 'fast-json-stable-stringify'
import qs from 'qs'
export default {
  name: 'CustomerManage',
  data() {
    return {
      addCustomerForm: {
        username: '',
        notes: '',
        contactaddressList: [{
          title: '1',
          stampnumber: '2',
          country: '中国',
          province: '4',
          city: '5',
          district: '6'
        }],
        contactpersonList: [{
          name: '1',
          gender: '1',
          phonenumber: '1',
          homephonenumber: '1',
          wechat: '1',
          email: '1',
          identity: '1'
        }]
      },
      rules: {
        username: [{ required: true, message: 'type is required', trigger: 'change' }],
        notes: [{ required: true, message: 'type is required', trigger: 'change' }],
        contactaddressList: {
          title: [{ required: true, message: 'type is required', trigger: 'change' }],
          stampnumber: [{ required: true, message: 'type is required', trigger: 'change' }],
          country: [{ required: true, message: 'type is required', trigger: 'change' }],
          province: [{ required: true, message: 'type is required', trigger: 'change' }],
          city: [{ required: true, message: 'type is required', trigger: 'change' }],
          district: [{ required: true, message: 'type is required', trigger: 'change' }]
        },
        contactpersonList: {
          name: [{ required: true, message: 'type is required', trigger: 'change' }],
          gender: [{ required: true, message: 'type is required', trigger: 'change' }],
          phonenumber: [{ required: true, message: 'type is required', trigger: 'change' }],
          homephonenumber: [{ required: true, message: 'type is required', trigger: 'change' }],
          wechat: [{ required: true, message: 'type is required', trigger: 'change' }],
          email: [{ required: true, message: 'type is required', trigger: 'change' }],
          identity: [{ required: true, message: 'type is required', trigger: 'change' }]
        }
      },
      addCustomerDialogFormVisible: false,
      contactpersonRowId: '',
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
    this.contactpersonRowId = 0
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
    lnitializationData() {
      this.$axios
        .all([this.getcustomerList(), this.getcontactaddressList(), this.getcontactpersonList()])
        .then(this.$axios.spread(function(acct, perms) {
          console.log('两个请求完成')
        }))
      this.contactpersonRowId = 0
    },
    CloseDialogAddCustomer() {
      // 重置form表单
      this.$refs['addCustomerForm'].resetFields()
      // 通过v-if重置自定义组件
      this.fileComponet = false
      this.addCustomerForm.contactpersonList.splice(1, this.addCustomerForm.contactpersonList.length)
      this.addCustomerForm.contactaddressList.splice(1, this.addCustomerForm.contactaddressList.length)

      this.addCustomerDialogFormVisible = false
    },
    OpenDialogAddCustomer() {
      // 通过v-if重置自定义组件
      this.fileComponet = true
    },
    testEditConfirm(url, config) {
      console.log('this.addCustomerForm:')
      console.log(this.addCustomerForm)
      this.$refs.addCustomerForm.validate((valid) => {
        // var params2 = new URLSearchParams()
        // params2.append('chenwei', 'value1')
        // const usernameData = this.addCustomerForm.username
        // var params = this.addCustomerForm
        // get
        const customer = qs.stringify({
          username: this.addCustomerForm.username,
          notes: this.addCustomerForm.notes
        })
        const contactaddress = qs.stringify({
          contactaddressList: this.addCustomerForm.contactaddressList }, { arrayFormat: 'indices' }
        )
        const contactperson = qs.stringify({
          contactpersonList: this.addCustomerForm.contactpersonList }, { arrayFormat: 'indices' }
        )
        // post
        // const username = json(this.addCustomerForm.username)
        // const notes = json(this.addCustomerForm.notes)
        // const guid = json(5)
        // const contactaddressList = json(this.addCustomerForm.contactaddressList)
        // const contactpersonList = json(this.addCustomerForm.contactpersonList)
        // console.log(par)
        // var params = new URLSearchParams()
        // params.append('data', 'addCustomerForm')
        // get
        if (valid) {
          console.log('已进入确认界面：')
          this.$axios.get('customer/addCustomer', {
            params: {
              customer,
              contactaddress,
              contactperson
            }
          }, { timeout: 3000 }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }})
            .then(res => {
              console.log(res)
              this.addCustomerDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '批量修改成功',
                type: 'success',
                duration: 2000
              })
              this.lnitializationData()
            })
            .catch(err => {
              console.log(err)
            })
        }
        // post
        // if (valid) {
        //   console.log('已进入确认界面：')
        //   this.$axios.post('customer/addCustomer',
        //     // { params: { username: this.addCustomerForm.username, notes: (this.addCustomerForm.notes), contactaddressList:(this.addCustomerForm.contactaddressList) }},
        //     // { par: 'chenwei' },
        //     { username, notes, guid},
        //     { timeout: 3000 })
        //     .then(res => {
        //       console.log(res)
        //     })
        //     .catch(err => {
        //       console.log(err)
        //     })
        // }
      })
    },
    delRowTable1(index) {
      this.addCustomerForm.contactaddressList.splice(index, 1)
    },
    delRowTable2(index) {
      this.addCustomerForm.contactpersonList.splice(index, 1)
    },
    addContactaddressList: function() {
      var item = {
        title: '1',
        stampnumber: '1',
        country: '中国sdfsdf',
        province: '1',
        city: '1',
        district: '1'
      }
      this.addCustomerForm.contactaddressList.push(item)
    },
    addContactpersonList() {
      var item = {
        name: 'name',
        gender: 'gender',
        phonenumber: 'phonenumber',
        homephonenumber: 'homephonenumber',
        wechat: 'wechat',
        email: 'email',
        identity: 'identity'
      }
      this.addCustomerForm.contactpersonList.push(item)
    },
    addCustomer() {
      this.addCustomerDialogFormVisible = true
    },
    selectTrigger(id) {
      this.contactpersonRowId = id
      console.log(this.contactpersonRowId)
    },
    handleChange(data) {
      this.contactpersonRowId = data
      console.log(this.contactpersonRowId)
    },
    // getcustomerList() {
    //   this.$axios
    //     .get('customer/selectAll')
    //     .then(response => (this.list = response.data))
    //     .catch((response) => console.log(response))
    // },
    getcustomerList() {
      this.$axios
        .get('customer/selectAllTest')
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
    gotoAllContactPerson(row) {
      console.log('go to new page')
      this.$router.push({ name: 'allContactperson', params: row })
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

<style>
</style>

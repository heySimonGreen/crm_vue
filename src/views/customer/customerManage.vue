<template>
  <div class="el-container" style="display: block">
    <el-row>
      <el-button type="warming" style="margin-left: 2%  " @click="addCustomer">添加客户</el-button>
      <el-input v-model.trim="searchInput" clearable style="width: 30%;margin-left: 2%" @keyup.enter.native="searchInputButton">搜索</el-input>
      <el-button @click="searchInputButton">查询</el-button>
      <!--    //批量删除客户batchSelectGuid.length为0时注意提示“请选择删除的用户”-->
      <el-button style="float: right; margin-right: 2%" type="danger" @click="batchDeletCustomer">批量删除客户</el-button>
    </el-row>
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

      <!--      <el-table-column-->
      <!--        label="编号"-->
      <!--        type="index"-->
      <!--        align="center"-->
      <!--        fixed-->
      <!--      />-->
      <!--      //这个编号才是从1开始，到数据有多少行，上面的编号翻页过后还是重1开始，看着不舒服-->
      <el-table-column label="编号" min-width="50" align="center" fixed>
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + ((currentPage - 1) * pageSize) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户名称" min-width="100" align="center" fixed>
        <template slot-scope="{row}">
          <span @click="goToDetail(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人">
        <el-table-column label="姓名" align="center" min-width="150">
          <template slot-scope="{row}">
            <!--            <el-select-->
            <!--              v-model="scope.row['contactperson'][0]['name']"-->
            <!--              placeholder="请选择联系人"-->
            <!--              @change="handleChange"-->
            <!--            >-->
            <!--              <el-option-->
            <!--                v-for="(item, index) in scope.row['contactperson']"-->
            <!--                :key="index"-->
            <!--                :label="item.name"-->
            <!--                :value="index"-->
            <!--              />-->
            <!--            </el-select>-->
            <span
              v-clipboard:copy="row['contactperson'][0]['name']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactperson'][0]['name'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row['contactperson'][0]['gender'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" align="center" min-width="110">
          <template slot-scope="{row}">
            <span
              v-clipboard:copy="row['contactperson'][0]['phonenumber']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactperson'][0]['phonenumber'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="座机号码" align="center" min-width="120">
          <template slot-scope="{row}">
            <span
              v-clipboard:copy="row['contactperson'][0]['homephonenumber']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactperson'][0]['homephonenumber'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信" align="center" min-width="110">
          <template slot-scope="{row}">
            <span
              v-clipboard:copy="row['contactperson'][0]['wechat']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactperson'][0]['wechat'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="email" align="center" min-width="150">
          <template slot-scope="{row}">
            <span
              v-clipboard:copy="row['contactperson'][0]['email']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactperson'][0]['email'] }}</span>
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
          <template slot-scope="scope">
            <span>{{ scope.row['contactaddress'][0]['title'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮编" align="center">
          <template slot-scope="{row}">
            <span
              v-clipboard:copy="row['contactperson'][0]['stampnumber']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactaddress'][0]['stampnumber'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系地址" align="center" min-width="200">
          <template slot-scope="{row}">
            <span>{{ row['contactaddress'][0]['country'] }}{{ row['contactaddress'][0]['province'] }}{{ row['contactaddress'][0]['city'] }}{{ row['contactaddress'][0]['district'] }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger"@click="goToDetail(row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="delRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[1,2,3,5,10,8,15, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="currentTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!--    dialog添加客户-->
    <el-dialog title="添加客户" width="85%" :visible.sync="addCustomerDialogFormVisible" @close="CloseDialogAddCustomer()" @open="OpenDialogAddCustomer()"> <!--重置表单数据这里好像不行，因为我是写死在数据里面的吧-->
      <el-form ref="addCustomerForm" :rules="rules" :model="addCustomerForm" label-position="left">
        <el-form-item label="姓名" prop="username" label-width="100px">
          <el-input v-model.trim="addCustomerForm.username" />
        </el-form-item>
        <el-form-item label="备注" prop="notes" label-width="100px">
          <el-input v-model.trim="addCustomerForm.notes" />
        </el-form-item>
        <div style="display: flex;flex-direction: column">
          <h3 style="text-align: center">联系地址</h3>
          <!--          <el-button icon="el-icon-circle-plus-outline" type="primary" style="float: left;width: 200px" @click="addContactaddressList">添加联系地址</el-button>-->
          <div style="float:right;">
            <el-button type="primary" @click="addContactaddressList()">
              <i class="el-icon-circle-plus">添加联系人</i></el-button>
          </div>
        </div>
        <!--        table1-->
        <el-table :data="addCustomerForm.contactaddressList" stripe border style="width: 100%" size="mini">
          <el-table-column label="title" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactaddressList.' +scope.$index +'.title'" :rules="rules.contactaddressList.title">
                <el-input v-model.trim="scope.row.title" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="邮编" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.stampnumber'" :rules="rules.contactaddressList.stampnumber">
                <el-input v-model.trim="scope.row.stampnumber" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="国家" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.country'" :rules="rules.contactaddressList.country">
                <el-input v-model.trim="scope.row.country" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <!--          <el-table-column label="省份" align="center">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-form-item :prop="'contactaddressList.' +scope.$index +'.province'" :rules="rules.contactaddressList.province">-->
          <!--                <el-input v-model.trim="scope.row.province" size="small" />-->
          <!--              </el-form-item>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column label="市" align="center">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-form-item :prop="'contactaddressList.' +scope.$index +'.city'" :rules="rules.contactaddressList.city">-->
          <!--                <el-input v-model.trim="scope.row.city" size="small" />-->
          <!--              </el-form-item>-->
          <!--            </template>-->
          <!--          </el-table-column>-->

          <!--          <el-table-column label="地区" align="center">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-form-item :prop="'contactaddressList.' +scope.$index +'.district'" :rules="rules.contactaddressList.district">-->
          <!--                <el-input v-model.trim="scope.row.district" size="small" />-->
          <!--              </el-form-item>-->
          <!--            </template>-->
          <!--          </el-table-column>-->

          <!--          //三级联动选择地区，免去手动输入-->
          <el-table-column align="center" label="地址" min-width="30">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.selectedOptions'" :rules="rules.contactaddressList.selectedOptions">
                <el-cascader
                  v-model="scope.row.selectedOptions"
                  :options="areaSelectData"
                  :change-on-select="true"
                  :clearable="true"
                  :filterable="true"
                  placeholder="请选择地址"
                  class="full-width"
                  size="medium"
                  @change="handleChangeAddress(scope.$index)"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" min-width="30">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-delete" size="small" @click="delRowTable1(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;flex-direction: column">
          <h3 style="text-align: center">联系人</h3>
          <!--          <el-button icon="el-icon-circle-plus-outline" type="primary" style="float: left;width: 200px" @click="addContactpersonList">添加联系人</el-button>-->
          <div style="float:right;">
            <el-button type="primary" @click="addContactpersonList()">
              <i class="el-icon-circle-plus">添加联系人</i></el-button>
          </div>
        </div>
        <!--        table2-->
        <el-table :data="addCustomerForm.contactpersonList" stripe border style="width: 100%" size="mini">
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.name'" :rules="rules.contactpersonList.name">
                <el-input v-model.trim="scope.row.name" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="性别" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.gender'" :rules="rules.contactpersonList.gender">
                <!--                <el-input v-model="scope.row.gender" size="small" />-->
                <el-select v-model="scope.row.gender" placeholder="请选择">
                  <el-option
                    v-for="item in genderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
                <el-input v-model="scope.row.homephonenumber" size="small" />
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
          <el-table-column align="center" label="操作" min-width="30">
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
// import VueClipboard from 'vue-clipboard2'
import qs from 'qs'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  name: 'CustomerManage',
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    // 验证电话号码是否正确
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的手机号码'))
          }
        }
      }, 100)
    }
    // https://regex101.com/ 正则表达式学习网站
    var checkHomePhoneNumber = (rule, value, callback) => {
      const homePhoneNumberReg = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
      if (!value) {
        return callback(new Error('座机号码不能为空'))
      }
      setTimeout(() => {
        if (homePhoneNumberReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的座机号码'))
        }
      }, 100)
    }
    var checkStampNumber = (rule, value, callback) => {
      const homePhoneNumberReg = /^[0-9]{6}$/
      if (!value) {
        return callback(new Error('邮编不能为空'))
      }
      setTimeout(() => {
        if (homePhoneNumberReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮编'))
        }
      }, 100)
    }
    var checkSelectOptionIs3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('省市区地址不能为空'))
      }
      setTimeout(() => {
        console.log('checkSelectOptionIs3   value')
        console.log(value)
        if (value.length === 3) {
          callback()
        } else {
          callback(new Error('请选择完整的省市区地址'))
        }
      }, 100)
    }
    return {
      areaSelectData: regionData,
      addCustomerForm: {
        username: '',
        notes: '',
        contactaddressList: [{
          title: '1',
          stampnumber: '123456',
          country: '中国',
          // province: '湖北',
          // city: '武汉',
          // district: '汉阳区拦江堤路',
          // 会影响传过去的对象转为实体吗
          selectedOptions: [],
          province: '',
          city: '',
          district: ''
        }],
        contactpersonList: [{
          name: 'name',
          gender: '男',
          phonenumber: '18896173420',
          homephonenumber: '023-79491111',
          wechat: '18896173420',
          email: '1183928999@qq.com',
          identity: 'ceo'
        }]
      },
      rules: {
        username: [{ required: true, message: 'type is required', trigger: 'change' }],
        notes: [{ required: true, message: 'type is required', trigger: 'change' }],
        contactaddressList: {
          title: [{ required: true, message: 'type is required', trigger: 'change' }],
          stampnumber: [{ required: true, message: 'type is required', trigger: 'change' }, { validator: checkStampNumber, trigger: 'blur' }],
          country: [{ required: true, message: 'type is required', trigger: 'change' }],
          province: [{ required: true, message: 'type is required', trigger: 'change' }],
          city: [{ required: true, message: 'type is required', trigger: 'change' }],
          district: [{ required: true, message: 'type is required', trigger: 'change' }],
          selectedOptions: [{ required: true, message: 'type is required', trigger: 'change' }, { validator: checkSelectOptionIs3, trigger: 'blur' }]
        },
        contactpersonList: {
          name: [{ required: true, message: 'type is required', trigger: 'change' }],
          gender: [{ required: true, message: 'type is required', trigger: 'change' }],
          phonenumber: [{ required: true, message: 'type is required', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }],
          homephonenumber: [{ required: true, message: 'type is required', trigger: 'blur' }, { validator: checkHomePhoneNumber, trigger: 'blur' }],
          wechat: [{ required: true, message: 'type is required', trigger: 'change' }],
          email: [{ required: true, message: 'type is required', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }],
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
      base_api: null,
      forCopyEmail: '',
      genderOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      batchSelectGuid: [],
      searchInput: '',
      form: {
        selectedOptions: [],
        province: '',
        city: '',
        area: ''
      }
    }
  },
  mounted() {
  },
  created() {
    this.$axios
      .all([this.getcustomerList(), this.getcontactaddressList(), this.getcontactpersonList()])
      .then(this.$axios.spread(function(acct, perms) {
        console.log('3个请求完成')
      }))
    this.contactpersonRowId = 0
  },
  updated() {
    this.getCurrentTotal()
  },
  methods: {
    handleChangeAddress(index) {
      this.addCustomerForm.contactaddressList[index].province = this.addCustomerForm.contactaddressList[index].selectedOptions[0]
      this.addCustomerForm.contactaddressList[index].city = this.addCustomerForm.contactaddressList[index].selectedOptions[1]
      this.addCustomerForm.contactaddressList[index].area = this.addCustomerForm.contactaddressList[index].selectedOptions[2]
      console.log('this.form.province city area')
      console.log(this.addCustomerForm.contactaddressList[index].province)
      console.log(this.addCustomerForm.contactaddressList[index].city)
      console.log(this.addCustomerForm.contactaddressList[index].area)
      console.log('handleChangeAddress index.............')
      console.log(index)
    },
    searchInputButton() {
      console.log(this.searchInput)
      console.log('已到达搜索请求')
      this.$axios.post('http://localhost:8080/customer/searchInputButton', { 'input': this.searchInput }, { timeout: 3000 })
        .then(res => {
          console.log(res)
          if (res.data.length > 0) {
            this.list = res.data
            this.$notify({
              title: '成功',
              message: '查询成功',
              type: 'success',
              duration: 4000
            })
          } else {
            this.$notify({
              title: '查无此人',
              message: '查无此人',
              type: 'success',
              duration: 4000
            })
          }
          // this.lnitializationData()
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '批量删除失败',
            message: '失败',
            type: 'error',
            duration: 4000
          })
        })
    },
    batchDeletCustomer() {
      console.log('已进入点击按钮后...')
      if (this.batchSelectGuid.length > 0) {
        console.log('已选择选项')
        this.$axios.post('http://localhost:8080/customer/batchDeletAllCustomerByGuid', this.batchSelectGuid, { timeout: 3000 })
          .then(res => {
            console.log(res)
            this.$notify({
              title: '成功',
              message: '批量删除成功',
              type: 'error',
              duration: 4000
            })
            this.lnitializationData()
          })
          .catch(err => {
            console.log(err)
            this.$notify({
              title: '批量删除失败',
              message: '失败',
              type: 'error',
              duration: 4000
            })
          })
      } else {
        console.log('未选择选项')
        this.$notify({
          title: '批量删除失败',
          message: '请选择需要删除的行',
          type: 'error',
          duration: 4000
        })
      }
    },
    getRowKeys(row) {
      return row.id
    },
    // 下面是点击复制代码
    copy(e) {
      console.log(e.email)
      console.log(e.text)
      this.$notify({
        title: '成功',
        message: '成功复制所点击内容',
        type: 'success',
        duration: 4000
      })
    },
    onError(e) {
      console.log(e)
    },
    delRow(row) {
      console.log(row)
      const param = { id: row.guid }
      this.$axios
        .delete('http://localhost:8080/customer/deleteAllById', { params: param })
        .then(res => {
          console.log(res)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.lnitializationData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToDetail(cid) {
      console.log(cid)
      this.$router.push({ name: 'CustomerDetailInfo', query: { cid: cid.guid }})
    },
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
      // this.addCustomerForm.contactaddressList.splice(index, 1)

      if (this.addCustomerForm.contactaddressList.length > 1) {
        this.addCustomerForm.contactaddressList.splice(index, 1)
      } else {
        this.$notify({
          title: '失败',
          message: '默认联系地址不能删除',
          type: 'error',
          duration: 2000
        })
      }
    },
    delRowTable2(index) {
      if (this.addCustomerForm.contactpersonList.length > 1) {
        this.addCustomerForm.contactpersonList.splice(index, 1)
      } else {
        this.$notify({
          title: '失败',
          message: '默认联系人不能删除',
          type: 'error',
          duration: 2000
        })
      }
    },
    addContactaddressList: function() {
      var item = {
        title: '1',
        stampnumber: '123456',
        country: '中国',
        province: '1',
        city: '1',
        district: '1'
      }
      this.addCustomerForm.contactaddressList.push(item)
    },
    addContactpersonList() {
      var item = {
        name: 'name',
        gender: '男',
        phonenumber: '18896173420',
        homephonenumber: '023-79491111',
        wechat: '18896173420',
        email: '1183928999@qq.com',
        identity: 'ceo'
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
        .then(response => {
          this.list = response.data
          console.log('this.list')
          console.log(this.list)
        }
        )
        .catch((response) => console.log(response))
    },
    // 下面的两个方法没有用到，是以前用来测试的
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
      // console.log('row.id:')
      // console.log(row.guid)
      return row.guid
    },
    handleSelectionChange(val) {
      console.log('handleSelectionChange:')
      console.log(val)
      // 将选择的行的guid保存在batchSelectGuid中，用于批量删除
      for (let i = 0; i < val.length; i++) {
        console.log(i)
        this.batchSelectGuid[i] = val[i].guid
      }
      console.log('this.batchSelectGuid:')
      console.log(this.batchSelectGuid)
      console.log('this.batchSelectGuid.length:')
      console.log(this.batchSelectGuid.length)
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      console.log('当前页数据')
      console.log(this.list[14])
    },
    getCurrentTotal() {
      this.currentTotal = this.list.length
    }
  }
}
</script>

<style>
  /*//这是设置超过边框用省略号代替，-webkit-line-clamp: 1，是显示多少行,超过后省略*/
  span{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
</style>

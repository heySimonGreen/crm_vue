<template>
  <div class="el-container" style="display: block">
    <!--    {{ this.$md5('hello') }}-->
    <!--    {{ crypto.createHash) }}-->
    <el-row>
      <el-button type="warming" style="margin-left: 2%  " @click="addCustomer">添加客户</el-button>
      <el-input v-model.trim="searchInput" placeholder="请输入客户姓名" clearable style="width: 50%;margin-left: 2%">搜索</el-input>
      <el-select v-model="optionsSearchData" placeholder="请选择客户类型">
        <el-option
          v-for="item in optionsSearch"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button @click="searchInputButton">查询</el-button>
      <!--    //批量删除客户batchSelectGuid.length为0时注意提示“请选择删除的用户”-->
      <el-button style="float: right; margin-right: 2%" type="danger" @click="batchDeletCustomer">批量删除客户</el-button>
      <!--      <el-button v-if="this.adminid == 1" type="success" style="float: right; margin-right: 2%" @click="goToRigister()">添加管理员</el-button>-->
    </el-row>
    <el-table
      v-if="list[0]"
      :key="tableKey"
      :row-key="getRowKeys"
      :data="list"
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
      <el-table-column label="客户类型" min-width="100" align="center" fixed>
        <template slot-scope="{row}">
          <el-button v-if="row.role == 0" type="success" size="mini">个人</el-button>
          <el-button v-else type="primary" size="mini">企业</el-button>
        </template>
      </el-table-column>
      <el-table-column label="联系人">
        <el-table-column label="姓名" align="center" min-width="100">
          <template slot-scope="{row}">
            <span
              v-clipboard:copy="row['contactperson'][0]['name']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactperson'][0]['name'] }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="性别" align="center">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ scope.row['contactperson'][0]['gender'] }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="电话号码" align="center" min-width="110">
          <template slot-scope="{row}">
            <span
              v-clipboard:copy="row['contactperson'][0]['phonenumber']"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ row['contactperson'][0]['phonenumber'] }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="座机号码" align="center" min-width="120">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span-->
        <!--              v-clipboard:copy="row['contactperson'][0]['homephonenumber']"-->
        <!--              v-clipboard:success="copy"-->
        <!--              v-clipboard:error="onError"-->
        <!--            >{{ row['contactperson'][0]['homephonenumber'] }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column label="微信" align="center" min-width="150">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span-->
        <!--              v-clipboard:copy="row['contactperson'][0]['wechat']"-->
        <!--              v-clipboard:success="copy"-->
        <!--              v-clipboard:error="onError"-->
        <!--            >{{ row['contactperson'][0]['wechat'] }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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
            <span
              v-clipboard:copy="splicingAddress(row['contactaddress'][0]['country'],
                                                row['contactaddress'][0]['province'],
                                                row['contactaddress'][0]['city'],
                                                row['contactaddress'][0]['district'],
                                                row['contactaddress'][0]['detaileara'])"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >{{ splicingAddress(row['contactaddress'][0]['country'],
                                row['contactaddress'][0]['province'],
                                row['contactaddress'][0]['city'],
                                row['contactaddress'][0]['district'],
                                row['contactaddress'][0]['detaileara']) }}</span>
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
        <el-form-item label="用户类型" prop="role" label-width="100px">
          <div style="display: flex;justify-content: left;align-items: center">
            <span>个人</span>
            <el-switch
              v-model="addCustomerForm.role"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-left: 10px;margin-right: 10px"
            />
            <span>企业</span>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="username" label-width="100px">
          <el-input v-model.trim="addCustomerForm.username" />
        </el-form-item>
        <el-form-item label="备注" prop="notes" label-width="100px">
          <el-input v-model.trim="addCustomerForm.notes" />
        </el-form-item>
        <div style="display: flex;flex-direction: column">
          <h3 style="text-align: center">联系地址</h3>
          <div style="float:right;">
            <el-button type="primary" @click="addContactaddressList()">
              <i class="el-icon-circle-plus">添加联系地址</i></el-button>
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

          <!--          //三级联动选择地区，免去手动输入-->
          <el-table-column align="center" label="地址" min-width="80">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.selectedOptions'" :rules="rules.contactaddressList.selectedOptions">
                <el-cascader
                  v-model="scope.row.selectedOptions"
                  :options="areaSelectData"
                  :clearable="true"
                  :filterable="true"
                  :change-on-select="true"
                  placeholder="请选择地址"
                  class="full-width"
                  size="medium"
                  @change="handleChangeAddress(scope.$index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <!--          //在下拉地区后面添加的一个详细地址-->
          <el-table-column label="详细地址" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.detaileara'" :rules="rules.contactaddressList.detaileara">
                <el-input v-model.trim="scope.row.detaileara" size="small" />
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
import { regionData, CodeToText } from 'element-china-area-data'
import { getadminid } from '@/utils/auth'
import md5 from 'js-md5'
import crypto from 'crypto'
import store from '../../store'
import { getusername, getuuid } from '../../utils/auth'
import { cryptToken, cryptTokenf, formatDate, signatureMD5 } from '../../utils/myutil'
import { customer_addCustomer3, customer_selectAllTest } from '../../api/customer'
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
      adminid: getadminid(),
      switchvalue: true,
      role: true,
      areaSelectData: regionData,
      addCustomerForm: {
        role: true,
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
          district: '',
          detaileara: '拦江堤路'
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
        role: [{ required: true, message: 'type is required', trigger: 'change' }],
        contactaddressList: {
          title: [{ required: true, message: 'type is required', trigger: 'change' }],
          stampnumber: [{ required: true, message: 'type is required', trigger: 'change' }, { validator: checkStampNumber, trigger: 'blur' }],
          country: [{ required: true, message: 'type is required', trigger: 'change' }],
          province: [{ required: true, message: 'type is required', trigger: 'change' }],
          city: [{ required: true, message: 'type is required', trigger: 'change' }],
          district: [{ required: true, message: 'type is required', trigger: 'change' }],
          detaileara: [{ required: true, message: 'type is required', trigger: 'change' }],
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
      showPagination: true,
      list: '',
      searchData: '',
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
      },
      optionsSearch: [{
        value: 0,
        label: '个人'
      }, {
        value: 1,
        label: '企业'
      }],
      optionsSearchData: '',
      updatainfo: false,
      password: '123456',
      url: this.$store.state.user.url
    }
  },
  mounted() {
  },
  created() {
    this.$axios
      // .all([this.getcustomerList(), this.getcontactaddressList(), this.getcontactpersonList()])
      .all([this.getcustomerList()])
      .then(this.$axios.spread(function(acct, perms) {
        console.log('3个请求完成')
      }))
    this.contactpersonRowId = 0
    this.f()
  },
  // updated() {
  //   this.getCurrentTotal()
  // },
  updated() {
    if (this.updatainfo === true) {
      location.reload()
    }
  },
  methods: {
    f() {
      var md5 = crypto.createHash('md5')
      md5.update(this.password)
      var password = md5.digest('hex')
      console.log('password')
      console.log(password)
    },
    splicingAddress(country, province, city, district, detaileara) {
      return country + CodeToText[province] + CodeToText[city] + CodeToText[district] + detaileara
    },
    handleChangeAddress(index) {
      this.addCustomerForm.contactaddressList[index].province = this.addCustomerForm.contactaddressList[index].selectedOptions[0]
      this.addCustomerForm.contactaddressList[index].city = this.addCustomerForm.contactaddressList[index].selectedOptions[1]
      this.addCustomerForm.contactaddressList[index].district = this.addCustomerForm.contactaddressList[index].selectedOptions[2]
      console.log('this.form.province city area')
      console.log(this.addCustomerForm.contactaddressList[index].province)
      console.log(this.addCustomerForm.contactaddressList[index].city)
      console.log(this.addCustomerForm.contactaddressList[index].district)
      console.log(this.addCustomerForm)
      // delete this.addCustomerForm.contactaddressList[index].selectedOptions
      console.log(this.addCustomerForm)
      console.log('handleChangeAddress index.............')
      console.log(index)
    },
    searchInputButton() {
      console.log('this.optionsSearchData')
      console.log(this.optionsSearchData)
      console.log(this.searchInput)
      console.log('已到达搜索请求')
      this.$axios.post(this.url + '/customer/searchInputButton', { 'input': this.searchInput, 'role': this.optionsSearchData }, { timeout: 3000 })
        .then(res => {
          console.log(res)
          if (res.data.length > 0) {
            this.list = res.data
            this.currentTotal = this.list.length
            this.searchData = res.data
            this.pageSize = 100
            this.showPagination = false
            console.log('this.list...........................')
            console.log(this.list)
            this.$notify({
              title: '成功',
              message: '查询成功',
              type: 'success',
              duration: 4000
            })
          } else {
            this.$notify({
              title: '失败',
              message: '查无此人',
              type: 'error',
              duration: 4000
            })
          }
          // this.lnitializationData()
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '失败',
            message: '输入需要查找的客户',
            type: 'error',
            duration: 4000
          })
        })
    },
    batchDeletCustomer() {
      console.log('已进入点击按钮后...')
      if (this.batchSelectGuid.length > 0) {
        console.log('已选择选项')
        this.$axios.post(this.url + '/customer/batchDeletAllCustomerByGuid', this.batchSelectGuid, { timeout: 3000 })
          .then(res => {
            console.log(res)
            this.$notify({
              title: '成功',
              message: '批量删除成功',
              type: 'success',
              duration: 1000
            })
            this.batchSelectGuid = []
            this.lnitializationData()
            this.updatainfo = true
            // setTimeout(location.reload(), 9000)
          })
          .catch(err => {
            console.log(err)
            this.$notify({
              title: '批量删除失败',
              message: '失败',
              type: 'error',
              duration: 1000
            })
          })
      } else {
        console.log('未选择选项')
        this.$notify({
          title: '批量删除失败',
          message: '请选择需要删除的行',
          type: 'error',
          duration: 1000
        })
        this.$forceUpdate()
      }
      // setTimeout(location.reload(), 1000)
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
        .delete(this.url + '/customer/deleteAllById', { params: param })
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
    goToRigister() {
      this.$router.push({ name: 'rigisterAdmin' })
    },
    lnitializationData() {
      this.$axios
        // .all([this.getcustomerList(), this.getcontactaddressList(), this.getcontactpersonList()])
        .all([this.getcustomerList()])
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
        console.log('已选择选项')
        if (valid) {
          for (let i = 0; i < this.addCustomerForm.contactaddressList.length; i++) {
            // this.this.addCustomerForm.contactaddressList[i].adminid = 1
            console.log(this.adminid)
            delete this.addCustomerForm.contactaddressList[i].selectedOptions
          }
          console.log('this.addCustomerForm.....................')
          console.log(this.addCustomerForm)
          this.addCustomerForm.adminid = this.adminid
          this.addCustomerForm.isdelet = 0
          console.log('this.addCustomerForm.....................')
          console.log(this.addCustomerForm)
          // ture is 企业1 false is个人0
          if (this.addCustomerForm.role === true) {
            this.addCustomerForm.role = 1
          } else {
            this.addCustomerForm.role = 0
          }
          console.log(this.addCustomerForm)
          // customer_addCustomer3(this.addCustomerForm).then(res => {
          //   console.log(res)
          //   this.$notify({
          //     title: '成功',
          //     message: '成功',
          //     type: 'success',
          //     duration: 4000
          //   })
          //   this.lnitializationData()
          //   this.addCustomerDialogFormVisible = false
          //   this.updatainfo = true
          // })
          //   .catch(err => {
          //     console.log(err)
          //     this.$notify({
          //       title: '失败',
          //       message: '失败',
          //       type: 'error',
          //       duration: 4000
          //     })
          //   })

          this.$axios.post(this.url + '/customer/addCustomer3', this.addCustomerForm, { timeout: 3000 })
            .then(res => {
              console.log(res)
              this.$notify({
                title: '成功',
                message: '成功',
                type: 'success',
                duration: 4000
              })
              this.lnitializationData()
              this.addCustomerDialogFormVisible = false
              this.updatainfo = true
              // location.reload()
            })
            .catch(err => {
              console.log(err)
              this.$notify({
                title: '失败',
                message: '失败',
                type: 'error',
                duration: 4000
              })
            })
        }
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
        district: '1',
        detaileara: '拦江堤路',
        selectedOptions: []
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
    getcustomerList() {
      customer_selectAllTest({ adminid: this.adminid, pagesize: this.pageSize, currentPage: this.currentPage }).then(response => {
        if (response.data.code === '551') {
          this.$notify({
            title: 'error',
            message: response.data.message,
            type: 'error',
            duration: 2000
          })
        } else {
          this.list = response.data
          this.currentTotal = response.totalPage
        }

        // this.list = response.data
        // // console.log('response.data.totalPage:' + JSON.stringify(response.totalPage))
        // // console.log('response.data.totalPage:' + (response.data))
        // this.currentTotal = response.totalPage
        // // console.log('this.list')
        // // console.log(this.list)
      })
      // 上面是封装的，拿数据是直接取response.数据，下面是自己写的axios，拿数据要写response.data.数据
      // 下面是以前写的，没有封装，由于要加安全验证，所以必须封装了
      // this.$axios
      //   .get(path, { params: { adminid: this.adminid, pagesize: this.pageSize, currentPage: this.currentPage }})
      //   .then(response => {
      //     console.log('response:' + response.data)
      //     console.log('response:' + response.data.code)
      //     if (response.data.code === '551') {
      //       this.$notify({
      //         title: 'error',
      //         message: response.data.message,
      //         // type: 'success',
      //         duration: 2000
      //       })
      //     } else {
      //       this.list = response.data.data
      //       console.log('response.data.totalPage:')
      //       console.log(response.data.totalPage)
      //       console.log('response.data:' + response.data)
      //       this.currentTotal = response.data.totalPage
      //       console.log('this.list')
      //       console.log(this.list)
      //     }
      //   }
      //   )
      //   .catch((response) => {
      //     console.log(response)
      //     console.log(response.code)
      //   })
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
      if (this.showPagination === false) {
        this.list = this.searchData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      } else {
        this.getcustomerList()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      console.log('当前页数据')
      console.log(this.list[14])

      if (this.showPagination === true) {
        this.$axios
          .get('customer/selectAllTest', { params: { adminid: this.adminid, pagesize: this.pageSize, currentPage: this.currentPage }})
          .then(response => {
            this.list = response.data.data
            console.log('response.data.totalPage:')
            console.log(response.data.totalPage)
            this.currentTotal = response.data.totalPage
            console.log('this.list')
            console.log(this.list)
          }
          )
          .catch((response) => console.log(response))
      } else {
        this.list = this.searchData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
    // getCurrentTotal() {
    //   this.currentTotal = this.list.length
    // }
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

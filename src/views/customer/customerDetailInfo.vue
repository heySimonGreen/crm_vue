<template>
  <div class="el-container" style="display: block">
    <el-row>
      <el-col :span="13" style="margin-top: 20px">
        <div style="display:flex;width:100%;flex-direction: row;justify-content: space-between">
          <el-button style="float: left;margin-left: 3%" @click="goBack()"><i class="el-icon-back" style="margin-left: 0" />返回</el-button>
          <span style="font-size: 30px">客户基本信息</span>
        </div>
      </el-col>
      <el-col :span="23" :offset="1" style="margin-top: 20px">
        <span style="font-size: 20px;margin-bottom: 30px">姓名:  {{ this.customerData.username }}</span>
      </el-col>
      <el-col :span="23" :offset="1">
        <span style="font-size: 20px;margin-bottom: 30px"">备注:  {{ this.customerData.notes }}</span>
      </el-col>
      <el-col :span="23" :offset="1" style="display: flex;justify-content: left;align-items: center;margin-bottom: 30px">
        <span style="font-size: 20px;margin-right: 5px">客户类型:</span>
        <el-button v-if="this.customerData.role == 0" type="success" size="mini">个人</el-button>
        <el-button v-else type="primary" size="mini">企业</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" s-t-y-l-e="font-size: 20px">
        <el-button type="info">联系人信息</el-button>
        <div style="float:right;">
          <el-button type="warning" @click="addContactPerson()">
            <i class="el-icon-circle-plus">添加联系人</i></el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="personData"
      border
      fit
      highlight-current-row
      :header-cell-style="{background: '#EBEEF3'}"
      style="width: 100%;"
    >
      <!--      <el-row>-->
      <!--        <el-col :span="20">-->
      <el-table-column
        label="编号"
        type="index"
        align="center"
        fixed
      />
      <el-table-column label="联系人姓名" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.gender }} </span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.phonenumber }} </span>
        </template>
      </el-table-column>
      <el-table-column label="座机号码" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.homephonenumber }} </span>
        </template>
      </el-table-column>
      <el-table-column label="微信" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.wechat }} </span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.email }} </span>
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.identity }} </span>
        </template>
      </el-table-column>
      <!--        </el-col>-->
      <!--        <el-col :span="4">-->
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editePersonItem(scope.row)" />
          <el-button type="primary" icon="el-icon-delete" @click="delPersonItem(scope.row, scope.$index)" />
        </template>
      </el-table-column>
      <!--        </el-col>-->
      </el-row>
    </el-table>
    <el-row>
      <el-col :span="24" s-t-y-l-e="font-size: 20px">
        <el-button type="info">联系地址信息</el-button>
        <!--        <el-button type="warning" style="float: right" icon="el-icon-circle-plus-outline" @click="addContactAddress()">添加联系地址</el-button>-->
        <div style="float:right;">
          <el-button type="warning" @click="addContactAddress()">
            <i class="el-icon-circle-plus">添加联系地址</i></el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="addressData"
      border
      fit
      highlight-current-row
      :header-cell-style="{background: '#EBEEF3'}"
      style="width: 100%;"
    >
      <!--      <el-row>-->
      <!--        <el-col :span="20">-->
      <el-table-column
        label="编号"
        type="index"
        align="center"
        fixed
      />
      <el-table-column label="标题" min-width="200" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.title }} </span>
        </template>
      </el-table-column>
      <el-table-column label="邮编" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.stampnumber }} </span>
        </template>
      </el-table-column>
      <el-table-column label="地址" min-width="400" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ splicingAddress(row.country,row.province,row.city,row.district,row.detaileara) }} </span>
        </template>
      </el-table-column>
      <!--        </el-col>-->
      <!--        <el-col :span="4">-->
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editeContactAddress(scope.row)" />
          <el-button type="primary" icon="el-icon-delete" @click="delAddressItem(scope.row, scope.$index)" />
        </template>
      </el-table-column>
      <!--        </el-col>-->
      <!--      </el-row>-->
    </el-table>
    <!--    dialog1-AddContactPerson-->
    <el-dialog title="添加联系人" width="80%" :visible.sync="addContactPersonVisible" :close-on-click-modal="false" @close="CloseDialogAddContactPerson()" @open="OpenDialogAddContactPerson()"> <!--重置表单数据这里好像不行，因为我是写死在数据里面的吧-->
      <el-form ref="AddContactPerson" :rules="rules" :model="addCustomerForm" label-position="left">
        <div style="display: flex;flex-direction: column">
          <el-button type="primary" style="float: left;width: 200px" @click="addContactpersonList"><i class="el-icon-circle-plus-outline">增加一个联系人</i></el-button>
        </div>
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
                <el-input v-model.trim="scope.row.gender" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.phonenumber'" :rules="rules.contactpersonList.phonenumber">
                <el-input v-model.trim="scope.row.phonenumber" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="座机号码" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.homephonenumber'" :rules="rules.contactpersonList.homephonenumber">
                <el-input v-model.trim="scope.row.homephonenumber" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="微信" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.wechat'" :rules="rules.contactpersonList.wechat">
                <el-input v-model.trim="scope.row.wechat" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.email'" :rules="rules.contactpersonList.email">
                <el-input v-model.trim="scope.row.email" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="角色" align="center">
            <template slot-scope="scope">
              <el-form-item class="item" :prop="'contactpersonList.' +scope.$index +'.identity'" :rules="rules.contactpersonList.identity">
                <el-input v-model.trim="scope.row.identity" size="small" />
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
        <el-button @click="CloseDialogAddContactPerson()">
          取消
        </el-button>
        <el-button type="primary" @click="addContactPersonData() && CloseDialogAddContactPerson()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <!--    dialog2-AddContactAddress-->
    <el-dialog title="添加联系地址" width="80%" :visible.sync="addContactAddressVisible" :close-on-click-modal="false" @close="CloseDialogAddContactAddress()" @open="OpenDialogAddContactAddress()"> <!--重置表单数据这里好像不行，因为我是写死在数据里面的吧-->
      <el-form ref="AddContactAddress" :rules="rules" :model="addCustomerForm" label-position="left">
        <div style="display: flex;flex-direction: column">
          <h3 style="text-align: center">联系地址</h3>
          <el-button type="primary" style="float: left;width: 200px" @click="addContactaddressList"><i class="el-icon-circle-plus-outline">添加一个联系地址</i></el-button>
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
          <el-table-column label="country" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'contactaddressList.' +scope.$index +'.country'" :rules="rules.contactaddressList.country">
                <el-input v-model.trim="scope.row.country" size="small" />
              </el-form-item>
            </template>
          </el-table-column>
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
          <el-table-column align="center" label="操作" min-width="20">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-delete" size="small" @click="delRowTable3(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CloseDialogAddContactAddress()">
          取消
        </el-button>
        <el-button type="primary" @click="addContactAddressData() && CloseDialogAddContactAddress()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <!--    dialog3-editContactPerson-->
    <el-dialog title="编辑联系人信息" width="80%" :visible.sync="editePersonItemVisible" @close="CloseDialogeditePersonItem()">
      <el-form ref="editePersonItemData" :model="editePersonItemData" :rules="rules.contactpersonList" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="editePersonItemData.name" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editePersonItemData.gender" placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" prop="phonenumber">
          <el-input v-model.trim="editePersonItemData.phonenumber" />
        </el-form-item>
        <el-form-item label="座机" prop="homephonenumber">
          <el-input v-model.trim="editePersonItemData.homephonenumber" />
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model.trim="editePersonItemData.wechat" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="editePersonItemData.email" />
        </el-form-item>
        <el-form-item label="角色" prop="identity">
          <el-input v-model.trim="editePersonItemData.identity" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editePersonItemData')">提交</el-button>
          <el-button @click="resetForm('editePersonItemData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--    dialog4-editAddress-->
    <el-dialog title="编辑联系地址信息" width="80%" :visible.sync="editAddressItemDataVisible" :close-on-click-modal="false" @close="editAddressItemDataVisible = false">
      <el-form ref="editAddressItemData" :model="editAddressItemData" :rules="rules.contactaddressList" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="editAddressItemData.title" />
        </el-form-item>
        <el-form-item label="邮编" prop="stampnumber">
          <el-input v-model.trim="editAddressItemData.stampnumber" />
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-input v-model.trim="editAddressItemData.country" />
        </el-form-item>
        <el-form-item label="地区" prop="selectedOptions2">
          <el-cascader
            v-model="editAddressItemData.selectedOptions2"
            :options="areaSelectData"
            :clearable="true"
            placeholder="请选择地址"
            class="full-width"
            :filterable="true"
            size="medium"
            @change="handleChangeAddress2()"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="detaileara">
          <el-input v-model.trim="editAddressItemData.detaileara" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEditAddressItem('editAddressItemData')">提交</el-button>
          <el-button @click="resetForm('editAddressItemData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getCustomerDataByCidApi } from '@/api/customer'
import { CodeToText, regionData } from 'element-china-area-data'
import store from '../../store'
import {
  contactaddress_addContactAddress,
  contactaddress_deleteById,
  contactaddress_selectByCid,
  contactaddress_updateAddressItem,
  contactperson_addContactPerson,
  contactperson_deleteById,
  contactperson_selectByCid,
  contactperson_updateContactItem
} from '../../api/customer'
// import clipboard from 'clipboard'
export default {
  name: 'CustomerDetailInfo',
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
    var checkSelectOptionIs = (rule, value, callback) => {
      console.log('checkSelectOptionIs3.................')
      console.log(value)
      console.log('this.editAddressItemData in checkSelectOptionIs3')
      console.log(this.editAddressItemData.selectedOptions2)
      if (!this.editAddressItemData.selectedOptions2) {
        return callback(new Error('省市区地址不能为空'))
      }
      setTimeout(() => {
        console.log('checkSelectOptionIs3   value')
        console.log(this.editAddressItemData.selectedOptions2)
        if (this.editAddressItemData.selectedOptions2.length === 3) {
          callback()
        } else {
          callback(new Error('请选择省市区地址'))
        }
      }, 100)
    }
    return {
      url: this.$store.state.user.url,
      genderOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
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
          district: '',
          detaileara: ''
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
          detaileara: [{ required: true, message: 'type is required', trigger: 'change' }],
          selectedOptions: [{ required: true, message: 'type is required', trigger: 'change' }, { validator: checkSelectOptionIs3, trigger: 'blur' }],
          selectedOptions2: [{ validator: checkSelectOptionIs, message: '请将地址填写完整', trigger: 'change' }]
        },
        contactpersonList: {
          name: [{ required: true, message: 'type is required', trigger: 'change' }],
          gender: [{ required: true, message: 'type is required', trigger: 'change' }],
          phonenumber: [{ required: true, message: 'type is required', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }],
          homephonenumber: [{ required: true, message: 'type is required', trigger: 'blur' }, { validator: checkHomePhoneNumber, trigger: 'blur' }],
          wechat: [{ required: true, message: 'type is required', trigger: 'change' }],
          email: [{ required: true, message: 'type is required', trigger: 'blur' }, { message: 'type is required', validator: checkEmail, trigger: 'blur' }],
          identity: [{ required: true, message: 'type is required', trigger: 'change' }]
        }
      },
      cid: this.$route.query,
      addressData: [],
      personData: [],
      customerData: '',
      addContactPersonVisible: false,
      addContactAddressVisible: false,
      editePersonItemVisible: false,
      editePersonItemData: '',
      editAddressItemData: '',
      editAddressItemDataVisible: false
    }
  },
  created() {
    this.lnitializationData()
  },
  methods: {
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
    handleChangeAddress2() {
      this.editAddressItemData.province = this.editAddressItemData.selectedOptions2[0]
      this.editAddressItemData.city = this.editAddressItemData.selectedOptions2[1]
      this.editAddressItemData.district = this.editAddressItemData.selectedOptions2[2]
      console.log('this.form.province city area')
      console.log(this.editAddressItemData.province)
      console.log(this.editAddressItemData.city)
      console.log(this.editAddressItemData.district)
      console.log(this.editAddressItemData)
    },
    submitFormEditAddressItem(editAddressItemData) {
      console.log(editAddressItemData)
      const data = { ...this.editAddressItemData }
      delete data.selectedOptions2
      this.$refs.editAddressItemData.validate((valid) => {
        if (valid) {
          console.log('已进入确认界面：')
          contactaddress_updateAddressItem(data)
            .then(res => {
              console.log(res)
              this.editAddressItemDataVisible = false
              this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
              this.lnitializationData()
            })
            .catch(err => {
              console.log(err)
            })

          // this.$axios.post(this.url + '/contactaddress/updateAddressItem', data, { timeout: 5000 })
          //   .then(res => {
          //     console.log(res)
          //     this.editAddressItemDataVisible = false
          //     this.$notify({
          //       title: '成功',
          //       message: '编辑成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.lnitializationData()
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        }
      })
    },
    editeContactAddress(row) {
      console.log(row)
      this.editAddressItemData = { ...row }
      // this.editAddressItemData = row
      var key = 'selectedOptions2'
      var value = [row.province, row.city, row.district]
      this.editAddressItemData[key] = value
      console.log('this.editAddressItemData........')
      console.log(this.editAddressItemData)
      this.editAddressItemDataVisible = true
    },
    // 分割，上面是editeContactAddress
    submitForm(editePersonItemData) {
      console.log('this.editePersonItemData')
      console.log(this.editePersonItemData)
      this.$refs.editePersonItemData.validate((valid) => {
        if (valid) {
          console.log('已进入确认界面：')
          // const dataTest = new FormData()
          // dataTest.append('editePersonItemData', JSON.stringify(this.editePersonItemData))
          contactperson_updateContactItem((this.editePersonItemData)).then(res => {
          // contactperson_updateContactItem(JSON.stringify(this.editePersonItemData)).then(res => {
            console.log(res)
            this.editePersonItemVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            this.lnitializationData()
          }).catch(err => {
            console.log(err)
          })

          // this.$axios.post(this.url + '/contactperson/updateContactItem', this.editePersonItemData, { timeout: 3000 })
          //   .then(res => {
          //     console.log(res)
          //     this.editePersonItemVisible = false
          //     this.$notify({
          //       title: '成功',
          //       message: '编辑成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.lnitializationData()
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    CloseDialogeditePersonItem() {
      this.editePersonItemVisible = false
    },
    editePersonItem(row) {
      console.log(row)
      this.editePersonItemData = { ...row }
      this.editePersonItemVisible = true
    },
    addContactAddressData() {
      this.$refs.AddContactAddress.validate((valid) => {
        if (valid) {
          console.log('已进入确认界面：')
          console.log('this.addCustomerForm.contactaddressList.............')
          console.log(this.addCustomerForm.contactaddressList)
          // 删除多余的selectedOptions，因为后台接收不了，不方便直接转换为实体
          for (let i = 0; i < this.addCustomerForm.contactaddressList.length; i++) {
            delete this.addCustomerForm.contactaddressList[i].selectedOptions
          }
          const dataAddContactAddress = this.addCustomerForm.contactaddressList
          console.log(this.addCustomerForm.contactaddressList)
          contactaddress_addContactAddress({ data: dataAddContactAddress, cid: this.cid })
            .then(res => {
              console.log(res)
              this.addContactAddressVisible = false
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.lnitializationData()
            })
            .catch(err => {
              console.log(err)
            })
          // this.$axios.post(this.url + '/contactaddress/addContactAddress', { data: dataAddContactAddress, cid: this.cid }, { timeout: 3000 })
          //   .then(res => {
          //     console.log(res)
          //     this.addContactAddressVisible = false
          //     this.$notify({
          //       title: '成功',
          //       message: '添加成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.lnitializationData()
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        }
      })
    },
    delRowTable3(index) {
      // this.addCustomerForm.contactaddressList.splice(index, 1)
      if (this.addCustomerForm.contactaddressList.length > 1) {
        this.addCustomerForm.contactaddressList.splice(index, 1)
      } else {
        this.$notify({
          title: '失败',
          message: '必修有一条数据',
          type: 'error',
          duration: 2000
        })
      }
    },
    CloseDialogAddContactAddress() {
      // 重置form表单
      this.$refs['AddContactAddress'].resetFields()
      // 通过v-if重置自定义组件
      this.fileComponet = false
      this.addCustomerForm.contactpersonList.splice(1, this.addCustomerForm.contactpersonList.length)
      this.addCustomerForm.contactaddressList.splice(1, this.addCustomerForm.contactaddressList.length)

      this.addContactAddressVisible = false
    },
    OpenDialogAddContactAddress() {
      // 通过v-if重置自定义组件
      this.fileComponet = true
    },
    addContactaddressList() {
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
    // 分割来开
    addContactAddress() {
      this.addContactAddressVisible = true
    },
    addContactPersonData() {
      this.$refs.AddContactPerson.validate((valid) => {
        if (valid) {
          console.log('已进入确认界面：')
          const dataAddaddContactPerson = this.addCustomerForm.contactpersonList
          contactperson_addContactPerson({ data: dataAddaddContactPerson, cid: this.cid })
            .then(res => {
              console.log(res)
              this.addContactPersonVisible = false
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.lnitializationData()
            })
            .catch(err => {
              console.log(err)
            })

          // this.$axios.post(this.url + '/contactperson/addContactPerson', { data: dataAddaddContactPerson, cid: this.cid }, { timeout: 3000 }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }})
          //   .then(res => {
          //     console.log(res)
          //     this.addContactPersonVisible = false
          //     this.$notify({
          //       title: '成功',
          //       message: '添加成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.lnitializationData()
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        }
      })
    },
    delRowTable2(index) {
      // this.addCustomerForm.contactpersonList.splice(index, 1)
      if (this.addCustomerForm.contactpersonList.length > 1) {
        this.addCustomerForm.contactpersonList.splice(index, 1)
      } else {
        this.$notify({
          title: '失败',
          message: '必修有一条数据',
          type: 'error',
          duration: 2000
        })
      }
    },
    CloseDialogAddContactPerson() {
      // 重置form表单
      this.$refs['AddContactPerson'].resetFields()
      // 通过v-if重置自定义组件
      this.fileComponet = false
      this.addCustomerForm.contactpersonList.splice(1, this.addCustomerForm.contactpersonList.length)
      this.addCustomerForm.contactaddressList.splice(1, this.addCustomerForm.contactaddressList.length)

      this.addContactPersonVisible = false
    },
    OpenDialogAddContactPerson() {
      // 通过v-if重置自定义组件
      this.fileComponet = true
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
    addContactPerson() {
      this.addContactPersonVisible = true
    },
    lnitializationData() {
      this.getCustomerDataByCid()
      this.getContactAddressDataByCid()
      this.getContactPsersonDataByCid()
    },
    delAddressItem(row, index) {
      console.log(row)
      console.log(index)
      if (index > 0) {
        const param = { id: row.id }
        contactaddress_deleteById({ id: row.id })
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

        // this.$axios
        //   .delete(this.url + '/contactaddress/deleteById', { params: param })
        //   .then(res => {
        //     console.log(res)
        //     this.$notify({
        //       title: '成功',
        //       message: '删除成功',
        //       type: 'success',
        //       duration: 2000
        //     })
        //     this.lnitializationData()
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      } else {
        this.$notify({
          title: '失败',
          message: '默认联系地址不能删除',
          type: 'error',
          duration: 2000
        })
      }
    },
    delPersonItem(row, index) {
      console.log(row)
      console.log(index)
      if (index > 0) {
        const param = { id: row.id }
        contactperson_deleteById({ id: row.id })
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

        // this.$axios
        //   .delete(this.url + '/contactperson/deleteById', { params: param })
        //   .then(res => {
        //     console.log(res)
        //     this.$notify({
        //       title: '成功',
        //       message: '删除成功',
        //       type: 'success',
        //       duration: 2000
        //     })
        //     this.lnitializationData()
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      } else {
        this.$notify({
          title: '失败',
          message: '默认联系人不能删除',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 这是封装在api下的方法，比下面少了几行代码而已，所以后面的代码我也就不封装了，封装在api里面只能用get，post方法只能像下面一样写在那里
    getCustomerDataByCid() {
      getCustomerDataByCidApi(this.cid).then(res => {
        this.customerData = res
      })
        .catch(error => {
          console.log(error)
        })
    },
    getContactAddressDataByCid() {
      contactaddress_selectByCid(this.cid).then(res => {
        this.addressData = res
      }).catch(err => {
        console.log(err)
      })
      // this.$axios.get(this.url + '/contactaddress/selectByCid', { params: this.cid }, { timeout: 3000 })
      //   .then(res => {
      //     this.addressData = res.data
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    getContactPsersonDataByCid() {
      contactperson_selectByCid(this.cid).then(res => {
        this.personData = res
        console.log('res: ' + res)
      }).catch(err => {
        console.log(err)
      })

      // this.$axios.get(this.url + '/contactperson/selectByCid', { params: this.cid }, { timeout: 3000 })
      //   .then(res => {
      //     this.personData = res.data
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    goBack() {
      // 点击返回按钮，向后跳转
      this.$router.go(-1)
      console.log(this)
    }
  }
}
</script>

<style scoped>
  /*//这是设置超过边框用省略号代替，-webkit-line-clamp: 1，是显示多少行,超过后省略*/
  span{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
</style>

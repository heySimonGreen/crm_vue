<template>
  <div class="el-container" style="display: block">
    <!--    {{ cid }}-->
    <!--        {{ addressData }}-->
    <!--        {{ personData }}-->
    <!--    {{ customerData}}-->
    <el-row>
      <el-col :span="12" :offset="12"><span style="font-size: 30px">客户基本信息</span></el-col>
      <el-col :span="23" :offset="1">
        <span style="font-size: 20px;margin-bottom: 30px">姓名:  {{ this.customerData.username }}</span>
      </el-col>
      <el-col :span="23" :offset="1">
        <span style="font-size: 20px">备注:  {{ this.customerData.notes }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" s-t-y-l-e="font-size: 20px">
        <el-button type="info">联系人信息</el-button>
        <el-button type="warning" style="float: right" icon="el-icon-circle-plus-outline" @click="addContactPerson()">添加联系人</el-button>
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
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editePersonItem(scope.row)" />
          <el-button type="primary" icon="el-icon-delete" @click="delPersonItem(scope.row, scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" s-t-y-l-e="font-size: 20px">
        <el-button type="info">联系地址信息</el-button>
        <el-button type="warning" style="float: right" icon="el-icon-circle-plus-outline" @click="addContactAddress()">添加联系地址</el-button>
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
      <el-table-column
        label="编号"
        type="index"
        align="center"
        fixed
      />
      <el-table-column label="标题" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.title }} </span>
        </template>
      </el-table-column>
      <el-table-column label="邮编" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.stampnumber }} </span>
        </template>
      </el-table-column>
      <el-table-column label="地址" min-width="100" align="center">
        <template slot-scope="{ row }">
          <span style="text-align: center"> {{ row.country }}{{ row.province }}{{ row.city }}{{ row.district }} </span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="操作" min-width="100" align="center">-->
      <!--        <template slot-scope="{ row }">-->
      <!--          <el-button type="primary" icon="el-icon-edit" @click="editeContactAddress(row)" />-->
      <!--          <el-button type="primary" icon="el-icon-delete" @click="delAddressItem(row,row.$index)" />-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editeContactAddress(scope.row)" />
          <el-button type="primary" icon="el-icon-delete" @click="delAddressItem(scope.row, scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
    <!--    dialog1-AddContactPerson-->
    <el-dialog title="添加联系人" width="80%" :visible.sync="addContactPersonVisible" @close="CloseDialogAddContactPerson()" @open="OpenDialogAddContactPerson()"> <!--重置表单数据这里好像不行，因为我是写死在数据里面的吧-->
      <el-form ref="AddContactPerson" :rules="rules" :model="addCustomerForm" label-position="left">
        <div style="display: flex;flex-direction: column">
          <el-button icon="el-icon-circle-plus-outline" type="primary" style="float: left;width: 200px" @click="addContactpersonList">增加一个联系人</el-button>
        </div>
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
        <el-button @click="CloseDialogAddContactPerson()">
          取消
        </el-button>
        <el-button type="primary" @click="addContactPersonData() && CloseDialogAddContactPerson()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <!--    dialog2-AddContactAddress-->
    <el-dialog title="添加联系地址" width="80%" :visible.sync="addContactAddressVisible" @close="CloseDialogAddContactAddress()" @open="OpenDialogAddContactAddress()"> <!--重置表单数据这里好像不行，因为我是写死在数据里面的吧-->
      <el-form ref="AddContactAddress" :rules="rules" :model="addCustomerForm" label-position="left">
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
          <el-input v-model="editePersonItemData.name" />
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
          <el-input v-model.number="editePersonItemData.phonenumber" />
        </el-form-item>
        <el-form-item label="座机" prop="homephonenumber">
          <el-input v-model.number="editePersonItemData.homephonenumber" />
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="editePersonItemData.wechat" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editePersonItemData.email" />
        </el-form-item>
        <el-form-item label="角色" prop="identity">
          <el-input v-model="editePersonItemData.identity" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editePersonItemData')">提交</el-button>
          <el-button @click="resetForm('editePersonItemData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--    dialog4-editAddress-->
    <el-dialog title="编辑联系地址信息" width="80%" :visible.sync="editAddressItemDataVisible" @close="editAddressItemDataVisible = false">
      <el-form ref="editAddressItemData" :model="editAddressItemData" :rules="rules.contactaddressList" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editAddressItemData.title" />
        </el-form-item>
        <el-form-item label="邮编" prop="stampnumber">
          <el-input v-model.number="editAddressItemData.stampnumber" />
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-input v-model="editAddressItemData.country" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="editAddressItemData.province" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="editAddressItemData.city" />
        </el-form-item>
        <el-form-item label="地区" prop="district">
          <el-input v-model="editAddressItemData.district" />
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
export default {
  name: 'CustomerDetailInfo',
  data() {
    return {
      addCustomerForm: {
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
      cid: this.$route.query,
      addressData: [],
      personData: [],
      customerData: '',
      addContactPersonVisible: false,
      addContactAddressVisible: false,
      editePersonItemVisible: false,
      editePersonItemData: '',
      genderOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      editAddressItemData: '',
      editAddressItemDataVisible: false
    }
  },
  created() {
    this.lnitializationData()
  },
  methods: {
    submitFormEditAddressItem(editAddressItemData) {
      console.log(editAddressItemData)
      this.$refs.editAddressItemData.validate((valid) => {
        if (valid) {
          console.log('已进入确认界面：')
          this.$axios.post('http://localhost:8080/contactaddress/updateAddressItem', this.editAddressItemData, { timeout: 5000 })
            .then(res => {
              console.log(res)
              this.editAddressItemDataVisible = false
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
        }
      })
    },
    editeContactAddress(row) {
      console.log(row)
      this.editAddressItemData = row
      this.editAddressItemDataVisible = true
    },
    // 分割，上面是editeContactAddress
    submitForm(editePersonItemData) {
      console.log('this.editePersonItemData')
      console.log(this.editePersonItemData)
      this.$refs.editePersonItemData.validate((valid) => {
        if (valid) {
          console.log('已进入确认界面：')
          this.$axios.post('http://localhost:8080/contactperson/updateContactItem', this.editePersonItemData, { timeout: 3000 })
            .then(res => {
              console.log(res)
              this.editePersonItemVisible = false
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
      this.editePersonItemData = row
      this.editePersonItemVisible = true
    },
    addContactAddressData() {
      this.$refs.AddContactAddress.validate((valid) => {
        if (valid) {
          console.log('已进入确认界面：')
          const dataAddContactAddress = this.addCustomerForm.contactaddressList
          this.$axios.post('http://localhost:8080/contactaddress/addContactAddress', { data: dataAddContactAddress, cid: this.cid }, { timeout: 3000 }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }})
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
        stampnumber: '1',
        country: '中国sdfsdf',
        province: '1',
        city: '1',
        district: '1'
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
          this.$axios.post('http://localhost:8080/contactperson/addContactPerson', { data: dataAddaddContactPerson, cid: this.cid }, { timeout: 3000 }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }})
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
        gender: 'gender',
        phonenumber: 'phonenumber',
        homephonenumber: 'homephonenumber',
        wechat: 'wechat',
        email: 'email',
        identity: 'identity'
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
        this.$axios
          .delete('http://localhost:8080/contactaddress/deleteById', { params: param })
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
        this.$axios
          .delete('http://localhost:8080/contactperson/deleteById', { params: param })
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
      } else {
        this.$notify({
          title: '失败',
          message: '默认联系人不能删除',
          type: 'error',
          duration: 2000
        })
      }
      // console.log(row)
      // const param = { id: row.id }
      // this.$axios
      //   .delete('http://localhost:8080/contactperson/deleteById', { params: param })
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
      this.$axios.get('http://localhost:8080/contactaddress/selectByCid', { params: this.cid }, { timeout: 3000 })
        .then(res => {
          this.addressData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getContactPsersonDataByCid() {
      this.$axios.get('http://localhost:8080/contactperson/selectByCid', { params: this.cid }, { timeout: 3000 })
        .then(res => {
          this.personData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>

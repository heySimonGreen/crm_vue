import request from '@/utils/request'
export function getList() {
  return request({
    url: '/customer/selectAll',
    method: 'get'
  })
}
export function getList2(data) {
  return request({
    url: '/customer/addCustomer2',
    method: 'post',
    data
  })
}
export function getCustomerDataByGuid(data) {
  return request({
    url: 'http://localhost:8080/customer/addCustomer2',
    method: 'post',
    data
  })
}

export function getCustomerDataByCidApi(cid) {
  return request({
    url: '/customer/selectOne',
    method: 'get',
    params: cid
  })
}
// 这里应该用get但是我想试一试post,post还是不行
export function testpost(data) {
  return request({
    url: '/admin/rigister',
    method: 'post',
    headers: { 'param': data },
    params: data
    // data
  })
}

export function customer_selectAllTest(data) {
  return request({
    url: '/customer/selectAllTest',
    method: 'get',
    params: data
  })
}
export function customer_addCustomer3(data) {
  return request({
    url: '/customer/addCustomer3',
    method: 'post',
    // params: '',
    data
  })
}
export function contactperson_selectByCid(data) {
  return request({
    url: '/contactperson/selectByCid',
    method: 'get',
    params: data
  })
}
export function contactaddress_selectByCid(data) {
  return request({
    url: '/contactaddress/selectByCid',
    method: 'get',
    params: data
  })
}
export function contactperson_updateContactItem(data) {
  return request({
    url: '/contactperson/updateContactItem',
    method: 'post',
    data
  })
}
export function customer_deleteAllById(data) {
  return request({
    url: '/customer/deleteAllById',
    method: 'delete',
    params: data
  })
}
export function customer_searchInputButton(data) {
  return request({
    url: '/customer/searchInputButton',
    method: 'post',
    data
  })
}
export function customer_batchDeletAllCustomerByGuid(data) {
  return request({
    url: '/customer/batchDeletAllCustomerByGuid',
    method: 'post',
    data
  })
}
export function contactaddress_deleteById(data) {
  return request({
    url: '/contactaddress/deleteById',
    method: 'delete',
    params: data
  })
}
export function contactaddress_updateAddressItem(data) {
  return request({
    url: '/contactaddress/updateAddressItem',
    method: 'post',
    data
  })
}
export function contactperson_deleteById(data) {
  return request({
    url: '/contactperson/deleteById',
    method: 'delete',
    params: data
  })
}
export function contactaddress_addContactAddress(data) {
  return request({
    url: '/contactaddress/addContactAddress',
    method: 'post',
    data
  })
}
export function contactperson_addContactPerson(data) {
  return request({
    url: '/contactperson/addContactPerson',
    method: 'post',
    data
  })
}


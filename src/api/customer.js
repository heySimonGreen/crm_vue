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
//这里应该用get但是我想试一试post,post还是不行
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


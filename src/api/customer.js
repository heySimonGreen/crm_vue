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
// export function getList() {
//   return request({
//     url: '/customer/selectAll',
//     method: 'get'
//   })
// }
// export function getList() {
//   return request({
//     url: '/customer/selectAll',
//     method: 'get'
//   })
// }
// export function getList() {
//   return request({
//     url: '/customer/selectAll',
//     method: 'get'
//   })
// }

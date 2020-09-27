import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/customer/selectAll',
    method: 'get',
    params
  })
}

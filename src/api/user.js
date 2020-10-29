import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
    // url: '/admin/loginpost',
    // method: 'post',
    // data
  })
}
export function loginMyselfPost(data) {
  return request({
    url: 'http://localhost:8080/admin/loginpost',
    method: 'post',
    params: data
  })
}
export function loginMyself(data) {
  return request({
    url: '/admin/login',
    method: 'get',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

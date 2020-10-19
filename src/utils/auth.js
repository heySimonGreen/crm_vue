import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const Username = 'username'
const Adminid = 'adminid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getusername() {
  return Cookies.get(Username)
}

export function setusername(username) {
  return Cookies.set(Username, username)
}

export function removeusername() {
  return Cookies.remove(Adminid)
}

export function getadminid() {
  return Cookies.get(Adminid)
}

export function setadminid(adminid) {
  return Cookies.set(Adminid, adminid)
}

export function removeadminid() {
  return Cookies.remove(Adminid)
}

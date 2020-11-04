import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getuuid } from '@/utils/auth'
import { cryptTokenf, formatDate, signatureMD5 } from '@/utils/myutil'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: '/dev-api',
  // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      const path = config.url

      const date = new Date()
      const time = formatDate(date, 'yyyy-MM-dd hh:mm:ss')

      const guid = getuuid()
      const reg = new RegExp('"', 'g')
      // console.log('JSON.stringify(config.params)' + JSON.stringify(config.params))
      //post请求时param是为空，此时要给param谁为{}，以便和后台java对应，计算出来的signature一样
      //post请求时param是为空，此时要给param谁为{}，以便和后台java对应，计算出来的signature一样
      if (config.params == null) {
        console.log('config.params == null')
        // const param = JSON.stringify(config.params).toString().replace(reg, '')
        const param = '{}'

        const cryptToken = cryptTokenf(getuuid())

        const signature = signatureMD5(time, path, guid, param, cryptToken)
        config.headers['signature'] = signature

        config.headers['time'] = time

        console.log(time)
        // config.headers['guid'] = getuuid()
        console.log(JSON.stringify(config.params))
        console.log(config.url)
        console.log('signature: ' + signature)
      } else {
        console.log('config.params != null')
        const param = JSON.stringify(config.params).toString().replace(reg, '')

        const cryptToken = cryptTokenf(getuuid())

        const signature = signatureMD5(time, path, guid, param, cryptToken)
        config.headers['signature'] = signature

        config.headers['time'] = time

        console.log(time)
        // config.headers['guid'] = getuuid()
        console.log(JSON.stringify(config.params))
        console.log(config.url)
        console.log('signature: ' + signature)
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log('res.code:......')
    console.log(response.status)

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000 ) {
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      console.log('res.code:' + res.code)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

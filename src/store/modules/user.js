import { login, logout, getInfo, loginMyself, loginMyselfPost } from '@/api/user'
import { getToken, setToken, removeToken, getusername, setusername, removeusername, getadminid, setadminid, removeadminid } from '@/utils/auth'
import { resetRouter } from '@/router'
import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router'

Vue.use(Router)

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    username: getusername(),
    adminid: getadminid,
    // url: 'http://localhost:8080'
    url: 'http://192.168.1.2:8080'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ADMINID: (state, adminid) => {
    state.adminid = adminid
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginMyself({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      loginMyself({ username: username.trim(), passwd: password }).then(response => {
        const { data, correctUsernameAndPasswd, adminid } = response
        if (correctUsernameAndPasswd == 1) {
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', username)
          commit('SET_ADMINID', adminid)

          console.log('state.username')
          console.log(state.username)
          console.log(username)
          setToken(data.token)
          setusername(username)
          setadminid(adminid)
          resolve()
          location.reload()
          alert('登录成功')
        } else {
          alert('登录失败')
          location.reload()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  loginMyselfPost({ commit }, userInfo) {
    console.info(userInfo)
    const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   loginMyselfPost({ data: { username: username.trim(), password: password }}).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })

    // this.$axios.post('http://localhost:8080/admin/loginpost', { id: 1 }).then(response => {
    //   const { data } = response
    //   commit('SET_TOKEN', data.token)
    //   setToken(data.token)
    //   resolve()
    // }).catch(error => {
    //   reject(error)
    // })
    // 用post不行，只能在页面单独this.$axios
    this.$axios.post('http://localhost:8080/admin/loginpost', { id: 1 })
      .then(res => {
        console.log(res)
        return res
      })
      .catch(err => {
        console.log(err)
      })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        removeusername()
        removeadminid()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

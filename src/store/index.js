import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // null{token,refresh_token}
    // user: null
    user: getItem('user'),
    cachePages: ['TabBar']
  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      // 找容器拿数据
      // 为了持久化数据进行本地存储,本地存储只能存字符串,使用JSON转换
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem('user', state.user)
    },
    addCachePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },
    removeCachePage (state, name) {
      const index = state.cachePages.indexOf(name)
      if (index !== -1) {
        state.cachePages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

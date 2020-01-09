import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 处理大数字类型
// data是后端传递过来的数据
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  const { user } = store.data
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response
},
async function (error) {
  if (error.response && error.response.status === 401) {
    const user = store.state.user
    if (!user || !user.refresh_token) {
      router.push('/login')
      return
    }
    try {
      const res = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      store.commit('setUser', {
        token: res.data.data.token,
        refresh_token: user.refresh_token
      })
      return request(error.config)
    } catch (error) {
      router.push('/login')
    }
  }
  return Promise.reject(error)
})
export default request

import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 这里的request相当于复制了一个和axios本身功能一样的一个对象
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
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response && error.response.status === 401) {
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }
    try {
      // 请求更新refresh_token
      const { data } = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      store.commit('setUser', {
        ...user,
        token: data.data.token
      })

      // error.config是错误对象,包括url,method等信息
      // 当刷新的token也获取不到时，将错误对象放回
      // 这里使用request是应为每个请求都会走请求，响应拦截器，
      // 使用return 把是哪次请求失败的错误对象返回,以便拿到详细路径跳转
      return request(error.config)
    } catch (error) {
      redirectLogin()
    }
  }
  return Promise.reject(error)
})

// 跳转到登录页面
function redirectLogin () {
  router.push('/login')
}
export default request

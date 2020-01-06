import axios from 'axios'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理大数字类型
request.defaults.transformRequest = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {

  }
}]

export default request

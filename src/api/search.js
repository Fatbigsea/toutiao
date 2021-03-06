import request from '@/utils/request'

// 获取搜索推荐列表
export const getSuggestion = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索列表
export const getSearchResult = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}

// 获取用户搜索历史记录
export const getSearchHistories = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/search/histories'
  })
}

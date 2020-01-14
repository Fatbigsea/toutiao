import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}

// 根据文章id获取指定文章
export const getArticlesById = articleId => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${articleId}`
  })
}

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

// 文章收藏
export const addCollection = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消文章收藏
export const deleteCollection = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${target}`
  })
}

// 文章点赞
export const addLike = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消文章点赞
export const deleteLike = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${target}`
  })
}

// 获取当前用户文章列表
export const getUserArticle = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/articles',
    params
  })
}

// 获取用户收藏列表
export const getUserCollect = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/article/collections',
    params
  })
}

// 获取用户阅读历史
export const getUserHistory = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/histories',
    params
  })
}

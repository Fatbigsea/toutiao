import request from '@/utils/request'

// 获取文章评论
export const getComments = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}

// 添加评论
export const addComments = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/comments',
    data
  })
}

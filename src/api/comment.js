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

// 对评论点赞
export const addCommentLike = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论的点赞
export const deleteCommentLike = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

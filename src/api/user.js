import request from '@/utils/request'

// 登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 验证码接口
export const getSmsCode = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 关注用户
export const addFollow = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注
export const deleteFollow = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${target}`
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const editUserProfile = data => {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/profile',
    data
  })
}

import request from '@/utils/request'


export const getCode = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/user/register/code',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      console.log(res.data.msg)
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

export const register = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/user/register',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      console.log(res.data.msg)
      if(res.data.code !== 0) reject(res.data.msg)
      resolve(res.data.msg)
    })
  })
}

export const login = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/user/login',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      console.log(res.data.msg)
      if(res.data.code !== 0) reject(res.data.msg)
      resolve(res)
    })
  })
}

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/user/get/info',
      method: 'get'
    }).then(res => {
      if(res.data.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

export const getIntegral = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/user/get/integral',
      method: 'get'
    }).then(res => {
      if(res.data.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

export const getUserName = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/user/get_user_name',
      method: 'post',
      data: JSON.stringify({
        user_id: parseInt(data)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}
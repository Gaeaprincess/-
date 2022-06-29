import request from '@/utils/request'

export const getTypeList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/goods/gets/typelist',
      method: 'get'
    }).then(res => {
      resolve(res.data.data)
    })
  })
}
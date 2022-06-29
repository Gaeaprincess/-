import request from '@/utils/request'

export const getRank = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/user/rank',
      method: 'get',
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

import request from '@/utils/request'


export const getContests_Info = (data,password) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/contest/get',
      method: 'post',
      data: JSON.stringify({
        id : parseInt(data),
        password: password
      })
    }).then(res => {
      // console.log(res.data.msg)
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

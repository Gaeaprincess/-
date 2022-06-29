import request from '@/utils/request'


export const getProblemInfo = (datas) => {
  console.log(datas);
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/problem/content',
      method: 'post',
      data: JSON.stringify({
        problem_id : parseInt(datas)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

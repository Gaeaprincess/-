import request from '@/utils/request'


export const getNotice = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/announcement/gets/list',
      method: 'get'
    }).then(res => {
      // console.log(res.data.msg)
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

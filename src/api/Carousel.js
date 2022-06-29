import request from '@/utils/request'


export const getCarousel = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/slideshow/gets/list',
      method: 'get'
    }).then(res => {
      // console.log(res.data.msg)
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

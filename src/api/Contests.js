import request from '@/utils/request'


export const getContestsList = (key_word, status, page, page_size) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/contest/list',
      method: 'post',
      data: JSON.stringify({
        key_word: key_word,
        status:status,
        page:parseInt(page) ,
        page_size:parseInt(page_size)
      })
    }).then(res => {
      // console.log(res.data.msg)
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

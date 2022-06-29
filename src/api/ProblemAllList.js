import request from '@/utils/request'


export const getProblemAllList = (key_word,page, page_size) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/problem/list',
      method: 'post',
      data: JSON.stringify({
        key_word:key_word,
        page : parseInt(page),
        page_size: parseInt(page_size)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

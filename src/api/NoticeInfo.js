import request from '@/utils/request'


export const getNoticeInfo = (datas) => {
  console.log(datas);
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/announcement/get',
      method: 'post',
      data: JSON.stringify({
        id : parseInt(datas)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

export const getAdmin = (datas) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/common/get/admin/name',
      method: 'post',
      data: JSON.stringify({
        id : parseInt(datas)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

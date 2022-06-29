import request from '@/utils/request'


export const getStatusList = (datas_myself,datas_result,datas_user_name,problem_id,datas_page,datas_page_size) => {
  // console.log(datas);
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/submission/list',
      method: 'post',
      data: JSON.stringify({
        myself : parseInt(datas_myself),
        result : parseInt(datas_result),
        user_name : datas_user_name,
        problem_id : parseInt(problem_id),
        page : parseInt(datas_page),
        page_size : parseInt(datas_page_size),
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

import request from '@/utils/request'


export const getContestStatusList = (datas_myself, datas_result, datas_user_name,
   problem_id, datas_page, datas_page_size, contest_id) => {
  console.log(contest_id);
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/contest/submission',
      method: 'post',
      data: JSON.stringify({
        myself: parseInt(datas_myself),
        result: parseInt(datas_result),
        user_name: datas_user_name,
        problem_id: parseInt(problem_id),
        page: parseInt(datas_page),
        page_size: parseInt(datas_page_size),
        contest_id: parseInt(contest_id),
      })
    }).then(res => {
      if (res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

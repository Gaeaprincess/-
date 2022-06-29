import request from '@/utils/request'

export const getProblemList = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/problem/list',
      method: 'post',
      data: JSON.stringify({
        contest_id : data
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data.msg)
      resolve(res.data)
    })
  })
}

export const getProblem = (datas) => {
  console.log(datas);
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/contest/problem',
      method: 'post',
      data: JSON.stringify({
        contest_id : parseInt(datas)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}


export const getStatus = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/problem/exists',
      method: 'post',
      data: JSON.stringify({
        problem_id : parseInt(data)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

export const getDetail = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/problem/content',
      method: 'post',
      data: JSON.stringify({
        problem_id : parseInt(data)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

export const putCode = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/problem/submission',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.msg)
    })
  })
}

export const getRank = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/contest/rank',
      method: 'post',
      data: JSON.stringify({
        contest_id : parseInt(data)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

export const getState = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/problem/exists',
      method: 'post',
      data: JSON.stringify({
        problem_id : parseInt(data)
      })
    }).then(res => {
      if(res.data.code !== 0) reject(res.data)
      resolve(res.data)
    })
  })
}

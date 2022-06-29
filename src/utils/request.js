import axios from 'axios'
// import store from '@/store'

// create an axios instance
// 数据库后端
const service = axios.create({
  baseURL: 'http://114.132.236.147:8001', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    // do something before request is sent
    // console.log(config)
    if (sessionStorage.getItem('Authorization')) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = sessionStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default service

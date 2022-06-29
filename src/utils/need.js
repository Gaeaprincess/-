import axios from 'axios'
// import store from '@/store'

// create an axios instance
// 数据库后端
const service = axios.create({
  baseURL: 'http://114.132.236.147:8001', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

export default service
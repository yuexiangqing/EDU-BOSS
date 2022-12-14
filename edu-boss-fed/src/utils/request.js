import axios from 'axios'
import store from '@/store'

// create 创建 axios 实例
// 用create是为了创建一个axios实例，create里面可以传入一个对象，这个对象用来对axios进行配置处理
const request = axios.create({
  timeout: 2000
// baseURL:
// headers:
})

function getBaseURL (url) {
  if (url.startsWith('./boss')) {
    return 'http://eduboss.lagounews.com'
  } else {
    return 'http://edufront.lagounews.com'
  }
}
// 请求拦截器
request.interceptors.request.use(function (config) {
// 判断 config.url 的前缀，来进行请求 baseURL 的设置

  config.baseURL = getBaseURL(config.url)

  // 统一设置 Token 信息
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})
export default request

import axios from 'axios'
import store from '@/store'
// 通过局部引入方式引入 element 的 message 组件功能
import { Message } from 'element-ui'

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

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码 2xx 内的状态码都会触发该函数。
  console.log('响应成功了', response)
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    // 1.判断失败的状态码情况（主要处理 401 的情况）
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
    // 2. Token 无效（过期）处理
      // errorMessage = 'Token 无效'
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    // console.log(errorMessage)
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    Message.error('请求超时，请重试')
  } else {
    // 发送请求时出了点问题
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作
  return Promise.reject(error)
})
export default request

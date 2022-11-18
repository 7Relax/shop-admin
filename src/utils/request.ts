import axios from 'axios'

// 创建请求实例
const instance = axios.create({
  baseURL: 'https://shop.fed.lagou.com/api/admin'
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 统一设置用户身份 token
  return config
}, async function (error) {
  return await Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，比如 token 过期失效、服务端异常等
  return response
}, async function (error) {
  return await Promise.reject(error)
})

export default instance

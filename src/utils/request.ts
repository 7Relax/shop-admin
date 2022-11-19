import axios, { AxiosRequestConfig } from 'axios'

// 创建请求实例
const instance = axios.create({
  // baseURL: import.meta.env.VITE_SERVICE_URL
  baseURL: import.meta.env.VITE_BASE_API // 代理前缀
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

// export default instance

export default <T = any>(config: AxiosRequestConfig) => {
  return instance(config).then(res => {
    // 返回的类型是由传入的泛型T决定
    return res.data.data as T
  })
}

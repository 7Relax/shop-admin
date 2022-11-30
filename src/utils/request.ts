import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/'

// 创建请求实例
const request = axios.create({
  // baseURL: import.meta.env.VITE_SERVICE_URL
  baseURL: import.meta.env.VITE_BASE_API // 代理前缀
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户身份 token
  const token = store.state.userInfo?.token
  if (token && config && config.headers) {
    // 传的token格式是与后端约定好的
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, async function (error) {
  return await Promise.reject(error)
})

// 控制登录过期的锁
let isRefreshing = false

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 在此方法体里面的都是HTTP的状态码是非异常的情况，所以这里是处理项目自定义状态码的相关问题
  const status = response.data.status

  // 正确的情况
  if (!status || status === 200) {
    return response
  }

  // 错误情况之：统一处理登录过期（token过期）
  if (status === 410000) {
    if (isRefreshing) {
      return Promise.reject(response)
    }

    // 上锁（防止同一时刻有多个请求）
    isRefreshing = true

    // 弹窗提示
    ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      // 清除本地过期的登录状态
      store.commit('removeUserInfo')
      // 跳转到登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).finally(() => {
      isRefreshing = false
    })

    // 抛出异常 - 在内部消化掉这个业务异常：代码则不会往下执行了
    return Promise.reject(response)
  }

  // 其它错误情况
  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  return Promise.reject(response.data)
}, function (error) {
  return Promise.reject(error)
})

// export default request

// export default <T = any>(config: AxiosRequestConfig) => {
//   return request(config).then(res => {
//     // 返回的类型是由传入的泛型T决定
//     return (res.data.data || res.data) as T
//   })
// }

// 模拟返回
export default <T = any>(config: AxiosRequestConfig, data?: any, time = 300) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

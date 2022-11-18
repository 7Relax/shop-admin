/**
 * 公共基础接口封装
 */

import request from '@/utils/request'
import { ILoginInfo } from './types/common'

// interface ResponseData<T = any> {
//   status: number
//   msg: string
//   data: T
// }

// 登录页面图片数据
export const getLoginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })

  // return request<ResponseData<{
  //   logo_square: string
  //   logo_rectangle: string
  //   login_logo: string
  //   slide: string[]
  // }>>({
  //   method: 'GET',
  //   url: '/login/info'
  // }).then(res => {
  //   return res.data
  // })

  // return request<{
  //   status: number
  //   msg: string
  //   data: {
  //     logo_square: string
  //     logo_rectangle: string
  //     login_logo: string
  //     slide: string[]
  //   }
  // }>({
  //   method: 'GET',
  //   url: '/login/info'
  // })

  // return request.get<{
  //   status: number
  //   msg: string
  // }>('/login/info')
}

/**
 * 公共基础接口封装
 */

import request from '@/utils/request'
// import { ILoginInfo, ILoginResponse } from './types/common'
import { userInfo, loginInfo } from './testData/data'

// 登录页面图片数据
export const getLoginInfo = () => {
  return new Promise((resolve) => {
    // 模拟请求
    setTimeout(() => {
      resolve(loginInfo)
    }, 200)
  })
  // return request<ILoginInfo>({
  //   method: 'GET',
  //   url: '/login/info'
  // })
}

// 获取验证码
export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob' // 请求获取图片数据
  })
}

// 登录
export const login = (data: {
  account: string
  pwd: string
  imgcode: string
}) => {
  return new Promise((resolve) => {
    // 模拟请求
    setTimeout(() => {
      resolve(userInfo)
    }, 1000)
  })
  // return request<ILoginResponse>({
  //   method: 'POST',
  //   url: '/login',
  //   data
  // })
}

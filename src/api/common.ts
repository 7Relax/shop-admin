/**
 * 公共基础接口封装
 */

import request from '@/utils/request'

// 登录页面图片数据
export const getLoginInfo = async () => {
  return await request({
    method: 'GET',
    url: '/login/info'
  })
}

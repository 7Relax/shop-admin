/**
 * 管理员相关请求模块
 */

import request from '@/utils/request'
import { IListParams, IAdmin, IAdminData } from './types/admin'
import { adminList } from './testData/data'

// 获取管理员列表
export const getAdmins = (params: IListParams) => {
  return request<{
    count: number
    list: IAdmin[]
  }>({
    method: 'GET',
    url: '/setting/admin',
    params
  }, adminList, 800)
}

// 创建管理员
export const createAdmin = (data: IAdminData) => {
  // 返回数据中没有data 所以这里不指定泛型
  return request({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}

// 修改管理员
export const updateAdmin = (id: number, data: IAdminData) => {
  return request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}

// 删除管理员
export const deleteAdmin = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  }, {}, 800)
}

// 修改管理员状态
export const updateAdminStatus = (id: number, status: number) => {
  return request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  }, {}, 1200)
}

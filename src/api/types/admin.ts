// 列表查询参数
export interface IListParams {
  page: number
  limit: number
  name: string
  roles: string
  status: 0 | 1 | ''
}

// 返回参数：管理员实体
export interface IAdmin {
  id: number
  account: number
  head_pic: string
  pwd: string
  real_name: string
  roles: string
  last_ip: string
  last_time: number
  add_time: number
  login_count: number
  level: number
  status: number
  is_del: number
  _add_time: string
  _last_time: string
  statusLoading: boolean
}

// 创建 或 修改 管理员
export interface IAdminData {
  account: string
  conf_pwd: string
  pwd: string
  roles: string
  status: number
  real_name: string
}

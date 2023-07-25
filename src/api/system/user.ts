import request from '@/utils/request'
import type { SysDept } from '@/api/system/dept'
import type { SysRole } from '@/api/system/role'
import { parseStrEmpty } from '@/utils/common'

export type SysUser = {
  userId?: string
  deptId?: number
  userName?: string
  nickName?: string
  email?: string
  phonenumber?: string
  sex?: string
  avatar?: string
  password?: string
  status?: string
  delFlag?: string
  loginIp?: string
  loginDate?: string
  dept?: SysDept
  roles?: SysRole[]
  roleIds?: number[]
  postIds?: number[]
  roleId?: number
  bindStore?: string,
} & BaseEntity

export type SysUserQuery = SysUser & {
  pageNum?: number;
  pageSize?: number;
};

// 查询用户列表
export function listUser(query: SysUser): Promise<ResponsePageData<SysUser[]>> {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

type UserResponseData = {
  posts: any,
  roles: SysRole[],
  postIds: number[],
  roleIds: number[]
} & ResponseData<SysUser>

// 查询用户详细
export function getUser(userId: string): Promise<UserResponseData> {
  return request({
    url: '/system/user/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data: SysUser) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data: SysUser) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId: string) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 用户密码重置
export function resetUserPwd(userId: string, password: string) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId: string, status: string) {
  const data = {
    userId,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile(): Promise<ResponseData<SysUser>> {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data: SysUser) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data: FormData) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(userId: string) {
  return request({
    url: '/system/user/authRole/' + userId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data: { userId: string, roleIds: string[] }) {
  return request({
    url: '/system/user/authRole',
    method: 'put',
    params: data
  })
}

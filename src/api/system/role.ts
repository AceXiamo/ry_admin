import request from '@/utils/request'
import type { SysUser } from './user'

export type SysRole = {
  roleId: number
  roleName?: string
  roleKey?: string
  roleSort?: string
  dataScope?: string
  menuCheckStrictly?: boolean
  deptCheckStrictly?: boolean
  status?: string
  delFlag?: string
  flag?: boolean
  menuIds?: string[]
  deptIds?: string[]
} & BaseEntity

export type SysUserRole = {
  userId?: string
  roleId?: string
}

// 查询角色列表
export function listRole(query: SysRole): Promise<ResponseData<SysRole[]>> {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId: number): Promise<ResponseData<SysRole>> {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data: SysRole) {
  return request({
    url: '/system/role',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data: SysRole) {
  return request({
    url: '/system/role',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data: SysRole) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId: number, status: string) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId: number) {
  return request({
    url: '/system/role/' + roleId,
    method: 'delete'
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query: SysUser) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query: SysUser) {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data: SysUserRole) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'put',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data: { roleId: number, userIds: string[] }) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data: { roleId: number, userIds: string[] }) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'put',
    params: data
  })
}

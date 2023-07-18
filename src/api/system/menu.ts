import request from '@/utils/request'
import type { ResponseData } from '@/utils/request'

export type ListMenuQuery = {
  menuName?: string
  status?: string
}

export type Menu = {
  children?: Menu[]
  component?: string
  createBy?: string
  createTime?: string
  icon?: string
  isCache?: string
  isFrame?: string
  menuId: string
  menuName?: string
  menuType?: 'M' | 'C' | 'F'
  orderNum?: number
  params?: any
  parentId?: string
  parentName?: string
  path?: string
  perms?: string
  query?: any
  remark?: string
  searchValue?: any
  status?: string
  updateBy?: string
  updateTime?: string
  visible?: string
}

// 查询菜单列表
export function listMenu(query: ListMenuQuery) : Promise<ResponseData<Menu[]>> {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId: string | number) : Promise<ResponseData<Menu>> {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId: string | number) {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data: Menu) {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data: Menu) {
  return request({
    url: '/system/menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId: string) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'delete'
  })
}

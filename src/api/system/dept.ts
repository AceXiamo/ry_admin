import request from '@/utils/request'

export type SysDept = {
  deptId?: string
  parentId?: string
  ancestors?: string
  deptName?: string
  orderNum?: string
  leader?: string
  phone?: string
  email?: string
  status?: string
  delFlag?: string
  parentName?: string
  children?: SysDept[]
} & BaseEntity

// 查询部门列表
export function listDept(query: SysDept) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId: string) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId: string) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}

// 查询部门下拉树结构
export function treeselect(): Promise<ResponseData<SysDept[]>> {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId: number) {
  return request({
    url: '/system/dept/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data: SysDept) {
  return request({
    url: '/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data: SysDept) {
  return request({
    url: '/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId: string) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}

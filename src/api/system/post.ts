import request from '@/utils/request'

export type SysPost = {
  postId: number
  postCode: string
  postName: string
  postSort: string
  status: string
  flag: boolean
} & BaseEntity

// 查询岗位列表
export function listPost(query: SysPost): Promise<ResponsePageData<SysPost>> {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(postId: number): Promise<ResponseData<SysPost>> {
  return request({
    url: '/system/post/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data: SysPost) {
  return request({
    url: '/system/post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data: SysPost) {
  return request({
    url: '/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId: number) {
  return request({
    url: '/system/post/' + postId,
    method: 'delete'
  })
}

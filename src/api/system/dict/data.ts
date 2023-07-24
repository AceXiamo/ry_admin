import request from '@/utils/request'

export type SysDictData = {
  dictCode?: number
  dictSort?: number
  dictLabel?: string
  dictValue?: string
  dictType?: string
  cssClass?: string
  listClass?: string
  isDefault?: string
  status?: string
} & BaseEntity

// 查询字典数据列表
export function listData(query: SysDictData): Promise<ResponsePageData<SysDictData[]>> {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode: number): Promise<ResponseData<SysDictData>> {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType: string): Promise<ResponseData<SysDictData[]>> {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data: SysDictData) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data: SysDictData) {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode: number) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'delete'
  })
}

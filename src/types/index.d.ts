/**
 * @description: axios请求返回值
 * @param {number} code 状态码
 * @param {string} msg 返回信息
 * @return {ResponseData<T>} 返回值
 */
declare type ResponseData<T> = {
  code?: number;
  data?: T;
  msg?: string;
}

/**
 * @description: axios请求返回值
 * @param {number} code 状态码
 * @param {string} msg 返回信息
 * @param {number} total 总条数
 * @param {T} rows 返回数据
 * @return {ResponsePageData<T>} 返回值
 */
declare type ResponsePageData<T> = {
  code?: number;
  msg?: string;
  rows?: T;
  total?: number;
}

/**
 * @description: 基础实体类
 * @param {string} createBy 创建人
 * @param {string} createTime 创建时间
 * @param {string} updateBy 更新人
 * @param {string} updateTime 更新时间
 * @param {string} remark 备注
 */
declare type BaseEntity = {
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
}

/**
 * @description: element-plus TreeSelector组件数据类型
 * @param {string} value 值
 * @param {string} label 显示值
 * @param {TreeSelectorItem[]} children 子节点
 */
type TreeSelectorItem = {
  value?: string | number
  label?: string
  children?: TreeSelectorItem[]
}

import request from '@/utils/request'
import type { ResponseData } from '@/utils/request'
import type { RouteRecordRaw } from 'vue-router' 

export type Menu = {
  alwaysShow?: boolean;
  children?: Menu[];
  component?: string;
  hidden: boolean;
  meta: {
    icon: string;
    link: string;
    noCache: boolean;
    title: string;
  };
  name: string;
  path: string;
  redirect?: string;
  parentNode?: Menu[];
  router?: RouteRecordRaw;
}

export const getRouters = (): Promise<ResponseData<Menu[]>> => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}

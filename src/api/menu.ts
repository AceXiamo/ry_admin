import request from '@/utils/request'

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
  noClose?: boolean;
  redirect?: string;
  parentNode?: MenuParentNode[];
}

export type MenuParentNode = {
  name: string
  title: string
}

export const mainMenu = {
  name: 'Main',
  path: '/',
  meta: {
    title: '首页',
    icon: 'fas#home',
    noCache: false,
    link: '',
  },
  alwaysShow: false,
  hidden: false,
  noClose: true,
  parentNode: [],
}

export const getRouters = (): Promise<ResponseData<Menu[]>> => {
  return request({
    url: '/getRouters',
    method: 'get',
  })
}

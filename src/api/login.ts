import request from '@/utils/request'

export type LoginForm = {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export type LoginRes = {
  msg: string;
  code: number;
  token: string;
}

export type CodeImgRes = {
  captchaEnabled: boolean;
  code: number;
  img: string;
  msg: string;
  uuid: string;
}


// 登录方法
export function login(data: LoginForm): Promise<any> {
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg(): Promise<CodeImgRes> {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

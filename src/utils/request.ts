import axios from 'axios';
import { getToken, setToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: '/dev-api',
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config;
  }
);

service.interceptors.response.use(
  (response) => {
    const code = response.data.code || 200;

    if (response.config.headers.fullBack) {
      return response.data;
    }

    if (code === 401) {
      noPermissionHandle()
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }
    if (code === 500) {
      ElMessage.error(response.data.msg || '服务器内部错误，请联系管理员。')
      return Promise.reject('error')
    }
    return response.data;
  }
);

// 无权限处理
const noPermissionHandle = () => {
  // 清除token
  setToken('');
  ElMessage.error('无效的会话，或者会话已过期，请重新登录。')
}

export default service;

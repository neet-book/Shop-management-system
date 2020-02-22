import axios from 'axios'

export function request (url, config) {
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    // baseURL: 'http://106.12.11.162:8888/api/private/v1/',
    timeout: 5000
  })
  return instance(url, config)
}

// 带token的请求
export function requestAUZ (url, config) {
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    // baseURL: 'http://106.12.11.162:8888/api/private/v1/',
    timeout: 5000
  })
  // 拦截请求添加token
  instance.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })

  return instance(url, config)
}

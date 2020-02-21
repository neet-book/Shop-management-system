import axios from 'axios'

export function request (url, config) {
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 5000
  })

  return instance(url, config)
}

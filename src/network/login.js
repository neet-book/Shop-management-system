import { request } from './request'

export function login (params) {
  return request('login', {
    method: 'post',
    params
  })
}

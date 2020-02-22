import { requestAUZ } from './request'

// 请求需要权限的数据
export function getMenuList(config = {}) {
  return requestAUZ('/menus', config)
}

export function getUserList (params) {
  return requestAUZ('users', {
    params
  })
}

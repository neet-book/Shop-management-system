import { requestAUZ } from './request'

/**
 *  获取Home页数据
 */

// 获取菜单列表
export function getMenuList(config = {}) {
  return requestAUZ('/menus', config)
}

/**
 * 获取｜修改 User页数据
 */

// 获取用户列表
export function getUserList (params) {
  return requestAUZ('users', {
    params
  })
}

// 修改用户状态
export function changeUserState(id, type) {
  return requestAUZ(`users/${id}/state/${type}`, {
    method: 'put'
  })
}

// 添加用户
export function addNewUser (data) {
  return requestAUZ('users', {
    method: 'post',
    data
  })
}

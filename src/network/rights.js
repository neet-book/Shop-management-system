import { requestAUZ } from './request'

// 获取权限列表
export function getRightsList(type = 'list') {
  return requestAUZ(`rights/${type}`)
}

// 获取角色列表
export function getRolesList() {
  return requestAUZ('roles', {
    method: 'get'
  })
}

// 修改角色
export function editRole(data) {
  return requestAUZ(`roles/${data.id}`, {
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole(id) {
  return requestAUZ(`roles/${id}`, {
    method: 'delete'
  })
}

// 删除权限
export function deleteRight (roleID, rightID) {
  return requestAUZ(`roles/${roleID}/${rightID}`)
}

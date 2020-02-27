import { requestAUZ } from './request'

export function getRightsList(type = 'list') {
  return requestAUZ(`rights/${type}`)
}

export function getRolesList() {
  return requestAUZ('roles', {
    method: 'get'
  })
}

export function editRole(data) {
  return requestAUZ(`roles/${data.id}`, {
    method: 'put',
    data
  })
}

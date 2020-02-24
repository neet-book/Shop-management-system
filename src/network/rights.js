import { requestAUZ } from './request'

export function getRightsList (type = 'list') {
  return requestAUZ(`rights/${type}`)
}

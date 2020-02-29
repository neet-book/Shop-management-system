import { requestAUZ } from './request'

export function getCategroiesList (params) {
  return requestAUZ('categories', {
    method: 'get',
    params
  })
}

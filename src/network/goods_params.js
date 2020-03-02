import { requestAUZ } from './request'

export function getGoodsParams(id, type) {
  return requestAUZ(`categories/${id}/attributes`, {
    method: 'get',
    params: {
      sel: type
    }
  })
}

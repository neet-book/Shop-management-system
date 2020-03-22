import { requestAUZ } from './request'

export function getGoodsParams(id, type) {
  return requestAUZ(`categories/${id}/attributes`, {
    method: 'get',
    params: {
      sel: type
    }
  })
}

export function addNewParams (id, type, params) {
  return requestAUZ(`categories/${id}/attributes`, {
    method: 'post',
    data: {
      attr_name: params,
      attr_sel: type
    }
  })
}

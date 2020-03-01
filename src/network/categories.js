import { requestAUZ } from './request'

// 获取分类列表
export function getCategroiesList (params) {
  return requestAUZ('categories', {
    method: 'get',
    params
  })
}

// 添加新分类
export function addNewCate(data) {
  return requestAUZ('categories', {
    method: 'post',
    data
  })
}

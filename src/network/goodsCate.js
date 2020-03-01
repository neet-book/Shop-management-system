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

// 删除分类
export function deleteCate(id) {
  return requestAUZ(`categories/${id}`, {
    method: 'delete'
  })
}

// 编辑分类
export function editCate(id, name) {
  return requestAUZ(`categories/${id}`, {
    method: 'put',
    data: {
      cat_name: name
    }
  })
}

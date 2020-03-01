<template>
  <div class="godds-category">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
    <!-- 添加分类按钮 -->
    <div>
      <add-category-button :option-list="cateSelectList" @submit="addCate"></add-category-button>
    </div>
    <!-- 分类列表 -->
      <cate-list :cate-list="cateList"></cate-list>
    </el-card>
  </div>
</template>

<script>
import { getCategroiesList, addNewCate } from '@/network/categories'
import { UPDATE_CATE_LIST } from '@/store/mutation.type'

import CateList from './children/CateList'
import AddCategoryButton from './children/AddCategoryButton'

export default {
  name: 'GoodsCategory',
  components: {
    AddCategoryButton,
    CateList
  },
  created () {
    // 获取分类列表
    this.getCategoriesList()
  },
  computed: {
    // 分类列表
    cateList() {
      return this.$store.state.cateList
    },
    cateSelectList() {
      const optionList = []
      const cateList = this.$store.state.cateList
      // 添加创建一级标签选项
      optionList.push({
        cat_name: '创建一级分类',
        cat_id: 0,
        cat_level: -1
      })
      // 筛选一，二级分类
      function filteCate(list) {
        list.map(item => {
          if (item.cat_level !== 2) {
            optionList.push(item)
            // 如果是一级分类，并且有子级分类
            if (item.cat_level === 0 && item.children) {
              filteCate(item.children)
            }
          }
        })
      }

      filteCate(cateList)
      return optionList
    }
  },
  methods: {
    // 请求分类列表
    async getCategoriesList() {
      const { data: re } = await getCategroiesList()
      console.log(re)
      if (re.meta.status !== 200) return this.$message.error('re.meta.msg')
      this.$store.commit(UPDATE_CATE_LIST, re.data)
    },

    // 添加新分类
    async addCate(newCate) {
      const { data: re } = await addNewCate(newCate)
      console.log(re)
      if (re.meta.status !== 201) return this.$message.error(re.meta.msg)
      this.$message.success('添加成功！')
      // 刷新分类列表
      this.getCategoriesList()
    }
  }

}
</script>

<style scoped>

</style>

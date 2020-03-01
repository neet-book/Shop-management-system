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
      <add-category-button :option-list="selectOptions" @submit="addCate"></add-category-button>
    </div>
    <!-- 分类列表 -->
      <cate-list :cate-list="cateList" @delete-cate="deleteCate"></cate-list>
    </el-card>
  </div>
</template>

<script>
import { getCategroiesList, addNewCate, deleteCate } from '@/network/categories'
import { UPDATE_CATE_LIST } from '@/store/mutation.type'

import CateList from './children/CateList'
import AddCategoryButton from './children/AddCategoryButton'

export default {
  name: 'GoodsCategory',
  components: {
    AddCategoryButton,
    CateList
  },
  data() {
    return {
      selectOptions: []
    }
  },
  created () {
    // 获取分类列表
    this.getCategoriesList()
    this.getSelectOptions()
  },
  computed: {
    // 分类列表
    cateList() {
      return this.$store.state.cateList
    }
  },
  methods: {
    // 请求分类列表
    async getCategoriesList() {
      const { data: re } = await getCategroiesList()
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.$store.commit(UPDATE_CATE_LIST, re.data)
    },
    // 获取一级分类节点
    async getSelectOptions() {
      const { data: re } = await getCategroiesList({ type: 2 })
      if (re.meta.status !== 200) return console.log(re.meta.msg)
      this.selectOptions = re.data
    },
    // 添加新分类
    async addCate(newCate) {
      const { data: re } = await addNewCate(newCate)
      console.log(re)
      if (re.meta.status !== 201) return this.$message.error(re.meta.msg)
      this.$message.success('添加成功！')
      // 刷新分类列表
      this.getCategoriesList()
    },

    // 删除分类
    async deleteCate(cate) {
      const { data: re } = await deleteCate(cate.cat_id)
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.$message.success('删除成功')
      // 刷新分类列表
      this.getCategoriesList()
    }
  }

}
</script>

<style scoped>

</style>

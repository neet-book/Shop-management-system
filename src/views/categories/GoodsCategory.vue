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

    </div>
    <!-- 分类列表 -->
      <cate-list :cate-list="cateList"></cate-list>
    </el-card>
  </div>
</template>

<script>
import { getCategroiesList } from '@/network/categories'
import CateList from './children/CateList'

export default {
  name: 'GoodsCategory',
  components: {
    CateList
  },
  created () {
    this.getCategoriesList()
  },
  data() {
    return {
      // 分类列表
      cateList: []
    }
  },
  methods: {
    async getCategoriesList() {
      const { data: re } = await getCategroiesList()
      console.log(re)
      if (re.meta.status !== 200) return this.$message.error('re.meta.msg')
      this.cateList = re.data
    }
  }

}
</script>

<style scoped>

</style>

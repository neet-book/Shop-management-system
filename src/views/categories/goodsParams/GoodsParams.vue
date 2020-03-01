<template>
  <div class="goods-params">
  <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
  <!-- 卡片区域 -->
  <el-card>
    <!-- 提示 -->
    <el-alert
      title="注意：只允许为第三级分类设置相关参数"
      type="warning"
      show-icon>
    </el-alert>
    <!-- 商品类型选择器 -->
    <cate-select @select-change="chageCateID"></cate-select>
    <!-- 商品参数标签页 -->
    <params-tabs :cateId="currentID"></params-tabs>
  </el-card>
  </div>
</template>

<script>
import CateSelect from './CateSelect'
import ParamsTabs from './ParamsTabs'

import { UPDATE_CATE_LIST } from '@/store/mutation.type'
import { getCategroiesList } from '@/network/goodsCate'

export default {
  name: 'GoodsParams',
  components: { CateSelect, ParamsTabs },
  created () {
    // 获取分类列表
    this.getCategoriesList()
  },
  data() {
    return {
      currentID: 0
    }
  },
  methods: {
    // 获取商品分类列表
    async getCategoriesList() {
      const { data: re } = await getCategroiesList()
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.$store.commit(UPDATE_CATE_LIST, re.data)
    },
    // 修改显示的参数
    chageCateID(id) {
      this.currentID = id
    }
  }
}
</script>

<style scoped>

</style>

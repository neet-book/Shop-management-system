<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 表格区域 -->
      <right-list
        :list="rightsList"
        :titles="listTitles"
      ></right-list>
    </el-card>
  </div>
</template>

<script>
import RightList from '../../../components/content/tables/RightList'
import { getRightsList } from 'network/rights'

export default {
  name: 'Rights',
  data() {
    return {
      rightsList: [],

      // 配置
      listTitles: {
        authName: '权限名称',
        path: '路径',
        level: '权限等级'
      }
    }
  },
  created () {
    this.getRightsList()
  },
  components: {
    RightList
  },
  methods: {
    async getRightsList() {
      const { data: re } = await getRightsList()
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.rightsList = re.data
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <roles-list
        :table-head="titles"
        :table-data="rolesList"
      ></roles-list>
    </el-card>
  </div>
</template>

<script>
import RolesList from './RolesList/RolesList'
import { getRolesList } from 'network/rights'
export default {
  name: 'Roles',
  components: {
    RolesList
  },
  data() {
    return {
      titles: {
        roleName: '角色名称',
        roleDesc: '角色描述'
      },
      rolesList: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    // 获取角色列表
    async getRolesList() {
      const { data: re } = await getRolesList()
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.rolesList = re.data
    }
  }
}
</script>

<style scoped>

</style>

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
        @update-list="updateList"
      ></roles-list>
    </el-card>
  </div>
</template>

<script>
import RolesList from 'components/content/tables/rolesList/RolesList'

import { SET_RIGHTS_TREE } from '../../../store/mutation.type'
import { getRolesList, getRightsList } from 'network/rights'
export default {
  name: 'Roles',
  components: {
    RolesList
  },
  data() {
    return {
      // 表头
      titles: {
        roleName: '角色名称',
        roleDesc: '角色描述'
      },
      // 角色列表
      rolesList: []
    }
  },
  created () {
    this.getRolesList()
    this.getRightsList()
  },
  methods: {
    // 获取角色列表
    async getRolesList() {
      const { data: re } = await getRolesList()
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.rolesList = re.data
    },

    // 表格执行操作时更新表格
    updateList() {
      console.log(11)
      this.getRolesList()
    },
    // 获取所有权限列表
    async getRightsList() {
      const { data: re } = await getRightsList('tree')
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      // 将获取的权限数保存至状态管理
      this.$store.commit(SET_RIGHTS_TREE, re.data)
    }
  }
}
</script>

<style scoped>

</style>

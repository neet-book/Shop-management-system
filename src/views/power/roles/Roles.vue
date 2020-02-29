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
        :table-data="roleList"
        @update-list="updateList"
      ></roles-list>
    </el-card>
  </div>
</template>

<script>
import RolesList from 'components/content/tables/rolesList/RolesList'

import { UPDATE_RIGHTS_TREE, UPDATE_ROLE_LIST } from '@/store/mutation.type'
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
      }
    }
  },
  created () {
    this.getRolesList()
    this.getRightsList()
  },
  computed: {
    // 角色列表
    roleList() {
      return this.$store.state.rolesList
    }
  },
  methods: {
    // 获取角色列表
    async getRolesList() {
      const { data: re } = await getRolesList()
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      // 将获取的角色保存至状态管理
      this.$store.commit(UPDATE_ROLE_LIST, re.data)
    },

    // 表格执行操作时更新表格
    updateList() {
      this.getRolesList()
    },
    // 获取所有权限列表
    async getRightsList() {
      const { data: re } = await getRightsList('tree')
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      // 将获取的权限数保存至状态管理
      this.$store.commit(UPDATE_RIGHTS_TREE, re.data)
    }
  }
}
</script>

<style scoped>

</style>

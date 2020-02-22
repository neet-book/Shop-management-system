<template>
  <div id="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserList } from '@/network/home'

export default {
  name: 'Users',
  created () {
    this.getUserList()
  },
  data() {
    return {
      // 获取列表参数
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },

      // 数据
      userList: {}, // 列表
      total: 0
    }
  },
  methods: {
    // 请求用户列表
    async getUserList() {
      // 请求数据
      const { data: re } = await getUserList(this.queryInfo)

      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.userList = re.data
      this.total = re.data.total
    }
  }
}
</script>

<style scoped>

</style>

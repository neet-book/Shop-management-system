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
      <!-- 搜索与添加用户区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
            <!-- 搜索区域，清除搜索内容时更新表格 -->
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="4">
          <add-user-dialog @update-list="updateList"></add-user-dialog>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <table-list
        :tableHead="tableHead"
        :tableData="userList"
        @state-change="userStateChange"
        @update-list="updateList"
        class="table"
      ></table-list>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUserList, changeUserState } from '@/network/home'

import TableList from 'components/content/tableList/TableList'
import AddUserDialog from 'components/content/AddUserDialog'

export default {
  name: 'Users',
  created () {
    this.getUserList()
  },
  components: {
    AddUserDialog,
    TableList
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
      userList: [], // 列表项
      total: 0,
      page: 1,

      // 配置
      tableHead: {
        username: '账号',
        email: '邮箱',
        mobile: '电话',
        role_name: '类型',
        status: '状态',
        handle: '操作'
      }
    }
  },
  methods: {
    /**
     *  网络请求
     */
    // 请求用户列表
    async getUserList() {
      // 请求数据
      const { data: re } = await getUserList(this.queryInfo)

      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.userList = re.data.users
      this.page = re.data.pagenum
      this.total = re.data.total
    },

    /**
     *  功能
     */

    // 改变每页显示数据数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },

    // 改变页数
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },

    // 改变用户状态
    async userStateChange(userInfo) {
      console.log(userInfo)
      const { data: re } = await changeUserState(userInfo.id, userInfo.mg_state)

      // 修改失败，将状态修改回原来状态并发出提示
      if (re.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('用户状态更新失败')
      }

      // 修改成功
      this.$message.success('用户状态修改成功')
    },

    // 搜索
    searchUser() {
      this.getUserList()
    },

    // 表格执行操作时更新表格
    updateList() {
      this.getUserList()
    },
    /**
     * 事件监听
     */

    // 关闭对话框重置添加用户表单
    handleClose() {
      this.$refs.addUserForm.resetFields()
    }
  }
}
</script>

<style scoped>
  .table {
    margin-top: 10px;
  }
  .el-pagination {
    margin-top: 10px;
  }
</style>

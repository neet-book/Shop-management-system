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
      <table-list-test
        :tableHead="titles"
        :tableData="list"
      >
        <template v-slot:handle="{ item, itemKey }">
          <el-tag type="success">{{ item }} {{ itemKey }}</el-tag>
        </template>
      </table-list-test>
    </el-card>
  </div>
</template>

<script>
import TableListTest from 'components/content/tableList/TableListTest'
export default {
  name: 'Roles',
  components: {
    TableListTest
  },
  data() {
    return {
      titles: {
        name: '姓名',
        number: '学号',
        handle: '操作'
      },
      list: [{
        name: '姓名',
        number: '学号',
        handle: '操作'
      }]
    }
  }
}
</script>

<style scoped>

</style>

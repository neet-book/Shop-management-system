<template>
  <div class="roles-list">
    <el-table
      :data="tableData"
      border
      stripe
    >
      <!-- 序号 -->
      <el-table-column label="#" type="index"></el-table-column>
      <!-- 表头 -->
      <el-table-column
        v-for="(head, key) of tableHead"
        :label="head"
        :prop="key"
        :key="key"
      >
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'RolesList',
  props: {
    tableHead: { type: Object, default() { return {} } },
    tableData: { type: Array, default() { return [] } }
  },
  computed: {}
}
</script>

<style scoped>

</style>

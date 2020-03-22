<template>
  <div>
    <el-table :data="manyParams" border>
      <el-table-column type="expand" label=""></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="attr_name" label="参数名称"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ManyParamsTable',
  props: {
    manyParams: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
</style>

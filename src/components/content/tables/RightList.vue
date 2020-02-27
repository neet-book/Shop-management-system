<template>
  <el-table
    :data="list"
    border
    stripe
  >
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column
      v-for="(title, key, index) of titles"
      :key="index"
      :prop="key"
      :label="title"
    >
      <template v-slot:default="scope" v-if="key === 'level'">
        <el-tag type="success" v-if="scope.row.level === '0'">一级</el-tag>
        <el-tag type="warning" v-if="scope.row.level === '1'">二级</el-tag>
        <el-tag type="danger" v-if="scope.row.level === '2'">三级</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'RightList',
  props: {
    list: Array,
    titles: Object
  }
}
</script>

<style scoped>

</style>

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
    ></el-table-column>
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

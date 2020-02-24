<template>
  <el-table
    :data="list"
    border
    stripe
  >
    <el-table-column prop="" label=""></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'RightList',
  props: {
    list: Array
  }
}
</script>

<style scoped>

</style>

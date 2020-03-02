<template>
  <div class="only-params-table">
  <el-table :data="onlyParams">
    <el-table-column type="expand"></el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="attr_name" label="参数名称"></el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'OnlyParamsTables'
}
</script>

<style scoped>
</style>

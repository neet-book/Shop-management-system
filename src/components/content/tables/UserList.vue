<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      stripe
    >
      <!-- 序号 -->
      <el-table-column label="#" type="index"></el-table-column>
      <!-- 表头 -->
      <template v-for="(head, key) of tableHead">
        <el-table-column
          :label="head"
          :prop="key"
          v-if="key !== 'status' && key !== 'handle'"
          :key="key"
        ></el-table-column>
        <!-- 状态切换 -->
        <el-table-column label="状态" width="70px" v-else-if="key === 'status'" :key="key">
          <template v-slot:default="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="$emit('state-change', scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 修改 -->
        <el-table-column  label="操作" v-else-if="key === 'handle'" :key="key">
          <template v-slot:default="scope">
            <!-- 修改 -->
           <handle-button-sets :target="scope.row" @handle="$emit('update-list')"></handle-button-sets>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import HandleButtonSets from '../buttons/buttonSets/HandleButtonSets'
export default {
  name: 'TableList',
  components: { HandleButtonSets },
  props: {
    tableHead: { type: Object, default() { return {} } },
    tableData: { type: Array, default() { return [] } }
  },
  computed: {}
}
</script>

<style scoped>

</style>

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
        <el-table-column  label="操作" v-else-if="key === 'handle'" :key="key" width="200px">
          <template v-slot:default="scope">
            <!-- 修改按钮 -->
           <handle-button-sets :target="scope.row" @handle="$emit('update-list')"></handle-button-sets>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import HandleButtonSets from '../buttons/buttonSets/HandleButtonSets'

import { UPDATE_ROLE_LIST } from '@/store/mutation.type'
import { getRolesList } from '@/network/rights'

export default {
  name: 'TableList',
  components: { HandleButtonSets },
  created () {
    this.getRolesList()
  },
  data() {
    return {
      rolesList: []
    }
  },
  props: {
    // 表头
    tableHead: { type: Object, default() { return {} } },
    // 表格数据
    tableData: { type: Array, default() { return [] } }
  },
  methods: {
    // 请求角色列表
    async getRolesList() {
      const { data: re } = await getRolesList()

      if (re.meta.status !== 200) return console.log('角色列表获取失败: ' + re.meta.msg)
      this.$store.commit(UPDATE_ROLE_LIST, re.data)
    }
  }
}
</script>

<style scoped>

</style>

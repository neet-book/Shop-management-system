<template>
  <div class="roles-list">
    <el-table
      :data="tableData"
      border
      stripe
    >
      <!-- 展开 -->
      <el-table-column type="expand">
        <!-- 权限展示 -->
        <template v-slot:default="scope">
          <rights-expand :rights-tree="scope.row.children"></rights-expand>
        </template>
      </el-table-column>
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
      <el-table-column label="操作" width="300px">
        <template v-slot:default="scope">
          <!-- 操作按钮 -->
          <handle-button-sets :target="scope.row" @handled="$emit('update-list')"></handle-button-sets>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import RightsExpand from './RightsExpand'
import HandleButtonSets from 'components/content/tableList/buttons/handleButtonSets/HandleButtonSets'

export default {
  name: 'RolesList',
  components: {
    HandleButtonSets,
    RightsExpand
  },
  props: {
    tableHead: { type: Object, default() { return {} } },
    tableData: { type: Array, default() { return [] } }
  },
  methods: {
  }
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.top-border {
  border-top: #eee 1px solid;
}
.bm-border {
  border-bottom: #eee 1px solid;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>

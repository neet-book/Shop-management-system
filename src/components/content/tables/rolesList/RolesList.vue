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
          <rights-expand :role="scope.row" @tag-closs="updateList"></rights-expand>
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
      <el-table-column label="操作" width="330px">
        <template v-slot:default="scope">
          <!-- 操作按钮组 -->
          <handle-role-button-sets :role="scope.row" @click="updateList"></handle-role-button-sets>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import RightsExpand from './RightsExpand'
import HandleRoleButtonSets from 'components/content/buttons/buttonSets/HandleRoleButtonSets'

export default {
  name: 'RolesList',
  components: {
    HandleRoleButtonSets,
    RightsExpand
  },
  props: {
    tableHead: { type: Object, default() { return {} } },
    tableData: { type: Array, default() { return [] } }
  },
  methods: {
    updateList() {
      this.$emit('update-list')
    }
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

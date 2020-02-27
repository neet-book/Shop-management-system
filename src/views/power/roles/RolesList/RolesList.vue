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
          <rights-expand :role="scope.row"></rights-expand>
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
          <handle-button-sets
            :target="scope.row"
            @handled="$emit('update-list')"
            editTitle="修改"
            deleteTitle="删除"
            settingTitle="权限设置"
          >
            <template v-slot:edit-btn><edit-role-button :role-info="scope.row"></edit-role-button></template>
          </handle-button-sets>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import RightsExpand from './RightsExpand'
import EditRoleButton from 'components/content/tableList/buttons/EditRoleButton'
import HandleButtonSets from 'components/content/tableList/buttons/buttonSets/HandleButtonSets'

export default {
  name: 'RolesList',
  components: {
    HandleButtonSets,
    RightsExpand,
    EditRoleButton
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

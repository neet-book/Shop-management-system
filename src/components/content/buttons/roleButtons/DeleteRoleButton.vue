<template>
  <div class="delete-role-btn">
    <el-tooltip :content="title ? title : '删除'" placement="top" enterable>
      <el-button @click="deleteRole" icon="el-icon-delete" type="danger" size="mini">
        <span v-if="title">{{ title }}</span>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'DeleteRoleButton',
  props: {
    role: {
      type: Object,
      default() {
        return {}
      }
    },
    title: { type: String, default: '' }
  },
  methods: {
    deleteRole() {
      this.$confirm(`此操作将永久删除角色 ${this.role.roleName} ,是否继续？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 触发删除事件
          this.$emit('delete')
        })
        .catch(() => this.$message('操作已取消'))
    }
  }
}
</script>

<style scope>
.delete-role-btn {
  display: inline-block;
  padding: 0 5px;
}
</style>

<template>
<div class="edit-role-button">
  <!-- 设置按钮 -->
  <el-tooltip effect="dark" :content="title ? title : '编辑'" placement="top" enterable>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="dialogVisible = true">
      <span v-if="title">{{ title }}</span>
    </el-button>
  </el-tooltip>
  <!-- 对话框 -->
  <edit-role-dialog @submit="submitRoleInfo" :dialog-visible.sync="dialogVisible" :role-info="role"></edit-role-dialog>
</div>
</template>

<script>
import EditRoleDialog from 'components/content/dialogs/EditRoleDialog'
export default {
  name: 'EditRoleButton',
  components: { EditRoleDialog },
  data() {
    return {
      dialogVisible: false
    }
  },
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
    // 提交修改
    submitRoleInfo(roleInfo) {
      this.$emit('edit', roleInfo)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.edit-role-button {
  display: inline-block;
  margin: 10px;
}
</style>

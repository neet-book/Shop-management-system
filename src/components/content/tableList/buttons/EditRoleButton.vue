<template>
<div class="edit-role-button">
  <!-- 设置按钮 -->
  <el-button size="mini" type="primary" icon="el-icon-edit" @click="dialogVisible = true">修改</el-button>
  <!-- 对话框 -->
  <edit-role-dialog @submit="submitRoleInfo" :dialog-visible.sync="dialogVisible" :role-info="roleInfo"></edit-role-dialog>
</div>
</template>

<script>
import EditRoleDialog from 'components/content/dialogs/EditRoleDialog'
import { editRole } from '@/network/rights'
export default {
  name: 'EditRoleButton',
  components: { EditRoleDialog },
  data() {
    return {
      dialogVisible: false
    }
  },
  props: {
    roleInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    async submitRoleInfo(roleInfo) {
      const { data: re } = await editRole(roleInfo)
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.dialogVisible = false
      this.$message.success('修改成功')
    }
  }
}
</script>

<style scoped>

</style>

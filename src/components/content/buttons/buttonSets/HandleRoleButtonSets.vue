<template>
  <div class="role-button-sets">
    <!-- 修改按钮 -->
    <edit-role-button :role="role" @edit="editRole" title="修改角色"></edit-role-button>
    <!-- 删除按钮 -->
    <delete-role-button :role="role" @delete="deleteRole" title="删除角色"></delete-role-button>
    <!-- 设置按钮 -->
    <setting-right-button :role="role" @setting="SettingRight" title="设置权限"></setting-right-button>
  </div>
</template>

<script>
import EditRoleButton from '../roleButtons/EditRoleButton'
import DeleteRoleButton from '../roleButtons/DeleteRoleButton'
import SettingRightButton from '../roleButtons/SettingRightButton'
import { editRole, deleteRole, setRoleRight } from '@/network/rights'
export default {
  name: 'HandleRoleButtonSets',
  components: {
    SettingRightButton,
    EditRoleButton,
    DeleteRoleButton
  },
  props: {
    role: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 触发按键点击事件
    click() {
      this.$emit('click')
    },

    // 修改角色
    async editRole(roleInfo) {
      const { data: re } = await editRole(roleInfo)

      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.$message.success('修改成功')
      this.click()
    },

    // 删除角色
    async deleteRole() {
      const { data: re } = await deleteRole(this.role.id)

      if (re.meta.status !== 200) return this.$message(re.meta.msg)
      this.$message.success('删除成功')
      this.click()
    },

    // 设置角色权限
    async SettingRight(ridsStr) {
      // 提交修改请求
      const { data: re } = await setRoleRight(this.role.id, ridsStr)
      // 失败
      if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
      // 成功
      this.$message.success('权限修改成功')
      this.click()
    }
  }
}
</script>

<style scoped>
.edit-role-button {
  display: inline-block;
}
</style>

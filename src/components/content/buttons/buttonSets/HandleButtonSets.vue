<template>
  <div class="button-sets">
    <!-- 编辑 -->
    <slot name="edit-btn">
      <el-tooltip  effect="dark" :content="editTitle ? editTitle : '编辑'" placement="top" enterable>
        <edit-button :user-info="target" @submit-edit="editUser">
          <span v-if="editTitle">{{ editTitle }}</span>
        </edit-button>
      </el-tooltip>
    </slot>
    <!-- 删除 -->
    <slot name="delete-btn">
      <el-tooltip  effect="dark" :content="deleteTitle ? deleteTitle : '删除'" placement="top" enterable>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser">
          <span v-if="deleteTitle">{{ deleteTitle }}</span>
        </el-button>
      </el-tooltip>
    </slot>
    <!-- 设置 -->
    <slot name="setting-btn">
      <setting-user-button :user="target" @setting="changeUserRole"></setting-user-button>
    </slot>
  </div>
</template>

<script>
import EditButton from '../userButtons/EditUserButton'
import SettingUserButton from '../userButtons/SettingUserButton'

import { editUser, deleteUser, setUserRole } from 'network/home'

export default {
  name: 'HandleButtonSets',
  components: {
    SettingUserButton,
    EditButton
  },
  props: {
    target: {
      type: Object,
      default() {
        return {}
      }
    },
    editTitle: String,
    deleteTitle: String,
    settingTitle: String
  },
  methods: {
    // 修改用户
    async editUser(newUserInfo) {
      // 提交组件EditButton组件传递的数据
      const { data } = await editUser(newUserInfo)
      if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.$message.success('用户信息修改成功')
      // 刷新列表
      this.$emit('handled')
    },

    // 删除用户
    deleteUser() {
      this.$confirm(`此操作将永久删除 ${this.target.username} ，是否继续？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: re } = await deleteUser(this.target.id)
          console.log(re)
          if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
          this.$message.success('删除成功')
          // 刷新列表
          this.$emit('handled')
        })
        .catch(() => {
          this.$message.info('取消操作')
        })
    },

    // 设置用户角色
    async changeUserRole(ID) {
      const { data: re } = await setUserRole(...ID)
      console.log(re, ID)
      if (re.meta.status !== 200) return this.$message.error(re.meta.message)
      this.$message.success('设置成功')
      // 刷新列表
      this.$emit('handled')
    }
  }
}
</script>

<style scoped>
  .button-sets {
    display: inline-block;
  }
</style>

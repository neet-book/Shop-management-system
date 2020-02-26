<template>
  <div class="button-sets">
    <!-- 编辑用户 -->
    <edit-button :user-info="target" @submit-edit="editUser">编辑</edit-button>
    <!-- 删除用户 -->
    <el-tooltip  effect="dark" content="删除" placement="top-start" enterable>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="deleteUser">
        <slot name="delete">删除用户</slot>
      </el-button>
    </el-tooltip>
    <!-- 设置用户 -->
    <el-tooltip  effect="dark" content="设置权限" placement="top-start" enterable>
      <el-button type="warning" icon="el-icon-setting" size="mini" ><slot name="setting">权限设置</slot></el-button>
    </el-tooltip>
  </div>
</template>

<script>
import EditButton from '../EditButton'
import { editUser, deleteUser } from 'network/home'

export default {
  name: 'HandleButtonSets',
  components: {
    EditButton
  },
  props: {
    target: Object,
    default: {}
  },
  methods: {
    // 修改用户
    async editUser(newUserInfo) {
      // 提交组件EditButton组件传递的数据
      const { data } = await editUser(newUserInfo)
      if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.$message.success('用户信息修改成功')
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
          this.$emit('handled')
        })
        .catch(() => {
          this.$message.info('取消操作')
        })
    }
  }
}
</script>

<style scoped>

</style>

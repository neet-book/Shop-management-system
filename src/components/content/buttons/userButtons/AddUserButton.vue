<template>
  <div class="add-user-btn">
  <!-- 按钮区域 -->
    <el-tooltip content="添加用户" enterable placement="top">
      <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    </el-tooltip>
    <!-- 对话框区域 -->
    <add-user-dialog @submit="addNweUser" :dialog-visible.sync="dialogVisible"></add-user-dialog>
  </div>
</template>

<script>
import AddUserDialog from '../../dialogs/AddUserDialog'
import { addNewUser } from '../../../../network/home'
export default {
  name: 'AddUserButton',
  components: { AddUserDialog },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    async addNweUser(userInfo) {
      try {
        const { data } = await addNewUser(userInfo)
        if (data.meta.status !== 201) return this.$message.error(data.meta.msg)
        this.$message.success('添加成功')
        // 发出事件更新列表
        this.$emit('update-list')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.add-user-btn {
  display: inline-block;
  padding: 0 5px;
}
</style>

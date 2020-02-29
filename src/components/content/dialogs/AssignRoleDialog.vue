<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="设置用户角色"
    :before-close="closeDialog"
    width="50%"
  >
    <template>
      <!-- 用户信息 -->
      <p class="user">用户名：{{ user.username }}</p>
      <p class="user-role">当前角色：{{ user.role_name }}</p>
      <!-- 角色选项下拉框 -->
      <span class="select-lable">角色调整为：</span>
      <el-select v-model="roleID" placeholder="请选择" size="mini">
        <el-option
          v-for="item in rolesList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </template>
    <!-- 按钮区域 -->
    <template v-slot:footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'AssignRoleDialog',
  data() {
    return { roleID: '' }
  },
  props: {
    dialogVisible: { type: Boolean, default: false },
    user: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    rolesList() {
      return this.$store.state.rolesList
    }
  },
  methods: {
    // 关闭对话框
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    },

    // 提交
    submit() {
      this.$emit('submit', this.user.id, this.roleID)
    }
  }
}
</script>

<style scoped>
  .user {
    padding: 10px;
    color: black;
  }
  .user-role {
    padding: 10px;
    color: black;
  }
  .el-select {
    padding: 10px;
  }
  .select-lable {
    padding: 10px;
    color: black;
  }
</style>

<template>
  <div class="setting-user-btn">
    <!-- 按钮 -->
    <el-tooltip :content="title ? title : '设置'" enterable placement="top">
      <el-button
        icon="el-icon-setting"
        type="warning"
        size="mini"
        @click="dialogVisible = true" >
        <span v-if="title">{{ title }}</span>
      </el-button>
    </el-tooltip>
    <!-- 对话框 -->
    <assign-role-dialog :dialog-visible.sync="dialogVisible" @submit="setting" :user="user"></assign-role-dialog>
  </div>
</template>

<script>
import AssignRoleDialog from '../../dialogs/AssignRoleDialog'
export default {
  name: 'SettingUserButton',
  components: { AssignRoleDialog },
  data() {
    return { dialogVisible: false }
  },
  props: {
    title: { type: String, default: '' },
    user: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    setting(...ID) {
      this.$emit('setting', ID)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.setting-user-btn {
  display: inline-block;
  padding: 0 5px;
}
</style>

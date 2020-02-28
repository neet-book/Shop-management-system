<template>
  <div class="setting-right-btn">
    <!-- 设置按钮 -->
    <el-tooltip :content="title ? title : '设置'" placement="top">
      <el-button type="warning" icon="el-icon-setting" @click="dialogVisible = true" size="mini">
        <span v-if="title">{{ title }}</span>
      </el-button>
    </el-tooltip>
    <!-- 对话框 -->
    <setting-right-dialog :dialog-visible.sync="dialogVisible" :role="role" @submit="submitSetting"></setting-right-dialog>
  </div>
</template>

<script>
import SettingRightDialog from '../../dialogs/SettingRightDialog'
export default {
  name: 'SettingRightButton',
  components: { SettingRightDialog },
  data() {
    return {
      dialogVisible: false
    }
  },
  props: {
    title: { type: String, default: '' },
    role: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 触发事件，关闭对话框
    submitSetting(ridsStr) {
      this.$emit('setting', ridsStr)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
  .setting-right-btn {
    display: inline-block;
    padding: 0 5px;
  }
</style>

<template>
  <div class="handle-btn">
    <!-- 按钮 -->
    <el-tooltip :content="title ? title : '设置'" enterable placement="top">
      <el-button
        :icon="'el-icon-' + icon"
        :type="type"
        size="mini"
        @click="dialogVisible = true" >
        <span v-if="title">{{ title }}</span>
      </el-button>
    </el-tooltip>
    <!-- 对话框 -->
    <slot :visible="dialogVisible"></slot>
  </div>
</template>

<script>
export default {
  name: 'SettingButton',
  props: {
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    type: { type: String, default: '' }
  }
}
</script>

<style scoped>

</style>

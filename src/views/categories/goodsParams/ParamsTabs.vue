<template>
  <div class="params-tabs">
    <el-tabs v-model="currentTab" @tab-click="toggleTab">
      <!-- 动态参数标签页 -->
      <el-tab-pane label="用户管理" name="only">用户管理</el-tab-pane>
      <!-- 静态参数标签页 -->
      <el-tab-pane label="配置管理" name="many">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'ParamsTabs',
  data() {
    return {
      currentTab: 'only'
    }
  },
  props: {
    type: Number
  },
  methods: {
    toggleTab(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>

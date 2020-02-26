<template>
  <div class="expand-content">
    <el-row
      type="success"
      v-for="(roles1, index) of rightsTree"
      :key="roles1.id"
      :class="{ 'bm-border': true, 'top-border': index === 0 }"
      class="vcenter"
    >
      <!-- 渲染一级权限 -->
      <el-col :span="5">
        <el-tag closable>{{ roles1.authName }}</el-tag><i class="el-icon-caret-right"></i>
      </el-col>
      <!-- 渲染二级,三级权限 -->
      <el-col :span="19">
        <!-- 循环渲染二级权限 -->
        <el-row
          type="success"
          v-for="(roles2, indey) of roles1.children"
          :key="roles2.id"
          :class="{ 'top-border': indey !== 0}"
          class="vcenter"
        >
          <el-col :span="6">
            <el-tag type="warning" closable>{{ roles2.authName }}</el-tag><i class="el-icon-caret-right"></i>
          </el-col>
          <!-- 渲染三级权限 -->
          <el-col :span="18">
            <el-col>
              <el-tag
                type="danger"
                v-for="roles3 of roles2.children"
                :key="roles3.id"
                closable
              >{{ roles3.authName }}</el-tag>
            </el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RightsExpand',
  props: {
    rightsTree: Array,
    default() { return [] }
  }
}
</script>

<style scoped>
.expand-content {
  display: inline-block;
}
</style>

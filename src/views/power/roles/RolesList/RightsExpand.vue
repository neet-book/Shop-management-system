<template>
  <div class="expand-content">
    <el-row
      type="success"
      v-for="(rights1, index) of rightsTree"
      :key="rights1.id"
      :class="{ 'bm-border': true, 'top-border': index === 0 }"
      class="vcenter"
    >
      <!-- 渲染一级权限 -->
      <el-col :span="5">
        <el-tag closable>{{ rights1.authName }}</el-tag><i class="el-icon-caret-right"></i>
      </el-col>
      <!-- 渲染二级,三级权限 -->
      <el-col :span="19">
        <!-- 循环渲染二级权限 -->
        <el-row
          type="success"
          v-for="(rights2, indey) of rights1.children"
          :key="rights2.id"
          :class="{ 'top-border': indey !== 0}"
          class="vcenter"
        >
          <el-col :span="6">
            <el-tag type="warning" closable>{{ rights2.authName }}</el-tag><i class="el-icon-caret-right"></i>
          </el-col>
          <!-- 渲染三级权限 -->
          <el-col :span="18">
            <el-col>
              <el-tag
                type="danger"
                v-for="rights3 of rights2.children"
                :key="rights3.id"
                @close="closeTag(rights3)"
                closable
              >{{ rights3.authName }}</el-tag>
            </el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deletedRight } from '@/network/rights'
export default {
  name: 'RightsExpand',
  data() {
    return {
      rightsTree: this.role.children
    }
  },
  props: {
    role: Object,
    default() { return {} }
  },
  methods: {
    async closeTag(right) {
      const deletedRight = {
        roleId: this.role.id,
        rightId: right.id
      }
      // 删除权限
      const { data: re } = await deleteRight(deletedRight)
      
      if (data.meta.status !== 200) return this.$message.error(re.meta.msg)
      this.$message.sucess('删除成功')
      this.$emit('close-tag')
    }
  }
}
</script>

<style scoped>
.expand-content {
  display: inline-block;
}
</style>

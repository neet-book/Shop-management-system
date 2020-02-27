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
        <el-tag closable @close="closeTag(rights1)">{{ rights1.authName }}</el-tag><i class="el-icon-caret-right"></i>
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
            <el-tag type="warning" closable @close="closeTag(rights2)">{{ rights2.authName }}</el-tag><i class="el-icon-caret-right"></i>
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
import { deleteRight } from '@/network/rights'
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
    closeTag(right) {
      // 删除权限
      this.$confirm('是否删除该权限', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: re } = await deleteRight(this.role.id, right.id)
          if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
          this.$message.success('删除成功')
          // 刷新权限
          this.rightsTree = re.data
          this.$emit('tag-close')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>

<style scoped>
  .el-tag {
    margin: 7px;
  }
  .top-border {
    border-top: #eee 1px solid;
  }
  .bm-border {
    border-bottom: #eee 1px solid;
  }
  .vcenter {
    display: flex;
    align-items: center;
  }
</style>

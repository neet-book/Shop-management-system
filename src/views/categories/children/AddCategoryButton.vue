<template>
  <div>
    <el-button type="primary" size="small" @click="dialogVisible = true">添加分类</el-button>
  </div>
  <!-- 对话框 -->
  <el-dialog
    :visible.sync="dialogVisible"
    :close-delay="beforeClose"
    title="添加分类"
  >
    // 添加分类表单
    <template>
      <el-form>
        <el-form-item label="分类名称">
          <el-input v-modle="newCategoryu.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-select>
            <el-option></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddCategoryButton',
  data() {
    return {
      dialogVisible: false,
      newCategory: {
        name: '',
        parentCategory: ''
      }
    }
  },
  methods: {
    beforeClose() {}
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="edit-cate-btn">
    <!-- 按钮 -->
    <el-button icon="el-icon-edit" type="primary" size="mini" @click="dialogVisible = true">修改分类</el-button>
    <!-- 对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog"
    >
      <!-- 分类信息 -->
      <template>
        <p class="current-name">当前分类名称：{{ cate.cat_name }}</p>
        <el-form :model="editCate" :rules="cateValidateRules" ref="editFormRef" label-position="left">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="editCate.name" size="mini"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <!-- 对话框按钮 -->
      <template v-slot:footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditCateButton',
  data() {
    return {
      // 对话框状态
      dialogVisible: false,
      // 验证规则
      cateValidateRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 10, min: 1, message: '分类名称请勿超过10个字符', trigger: 'blur' }
        ]
      },
      // 新分类名
      editCate: { name: '' }
    }
  },
  props: {
    cate: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 关闭对话框
    closeDialog() {
      this.dialogVisible = false
      this.$refs.editFormRef.resetFields()
    },

    // 提交修改
    submit() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return this.$message.error('请输入正确的分类名')
        this.editCate.id = this.cate.cat_id
        this.$emit('submit', this.editCate)
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
.edit-cate-btn {
  display: inline-block;
  padding: 5px;
}
.current-name {
  color: black;
  font-size: 15px;
}
</style>

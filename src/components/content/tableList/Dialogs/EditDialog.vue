<template>
  <!-- 修改用户按钮 -->
  <el-tooltip effect="dark" content="修改" placement="top-start"  enterable >
    <!-- 修改按钮 -->
    <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogVisible = true"></el-button>
    <!-- 修改用户信息对话框 -->
    <el-dialog
      visible="dialogVisible"
      width="60%"
      before-close="handleClose"
      ref="editDialog"
    >
      <template>
        <el-form
          abel-width="90px"
          :model="userInfo"
        >
          <el-form-item label="用户名" prop="username" disabled>
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="修改邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="修改手机号码" prop="mobile">
            <el-input v-model="userInfo.mobile"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </template>
    </el-dialog>
  </el-tooltip>
</template>

<script>
import { userValidateMix } from '../../../../common/mixin'

export default {
  name: 'EditDialog',
  // 混入表单验证规则
  mixins: userValidateMix,
  data() {
    return {
      // 状态
      dialogVisible: false
    }
  },
  props: {
    user: Object
  },
  methods: {
    handleClose() {
      this.$refs.editDialog.resetFields()
      this.$emit('update:dialogVisible', false)
    },

    submitEdit() {
      this.$emit('submit-edit')
      this.$emit('updata:user')
    }
  }
}
</script>

<style scoped>

</style>

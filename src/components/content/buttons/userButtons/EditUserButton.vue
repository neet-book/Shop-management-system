<template>
  <div class="edit-button">
    <!-- 修改用户按钮 -->
      <!-- 修改按钮 -->
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogVisible = true">
        <slot></slot>
      </el-button>
    <!-- 修改用户信息对话框 -->
    <el-dialog
      :visible="dialogVisible"
      width="60%"
      :before-close="handleClose"
      ref="editDialog"
    >
      <template>
        <el-form
          abel-width="90px"
          :model="user"
          :rules="userValidateRules"
          ref="editForm"
        >
          <el-form-item label="用户名" disabled>
            <el-input v-model="user.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="修改邮箱" prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item label="修改手机号码" prop="mobile">
            <el-input v-model="user.mobile"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditButton',
  data() {
    // 验证邮箱
    const checkEmail = (rules, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) return callback()
      callback(new Error('请输入格式正确的邮箱'))
    }
    // 验证手机
    const checkMobile = (rules, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) return callback()
      callback(new Error('请输入正确的手机号'))
    }

    return {
      // 状态
      dialogVisible: false,
      // 数据
      user: this.userInfo,
      // 规则
      userValidateRules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    userInfo: Object
  },
  methods: {
    handleClose() {
      this.$refs.editForm.resetFields()
      this.dialogVisible = false
    },

    submitEdit() {
      this.$refs.editForm.validate(isValidate => {
        if (isValidate) {
          this.$emit('submit-edit', this.user)
          this.dialogVisible = false
          return
        }
        this.$message.error('请填写正确用户信息')
      })
    }
  }
}
</script>

<style scoped>
  .edit-button {
    display: inline-block;
    padding: 0 5px;
  }
</style>

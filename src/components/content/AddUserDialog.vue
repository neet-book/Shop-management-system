<template>
  <div class="add-user-dialog">
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <!-- 对话框主体 -->
      <el-form :model="newUserInfo" :rules="addUserRules" ref="addUserForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model.number="newUserInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框按钮 -->
      <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUserInfo">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddUserDialog',
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
      // 表单验证规则
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 10, min: 4, message: '用户名请在4-10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 15, min: 5, message: '请输入5-15位的密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },

      // 新增用户表单数据
      newUserInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      // 状态
      dialogVisible: false
    }
  },
  methods: {
    // 提交用户信息
    submitUserInfo() {
      this.$refs.addUserForm.validate((result) => {
        if (result) {
          this.$emit('add-user', this.newUserInfo)
          this.dialogVisible = false
        } else {
          this.$message.error('请正确输入用户信息')
        }
      })
    },

    // 重置表单
    handleClose() {
      this.$refs.addUserForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>

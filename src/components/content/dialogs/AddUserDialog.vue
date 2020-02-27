<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="setVisible">
    <!-- 对话框主体 -->
    <el-form :model="newUserInfo" :rules="userValidateRules" ref="addUserForm" label-width="80px">
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
    <template v-slot:footer>
        <el-button @click="setVisible">取 消</el-button>
        <el-button type="primary" @click="validateInfo">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { userValidateMix } from '../../../common/mixin'

export default {
  name: 'AddUserDialog',
  mixins: [userValidateMix],
  data() {
    return {
      // 新增用户表单数据
      newUserInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  props: { dialogVisible: { type: Boolean, default: false } },
  methods: {
    // 验证用户信息
    validateInfo () {
      this.$refs.addUserForm.validate((result) => {
        if (result) {
          // 验证成功
          this.submit()
          this.setVisible()
        } else {
          // 验证失败
          this.$message.error('请正确输入用户信息')
        }
      })
    },

    // 关闭对话框
    setVisible () {
      this.$refs.addUserForm.resetFields()
      this.$emit('update:dialogVisible', false)
    },

    // 提交新用户信息
    submit () {
      const userCopy = { ...this.newUserInfo }
      this.$emit('submit', userCopy)
      this.$refs.addUserForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>

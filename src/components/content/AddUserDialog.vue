<template>
  <div class="add-user-dialog">
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUserInfo">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { userValidateMix } from '../../common/mixin'
import { addNewUser } from '../../network/home'

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
          // 验证成功
          this.addUser(this.newUserInfo)
          this.dialogVisible = false
        } else {
          // 验证失败
          this.$message.error('请正确输入用户信息')
        }
      })
    },

    // 重置表单
    handleClose() {
      this.$refs.addUserForm.resetFields()
      this.dialogVisible = false
    },

    // 添加新用户
    async addUser(userInfo) {
      try {
        const { data } = await addNewUser(userInfo)
        console.log(data)
        if (data.meta.status !== 201) return this.$message.error(data.meta.msg)
        this.$message.success('添加成功')
        this.$refs.addUserForm.resetFields()

        // 发出事件更新列表
        this.$emit('update-list')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>

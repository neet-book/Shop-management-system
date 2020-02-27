<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="dialogTitle"
    :before-close="setVisible"
    width="50%"
  >
    <template>
      <!-- 角色信息修改 -->
      <el-form
        :model="roleInfo"
        label-width="70px"
        ref="roleForm"
      >
        <!-- 输入框区域 -->
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <!-- 按钮区域 -->
    <template v-slot:footer>
      <el-button @click="setVisible">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditRoleDialog',
  data() {
    return {
      // 角色信息
      role: {
        id: this.roleInfo.id,
        roleName: this.roleInfo.roleName,
        roleDesc: this.roleInfo.roleDesc
      },
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 7, message: '请输入2至7个字符', trigger: 'blur' }
        ],
        description: [{ require: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  props: {
    // 角色信息
    roleInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // 对话框标题
    dialogTitle: { type: String, default: '修改角色信息' },
    // 是否显示对话框
    dialogVisible: { type: Boolean, default: false }
  },
  methods: {
    setVisible() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleForm.resetFields()
    },
    submit() {
      // 验证提交的信息
      this.$refs.roleForm.validate(validated => {
        // 不符合
        if (!validated) return this.$message.error('请输入正确的角色信息')
        // 符合
        const roleCopy = { ...this.role }
        this.$emit('submit', roleCopy)
        this.$refs.roleForm.resetFields()
        console.log(this.roleInfo)
      })
    }
  }
}
</script>

<style scoped>

</style>

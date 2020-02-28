<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="closeDialog"
  >
    <!-- 权限树 -->
    <template>
      <el-tree
        :data="rightsTree"
        :props="treeProps"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultKeys"
        default-expand-all
        ref="tree"
      >
      </el-tree>
    </template>
    <template v-slot:footer>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>

export default {
  name: 'SettingRightDialog',
  props: {
    dialogVisible: { type: Boolean, default: false },
    role: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      treeProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  computed: {
    rightsTree() {
      return this.$store.state.rightsTree
    },
    defaultKeys() {
      const keys = []
      function getKey (role) {
        if (!role.children) {
          keys.push(role.id)
        } else {
          role.children.map(item => {
            getKey(item)
          })
        }
      }
      getKey(this.role)
      return keys
    }
  },
  methods: {
    // 关闭对话框
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    },
    // 提交权限修改
    async submit() {
      // 将所有选择节点，半选节点合并
      const rids = [
        ...this.$refs.tree.getHalfCheckedKeys(),
        ...this.$refs.tree.getCheckedKeys()
      ]
      const ridsStr = rids.join(',')
      // 发出提交事件
      this.$emit('submit', ridsStr)
    }
  }
}
</script>

<style scoped>
</style>

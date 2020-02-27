<template>
  <div class="button-sets">
    <!-- 编辑 -->
    <slot name="edit-btn">
      <el-tooltip  effect="dark" :content="editTitle ? editTitle : '编辑'" placement="top" enterable>
        <edit-button :user-info="target" @submit-edit="editUser">
          <span v-if="editTitle">{{ editTitle }}</span>
        </edit-button>
      </el-tooltip>
    </slot>
    <!-- 删除 -->
    <slot name="delete-btn">
      <el-tooltip  effect="dark" :content="deleteTitle ? deleteTitle : '删除'" placement="top" enterable>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser">
          <span v-if="deleteTitle">{{ deleteTitle }}</span>
        </el-button>
      </el-tooltip>
    </slot>
    <!-- 设置 -->
    <slot name="setting-btn">
      <el-tooltip  effect="dark" :content="settingTitle ? settingTitle : '设置'" placement="top" enterable>
        <el-button type="warning" icon="el-icon-setting" size="mini" >
          <span v-if="settingTitle">{{ settingTitle }}</span>
        </el-button>
      </el-tooltip>
    </slot>
  </div>
</template>

<script>
import EditButton from '../userButtons/EditUserButton'
import { editUser, deleteUser } from 'network/home'

export default {
  name: 'HandleButtonSets',
  components: {
    EditButton
  },
  props: {
    target: {
      type: Object,
      default() {
        return {}
      }
    },
    editTitle: String,
    deleteTitle: String,
    settingTitle: String
  },
  methods: {
    // 修改用户
    async editUser(newUserInfo) {
      // 提交组件EditButton组件传递的数据
      const { data } = await editUser(newUserInfo)
      if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.$message.success('用户信息修改成功')
      this.$emit('handled')
    },

    // 删除用户
    deleteUser() {
      this.$confirm(`此操作将永久删除 ${this.target.username} ，是否继续？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: re } = await deleteUser(this.target.id)
          console.log(re)
          if (re.meta.status !== 200) return this.$message.error(re.meta.msg)
          this.$message.success('删除成功')
          this.$emit('handled')
        })
        .catch(() => {
          this.$message.info('取消操作')
        })
    }
  }
}
</script>

<style scoped>
  .button-sets {
    display: inline-block;
  }
</style>

<template>
  <div class="delete-button">
    <!-- 使用提示 -->
    <template v-if="tip">
      <el-tooltip :content="buttonTip" placement="top" enterable>
        <el-button type="danger" :icon="hasIcon" :size="size" @click="showMessage">
          <span v-if="title">{{ title }}</span>
        </el-button>
      </el-tooltip>
    </template>
    <!-- 不使用提示 -->
    <template v-else>
        <el-button type="danger" :icon="hasIcon" :size="size" @click="showMessage">
          <span v-if="title">{{ title }}</span>
        </el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DeleteButton',
  props: {
    // 按钮标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示按钮提示
    tip: {
      type: [Boolean, String],
      default: false
    },
    // 是否显示Icon
    icon: {
      type: Boolean,
      default: true
    },
    // 提示框提示内容
    msg: {
      type: String,
      default: '此操作将永久删除该角色，是否继续？'
    },
    // 按钮大小
    size: {
      type: String,
      default: 'mini',
      validator(value) {
        return ['medium', 'small', 'mini'].includes(value)
      }
    }
  },
  computed: {
    // 是否有icon
    hasIcon() {
      if (this.icon) return 'el-icon-delete'
      return ''
    },
    // 按钮提示内容
    buttonTip() {
      // 传入布尔值显示默认提示
      if (this.tip === true) return '删除'
      // 传入字符串显示传入的提示内容
      if (typeof this.tip === 'string') return this.tip
      return ''
    }
  },
  methods: {
    // 显示提示
    showMessage() {
      // 弹出提示框
      this.$confirm(this.msg, '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 触发删除事件
          this.$emit('delete')
        })
        .catch(() => {
          // 提示取消删除，触发取消事件
          this.$message.info('取消删除')
          this.$emit('cancel')
        })
    }
  }
}
</script>

<style scoped>
.delete-button {
  display: inline-block;
  padding: 3px;
}
</style>

<template>
  <div class="add-goods-params-but">
    <el-button size="mini" :disabled="disabled" type="primary" @click="dialogVisible = true">
      {{ type === 'only' ? '添加商品参数' : '添加参数属性' }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'AddParamsButton',
  data() {
    return {
      dialogVisible: false
    }
  },
  props: {
    disabled: { type: Boolean, default: false },
    type: {
      validator(value) {
        return ['only', 'many'].includes(value)
      }
    },
    cateId: Number
  }
}
</script>

<style scoped>

</style>

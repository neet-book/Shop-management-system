<template>
  <div class="cate-select">
    <el-cascader
      :options="cateList"
      :props="optionProp"
      @change="changeId"
      v-model="currentId"
      clearable
      filterable
    ></el-cascader>
  </div>
</template>

<script>
import { VOID_SELECT } from '@/common/const'

export default {
  name: 'CateSelect',
  data() {
    return {
      // 选项的配置
      optionProp: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name'
      },
      currentId: [],
      preId: []
    }
  },
  computed: {
    // 获取分类列表
    cateList() {
      return this.$store.state.cateList
    }
  },
  methods: {
    // 触发选择分类事件
    changeId(keys) {
      // 选择的不是三级分类则还原选项
      if (keys?.length !== 3 && keys?.length !== VOID_SELECT) {
        this.currentId = this.preId
        console.log(this.currentId)
        this.$message.info('请选择三级分类')
        return
      }

      if (keys?.length === 3) {
        console.log(keys)
        // 保存之前的选项,用于还原选项
        this.preId = this.currentId
        this.currentId = keys
        this.$emit('select-change', keys[keys.length - 1])
      }
      // 当选项被清空时
      if (keys?.length === VOID_SELECT) {
        console.log(this.currentId)
        this.preId = []
        this.$emit('select-change', VOID_SELECT)
      }
    }
  }
}
</script>

<style scoped>
.cate-select {
  padding: 10px;
}
</style>

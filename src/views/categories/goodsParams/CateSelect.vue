<template>
  <div class="cate-select">
    <el-cascader
      :options="cateList"
      :props="optionProp"
      @change="changeId"
      v-model="cateId"
      clearable
      filterable
    ></el-cascader>
  </div>
</template>

<script>
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
      cateId: '',
      preSelect: ''
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
      console.log(keys)
      if (keys?.length !== 3 && keys?.length !== 0) {
        // 选择的不是三级分类则还原选项
        this.cateId = this.preSelect
        this.$message.info('请选择三级分类')
        return
      }

      if (keys !== undefined) {
        // 保存之前的选项
        this.preSelect = this.cateId[2]
        this.$emit('select-change', keys[2])
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

<template>
  <tree-table
    :data="cateList"
    :columns="columns"
    :selection-type="false"
    :expand-type="false"
    :show-index="true"
    :show-row-hover="false"
    index-title="#"
    border
  >
    <!-- 分类是否有效 -->
    <template #isOK="{ row }">
      <i class="el-icon-success" v-if="!row.cat_deleted" style="color: lightgreen"></i>
      <i class="el-icon-error" v-else style="color: red"></i>
    </template>
    <!-- 分类等级 -->
    <template #level="{ row }">
      <el-tag v-if="row.cat_level === 0" size="mini">一级</el-tag>
      <el-tag v-else-if="row.cat_level=== 1" type="success" size="mini">二级</el-tag>
      <el-tag v-else type="warning" size="mini">三级</el-tag>
    </template>
    <!-- 操作按钮 -->
    <template v-slot:handle="{ row }">
      <!-- 编辑按钮 -->
      <edit-cate-button @submit="$emit('edit-cate', $event)" :cate="row"></edit-cate-button>
      <!-- 删除按钮 -->
      <delete-button
        @delete="$emit('delete-cate', row)"
        title="删除分类"
        msg="此操作将永远删除该分类，是否继续？"
      ></delete-button>
    </template>
  </tree-table>
</template>

<script>
import DeleteButton from 'components/common/buttons/DeleteButton'
import EditCateButton from './EditCateButton'
export default {
  name: 'CateList',
  components: { DeleteButton, EditCateButton },
  data() {
    return {
      // 表格每列的配置
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          type: 'template',
          template: 'isOK'
        },
        {
          label: '分类等级',
          prop: 'cat_level',
          type: 'template',
          template: 'level'
        },
        {
          label: '操作',
          type: 'template',
          width: '250px',
          template: 'handle'
        }
      ]
    }
  },
  computed: {
    cateList() {
      return this.$store.state.cateList
    }
  }
}
</script>

<style scoped>

</style>

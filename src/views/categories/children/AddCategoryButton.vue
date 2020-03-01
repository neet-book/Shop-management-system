<template>
  <div class="add-cate-btn">
    <el-button type="primary" size="small" @click="dialogVisible = true">添加分类</el-button>
    <!-- 对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-delay="beforeClose"
      title="添加分类"
    >
      <!-- 添加分类表单 -->
      <template>
        <el-form
          size="small"
          label-position="left"
          label-width="100px"
          :model="newCate"
          :rules="cateValidate"
          ref="addCateFromRef"
        >
          <!-- 分类名称输入框 -->
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="newCate.cat_name" size="mini"></el-input>
          </el-form-item>
          <!-- 父级分类选择框 -->
          <el-form-item label="父级分类" prop="cat_pid">
            <el-cascader
              v-model="selectKeys"
              :options="optionList"
              :props="selectProps"
              @change="handleChange"
              clearable
              ref="cateSelectRef"
              ></el-cascader>
          </el-form-item>
        </el-form>

      </template>
      <!-- 按钮区域 -->
      <template v-slot:footer>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddCategoryButton',
  data() {
    return {
      dialogVisible: false,
      // 新分类
      newCate: {
        cat_pid: '',
        cat_name: '',
        cat_level: 0
      },
      // 验证规则
      cateValidate: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 10, min: 1, message: '分类名称请在10个字符内', trigger: 'blur' }
        ]
      },
      // 级连选择器配置
      selectProps: {
        expandTrigger: 'click',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name'
      },
      // 选中的父级分类
      selectKeys: []
    }
  },
  props: {
    optionList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    cateList() {
      return this.$store.state.cateList
    }
  },
  methods: {
    // 关闭对话框
    beforeClose() {
      this.dialogVisible = false
      this.$refs.addCateFromRef.resetFields()
      this.selectKeys = []
    },
    // 提交新分类
    submit() {
      this.$refs.addCateFromRef.validate(valid => {
        if (valid) {
          // 设置等级
          let level = this.selectKeys.length
          this.newCate.cat_level = level
          // 设置父类ID
          this.newCate.cat_pid = level === 0 ? 0 : this.selectKeys[level - 1]
          // 触发提交事件
          const cateCopy = { ...this.newCate }
          this.$emit('submit', cateCopy)
          this.beforeClose()
        } else {
          this.$message.error('请输入正确内容')
        }
      })
    },
    handleChange() {
      // 保存选中的父节点
      // console.log(value)
      console.log(this.selectKeys)
    }
  }
}
</script>

<style scoped>
.add-cate-btn {
  display: inline-block;
  padding: 10px 0px;
}
</style>

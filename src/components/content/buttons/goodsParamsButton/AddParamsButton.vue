<template>
  <div class="add-goods-params-but">
    <el-button size="mini" :disabled="disabled" type="primary" @click="dialogVisible = true">
      {{ '添加' + word }}
    </el-button>
    <el-dialog
      :title="'添加' + word"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="closeDialog"
    >
      <template>
        <el-form
          :model="type === 'only' ? goodsParams : attributeParams"
          :rules="validateRules"
          label-width="80px"
          size="small"
          ref="paramsFormRef"
        >
          <!-- 添加参数表单 -->
          <el-form-item :label="word" prop="params">
            <el-input v-model="goodsParams.params" v-if="type === 'only'"></el-input>
            <el-input v-model="attributeParams.params" v-else></el-input>
          </el-form-item>
        </el-form>
      </template>
      <!-- 按钮 -->
      <template v-slot:footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">添 加</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addNewParams } from 'network/goods_params'

export default {
  name: 'AddParamsButton',
  data() {
    return {
      dialogVisible: false,
      goodsParams: {
        params: ''
      },
      attributeParams: {
        params: ''
      },
      validateRules: {
        params: [{ required: true, message: '请输入参数', trigger: 'blur' }]
      }
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
  },
  computed: {
    word() {
      return this.type !== 'only' ? '商品参数' : '参数属性'
    }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
      this.$refs.paramsFormRef.resetFields()
    },
    submit() {
      let params = this.type === 'only' ? this.goodsParams.params : this.attributeParams.params
      // 验证
      this.$refs.paramsFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写有效参数')
        // 添加参数
        const { data: re } = await addNewParams(this.cateId, this.type, params)
        if (re.meta.status !== 201) return this.$message.error(re.meta.msg)
        this.$message.success(re.meta.msg)
        // 触发提交事件
        this.$emit('submit')
        this.closeDialog()
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="params-tabs">
    <el-tabs v-model="currentTab">
      <!-- 动态参数标签页 -->
      <el-tab-pane label="动态参数" name="many">
      <!-- 添加参数按钮 -->
      <!-- 动态参数列表 -->
      <many-params-table :many-params="manyParams"></many-params-table>
      </el-tab-pane>
      <!-- 静态参数标签页 -->
      <el-tab-pane label="静态属性" name="only">
      <!-- 添加参数按钮 -->
      <!-- 动态参数列表 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManyParamsTable from './ManyParamsTab/ManyParamsTable'
import { getGoodsParams } from '@/network/goods_params'
import { VOID_SELECT } from '@/common/const'

export default {
  name: 'ParamsTabs',
  components: {
    ManyParamsTable
  },
  data() {
    return {
      currentTab: 'many',
      onlyParams: [],
      manyParams: []
    }
  },
  props: {
    cateId: Number
  },
  computed: {
    isDisabled() {
      return !(this.cateId === VOID_SELECT)
    }
  },
  methods: {
    // 获取商品参数
    async getGoodsParams() {
      // 获取动态参数
      const { data: manyRe } = await getGoodsParams(this.cateId, 'many')
      if (manyRe.meta.status === 200) {
        this.manyParams = manyRe.data
      } else {
        console.log(manyRe.meta.msg)
      }

      // 获取静态属性
      const { data: onlyRe } = await getGoodsParams(this.cateId, 'only')
      if (onlyRe.meta.status === 200) {
        this.onlyParams = onlyRe.data
      } else {
        console.log(onlyRe.meta.msg)
      }
    },

    // 重置参数列表
    resetParamsList() {
      this.onlyParams = []
      this.manyParams = []
    }
  },
  watch: {
    cateId (id) {
      if (id !== VOID_SELECT) return this.getGoodsParams(id)
      // 选项为空，重置列表
      this.resetParamsList()
    }
  }
}
</script>

<style scoped>

</style>

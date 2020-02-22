<template>
  <div id="home">
    HomePage
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    // 退出登录
    logout() {
      // 清除token，返回登录页面
      window.sessionStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>

</style>

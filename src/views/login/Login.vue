<template>
  <div id="login">
    <div class="login-container">
      <!--  头像区域  -->
      <div class="avatar-box">
        <img src="~assets/logo.png">
      </div>
      <!--  登录表单区域  -->
      <el-form ref="loginFormRef"  class="login-form" :model="loginForm" :rules="loginFromRules">
        <!--  用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!--  密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            prop="password"
          ></el-input>
        </el-form-item>
        <!--  按钮区域  -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="resetForm">重制</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from 'network/login'
export default {
  name: 'Login',
  data () {
    return {
      // 登录表单数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '请输入正确的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      // 通过el-form组件的resetFields方法可以重置表单
      this.$refs.loginFromRef.resetFields()
    },

    // 表单提交预验证
    submitForm() {
      // 通过el-form组件的validate方法能够对表单进行验证
      // 该方法接收一个回调函数作为参数，并向回调函数传入两个参数
      // 第一个参数为布尔值，表示验证是否通过，第二个参数为对象，表示验证不通过对字段
      // 如果不传入回调函数则该方法返回一个Promise对象
      this.$refs.loginFormRef.validate(async (boolean, object) => {
        if (!boolean) return

        // 进行登录请求
        const { data: result } = await login(this.loginForm)
        // 登录失败
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg)

        // 登录成功
        this.$message.success('登录成功！')
        window.sessionStorage.setItem('token', result.data.token) // 存储用户token
        // 跳转home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped>
  #login {
    width: 100%;
    height: 100%;
    background: rgb(53, 86, 115);
  }
  .login-container {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .avatar-box {
    width: 130px;
    height: 130px;
    padding: 10px;

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    overflow: hidden;
  }

  .avatar-box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #eee;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login-form {
    position: absolute;
    top: 30%;

    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
</style>

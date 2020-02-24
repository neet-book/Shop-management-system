<template>
  <div id="home">
   <el-container class="home-container">
     <!-- 头部 -->
       <el-header>
         <div>电商后台管理系统</div>
         <el-button type="info" size="mini" @click="logout">退出</el-button>
       </el-header>
     <el-container>
       <!-- 侧边 -->
       <el-aside :width="isCollapsed ? '64px' : '150px'">
         <!-- 侧边折叠按钮 -->
         <div class="toggle-button" @click="toggleCollapse">|||</div>
         <!-- 侧边栏菜单区域 -->
         <el-menu
           text-color="#fff"
           background-color="#333744"
           active-text-color="#409eff"
           unique-opened
           :collapse="isCollapsed"
           :collapse-transition="false"
           :router="true"
         >
           <!-- 一级菜单 -->
           <el-submenu :index="index + ''" v-for="(menu, index) of menuList" :key="menu.id">
             <template v-slot:title>
               <!-- 图标 -->
               <i :class="iconsList[menu.id]"></i>
               <!-- 标题 -->
               <span>{{ menu.authName }}</span>
             </template>
               <!-- 二级菜单 -->
                 <el-menu-item :index="'/' + item.path" v-for="item of menu.children" :key="item.id">
                   <template v-slot:title>
                     <i class="el-icon-menu"></i>
                     <span>{{ item.authName }}</span>
                   </template>
                 </el-menu-item>
           </el-submenu>
         </el-menu>
       </el-aside>
       <!-- 主体 -->
       <el-main>
         <!-- 路由占位符 -->
         <router-view></router-view>
       </el-main>
     </el-container>
   </el-container>
  </div>
</template>

<script>
import { getMenuList } from 'network/home'
export default {
  name: 'Home',
  created () {
    this.getMenuList()
  },
  data() {
    return {
      // 菜单项列表
      menuList: null,
      iconsList: {
        125: 'el-icon-user',
        103: 'el-icon-lock',
        101: 'el-icon-shopping-bag-2',
        102: 'el-icon-document-remove',
        145: 'el-icon-data-analysis'
      },
      isCollapsed: false
    }
  },
  methods: {
    // 退出登录
    logout() {
      // 清除token，返回登录页面
      window.sessionStorage.removeItem('token')
      this.$router.replace('/login')
    },

    // 请求菜单列表
    async getMenuList() {
      const result = await getMenuList()
      this.menuList = result.data.data
    },

    // 折叠菜单
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style scoped>
  #home{
    height:  100%;
    width: 100%;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 2em;
    padding: 10px;
    background-color: #373D41;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
    padding: 10px;
  }

  .home-container {
    width: 100%;
    height: 100%;
  }
  .el-menu {
    border-right: none;
  }
  .toggle-button {
    padding: 3px;
    text-align: center;
    color: white;
    font-size: 10px;
    background-color: #4b5463;
    letter-spacing: 0.2em;
    /* 定义鼠标样式 */
    cursor: pointer;
  }
</style>

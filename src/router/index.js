import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const WelCome = () => import('views/home/children/welcome/WelCome')
const Users = () => import('views/users/Users')
const Rights = () => import('views/power/rights/Rights')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'welcome', component: WelCome },
      { path: '/users', name: 'users', component: Users },
      { path: '/rights', name: 'rights', component: Rights }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 定义导航守卫控制权限
router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  // 检查用户是否登录
  const tokenStr = window.sessionStorage.getItem('token')
  if (typeof tokenStr === 'undefined') next('/login')
  next()
})

export default router

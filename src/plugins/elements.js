import Vue from 'vue'
// 引入ElementUI
import {
  Button,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 引入message弹窗不需要通过use方法使用
Vue.prototype.$message = Message

import { createApp } from 'vue'
import App from './App.vue'

// 引入自定义css
import '@assets/base.css'

//引入element plus https://element-plus.org/zh-CN/guide/design.html
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入router https://router.vuejs.org/zh/guide/essentials/navigation.html
import router from './router'

//引入pinia https://pinia.vuejs.org/zh/core-concepts/
import {createPinia} from "pinia";

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')


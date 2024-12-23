import { createApp } from 'vue';
import App from './App.vue';

// 引入自定义css
import '@assets/base.css';
//引入iconfont(assets中)
import '@assets/iconfont.css';
//引入element plus https://element-plus.org/zh-CN/guide/design.html
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

//引入router https://router.vuejs.org/zh/guide/essentials/navigation.html
import router from './router';

//引入pinia https://pinia.vuejs.org/zh/core-concepts/
import { createPinia } from 'pinia';

// 引入Vue-Cropper@next 进行图片裁剪
import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(VueCropper);
app.mount('#app');

import App from './App.vue'
import { createApp } from 'vue'
import CONFIG from './config'
const app = createApp(App)

// 饿了么组件
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
app.use(ElementPlus, { locale })

// 全局面包屑组件
import Breadcrumb from './components/Layout/Breadcrumb'
app.component('Breadcrumb',Breadcrumb)

import 'bootstrap-icons/font/bootstrap-icons.css'   //  字体图标
import './assets/style/style.less'  // 全局样式

// 路由 
import { createRouter, createWebHistory, createWebHashHistory }from 'vue-router'
import routes from './router/index'
const router = createRouter({
    history: CONFIG.history == 'hash' ? createWebHashHistory() : createWebHistory(),
    routes: routes.data
})
app.use(router)

app.mount('#app')

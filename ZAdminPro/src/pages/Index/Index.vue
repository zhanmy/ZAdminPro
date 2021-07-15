<template>
    <div class="index">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <el-alert
                title="本项目默认使用Vue3的setup语法，也使用Vue2版本的语法。项目开发中可按需求两种写法共同使用"
                type="success">
            </el-alert>
            <h2>当前时间：{{nowTime}}</h2>
            <h3>
                Github地址：
                <a href="https://github.com/zhanmy/ZAdminPro" target="_blank">https://github.com/zhanmy/ZAdminPro</a>
            </h3>
            <h3>
                公共组件使用Element-plus(VUE3)，地址：
                <a href="https://element-plus.gitee.io/#/zh-CN" target="_blank">https://element-plus.gitee.io/#/zh-CN</a>
            </h3>
            <h3>
                路由使用vue-router@v4.x，地址：
                <a href="https://next.router.vuejs.org/zh/" target="_blank">https://next.router.vuejs.org/zh/</a>
            </h3>
            <h3>
                本项目使用图标库地址：
                <a href="https://icons.getbootstrap.com/" target="_blank">https://icons.getbootstrap.com/</a>
            </h3>
            <h3>
                图表使用Echarts，地址：
                <a href="https://echarts.apache.org/zh/index.html" target="_blank">https://echarts.apache.org/zh/index.html</a>
            </h3>
            <h3>
                地图使用天地图，地址：
                <a href="https://www.tianditu.gov.cn/" target="_blank">https://www.tianditu.gov.cn/</a>
            </h3>
            <h3>
                富文本编辑器Quill，地址：
                <a href="https://quilljs.com/docs/quickstart/" target="_blank">https://quilljs.com/docs/quickstart/</a>
            </h3>
            <h3>全局状态使用vue3自带的 provide/inject 方法，如需使用Vuex可自行引入</h3>
        </el-card>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { getTime } from '../../utils/date'
export default defineComponent({
    name: 'Index', // 页面路由名称 如果是缓存页面的话必填
    setup() {
        const nowTime = getTime()
        return { nowTime }
    },
})
</script>

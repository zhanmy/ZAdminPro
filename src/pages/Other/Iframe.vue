<template>
    <div class="index">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <iframe frameborder="0" width="100%" height="700px" src="https://element-plus.gitee.io/#/zh-CN"></iframe>
        </el-card>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'Iframe', // 页面路由名称 如果是缓存页面的话必填
    setup() {
        
    },
})
</script>

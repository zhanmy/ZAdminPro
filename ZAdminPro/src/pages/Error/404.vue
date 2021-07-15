<template>
    <div class="page404">
        <div class="info-text">
            <h1 style="font-size: 78px;font-weight: bold;margin-bottom:20px;">
                404
            </h1>
            <div style="margin-bottom: 30px; color: #808695; font-size: 20px;line-height: 28px">
                抱歉，你访问的页面不存在
            </div>
            <el-button @click="$router.back()" type="primary">返回</el-button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup() {
    },
})
</script>
<style lang="less" scopend>
.page404{
    position: relative;
    height: 100%;
    background: url('../../assets/images/404bg.svg') 10% 30%  no-repeat;
}
.info-text{
    position: absolute;
    top: 20%;
    left: 60%;
}
</style>
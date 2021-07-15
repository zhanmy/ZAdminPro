<template>
    <div class="page403">
        <div class="info-text">
            <h1 style="font-size: 78px;font-weight: bold;margin-bottom:20px;">
                403
            </h1>
            <div style="margin-bottom: 30px; color: #808695; font-size: 20px;line-height: 28px">
                抱歉，你无权访问该页面
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
.page403{
    position: relative;
    height: 100%;
    background: url('../../assets/images/403bg.svg') 10% 30%  no-repeat;
}
.info-text{
    position: absolute;
    top: 20%;
    left: 60%;
}
</style>
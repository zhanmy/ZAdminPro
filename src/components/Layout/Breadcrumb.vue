<template>
    <div class="breadcrumb-box" 
        :style="{ 'left': isCollapse ? '175px': menuwidth+110 + 'px' }">
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { inject } from 'vue'
export default defineComponent({
    setup() {
        let menuwidth = inject('menuwidth')
        let isCollapse = inject('isCollapse')
        return { menuwidth, isCollapse}
    },
})
</script>
<style lang="less" scoped>
.breadcrumb-box{
    position: fixed;
    top: 25px;
    transition: all .65s;
}
</style>
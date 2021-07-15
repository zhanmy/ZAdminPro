<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { provide, reactive } from 'vue'
export default defineComponent({
    setup() {
      // 全局状态
      const State = reactive({
        userid: '123'
      })
      provide('State', State)

      return { State }
    },
})
</script>

<style lang="less">
#app{
  height: 100%;
}
</style>

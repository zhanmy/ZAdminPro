<template>
    <div class="home">
        <div class="left-box" :style="{'width': isCollapse?'65px': menuwidth + 'px'}">
            <LeftNav :isCollapse="isCollapse"/>
        </div>
        <div class="right-box" :style="{'width': isCollapse?'calc( 100% - 65px )': 'calc( 100% - '+menuwidth+'px )'}">
            <div class="head-box">
                <HeadNav @collapse="collapse" :isCollapse="isCollapse" 
                @reload="reload" 
                @fullScreen="launchFullscreen" :isFullScreen="isFullScreen"
                @clearTabs="clearTabs"/>
            </div>
            <div class="con-child-box">
                <el-scrollbar height="100%" style="padding: 0 15px;">
                    <TabNav/>
                    <template v-if="isRouteLive">
                        <router-view v-slot="{ Component }" >
                            <keep-alive :include="getKeepAlive()">
                                <component :is="Component"/>
                            </keep-alive>
                        </router-view>
                        
                    </template>
                    <div class="foot-bz">Copyright © 詹小宇开发</div>
                </el-scrollbar>
            </div>
        </div>
        <div style="clear:both;"></div>
        <div class="progress-box">
            <el-progress :percentage="percentage" text-inside :show-text="false" :stroke-width="3"
            v-show="percentageShow"></el-progress>
        </div>
    </div>
</template>

<script>
import HeadNav from '../components/Layout/HeadNav.vue'
import LeftNav from '../components/Layout/LeftNav.vue'
import TabNav from '../components/Layout/TabNav.vue'

import { defineComponent } from '@vue/composition-api'
import {ref, nextTick, provide, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import routes from '../router/index'
export default defineComponent({
    components: {
        HeadNav, LeftNav, TabNav
    },
    setup() {
        // 菜单
        const menuwidth = 230       // 菜单宽度
        const isCollapse = ref( window.sessionStorage.getItem('isCollapse')==1?true:false )   // 收起菜单变量
        function collapse(){            // 菜单展开收起
            isCollapse.value = !isCollapse.value
            window.sessionStorage.setItem('isCollapse', isCollapse.value?1:0)   // 存储缓存
        }
        provide('menuwidth', menuwidth) 
        provide('isCollapse', isCollapse)
        // 菜单


        // 刷新页面
        const isRouteLive = ref(true)
        function reload(){
            if(percentageShow.value == true){
                return false
            }
            percentageShow.value = true
            percentage.value = 1
            isRouteLive.value = false
            nextTick(()=>{
                isRouteLive.value = true
                
                setTimeout(()=>{
                    percentage.value = 100
                    setTimeout(()=>{
                        percentageShow.value = false
                    },450)
                },100)
            })
        }
        // 刷新页面


        // 全屏
        const isFullScreen = ref(false)
        function fullScreen(){  //全屏
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
            if (rfs) {
                rfs.call(el);
            }
        }
        function exitScreen(){  //退出全屏
            var el = document;
            var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;
            if (cfs) {
                cfs.call(el);
            }
        }
        function launchFullscreen() {    // 切换全屏
            if(!isFullScreen.value){
                isFullScreen.value = true
                fullScreen()
            }else{
                isFullScreen.value = false
                exitScreen()
            }
        }
        window.onresize = ()=>{
            if(document.body.clientHeight<window.screen.height){
                isFullScreen.value = false
            }
        } 
        // 全屏

        // 页面路由鉴权 页面加载进度条
        const percentage = ref(0)
        const percentageShow = ref(false)
        const router = useRouter()
        const route = useRoute()

        // 获取用户菜单id列表，正常开发应当存储到数据库，此处从缓存中取，注意替换
        let defaultmenurole = []    // 页面权限
        if(window.sessionStorage.getItem('defaultmenurole')){
            defaultmenurole = JSON.parse(window.sessionStorage.getItem('defaultmenurole'))
        }// 获取用户菜单id列表，正常开发应当存储到数据库，此处从缓存中取，注意替换
        router.beforeEach((to)=>{
            percentageShow.value = true
            percentage.value = 10

            // 如果权限不包含此页面则转到403
            if( to.name != 'Login' || to.name != '403' ){
                if(defaultmenurole.length>0 && defaultmenurole.indexOf(to.name)<0){
                    return '/403'
                }
            }
        })
        onMounted(()=>{
            // 如果权限不包含此页面则转到403
            if( route.name != 'Login' || route.name != '403' ){
                if(defaultmenurole.length>0 && defaultmenurole.indexOf(route.name)<0){
                    router.replace('/403')
                }
            }
            
        })
        router.afterEach(()=>{
            percentage.value = 100
            setTimeout(()=>{
                percentageShow.value = false
            }, 700)
        })
        // 页面路由鉴权 页面加载进度条

        
        // 清空tabs
        function clearTabs(){
            // 默认首页tab
            let defatTab = routes.index
            window.sessionStorage.setItem('defatTab', JSON.stringify([defatTab]))
        }

        // 获取缓存页面
        function getKeepAlive(){
            let keepAliveList = []
            for(let item of routes.data){
                if(item.meta && item.meta.keepAlive){
                    keepAliveList.push( item.name )
                }
                if(item.children && item.children.length>0){
                    for(let item2 of item.children){
                        if(item2.meta.keepAlive){
                            keepAliveList.push( item2.name )
                        }
                    }
                }
            }
            return keepAliveList.join(',')  // 返回缓存页面 逗号拼接
        }

        return { 
            isCollapse, collapse, menuwidth, isRouteLive, reload, 
            isFullScreen, launchFullscreen, percentage, percentageShow,
            clearTabs, getKeepAlive
        }
    },
})
</script>
<style lang="less" scoped>
    .home{
        height: 100%;
    }
    .left-box{
        float: left;
        height: 100%;
        transition: all .65s;
    }
    .right-box{
        float: right;
        height: 100%;
        transition: all .65s;
    }
    .con-child-box{
        position: relative;
        height: calc( 100% - 65px );
        .foot-bz{
            text-align: center;
            font-size: 13px;
            padding: 10px 0;
            color: #ccc;
        }
    }
    .progress-box{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
    }

    // .transition-box{
    //     position: absolute;
    //     left: 0;
    //     top: 46px;
    //     width: 100%;
    //     >div{
    //         position: absolute;
    //         left: 0;
    //         top: 0;
    //         width: 100%;
    //         padding: 0 15px;
    //     }
        
    // }
    // .fade-enter-active,.fade-leave-active {
    //     transition: all .6s ease-in-out;
    // }
    // .fade-enter-from,.fade-leave-to {
    //     opacity: 0;
    //     transform: translateX(-30px);
    // }
</style>
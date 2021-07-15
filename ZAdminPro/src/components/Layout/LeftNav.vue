<template>
    <div class="left-nav">
        <div class="logo-box">
            <img src="../../assets/images/logo.png" alt="">
            <div  :style="{ 'width': isCollapse?'0px':'', 'opacity': isCollapse?'0':'1' }">ZAdmin Pro</div>
            <div style="clear:both;"></div>
        </div>
        <div style="height: calc( 100% - 65px );">
            <el-scrollbar height="100%">
                <el-menu 
                    :default-active="active"
                    @select="selectMenu"
                    background-color="#304156"
                    text-color="#fff"
                    active-text-color="#409eff"
                    :collapse="isCollapse">
                    <template v-for="(item1, index1) in menuList"   >
                        <!-- 二级菜单 -->
                        <el-submenu :index="item1.id ? item1.id : index1+''" v-if="item1.children && item1.children.length>0" :key="index1">
                            <template #title>
                                <i :class="item1.icon" v-if="item1.icon"></i>
                                <i v-else class="el-icon-setting"></i>
                                <span style="margin-left: 12px;">{{item1.title}}</span>
                            </template>
                            <template v-for="(item2, index2) in item1.children" >
                                <el-submenu v-if="item2.children && item2.children.length>0" :index="item2.id ? item2.id : index2+''" :key="index2">
                                    <template #title>
                                        <i :class="item2.icon" v-if="item2.icon"></i>
                                        <span style="margin-left: 12px;">{{item2.title}}</span>
                                    </template>
                                    <el-menu-item v-for="(item3, index3) in item2.children" :key="index3" :index="item3.id">
                                        <i :class="item3.icon" v-if="item3.icon"></i>
                                        <span style="margin-left: 12px;">{{item3.title}}</span>
                                    </el-menu-item>
                                </el-submenu>
                                <template v-else>
                                    <el-menu-item :index="item2.id" :key="index2">
                                        <i :class="item2.icon" v-if="item2.icon"></i>
                                        <span style="margin-left: 12px;">{{item2.title}}</span>
                                    </el-menu-item>
                                </template>
                            </template>
                        </el-submenu>
                        <!-- 一级菜单 -->
                        <template v-else>
                            <el-menu-item :index="item1.id ? item1.id : index1+'' "  :key="index1">
                                <i :class="item1.icon" v-if="item1.icon"></i>
                                <i v-else class="el-icon-setting"></i>
                                <template #title>
                                    <span style="margin-left: 12px;">{{item1.title}}</span>
                                </template>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </el-scrollbar>
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Menu from '../../router/menu.js'
import routes from '../../router/index'
export default defineComponent({
    props:{
        // 展开状态
        isCollapse: {
            default: false,
            type: Boolean
        }
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        // 导航跳转
        let menuList = [] // 菜单数据
        // 获取用户菜单id列表，正常开发应当存储到数据库，此处从缓存中取，注意替换
        let defaultmenurole = window.sessionStorage.getItem('defaultmenurole')
        // 获取用户菜单id列表，正常开发应当存储到数据库，此处从缓存中取，注意替换
        if(defaultmenurole){
            defaultmenurole = JSON.parse(defaultmenurole)

            // 不太擅长算法，这里写了两个循环筛选出有权限的菜单
            for(let item of Menu.data){
                if(item.id && defaultmenurole.indexOf(item.id)>=0){
                    // 
                    item.has = true
                }
                if(item.children){
                    for(let item2 of item.children){
                        if(item2.id && defaultmenurole.indexOf(item2.id)>=0){
                            item2.has = true
                            item.has = true
                        }
                        if(item2.children){
                            for(let item3 of item2.children){
                                if(item3.id && defaultmenurole.indexOf(item3.id)>=0){
                                    item3.has = true
                                    item2.has = true
                                    item.has = true
                                }
                            }
                        }
                    }
                }
            }
            for(let item of Menu.data){
                if(item.has){
                    let menuListItem = {icon: item.icon, id: item.id, title: item.title}
                    if(item.children){
                        menuListItem.children = []
                        for(let item2 of item.children){
                            if(item2.has){
                                let menuListItem2 = { id: item2.id, title: item2.title}
                                if(item2.children){
                                    menuListItem2.children = []
                                    for(let item3 of item2.children){
                                        if(item3.has){
                                            menuListItem2.children.push({ id: item3.id, title: item3.title })
                                        }
                                    }
                                }
                                menuListItem.children.push(menuListItem2)
                            }
                        }
                    }
                    menuList.push(menuListItem)
                }
            }
        }else{
            menuList = Menu.data
        }

        // 点击导航跳页
        function selectMenu(key){
            if(key){
                router.push('/'+key)
            }
        }   // 导航跳转

        

        
        // 当前选中菜单
        let defatActive = ''
        if(window.sessionStorage.getItem('defatActive')){
            defatActive = window.sessionStorage.getItem('defatActive')
        }else{
            defatActive = [routes.index.key] // 默认选中
        }

        const active = ref(defatActive)
        watch(() => route.meta, (meta) => {
            active.value = meta.key
            window.sessionStorage.setItem('defatActive', meta.key)
        })// 当前选中菜单

        return { selectMenu, menuList, active }
    },
})
</script>
<style lang="less">
    .left-nav{
        height: 100%;
        background: #304156;
        box-shadow: 6px 0px 6px rgba(102, 102, 102, 0.15);
        .el-menu{
            border-right: 0 none;
            
        }
        .logo-box{
            width: 100%;
            height: 65px;
            padding: 15px;
            overflow: hidden;
            border-bottom: 1px solid #2f3248;
            img{
                display: block;
                height: 100%;
                float: left;
            }
            div{
                float: left;
                line-height: 32px;
                margin-left: 10px;
                color: #fff;
                font-size: 16px;
                overflow: hidden;
                transition: all 0s .30s;
            }
        }
    }
</style>
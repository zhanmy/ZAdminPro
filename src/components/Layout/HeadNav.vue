<template>
    <div class="head-nav">
        <el-tooltip class="item" effect="dark" :content=" isCollapse?'展开菜单':'收起菜单' " placement="bottom">
            <div class="ctrl-btn" @click="$emit('collapse')">
                <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                <i class="el-icon-s-fold" v-else ></i>
            </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
            <div class="ctrl-btn" @click="$emit('reload')">
                <i class="el-icon-refresh-right"></i>
            </div>
        </el-tooltip>
        <div class="right-box">
            <el-dropdown trigger="click">
                <div class="user-btn">
                    超级管理员
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item divided @click="logout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div style="float:left;">
                <el-autocomplete
                    :input-style="{ 'border': '0 none', 'width': '200px' }"
                    v-model="searchVal"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="搜索..."
                    clearable
                    @select="handleSelect">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-autocomplete>
            </div>
            <el-tooltip class="item" effect="dark" :content=" isFullScreen?'退出全屏':'全屏' " placement="bottom">
                <div class="ctrl-box" @click="$emit('fullScreen')">
                    <i class="bi-fullscreen-exit" v-if="isFullScreen"></i>
                    <i class="bi-fullscreen" v-else></i>
                </div>
            </el-tooltip>
            <div class="ctrl-box">
                <i class="bi-bell"></i>
                <el-badge :value="3">
                    <div style="width:3px;"></div>
                </el-badge>
            </div>
        </div>
        <div style="clear:both;"></div>
    </div>
</template>

<script>
import Menu from '../../router/menu.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    props:{
        // 展开状态
        isCollapse: {
            default: false,
            type: Boolean
        },
        // 全屏
        isFullScreen:{
            default: false,
            type: Boolean
        }
    },
    setup(props, context) {
        // 搜索
        const searchVal = ref('');
        let menuList = []   // 有效菜单列表
        for(let item of Menu.data){
            if(item.children){
                for(let item2 of item.children){
                    menuList.push({ value: item2.title, id: item2.id })
                }
            }else{
                menuList.push({ value: item.title, id: item.id })
            }
        }
        // 搜索变化
        function querySearchAsync(queryString, callback){
            if(queryString == ''){
                callback([])
                return false
            }
            let resData = []
            for(let item of menuList){
                if(item.value.indexOf(queryString)>=0){
                    resData.push(item)
                }
            }
            callback(resData)
        }
        // 点击搜索结果
        const router = useRouter()
        function handleSelect(item){
            router.push('/' + item.id)
        }
        // 搜索


        // 退出登录
        function logout(){
            ElMessageBox.confirm('退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清理缓存数据
                // 
                // 清理缓存数据
                context.emit('clearTabs')
                router.push('/Login') // 跳到登录
            }).catch(() => {});
        }
        
        return {
            searchVal,
            querySearchAsync,
            handleSelect,
            logout
        };
    },
})
</script>
<style lang="less" scoped>
.head-nav{
    width: 100%;
    height: 65px;
    border-bottom: 1px solid #eee;
    background: #fff;
    box-shadow: 0 2px 6px rgba(102, 102, 102, 0.1);
    .ctrl-btn{
        float: left;
        height: 100%;
        line-height: 65px;
        padding: 0 15px;
        font-size: 20px;
        transition: all .1s;
        cursor: pointer;
        &:hover{
            background: #ecf5ff;
            color: #409eff;
        }
    }
    .right-box{
        float: right;
        height: 100%;
        line-height: 62px;
        padding: 0 15px;
        .user-btn{
            cursor: pointer;
            height: 65px;
            line-height: 65px;
            padding: 0 10px;
            &:hover{
                background: #ecf5ff;
                color: #409eff;
            }
        }
        .ctrl-box{
            position: relative;
            float: left;
            height: 66px;
            line-height: 65px;
            padding: 0 15px;
            font-size: 18px;
            transition: all .1s;
            cursor: pointer;
            margin-top: -1px;
            &:hover{
                background: #ecf5ff;
                color: #409eff;
            }
        }
    }
}
</style>
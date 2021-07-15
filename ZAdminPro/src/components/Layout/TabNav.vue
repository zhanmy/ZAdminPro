<template>
    <div class="tab-nav">
        <div class="tab-left-main">
            <el-scrollbar >
                <div class="tab-left-box" style="padding: 7px 0;">
                    <div class="tab-box" :class="{ active: item.active }" 
                        v-for="(item, index) in tabList" :key="index"
                        @click="gotab(item)">
                        {{item.name}} <i class="remove bi-x-circle-fill" v-if="index !=0 " @click.stop="removeTab(index)"></i>
                    </div>
                </div>
            </el-scrollbar> 
        </div>
        <div class="tab-right">
            <el-dropdown size="small" placement="bottom-end" trigger="click">
                <div class="trl-tab-btn">
                    <i class="bi-chevron-down"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="removeOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item @click="removeAll">关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div style="clear:both;"></div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useRoute, useRouter } from 'vue-router'
import { watch, ref, nextTick } from 'vue'
import routes from '../../router/index'
export default defineComponent({
    setup() {
        let defatTab = []   // 刷新页面载入历史tab
        if(window.sessionStorage.getItem('defatTab')){
            defatTab = JSON.parse(window.sessionStorage.getItem('defatTab'))
        }else{
            defatTab = [routes.index] // 默认tab
        }
        const tabList = ref(defatTab) // tab列表
        
        const route = useRoute()
        // 页面变化记录
        watch(() => route.meta, (meta) => {
            let path = route.path
            if(meta.tab){
                for(let item of tabList.value){
                    item.active = false
                }
                for(let item of tabList.value){
                    if(item.path == path){
                        item.active = true
                        saveTab(tabList.value)
                        return false
                    }
                }
                tabList.value.push({ name: meta.name, path: path, active: true })
                saveTab(tabList.value)
            }
        })
        // 储存tab标签
        function saveTab(defatTab){
            window.sessionStorage.setItem('defatTab', JSON.stringify(defatTab))
        }

        // 页面跳转
        const router = useRouter()
        function gotab({ path }){
            router.push(path)
        }

        // 关闭tab
        function removeTab(index){
            if(tabList.value[index].path != '/'+route.meta.key){
                tabList.value.splice(index, 1)
                saveTab(tabList.value)
            }else{
                tabList.value.splice(index, 1)
                saveTab(tabList.value)
                nextTick(()=>{
                    if(tabList.value[index] && tabList.value[index].path){
                        router.push(tabList.value[index].path)
                    }else{
                        router.push(routes.index.path)
                    }
                    saveTab(tabList.value)
                })
            }
        }

        // 关闭其他
        function removeOther(){
            let newtabList = []
            for(let item of tabList.value){
                if(item.path == '/'+route.meta.key || item.path == routes.index.path){
                    newtabList.push(item)
                }
            }
            tabList.value = newtabList
            saveTab(tabList.value)
        }
        // 关闭全部
        function removeAll(){
            tabList.value = [routes.index]
            router.push(routes.index.path)
            saveTab(tabList.value)
        }   
        return { tabList, gotab, removeTab, removeOther, removeAll }
    },
})
</script>
<style lang="less" scoped>
.tab-nav{
    width: 100%;
    .tab-left-main{
        float: left;
        width: calc( 100% - 40px );
        height: 100%;
    }
    .tab-right{
        float: right;
        width: 34px;
        height: 100%;
    }
    .tab-left-box{
        display: flex;
        flex-flow: row nowrap;
        align-content: normal;
        justify-content: normal;
        align-items: normal;
    }
    
    .tab-box{
        background: #fff;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        border-radius: 3px;
        margin-right: 7px;
        color: #808695;
        transition: all .2s;
        cursor: pointer;
        flex-shrink: 0;
        
        &:hover{
            color: #515a6e;
            box-shadow: 0 2px 6px rgba(102, 102, 102, 0.1);
            transform: translateY(-1px);
        }
        .remove{
            color: #ddd;
            transition: all .2s;
            &:hover{
                color: #515a6e;
            }
        }
        &.active{
            color: #2d8cf0;
        }
    }
    .trl-tab-btn{
        background: #fff;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        border-radius: 3px;
        color: #808695;
        transition: all .2s;
        cursor: pointer;
        margin: 7px 0;
        &:hover{
            color: #515a6e;
            box-shadow: 0 2px 6px rgba(102, 102, 102, 0.1);
        }
    }
}    
</style>
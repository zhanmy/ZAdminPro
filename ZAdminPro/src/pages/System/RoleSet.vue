<template>
    <div class="user-list">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>权限设置</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <el-form :model="form" :rules="rules" ref="formref"
                label-width="260px" style="width: 700px;">
                <el-form-item label="菜单权限" prop="menurole">
                    <el-tree
                        
                        node-key="id"
                        :default-checked-keys="form.menurole"
                        default-expand-all
                        :data="treedata" 
                        :props="defaultProps"
                        show-checkbox
                        @check="treecheck">
                    </el-tree>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="subFun" :loading="subLoading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import Menu from '../../router/menu.js'
import { ElMessage } from 'element-plus'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'RoleSet',  // 页面路由名称 如果是缓存页面的话必填
    setup() {
        // 表单
        const formref = ref(null)
        const subLoading = ref(false) 
        const form = reactive({
            menurole: [], // 菜单权限
        })
        const rules = {
            menurole: [
                { required: true, message: '请选择菜单权限', trigger: 'change' },
            ],
        }
        // 树节点默认字段
        const defaultProps = {
            children: 'children',
            label: 'title',
            key: 'id'
        }

        
        let treedata = Menu.data // 树数据
        // 循环判断是否禁选
        for(let item of treedata){
            if(!item.id){
                item.disabled = true
            }
            if(item.children && item.children.length>0){
                for(let item2 of item.children){
                    if(!item2.id){
                        item2.disabled = true
                    }
                    if(item2.children && item2.children.length>0){
                        for(let item3 of item2.children){
                            if(!item3.id){
                                item3.disabled = true
                            }
                        }
                    }
                }
            }
        }
        // 树选择
        function treecheck(data){   
            if(form.menurole.indexOf(data.id)<0){
                if(data.id){
                    form.menurole.push(data.id)
                }
            }else{
                form.menurole.splice(form.menurole.indexOf(data.id), 1)
            }
        }

        // 提交
        function subFun(){
            subLoading.value = true
            formref.value.validate((valid) => {
                if (valid) {
                    subLoading.value = false

                    // 存储到缓存， 正常开发应当存储到数据库，注意替换
                    window.sessionStorage.setItem('defaultmenurole', JSON.stringify(form.menurole))
                    // 存储到缓存， 正常开发应当存储到数据库，注意替换
                    ElMessage.success({message: '保存成功'})
                } else {
                    subLoading.value = false
                    return false
                }
            })
        }
        // 获取用户菜单id列表，正常开发应当存储到数据库，此处从缓存中取，注意替换
        if(window.sessionStorage.getItem('defaultmenurole')){
            form.menurole = ref( JSON.parse(window.sessionStorage.getItem('defaultmenurole')) )
        }
        // 获取用户菜单id列表，正常开发应当存储到数据库，此处从缓存中取，注意替换

        return {formref, subLoading, form, rules,treecheck, defaultProps, treedata, subFun}
    },
})
</script>

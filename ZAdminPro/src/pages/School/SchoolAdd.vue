<template>
    <div class="index">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>院校管理</el-breadcrumb-item>
                <el-breadcrumb-item>院校列表</el-breadcrumb-item>
                <el-breadcrumb-item>新增院校</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <el-form :model="form" :rules="rules" ref="formref"
                label-width="260px" style="width: 700px;">
                <el-form-item label="院校名称" prop="title">
                    <el-input v-model="form.title" placeholder="请输入院校名称" ></el-input>
                </el-form-item>
                <el-form-item label="院校类别"  prop="type">
                    <el-select v-model="form.type" placeholder="请选择院校类别" multiple style="width: 100%;">
                        <el-option label="211工程" value="1"></el-option>
                        <el-option label="985工程" value="2"></el-option>
                        <el-option label="双一流大学" value="3"></el-option>
                        <el-option label="公办本科" value="4"></el-option>
                        <el-option label="民办本科" value="5"></el-option>
                        <el-option label="专科" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在城市" >
                    <el-input v-model="form.city" placeholder="请输入所在城市"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="subFun" :loading="subLoading">保存</el-button>
                    <el-button @click="$router.back()">返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup() {
        const router = useRouter()
        // 表单
        const formref = ref(null)
        const subLoading = ref(false) 
        const form = reactive({
            title: '', // 名称
            type: [], // 院校类别
            city: '', // 城市
        })
        const rules = {
            title: [
                { required: true, message: '请输入院校名称', trigger: 'blur' },
            ],
            type: [
                { required: true, message: '请选择院校类别', trigger: 'change' },
            ]
        }
        // 表单提交
        function subFun(){
            subLoading.value = true
            formref.value.validate((valid) => {
                if (valid) {
                    setTimeout(()=>{
                        subLoading.value = false
                        ElMessage.success({message: '保存成功'})
                        router.back()
                    }, 300)
                } else {
                    subLoading.value = false
                    return false
                }
            })
        }

        return { formref, form, rules, subLoading, subFun }
    },
})
</script>

<template>
    <div class="school-list">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>院校管理</el-breadcrumb-item>
                <el-breadcrumb-item>院校列表</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <el-form label-width="80px" style="margin-bottom: -15px;"  size="small">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="院校名称">
                            <el-input v-model="tableparams.search_title" clearable size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="searchFun" size="small">搜索</el-button>
                        <el-button type="primary" @click="clearFun" size="small">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card" shadow="hover">
            <el-button @click="$router.push('/SchoolAdd')" type="primary">新增院校</el-button>
            <el-table :data="tableData" stripe style="width: 100%" v-loading="tableLoading">
                <el-table-column prop="title" label="院校名称"></el-table-column>
                <el-table-column prop="leibie" label="院校类别" width="400">
                    <template #default="scope">
                        <el-tag v-for="(item, index) in scope.row.leibie" :key="index" size="small">{{item.title}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="city" label="所在城市"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">操作</el-button>
                        <el-button type="text" size="small" @click="delFun(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align:right;padding: 10px 0;">
                <el-pagination
                    style="display:inline-block;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableparams.page"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// import { schoolList } from '../../api/school'
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
    name: 'SchoolList', // 页面路由名称 如果是缓存页面的话必填
    setup() {
        // 表格函数
        const tableparams = reactive({  // 表格查询参数
            search_title: '',
            page: 1,
            limit: 10
        })
        const tableData = ref([])       // 表格数据
        const total = ref(0)            // 表格总条数
        const tableLoading = ref(false) // 表格加载
        // 获取列表代码
        function getDataList(){
            tableLoading.value = true
            // // 请求接口
            // schoolList(tableparams).then(res=>{
            //     tableLoading.value = false
            //     tableData.value = res.data
            //     total.value = res.total
            // })
            setTimeout(()=>{
                tableLoading.value = false
                tableData.value = [
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' },
                    { title: '测试院校', leibie: [{ title: '211' }, { title: '985' }, { title: '公办' }], city: '北京' }
                ]
                total.value = 100
            }, 200)
            
        }
        getDataList()
        // 每页条数改变
        function handleSizeChange(a){
            tableparams.page = 1
            tableparams.limit = a
            getDataList()
        }
        // 翻页
        function handleCurrentChange(a){
            tableparams.page = a
            getDataList()
        }
        // 搜索函数
        function searchFun(){
            tableparams.page = 1
            getDataList()
        }
        // 重置搜索函数
        function clearFun(){
            tableparams.search_title = ''
        }
        // 表格函数

        // 操作函数
        function handleClick(row){  // 表格点击
            console.log(row)
        }
        // 删除函数
        function delFun(row){
            ElMessageBox.confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(row)
                ElMessage.success({
                    message: '删除成功'
                });
                getDataList()
            }).catch(() => {});
        }
        // 操作函数

        return { 
            tableData, tableparams,total,tableLoading, handleSizeChange, handleCurrentChange, searchFun, clearFun, 
            handleClick, delFun
        }
    },
})
</script>
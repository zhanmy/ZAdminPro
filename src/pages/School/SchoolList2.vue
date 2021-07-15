<template>
    <div class="school-list">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>院校管理</el-breadcrumb-item>
                <el-breadcrumb-item>院校列表（vue2写法）</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-alert
            title="此页面与院校列表功能一样，使用的是Vue2版本的语法写法，未使用Vue3的setup写法，请参考。项目开发中可按需求两种写法共同使用"
            type="error" style="margin-bottom: 10px;">
        </el-alert>
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
// import { schoolList } from '../../api/school'
export default {
    name: 'SchoolList2', // 页面路由名称 如果是缓存页面的话必填
    data(){
        return {
            // 表格查询参数
            tableparams: {
                search_title: '',
                page: 1,
                limit: 10
            },
            tableData: [],          // 表格数据
            total: 0,               // 表格总条数
            tableLoading: false,    // 表格加载
        }
    },
    created(){
        this.getDataList()
    },
    methods: {
        // 获取列表代码
        getDataList(){
            this.tableLoading = true
            // // 请求接口
            // schoolList(this.tableparams).then(res=>{
            //     this.tableLoading = false
            //     this.tableData = res.data
            //     this.total = res.total
            // })
            setTimeout(()=>{
                this.tableLoading = false
                this.tableData = [
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
                this.total = 100
            }, 200)
        },
        // 每页条数改变
        handleSizeChange(a){
            this.tableparams.page = 1
            this.tableparams.limit = a
            this.getDataList()
        },
        // 翻页
        handleCurrentChange(a){
            this.tableparams.page = a
            this.getDataList()
        },
        // 搜索函数
        searchFun(){
            this.tableparams.page = 1
            this.getDataList()
        },
        // 重置搜索函数
        clearFun(){
            this.tableparams.search_title = ''
        },
        // 表格点击
        handleClick(row){
            console.log(row)
        },
        // 删除函数
        delFun(row){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(row)
                this.$message.success({
                    message: '删除成功'
                });
                this.getDataList()
            }).catch(() => {});
        }
    }
}
</script>
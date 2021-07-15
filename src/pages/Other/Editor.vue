<template>
    <div class="index">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>其他功能</el-breadcrumb-item>
                <el-breadcrumb-item>文本编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <div id="editor" style="height: 600px;margin-bottom: 15px;"></div>
            <el-button @click="setcon" type="primary">设置内容</el-button>
            <el-button @click="getcon" type="primary">获取内容</el-button>
        </el-card>
    </div>
</template>

<script>
import * as Quill from 'quill'
// 引入核心样式和主题样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { onMounted } from 'vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup() {
        // 初始化编辑器
        let editor = null
        const options = {
            theme: 'snow',
            modules: {
            // 工具栏的具体配置
            toolbar:  [
                ['bold', 'italic', 'underline', 'strike', 'image'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],                                         // remove formatting button
            ],
            },
            placeholder: '请输入内容...'
        }
        // 初始化编辑器
        function initEditor(){
            editor = new Quill('#editor', options)
        }
        // 设置内容
        function setcon(){
            editor.root.innerHTML = ` <h1 class="ql-align-center"><u style="color: rgb(51, 51, 51);">啊啊啊</u></h1><h2><span style="color: rgb(51, 51, 51);">陈某某，男性，现居住在紫阳县汉王镇西河村二组，系广东东莞务工返紫人员。7月2日，陈某某持核酸检测阴性证明，乘坐南航CZ3215次航班于18时左右至咸阳机场，在机场乘坐顺风车到杨凌职业技术学院，入住学院附近的风情河宾馆，后约见同学；3日在学院附近活动；4日12时乘坐K8168次（5车厢039座）火车到咸阳火车站下车，转乘顺风车于22时左右返回紫阳县汉王镇。汉王镇按照新冠肺炎防控规范对其落实管控措施。8日、9日先后两次对其进行核酸检测，9日其检测结果判定呈阳性。</span></h2>`
        }
        // 获取内容
        function getcon(){
            const textvalue = editor.getText()  // 获取内容
            const texthtml = editor.root.innerHTML // 获取html
            console.log( textvalue, texthtml )
        }
        onMounted(()=>{
            initEditor()
        })
        return { setcon, getcon }
    },
})
</script>

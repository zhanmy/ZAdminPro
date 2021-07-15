<template>
    <div class="login">
        <div class="login-box">
            
            <div class="logo-box">
                <img src="../assets/images/logo.png" alt="">
                <div class="title">ZAdmin Pro</div>
                <div style="clear:both;"></div>
            </div>
            <div style="font-size: 14px;color: #808695;text-align:center;margin-bottom:40px;">Vue3 + Element-plus 企业级中台前端/设计解决方案</div>
            <el-form :model="ruleForm" :rules="rules" ref="formRef" label-width="0px">
                <el-form-item label="" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" clearable>
                        <template #prefix>
                            <i class="el-icon-user"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入密码" clearable>
                        <template #prefix>
                            <i class="bi-lock"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="yzm">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-input v-model="ruleForm.yzm" placeholder="验证码" clearable>
                                <template #prefix>
                                    <i class="bi-shield-lock"></i>
                                </template>
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-tooltip class="item" effect="dark" content="点击刷新二维码" placement="right">
                                <img class="yzm" src="../assets/images/getVerify.jpeg">
                            </el-tooltip>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div style="margin: 15px 0;">
                <div style="float:left">
                    <el-checkbox v-model="autologin">自动登录</el-checkbox>
                </div>
                <div style="float:right;">
                    <el-button type="text" style="margin-top:-10px">忘记密码</el-button>
                </div>
                <div style="clear:both;"></div>
            </div>
            <el-button type="primary" style="width: 100%;" :loading="subloading" @click="submitForm">登录</el-button>
        </div>

        <div class="foot-bz">Copyright © 詹小宇开发</div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { reactive , ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default defineComponent({
    setup() {
        const ruleForm = reactive({
            username: 'admin',
            pwd: 'admin123',
            yzm: 'fhi8',
        })
        const rules = reactive({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            yzm: [
                { required: true, message: '请输入验证码', trigger: 'blur' }
            ],
        })
        const autologin = ref(false)
        const subloading = ref(false)
        const formRef = ref(null)
        // 登录提交
        const router = useRouter()
        function submitForm(){  // 表单提交
            formRef.value.validate((valid) => {
                if (valid) {
                    subloading.value = true
                    // 登录函数 
                    // 这里存储全局状态 token等
                    setTimeout(()=>{
                        subloading.value = false
                        ElMessage.success({
                            message: '登录成功',
                            type: 'success'
                        });
                        window.sessionStorage.setItem('defatActive', 'Index')
                        router.replace('/Index')
                    }, 1000)
                    
                } else {
                    return false;
                }
            });
        }   
        return {ruleForm, rules, autologin, subloading, submitForm, formRef}
    },
})
</script>
<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background: url('../assets/images/login_bg.svg') center center no-repeat;
    .login-box{
        width: 385px;
        margin: 0 auto;
        padding: 90px 0;
        .logo-box{
            padding: 0 70px;
            margin-bottom: 20px ;
            img{
                display: block;
                width: 70px;
                float: left;
            }
            .title{
                float: left;
                font-size: 24px;
                color: #333;
                letter-spacing: 2px;
                line-height: 60px;
                margin-left: 10px;
            }
        }
        .yzm{
            width: 100%;
            height: 40px;
            border: 1px solid #DCDFE6;
            display: block;
            margin: 0;
            box-sizing: border-box;
            border-radius: 4px;
            cursor: pointer;
            transition:  all .2s;
            &:hover{
                border: 1px solid #c0c4cc;
            }
        }
    }
    .foot-bz{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 13px;
        padding: 30px 0;
        color: #808695;
    }
}
</style>
import axios from 'axios'
import CONFIG from '../config'
import { ElMessage } from 'element-plus'

// 创建示例
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
    baseURL: CONFIG.BASE_API,
    timeout: 1000
});

// 拦截器
service.interceptors.request.use(config => {
    const token = window.sessionStorage.getItem('token')
    if(token){
        config.headers['token'] = token
    }
    return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.code || 200;
    if (code === 401) {
        ElMessage({
            message: '登录状态已过期，请重新登录',
            type: 'error'
        })
        return Promise.reject(new Error('登录状态已过期，请重新登录'))
    } else if (code === 500) {
        ElMessage({
            message: '错误500',
            type: 'error'
        })
        return Promise.reject(new Error('错误500'))
    } else if (code != 200) {
        ElMessage({
            message: '错误请求',
            type: 'error'
        })
        return Promise.reject('error')
    } else {
        // 在这里可以把新的token存储进缓存
        // 在这里可以把新的token存储进缓存

        return res.data
    }
},error => {
    let { message } = error;
    if (message.includes("timeout")) {
        message = "系统接口请求超时";
    }else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({
        message: message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})


export default service
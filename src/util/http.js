import axios from 'axios'
import store from '../store/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router/index'
// if (token) {
//     axios.defaults.headers.Authorization = 'Bearer-' + token
//     axios.defaults.headers.token = token
// }
axios.defaults.timeout = 30 * 1000

axios.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token') || ''
    if (token) {
        config.headers.Authorization = 'Bearer-' + token
        config.headers.token = token
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(
    response => {
        const data = response.data
        // console.log(response)
        if (data.code !== 200) {
            ElMessage.error(data.msg)
        }
        if (data.code === 403) {
            ElMessageBox.alert(data.msg + '，正在前往登陆页面！', '提示', {
                callback: action => {
                    router.push('/login')
                    ElMessage('成功')
                }
            })
        }
        return response.data
    },
    error => {
        console.warn(error)
    }
)
export default axios
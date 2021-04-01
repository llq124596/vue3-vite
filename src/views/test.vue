<template>
    <div>
        <div style="font-size: 20px;text-align: center;">注册</div>
        <el-form>
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="regist">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import * as api from '@/api/request.js'
export default {
    setup() {
        const data = reactive({
            form: {
                username: '',
                password: ''
            }
        })
        function regist() {
            api.postReq('/api/api/registry', data.form).then(res => {
                cosnole.log(res)
            }).catch(err => {
                console.error(err)
            })
        }
        api.getReq('/api/api/books').then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
        return {
            ...toRefs(data),
            regist
        }
    }
}
</script>
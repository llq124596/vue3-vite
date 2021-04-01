<template>
    <div class="login_bg">
        <div class="login_box">
            <div style="padding: 30px">
                <div style="text-align: center;margin-bottom: 20px;font-size: 20px">登录</div>
                <el-input 
                    placeholder="请输入用户名" 
                    prefix-icon="el-icon-user"
                    clearable 
                    v-model="user.username" 
                    size="medium"
                ></el-input>
                <el-input 
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock" 
                    clearable
                    v-model="user.password"
                    type="password" 
                    show-password 
                    size="medium"
                    style="margin:40px 0 ;"    
                ></el-input>
                <el-button style="width: 100%" type="primary" size="medium" @click="login">登录</el-button>
                <div @click="dialogVisible = true">前往注册</div>
            </div>
        </div>
        <teleport to="#app">
            <el-dialog
                title="注册"
                v-model="dialogVisible"
                width="30%"
            >
                <div>
                    <el-input 
                        placeholder="请输入用户名" 
                        prefix-icon="el-icon-user"
                        clearable 
                        v-model="register.username" 
                        size="medium"
                    ></el-input>
                    <el-input 
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock" 
                        clearable
                        v-model="register.password"
                        type="password" 
                        show-password 
                        size="medium"
                        style="margin:40px 0 ;"    
                    ></el-input>
                </div>
                <el-input v-model="username">
                    <template #append>
                        <el-button icon="el-icon-search" @click="searchUser"></el-button>   
                    </template>
                </el-input>
                <template #footer>
                    <el-button type="primary" @click="registerUser">注册</el-button>
                </template>
            </el-dialog>
        </teleport>
    </div>
</template>
<script>
import { reactive, toRefs, watch, computed } from 'vue'
import * as api from '@/api/request'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const data = reactive({
            user: {
                username: '',
                password: ''
            },
            register: {
                username: '',
                password: ''
            },
            dialogVisible: false,
            username: ''
        })
        sessionStorage.clear()
        let storeValue = computed(() => store.getters)
        console.log(storeValue.value)
        if (storeValue.value.topNav.length > 0 || storeValue.value.nowUrl ) {
            window.location.reload()
        }
        watch( () => data.dialogVisible, (n, o) => {
            data.register.username = ''
            data.register.password = ''
            data.username = ''
        })
        function login() {
            api.postReq('/api/login', data.user).then(res => {
                if (res.code === 200) {
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('userInfo', res.data.userInfo)
                    store.commit('setNowUrl', '/home')
                    router.push('/home')
                }
                console.log(res)
            }).catch(err => {
                console.error(err)
            })
        }
        function registerUser() {
            if (data.register.username && data.register.password) {
                api.postReq('/api/registry', data.register).then(res => {
                    console.log(res)
                    data.dialogVisible = false
                }).catch(err => {
                    console.error(err)
                })
            }
        }
        function searchUser() {
            api.postReq('/api/queryUser', {username: data.username}).then(res=> {
                console.log(res)
            }).catch(err=> {
                console.error(err)
            })
        }
        return {
            ...toRefs(data),
            login,
            registerUser,
            searchUser
        }
    }
}
</script>

<style lang="scss" scoped>
.login_bg {
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient( #69D, #9fc);
    display: flex;
    justify-content: center;
    align-items: center;
}
.login_box {
    height: 300px;
    width: 450px;
    background: #fff;
    border-radius: 20px;
}
</style>
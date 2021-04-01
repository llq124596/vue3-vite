<template>
    <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="topInfo">
            <span @click="loginOut">登出</span>
        </div>
    </div>
    <div class="header-tabs" id="nav">
        <el-tag :type="nowUrl === '/home' ? '' : 'info'" :effect="nowUrl === '/home' ? 'dark':'light'" @click="goPage({completeUrl: '/home'})">首页</el-tag>
        <el-tag closable :type="nowUrl === tag.completeUrl ? '' : 'info'" :effect="nowUrl === tag.completeUrl ? 'dark': 'light'" v-for="(tag, index) in topNav" :key="index" @close="handleClose(index)" @click="goPage(tag)">{{tag.meta.title}}</el-tag>
    </div>
</template>
<script>
import { reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import * as api from '@/api/request'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const breadcrumbList = computed(() => {
            let store333 = store.getters.routeMatched.filter(item => item.meta !== {})
            if (store333.length > 1 && store333[1].name === 'home') {
                return []
            } else {
                return store333
            }
        })
        const topNav = computed(() => store.getters.topNav)
        const nowUrl = computed(() => store.getters.nowUrl)
        const urlIndex = computed(() => {
            return sessionStorage.getItem('nowUrl')
        })
        const data = reactive({
        })
        let documentObj = null
        onMounted(() => {
            // 鼠标滚轮左右移动
            setScroolFun()
        })
        onBeforeUnmount(() => {
            if (!documentObj) return
            documentObj.removeEventListener('DOMMouseScroll', handlerMouserScroll)
            documentObj.removeEventListener('mousewheel', handlerMouserScroll)
        })
        function setScroolFun() {
            documentObj = document.getElementById('nav')
            documentObj.addEventListener('DOMMouseScroll', handlerMouserScroll, false)
            documentObj.addEventListener('mousewheel', handlerMouserScroll, false)
        }
        function handlerMouserScroll(event) {
            let detail = event.wheelDelta || event.detail
            let moveForwardStep = -1
            let moveBackStep = 1
            let step = 0
            step = detail > 0 ? moveForwardStep * 100 : moveBackStep * 100
            documentObj.scrollLeft = documentObj.scrollLeft + step
        }
        function goPage(item) {
            store.commit('setNowUrl', item.completeUrl)
            router.push(item.completeUrl)
        }
        function handleClose(index) {
            if (store.getters.topNav[index].name === store.getters.nowUrl.split('/')[store.getters.nowUrl.split('/').length - 1]) {
                store.commit('setNowUrl', '/home')
                router.push('/home')
            }
            store.commit('removeOneTopNav', index)
        }
        function loginOut() {
            ElMessageBox.confirm('是否退出登陆？', ).then(() => {
                api.postReq('/api/loginOut' ).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        ElMessage.success('退出成功！')
                        // router.push('/login')
                    }
                }).catch(err => {
                    console.error(err)
                })
            }).catch(err => {
                ElMessage.warning('退出已取消！')
            })
        }
        return {
            ...toRefs(data),
            nowUrl,
            topNav,
            breadcrumbList,
            handleClose,
            goPage,
            loginOut
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.header-tabs {
    height: 30px;
    width: 100%;
    line-height: 30px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: hidden;
    >.el-tag {
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>
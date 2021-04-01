
<template>
    <div>
        <template v-for="item in testChild(data)" >
            <!-- <router-link class="routerLink" v-if="!item.meta" :to="(item.path ? (item.path + '/') : '') + item.children[0].path" :key="item.children[0].name"> -->
            <el-menu-item v-if="!item.meta" @click="goPage((item.path ? (item.path + '/') : '') + item.children[0].path, item)" :index="item.children[0].name || item.children[0].path" :key="item.children[0].name">
                <i :class="(item.children[0].meta && item.children[0].meta.icon) || 'el-icon-menu'"></i>
                <template #title>{{item.children[0].meta && item.children[0].meta.title}}</template>
            </el-menu-item>
            <!-- </router-link> -->
            <el-submenu v-else :index="item.name || item.path" :key="item.name">
                <template #title>
                    <i :class="item.meta && item.meta.icon"></i>
                    <span>{{ item.meta && item.meta.title}}</span>
                </template>
                <template v-for="child in testChild2(item.children)" >
                    <sidebar-item v-if="child.children && child.children.length > 0 && child.children.some(item => !item.hidden)" :data="[child]" :key="child.name" :url="item.path"></sidebar-item>
                    <!-- <router-link v-else class="routerLink" :to="(url ? (url + '/'): '') +(item.path ? (item.path + '/') : '')+ child.path" :key="child.name"> -->
                    <el-menu-item v-else :index="child.name || child.path" @click="goPage((url ? (url + '/'): '') +(item.path ? (item.path + '/') : '')+ child.path, child)" :key="child.name">
                        <i :class="child.meta && child.meta.icon"></i>
                        <template #title>{{child.meta && child.meta.title}}</template>
                    </el-menu-item>
                    <!-- </router-link> -->
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
import { defineComponent, computed, ref, defineProps, onBeforeUpdate, reactive } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
export default ({
    props: {
        data: {
            type: Array,
            default: []
        },
        first: {
            type: Boolean,
            default: true
        },
        url: {
            type: String,
            default: ''
        }
    },
    setup(prop, context) {
        const store = useStore()
        const router = useRouter()
        const topNav = computed(() => store.getters.topNav)
        const data = reactive({
            tagList: []
        })
        // onBeforeRouteUpdate((to, from) => {
        // })
        function testChild(list) {
            return list.filter(item => item.children && !item.hidden )
        }
        function testChild2(list) {
            return list.filter(item => !item.hidden)
        }
        function handleOpen(key, keyPath) {
        }
        function handleClose(key, keyPath) {
        }
        function goPage(url, item) {
            // if (url === '/home') {
            //     router.push(url)
            //     return
            // }
            // 判断topNav是否出现了重复的菜单
            if (url !== '/home' && !store.getters.topNav.find(obj => JSON.stringify(obj) === JSON.stringify(Object.assign(item.meta ? item : item.children[0], {completeUrl: url})))) {
                store.commit('setTopNav', [...store.getters.topNav, Object.assign(item.meta ? item : item.children[0], {completeUrl: url})])
            }
            store.commit('setNowUrl', url)
            // sessionStorage.setItem('nowUrl', url)
            router.push(url)
        }
        return {
            testChild,
            testChild2,
            goPage
        }
    }
})

</script>
<style lang="scss" scoped>

    .el-menu {
        border-right: none
    }
</style>
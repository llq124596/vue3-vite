<template>
    <el-aside width="200px">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
            :uniqueOpened="true"
            :default-active="activeMenu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <div class="aside-title">
                <span>hahaha</span>
            </div>
            <sidebar-item :data="allRouter"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>
<script setup>
import { allRouter } from '@/router'
import { computed, ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const activeMenu = computed(() => {
    console.log(store.getters.nowUrl.split('/')[store.getters.nowUrl.split('/').length - 1])
    return store.getters.nowUrl.split('/')[store.getters.nowUrl.split('/').length - 1]
})

// onBeforeRouteUpdate((to, from) => {
//     console.log(to, from)
// })
function testChild(list) {
    return list.filter(item => {
        return item.children && !item.hidden
    })
}
function testChild2(list) {
    return list.filter(item => {
        return !item.hidden
    })
}

</script>
<style lang="scss" scope>
    .el-menu {
        border-right: none !important;
    }
    .routerLink {
        text-decoration: none
    }
    .aside-title {
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 28px;
        letter-spacing: 3px;
    }
</style>
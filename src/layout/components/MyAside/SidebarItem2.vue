
<template>
    <div>
        <!-- <template v-for="item in testChild(data)" >
            <router-link class="routerLink" v-if="!item.meta" :to="(item.path ? (item.path + '/') : '') + item.children[0].path" :key="item.children[0].name">
                <el-menu-item :index="item.children[0].name || item.children[0].path">
                    <i :class="item.children[0].meta && item.children[0].meta.icon"></i>
                    <template #title>{{item.children[0].meta && item.children[0].meta.title}}</template>
                </el-menu-item>
            </router-link>
            <el-submenu v-else :index="item.name || item.path" :key="item.name">
                <template #title>
                    <i :class="item.meta && item.meta.icon"></i>
                    <span>{{ item.meta && item.meta.title}}</span>
                </template>
                <el-menu-item v-for="(child, index) in testChild2(item.children)" :key="index" :index="child.name || child.path">
                    <i :class="child.meta && child.meta.icon"></i>
                    <template #title>{{child.meta && child.meta.title}}</template>
                </el-menu-item>
                <sidebar-item :data="item.children" :first="false"></sidebar-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <template #title>导航四</template>
                </el-menu-item>
            </el-submenu>
        </template> -->
    </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue'

defineProps({
    data: {
        type: Array
    },
    first: {
        type: Boolean,
        defalut: true
    }
}) 
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
function handleOpen(key, keyPath) {
}
function handleClose(key, keyPath) {
}


</script>
// <script>
// import { defineComponent, computed, ref, defineProps } from 'vue'
// export default defineComponent ({
//     props: {
//         data: {
//             type: Array,
//             default: []
//         },
//         first: {
//             type: Boolean,
//             default: true
//         }
//     },
//     setup(prop, context) {
//         console.log(prop.data)
//         console.log(prop.first)
//         function testChild(list) {
//             if (prop.first) {
//                 return list.filter(item => item.children && !item.hidden)
//             } else {
//                 console.log(list)
//                 return list.filter(item => !item.hidden)
//             }
//         }
//         function testChild2(list) {
//             return list.filter(item => {
//                 return !item.hidden
//             })
//         }
//         function handleOpen(key, keyPath) {
//             console.log('open', key, keyPath)
//         }
//         function handleClose(key, keyPath) {
//             console.log('close', key, keyPath)
//         }
//         return {
//             testChild,
//             handleOpen,
//             handleClose
//         }
//     }
// })

// </script>
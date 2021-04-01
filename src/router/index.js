import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { initRouterInterceptor } from './initRouterInterceptor.js'
export const allRouter = [
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import('@/views/login/Main.vue')
    },
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/Main.vue'),
                meta: {
                    title: '首页',
                    icon: 'el-icon-s-home'
                }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        meta: {
            title: '用户管理',
            icon: 'el-icon-user'
        },
        redirect: '/user/homeData',
        children: [
            {
                path: 'homeData',
                name: 'home1',
                component: () => import('../views/home/Main.vue'),
                meta: {
                    title: '用户首页',
                    icon: 'el-icon-s-home'
                },
                children: [
                    {
                        path: 'userData',
                        name: 'userData',
                        component: () => import('../views/user/Main.vue'),
                        meta: {
                            title: '用户首页用户',
                            icon: 'el-icon-platform-eleme'
                        }
                    }
                ]
            },
            {
                path: 'userManage1',
                name: 'userManage1',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户1',
                    icon: 'el-icon-user'
                },
                children: [
                    {
                        path: 'userManageDetail',
                        name: 'userManageDetail',
                        hidden: true,
                        component: () => import('../views/user/Main.vue'),
                        meta: {
                            title: '用户详情', 
                            icon: 'el-icon-user'
                        }
                    },
                ]
            },
            {
                path: 'userManage2',
                name: 'userManage2',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户2',
                    icon: 'el-icon-user'
                }
            },
            {
                path: 'userManage3',
                name: 'userManage3',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户3',
                    icon: 'el-icon-user'
                }
            },
            {
                path: 'userManage4',
                name: 'userManage4',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户4',
                    icon: 'el-icon-user'
                }
            },
            {
                path: 'userManage5',
                name: 'userManage5',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户5',
                    icon: 'el-icon-user'
                }
            },
            {
                path: 'userManage6',
                name: 'userManage6',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户6',
                    icon: 'el-icon-user'
                }
            },
            {
                path: 'userManage7',
                name: 'userManage7',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户7',
                    icon: 'el-icon-user'
                }
            },
            {
                path: 'userManage8',
                name: 'userManage8',
                component: () => import('../views/user/Main.vue'),
                meta: {
                    title: '用户用户8',
                    icon: 'el-icon-user'
                }
            }
        ]
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '/test',
                name: 'test',
                component: () => import('../views/home/Main.vue'),
                meta: {
                    title: '测试',
                    icon: 'el-icon-s-home'
                }
            }
        ]
    },
    {
        path: '/:w+',
        redirect: '/404'
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: allRouter
})

initRouterInterceptor(router)
export default router

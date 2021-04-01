import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store/index.js'
// import { useStore } from 'vuex'


export function initRouterInterceptor (router) {
    router.beforeEach((to, from, next) => {
        if (store.getters.topNav.length === 0 && sessionStorage.getItem('topNav')) {
            store.commit('setTopNav', JSON.parse(sessionStorage.getItem('topNav')))
        }
        // store.commit('setNowUrl', to.path)
        if (store.getters.nowUrl === '' && sessionStorage.getItem('nowUrl')) {
            store.commit('setNowUrl', JSON.parse(sessionStorage.getItem('nowUrl')))
        }
        if (store.getters.token === '' && sessionStorage.getItem('token')) {
            store.commit('setToken', sessionStorage.getItem('token'))
        }
        NProgress.start()
        next()
    })

    router.afterEach((to, from) => {
        // console.log('全局后置钩子', to, from)
        // let store = useStore()
        store.commit('setRouteMatched', to.matched)
        NProgress.done()
    })
}
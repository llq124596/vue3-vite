import { createStore } from 'vuex'

export default createStore({
    state: {
        token: '',
        menuItem: {},
        routeMatched: [],
        topNav: [],
        nowUrl: ''
    },
    getters: {
        routeMatched: (state) => state.routeMatched,
        topNav: (state) => state.topNav,
        nowUrl: (state) => state.nowUrl,
        token: (state) => state.token 
    },
    mutations: {
        reloadState (state) { 
            state = {
                token: '',
                menuItem: {},
                routeMatched: [],
                topNav: [],
                nowUrl: ''
            }
        },
        setToken (state, value) {
            state.token = value
            sessionStorage.setItem('token', value)
        },
        setMenuItem (state, value) {
            state.menuItem = value
        },
        setTopNav (state, value) {
            sessionStorage.setItem('topNav', JSON.stringify(value))
            state.topNav = value
        },
        setRouteMatched (state, value) {
            state.routeMatched = value
        },
        removeOneTopNav (state, index) {
            state.topNav.splice(index, 1)
            sessionStorage.setItem('topNav', JSON.stringify(state.topNav))
        },
        setNowUrl (state, value) {
            state.nowUrl = value
            sessionStorage.setItem('nowUrl', JSON.stringify(value))
        }
    }
})
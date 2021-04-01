<template>
    <div style=" text-align: center;font-size: 40px">
        <div>404</div>
        <div @click="goHome" style="color: skyblue;cursor:pointer">返回首页</div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        function goHome() {
            store.commit('setNowUrl', '/home')
            router.push('/home')
        }
        return {
            goHome
        }
    }
}
</script>

<style>

</style>
<template>
    <div @click="goPage">这个是用户页面</div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        function goPage() {
            router.push('/user/userManage1/userManageDetail')
        }
        return {
            goPage
        }
    }
}
</script>

<style>

</style>
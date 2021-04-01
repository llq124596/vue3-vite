import * as api from '@/api/request'
import router from '@/router/index'

export function loginOut () {
    return api.postReq('/api/loginOut').then(res => {
        if (code === 200) {
            router.push('/login')
        }
    })

}
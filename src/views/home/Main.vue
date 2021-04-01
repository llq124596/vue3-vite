<template>
<div>
    <div>哈哈哈</div>
    <div @click="goUser()">这个是首页</div>
    <el-upload
        action='/api/api/upload'
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
    >
        <el-button size="small" type="primary">上传文件</el-button>
    </el-upload>
    <div style="margin-top: 20px">
        <el-input v-model="username">
            <template #append>
                <el-button icon="el-icon-search" @click="searchUser"></el-button>   
            </template>
        </el-input>
    </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as api from '@/api/request'
import { reactive, toRefs} from 'vue'
export default {
    setup() {
        const router = useRouter()
        const data = reactive({
            fileList: [],
            username: ''
        })

        function handleRemove(file, fileList) {
            console.log('remove')
            console.log(file, fileList)
        }
        function handlePreview(file) {
            console.log('preview')
            console.log(file)
        }
        function handleExceed(files, fileList) {
            ElMessage.warning(`当前限制选择3个文件，本次选择了${files.length}个文件，共选择了${files.length + fileList.length}个文件`)
        }
        function beforeRemove(file, fileList) {
            ElMessageBox.confirm('此操作会删除该文件，是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ElMessage.success('删除成功')
            }).catch(() => {
                ElMessage('删除已取消')
            })
        }
        function goUser() {
        }
        function searchUser() {
            api.postReq('/api/api/queryUser', {username: data.username}).then(res=> {
                console.log(res)
            }).catch(err=> {
                console.error(err)
            })
        }
        return {
            ...toRefs(data),
            goUser,
            handleRemove,
            handlePreview,
            handleExceed,
            beforeRemove,
            searchUser
        }
    }
}
const router = useRouter()
function goUser() {
}
</script>

<style>
</style>
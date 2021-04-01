<template>
    <div class="common-layout">
        <el-container>
            <my-aside width="200px"></my-aside>
            <el-container>
              <el-header height="70">
                <my-header>
                </my-header>
              </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import MyAside from './components/MyAside/index.vue'
import MyHeader from './components/MyHeader/index.vue'
components: {
    MyAside,
    MyHeader
}
</script>

<style>

  .el-aside {
    background-color: #545c64;
    color: #333;
    height: 100vh;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
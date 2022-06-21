<template>
  <div class="common-layout">
    <el-container class="h-screen">
      <el-aside width="200px" class="bg-gray-700 h-full">
        <Aside></Aside>
      </el-aside>
      <el-container class="h-full flex flex-col">
        <el-header class="h-12 bg-gray-700 shadow-md flex justify-between">
          <div class="text-white h-full flex items-center">你好，lingxi</div>
          <div class="h-full flex items-center">
            <el-button type="primary" text @click="$router.push('/login')">注销</el-button>
          </div>
        </el-header>
        <el-main class="flex-1">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Aside from './aside.vue';
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data),
})
</script>
<style>
</style>
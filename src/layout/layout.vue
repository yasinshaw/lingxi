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
          <el-tabs
            v-model="activeTab"
            @tab-change="changeTab"
            @tab-remove="remove"
            type="card"
            :closable="routerTabs.length > 1"
            class="demo-tabs"
          >
            <el-tab-pane
              v-for="item in routerTabs"
              :key="item.path"
              :label="item.label"
              :name="item.path"
            ></el-tab-pane>
          </el-tabs>
          <router-view v-slot="{ Component, route }">
            <transition>
              <keep-alive :include="keepAlivePages">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Aside from './aside.vue';
import { useActiveRouterStore } from '@/store/modules/activeRouter';
import { storeToRefs } from 'pinia';
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

const { activeTab, routerTabs } = storeToRefs(useActiveRouterStore)
const keepAlivePages = computed(() => routerTabs.value.map(v => v.componentName))

function changeTab(name: string) {
  router.push(name)
}
function remove(name: string) {
  const pages = routerTabs.value
  let index = pages.findIndex(v => v.path == name)
  // 如果删除的当前路由，优先找下一个，如果下一个没有了，找上一个，如果上一个没有了，回到首页
  if (route.path == name) {
    if (index < pages.length - 1) {
      router.push(pages[index + 1].path)
    } else if (index > 0) {
      router.push(pages[index - 1].path)
    } else {
      router.push('/home')
    }
  }
  useActiveRouterStore.removeRouterTabs(name)
}

</script>
<style>
</style>
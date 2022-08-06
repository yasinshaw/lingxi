<template>
  <div class="common-layout">
    <el-container class="h-screen">
      <el-aside width="200px" class="bg-gray-700 h-full">
        <Aside></Aside>
      </el-aside>
      <el-container class="h-full flex flex-col">
        <el-header class="h-12 bg-gray-700 shadow-md flex justify-between">
          <div class="text-white h-full flex items-center">Ling Xi 管理系统</div>
          <div class="h-full flex items-center">
            <el-dropdown>
              <div class="el-dropdown-link flex h-full items-center mr-5">
                <span class="pr-3 text-white">{{ currentUser?.nickName }}</span>
                <el-avatar :size="30" :src="currentUser?.avatar"/>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/currentUser/userInfo')">个人信息</el-dropdown-item>
                  <el-dropdown-item @click="$router.push('/currentUser/changePassword')">修改密码</el-dropdown-item>
                  <el-dropdown-item divided @click="logout">
                    <span class="text-red-300">退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="flex-1 relative">
          <div class="tab-operation flex absolute right-5 top-8 z-10">
            <el-button-group>
              <el-button size="small" icon="Close" @click="closeTabLeft">左侧</el-button>
              <el-button size="small" icon="Close" @click="closeTabRight">右侧</el-button>
              <el-button size="small" icon="Close" @click="closeTabOthers">其它</el-button>
            </el-button-group>
          </div>
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
            <!--            <transition>-->
            <keep-alive :include="keepAlivePages">
              <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
            <!--            </transition>-->
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Aside from './aside.vue';
import {useActiveRouterStore} from '@/store/modules/activeRouter';
import {userUserStore} from "@/store/modules/user";
import {storeToRefs} from 'pinia';

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
const data = reactive({})
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

const {activeTab, routerTabs} = storeToRefs(useActiveRouterStore)
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

function closeTabLeft() {
  useActiveRouterStore.closeTabLeft()
}

function closeTabRight() {
  useActiveRouterStore.closeTabRight()
}

function closeTabOthers() {
  useActiveRouterStore.closeTabOthers()
}

const {currentUser} = storeToRefs(userUserStore)

function logout() {
  userUserStore.setUserInfo(null)
  userUserStore.setAuthorization('');
  router.push('/login')
}

</script>
<style>
</style>
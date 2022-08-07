<template>
  <div class="shadow">
    <div
        class="bg-contain bg-no-repeat bg-center h-32"
        style="background-image: url(/lingxi.svg);"
    ></div>

    <el-menu
        :default-active="activeRouter"
        class="el-menu-vertical-demo bg-gray-700"
        active-text-color="#ffd04b"
        background-color="rgb(55 65 81 / var(--tw-bg-opacity))"
        text-color="#fff"
        router
    >
      <template v-for="sideBar in data.sideBars">
        <el-sub-menu
            :index="sideBar.path"
            v-if="sideBar.children?.length && (sideBar.children?.length > 1 || sideBar.meta?.showParent)"
        >
          <template #title>
            <component :is="sideBar.meta?.icon" v-if="sideBar.meta?.icon" class="el-icon"></component>
            <span>{{ sideBar.meta?.label }}</span>
          </template>
          <template v-for="item in sideBar.children">
            <el-menu-item
                :index="item.meta?.configFullPath"
            >{{ item.meta?.label }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item
            :index="sideBar.children[0].meta?.configFullPath"
            v-if="sideBar.children?.length === 1 && !sideBar.meta?.showParent"
        >
          <component :is="sideBar.children[0].meta?.icon" v-if="sideBar.children[0].meta?.icon" class="el-icon"></component>
          <span>{{ sideBar.children[0].meta?.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import {RouteRecordRaw, useRoute, useRouter} from 'vue-router';
import MyRoute from '@/routes/routes'
import {useActiveRouterStore} from '@/store/modules/activeRouter';
import {storeToRefs} from 'pinia';
import {userUserStore} from "@/store/modules/user";
import {deepClone} from "@/utils/clone";

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
  sideBars: new Array<RouteRecordRaw>()
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  // console.log('3.-组件挂载到页面之后执行-------onMounted')
  const menus = userUserStore.currentUser!.permissions!.filter(v => v.type! === 'MENU').map(v => v.value)
  const sideBars = deepClone(MyRoute)
  console.log(menus)
  sideBars.forEach(v => {
    if (v.children) {
      if (v.children.length > 1) {
        v.meta!.showParent = true
      }
      v.children = v.children.filter(v2 => menus.includes(v2.meta!.configFullPath as string) && !v2.meta!.hideSideBar)
    }
    return
  })
  data.sideBars = sideBars.filter(v => !v.meta!.hideSideBar)
  console.log(data.sideBars)
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})
const {activeRouter, routerTabs} = storeToRefs(useActiveRouterStore)
</script>
<style scoped>
/* 解决少1px的问题 */
.el-menu {
  border-right-width: 0;
}
</style>
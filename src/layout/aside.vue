<template>
    <div class="shadow">
        <div
            class="bg-contain bg-no-repeat bg-center h-16"
            style="background-image: url(/logo.png);"
        ></div>

        <el-menu
            :default-active="activeRouter"
            class="el-menu-vertical-demo bg-gray-700"
            active-text-color="#ffd04b"
            background-color="rgb(55 65 81 / var(--tw-bg-opacity))"
            text-color="#fff"
            router
            @select="handleSelect"
        >
            <template v-for="sideBar in sideBars">
                <el-sub-menu :index="sideBar.path" v-if="sideBar.children?.length">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>{{ sideBar.meta?.label }}</span>
                    </template>
                    <el-menu-item
                        :index="sideBar.path + '/' + item.path"
                        v-for="item in sideBar.children"
                    >{{ item.meta?.label }}</el-menu-item>
                </el-sub-menu>
                <el-menu-item :index="sideBar.path" v-else>
                    <el-icon>
                        <briefcase />
                    </el-icon>
                    <span>{{ sideBar.meta?.label }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'
import MyRoute from '@/routes/routes'
import { useActiveRouterStore } from '@/store/modules/activeRouter';
import { storeToRefs } from 'pinia';
const sideBars = MyRoute[0].children
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
    ...toRefs(data)
})
const { activeRouter, routerTabs } = storeToRefs(useActiveRouterStore)
const handleSelect = (path: string) => {
    // router.push(path)
}
</script>
<style scoped>
/* 解决少1px的问题 */
.el-menu {
    border-right-width: 0;
}
</style>
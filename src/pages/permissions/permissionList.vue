<template>
  <div>
      <el-table :data="data.tableData.content" v-if="data.tableData" style="width: 100%">
        <el-table-column prop="id" label="Id" width="180"/>
        <el-table-column prop="type" label="类型" width="180"/>
        <el-table-column prop="value" label="值"/>
      </el-table>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {api} from "@/request";
import {PagePermissionInfoResponse} from "@/request/generator";

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
const tableData : PagePermissionInfoResponse = {}
const data = reactive({
  tableData: tableData
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  data.tableData = (await api.AuthReadControllerApi.getPermissionList(0, 10)).data
  console.log(router.options.routes)
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data),
})

</script>
<style scoped lang='less'>
</style>
<template>
  <div >
      <h1>BBB</h1>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, defineComponent} from 'vue';
import { useRoute, useRouter } from 'vue-router';
defineComponent({
  name: "pageBBB"
})

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
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
</style>
<template>
  <!--  背景图生成自https://wickedbackgrounds.com/app-->
  <div class="h-screen bg-white bg-no-repeat bg-cover flex justify-center items-center p-5"
       style="background-image: url('/login_bg.svg')">
    <div class="bg-white w-96 shadow-md rounded p5">
      <div
          class="bg-contain bg-no-repeat bg-center h-32"
          style="background-image: url(/lingxi.svg);"
      ></div>
      <p class="text-gray-400 text-center my-5">暂不支持找回密码，请联系管理员修改密码！</p>
      <div class="my-4 px-3">
        <div class="flex items-center justify-center">
          <el-button type="primary" class="w-32 my-2 flex-1" plain @click="$router.push('/signin')">去注册</el-button>
          <el-button type="success" class="w-32 my-2 flex-1" plain @click="$router.push('/login')">返回登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

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
  username: '',
  password: ''
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
  ...toRefs(data)
})

function login() {
  console.log(data.username)
  router.push('/')
}

</script>
<style scoped lang='less'>
</style>
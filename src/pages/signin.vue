<template>
  <!--  背景图生成自https://wickedbackgrounds.com/app-->
  <div class="h-screen bg-white bg-no-repeat bg-cover flex justify-center items-center"
       style="background-image: url('/login_bg.svg')">
    <div class="bg-white w-96 shadow-md rounded px-8">
      <div
          class="bg-contain bg-no-repeat bg-center h-32"
          style="background-image: url(/lingxi.svg);"
      ></div>
      <el-input v-model="data.username" placeholder="请输入用户名" clearable autofocus class="my-3"/>
      <el-input
          v-model="data.password"
          type="password"
          placeholder="请输入密码"
          show-password
          clearable
          class="my-3"
          @keyup.enter="signIn"
      />
      <div class="my-4">
        <div class="flex flex-col items-center justify-center">
          <el-button type="success" class="w-32 my-2" @click="signIn">注册</el-button>
        </div>
        <div class="flex flex-col items-center justify-center">
          <el-button type="primary" class="w-32 my-2" plain @click="$router.push('/login')">返回登录</el-button>
        </div>
        <div class="flex flex-col items-center justify-center">
          <router-link to="/forgot" class=" text-gray-400 text-sm">忘记密码？</router-link>
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

function signIn() {
  console.log(data.username)
}

</script>
<style scoped lang='less'>
</style>
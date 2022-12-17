<template>
  <!--  背景图生成自https://wickedbackgrounds.com/app-->
  <div class="h-screen bg-white bg-no-repeat bg-cover flex justify-center items-center"
       style="background-image: url('/login_bg.svg')">
    <div class="bg-white w-96 shadow-md rounded px-8">
      <div
          class="bg-contain bg-no-repeat bg-center h-32"
          style="background-image: url(/lingxi.svg);"
      >
      </div>
      <el-input v-model="data.username" placeholder="请输入用户名" clearable autofocus class="my-2"/>
      <el-input
          v-model="data.password"
          type="password"
          placeholder="请输入密码"
          show-password
          clearable
          class="my-2"
          @keyup.enter="login"
      />
      <el-input
          clearable
          :input-style="{ 'user-select': 'none' }"
          v-model="data.inputVerifyCode"
          class="my-2"
          placeholder="验证码"
          @keyup.enter = "login"
      >
        <template v-slot:append>
          <image-verify v-model:code="data.verifyCode" :height="30" @update="refreshVerifyCode"/>
        </template>
      </el-input>
      <div class="my-4">
        <div class="flex flex-col items-center justify-center">
          <el-button type="success" class="w-full my-2" @click="login">登录</el-button>
        </div>
        <!--        <div class="flex flex-col items-center justify-center">-->
        <!--          <el-button type="primary" class="w-32 my-2" plain @click="$router.push('/signin')">去注册</el-button>-->
        <!--        </div>-->
        <!--        <div class="flex flex-col items-center justify-center">-->
        <!--          <router-link to="/forgot" class=" text-gray-400 text-sm">忘记密码？</router-link>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {userUserStore} from "@/store/modules/user";
import ImageVerify from "@/components/imageVerify.vue";
import {ElMessage} from "element-plus";
import {api} from "@/request";

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
  password: '',
  inputVerifyCode: '',
  verifyCode: ''
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  //实际开发过程中建议对api进行封装 搭配async/await使用
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

async function login() {
  if (!data.username || !data.password) {
    ElMessage.error('用户名或密码不能为空')
    return
  }
  if (data.inputVerifyCode != data.verifyCode) {
    ElMessage.error('验证码不正确，请刷新或重新输入')
    return
  }
  // await loginApi(data.username, data.password);
  await api.Admin.login({
    username: data.username,
    password: data.password
  })
  // 测试jwt token链路有效
  const userInfo = (await api.Admin.getCurrentUserInfo(undefined)).data;
  userUserStore.setUserInfo(userInfo)
  await router.push('/')
}

function refreshVerifyCode(code: string) {
  data.inputVerifyCode = ''
  data.verifyCode = code
}

</script>
<style scoped lang='less'>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
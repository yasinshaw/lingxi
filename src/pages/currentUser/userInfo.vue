<template>
  <div>
    <el-row>
      <el-form :model="currentUser" ref="formRef">
        <el-form-item
            label="用户昵称"
            prop="nickName"
            :rules="[
        { required: true, message: '用户昵称必填' },
      ]"
        >
          <el-input v-model="currentUser.nickName" placeholder="请输入用户昵称"/>
        </el-form-item>
        <el-form-item :rules="[{required: true, message: '用户头像必填'}]" label="用户头像" prop="avatar">
          <el-input v-model="currentUser.avatar" placeholder="请输入用户头像"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {userUserStore} from "@/store/modules/user";
import {ElMessage, FormInstance} from "element-plus";
import {changeCurrentUserInfoApi} from "@/request";

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

const formRef = ref<FormInstance>()
const {nickName, avatar} = userUserStore.currentUser!
const currentUser = reactive({
  nickName: nickName,
  avatar: avatar
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      await changeCurrentUserInfoApi(currentUser.nickName, currentUser.avatar)
      userUserStore.updateInfo(currentUser.nickName, currentUser.avatar)
      ElMessage.success('修改成功')
    } else {
      return false
    }
  })
}
</script>
<style scoped lang='less'>
</style>
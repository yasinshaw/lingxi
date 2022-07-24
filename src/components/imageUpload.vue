<template>
  <el-upload
      class="avatar-uploader"
      action="https://upload-z2.qiniup.com"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :data="uploadData"
  >
    <img v-if="newUrl" :src="newUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import type {UploadProps} from 'element-plus'
import {ElMessage} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import {getQiniuFileTokenApi} from "@/request/common";
import {getRandomFilePath} from "@/utils/file";
import {FILE__PREFIX} from "@/types/constants";

const props = defineProps({
  imageUrl: String
})
const emit = defineEmits(['imageChanged'])
const uploadData = ref({
  token: '',
  key: ''
})
const newUrl = ref(props.imageUrl)

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // newUrl.value = URL.createObjectURL(uploadFile.raw!)
  newUrl.value = FILE__PREFIX + uploadData.value.key
  emit('imageChanged', newUrl.value);
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  if (!rawFile.type.includes('image')) {
    ElMessage.error('只能上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  uploadData.value.token = await getQiniuFileTokenApi()
  uploadData.value.key = getRandomFilePath() + '.' + rawFile.type.substring('image/'.length)
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

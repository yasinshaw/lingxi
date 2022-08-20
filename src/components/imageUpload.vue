<template>

  <el-button @click="isShowDialog = true">上传文件</el-button>
  <!-- 用于裁切的弹窗 -->
  <el-dialog v-model="isShowDialog" title="图片裁剪" width="80%" >
    <el-row>
      <el-col :span="4">
        <el-upload
            class="upload-demo mb-5 h-full"
            drag
            :auto-upload="false"
            action="https://upload-z2.qiniup.com"
            :on-success="handleFileUploaded"
            :before-upload="beforeUpload"
            :data="uploadData"
            :on-change="fileChanged"
            :show-file-list="false"
            ref="uploadRef"
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            拖拽 或 <em>点击选择</em>
          </div>
        </el-upload>
      </el-col>
      <el-col :span="10">
        <!-- 图片裁切插件 -->
        <VuePictureCropper
            v-if="renderComponent"
            :boxStyle="{
        width: '100%',
        height: '250px',
        backgroundColor: '#f8f8f8',
        margin: 'auto',
      }"
            :img="uploadData.pic"
            :presetMode="settings"
            :options="settings"
        />
      </el-col>
      <el-col :span="10" class="crop-con">
        <div class="w-full h-full bg-gray-500 flex justify-center items-center">
          <img :src="uploadData.dataURL" v-show="uploadData.dataURL" class="max-h-full max-w-full"/>
        </div>
        <!-- 图片裁切插件 -->
      </el-col>
    </el-row>

    <div class="flex justify-between align-middle items-center mt-5">
      <div class="flex">
        <el-button class="m-1 ml-0" @click="clear">清除裁剪</el-button>
        <el-button class="m-1" @click="reset">重置</el-button>
        <el-button class="m-1" type="primary" @click="getResult">裁剪</el-button>
        <el-form :inline="true" class="mx-3">
          <el-form-item label="宽" class="w-24">
            <el-input v-model="settings.aspectRatioWidth"/>
          </el-form-item>
          <el-form-item label="高" class="w-24">
            <el-input v-model="settings.aspectRatioHeight"/>
          </el-form-item>
        </el-form>
        <el-button class="m-1" type="primary" @click="render">重新渲染</el-button>
      </div>
      <div>
        <el-button class="m-1 ml-0" @click="clearData">清除数据</el-button>
        <el-button class="m-1" @click="submitUpload" type="success">上传</el-button>
        <el-button class="m-1 mr-0" @click="cropAndSubmit" type="success">裁剪并上传</el-button>
      </div>
    </div>

    <!--    <img v-if="newUrl" :src="newUrl" class="avatar"/>-->
  </el-dialog>
</template>

<script lang="ts" setup>
import {nextTick, reactive, ref} from 'vue'
import type {UploadFile, UploadFiles, UploadProps} from 'element-plus'
import {ElMessage} from 'element-plus'
import {getRandomFilePath} from "@/utils/file";
import {FILE__PREFIX} from "@/types/constants";
import {api} from "@/request";
import VuePictureCropper, {cropper} from 'vue-picture-cropper'
import type {UploadInstance} from 'element-plus'

const renderComponent = ref(true);

const settings = reactive({
  mode: 'fixed',
  viewMode: 1,
  dragMode: 'move',
  aspectRatioWidth: 1,
  aspectRatioHeight: 1,
  aspectRatio: 1,
})

const render = async () => {
  settings.aspectRatio = settings.aspectRatioWidth / settings.aspectRatioHeight
  renderComponent.value = false;

  // Wait for the change to get flushed to the DOM
  await nextTick();

  // Add the component back in
  renderComponent.value = true;
}
const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
  ElMessage.success('上传成功，请手动关闭弹窗')
}

const isShowDialog = ref<boolean>(false)
const props = defineProps({
  imageUrl: String
})
const emit = defineEmits(['imageChanged'])
const uploadData = ref({
  token: '',
  key: '',
  dataURL: '',
  blobURL: '',
  pic: ''
})

const newUrl = ref(props.imageUrl)

const handleFileUploaded: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // newUrl.value = URL.createObjectURL(uploadFile.raw!)
  newUrl.value = FILE__PREFIX + uploadData.value.key
  emit('imageChanged', newUrl.value);
}

const beforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  if (!rawFile.type.includes('image')) {
    ElMessage.error('只能上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  uploadData.value.token = (await api.CommonControllerApi.getToken()).data
  uploadData.value.key = getRandomFilePath() + '.' + rawFile.type.substring('image/'.length)
  return true
}

/**
 * 获取裁切结果
 */
const getResult = async (): Promise<void> => {
  // console.log(cropper)
  // 获取生成的base64图片地址
  const base64: string = cropper.getDataURL()
  // 获取生成的blob文件信息
  const blob: Blob = await cropper.getBlob()
  // 获取生成的file文件信息
  const file = await cropper.getFile({})
  // 把base64赋给结果展示区
  uploadData.value.dataURL = base64
  try {
    uploadData.value.blobURL = URL.createObjectURL(blob)
  } catch (e) {
    uploadData.value.blobURL = ''
  }
  // 隐藏裁切弹窗
  // isShowDialog.value = false
}
/**
 * 清除裁切框
 */
const clear = (): void => {
  cropper.clear()
}
/**
 * 重置默认的裁切区域
 */
const reset = (): void => {
  cropper.reset()
}
const fileChanged = (uploadFile: UploadFile, uploadFiles: UploadFiles): void => {
  if (uploadData.value.key) {
    uploadData.value.key = ''
    return
  }
  // 重置上一次的结果
  uploadData.value.dataURL = '';
  uploadData.value.blobURL = ''
  // 如果有多个裁剪框，也需要重置掉裁剪目标的值，避免使用同一张图片无法触发watch
  // 获取选取的文件
  // 转换为base64传给裁切组件
  const reader: FileReader = new FileReader()
  reader.readAsDataURL(uploadFile.raw!)
  reader.onload = (): void => {
    uploadData.value.pic = String(reader.result)
    // 显示裁切弹窗
    // 清空已选择的文件
  }
}
const cropAndSubmit = () => {
  getResult()
  submitUpload()
}
const clearData = () => {
  uploadData.value.key  = ''
  uploadData.value.pic = ''
  uploadData.value.dataURL = ''
  uploadData.value.blobURL = ''
}
</script>

<style scoped>
.crop-con {
  height: 250px;
}

</style>
<style>
.el-upload-dragger {
  height: 100%;
}
.el-upload {
  height: 100%;
}
</style>
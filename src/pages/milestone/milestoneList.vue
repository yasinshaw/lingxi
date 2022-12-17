<template>
  <div>
    <div class="flex justify-end">
      <el-button type="primary" @click="add">
        添加
      </el-button>
    </div>
    <el-table :data="data.tableData.content" v-if="data.tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="time" label="时间"/>
      <el-table-column prop="portalPublic" label="是否公开">
        <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.portalPublic ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="320">
        <template #default="scope">
          <div class="flex justify-end">
            <el-button type="primary" @click="editData(scope.row)" link>
              编辑
            </el-button>
            <el-button type="danger" @click="deleteData(scope.row)" link>
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-3">
      <el-pagination
          v-model:currentPage="data.currentPage"
          v-model:page-size="data.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.totalNumber"
          @size-change="handlePageChange"
          @current-change="handlePageChange"
      />
    </div>
  </div>
  <el-dialog
      v-model="data.editDialog"
      width="30%"
      :title="data.isAdd ? '添加' : '编辑'"
  >

    <el-form :model="data.currentData" ref="vForm" :rules="rules" label-position="right" label-width="80px"
             size="default" @submit.prevent>
      <el-form-item label="id" prop="id" class="required" v-show="!data.isAdd">
        <el-input v-model="data.currentData.id" disabled/>
      </el-form-item>
      <el-form-item label="title" prop="code" class="required">
        <el-input v-model="data.currentData.title" :minlength="2" :maxlength="20"/>
      </el-form-item>
      <el-form-item label="描述" prop="name" class="required">
        <el-input v-model="data.currentData.description"
                  type="textarea"
                  :minlength="2" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="time" class="required">
        <el-date-picker
            v-model="data.currentData.time"
            type="date"
            placeholder="选择一个日期"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="图片" prop="picUrls" class="required">
        <el-input v-model="data.currentData.picUrls"
                  :minlength="2" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="是否公开" prop="portalPublic" class="required">
        <el-radio-group v-model="data.currentData.portalPublic" class="ml-4">
          <el-radio label="true" size="large">公开</el-radio>
          <el-radio label="false" size="large">不公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="flex justify-center">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, getCurrentInstance} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {api} from "@/request";
import {DataItem, ElMessage, ElMessageBox} from "element-plus";
import {MileStoneResponse} from "@/request/generator/data-contracts";
import {Milestone} from "@/request/generator/Milestone";
import {deepClone} from "@/utils/clone";
import {date2Str} from "@/utils/date";

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
interface Option {
  key: number
  label: string
  disabled: boolean
}

const data = reactive({
  tableData: {} as MileStoneResponse[],
  currentData: {} as MileStoneResponse,
  editDialog: false,
  isAdd: false,
  currentPage: 1,
  pageSize: 10,
  totalNumber: 0,
})
const rules = {
  // name: [{
  //   required: true,
  //   message: '角色名不能为空',
  // }],
  // code: [{
  //   required: true,
  //   message: '角色code不能为空',
  // }],
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
const getList = async () => {
  const tableData = (await api.Milestone.queryByList({
    page: data.currentPage - 1,
    size: data.pageSize
  })).data
  data.tableData = tableData
  data.totalNumber = tableData.totalElements!
}

onMounted(async () => {
  await getList()
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watchEffect(() => {
})

const editData = async (editObj: MileStoneResponse) => {
  data.currentData = deepClone(editObj)
  data.currentData.portalPublic = data.currentData.portalPublic ? 'true' : 'false'
  data.isAdd = false
  data.editDialog = true
}

const deleteData = async (delObj: MileStoneResponse) => {
  ElMessageBox.confirm(
      '删除角色后不可恢复，确定删除？',
      '警告',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await api.Milestone.deleteMileStone({id: delObj.id!})
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        await getList()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

const add = async () => {
  data.currentData = {
    id: 0,
    title: '',
    description: '',
    time: date2Str(new Date()),
    picUrls: '',
    portalPublic: "true",
  }
  console.log(data.currentData)
  data.isAdd = true
  data.editDialog = true
}

const filterItem = (query: string, item: DataItem) => {
  return item.label!.toLowerCase().includes(query.toLowerCase())
}
const handlePageChange = async () => {
  await getList()
}

const instance = getCurrentInstance()

const submitForm = () => {
// @ts-ignore
  instance!.ctx.$refs['vForm'].validate(async valid => {
    if (!valid) return
    if (data.isAdd) {
      await api.Milestone.createMileStone({
            title: data.currentData.title,
            description: data.currentData.description,
            time: data.currentData.time,
            picUrls: data.currentData.picUrls,
            portalPublic: data.currentData.portalPublic == "true",
          },
      )
    } else {
      await api.Milestone.updateMileStone({
            id: data.currentData.id,
            title: data.currentData.title,
            description: data.currentData.description,
            time: data.currentData.time,
            picUrls: data.currentData.picUrls,
            portalPublic: data.currentData.portalPublic == "true",
          }
      );
    }
    ElMessage.success((data.isAdd ? '添加' : '修改') + '成功！')
    data.editDialog = false
    await getList()
  })
}

defineExpose({
  ...toRefs(data),
})

</script>
<style lang="less">
.role-permission-transfer {
  .el-transfer-panel {
    width: 600px;
  }
}

.el-transfer-panel__body {
  height: 70vh;
}

.el-transfer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style scoped lang='less'>
</style>
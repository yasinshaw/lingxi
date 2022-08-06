<template>
  <div>
    <el-table :data="data.tableData.content" v-if="data.tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"/>
      <el-table-column prop="type" label="类型" width="180"/>
      <el-table-column prop="value" label="值"/>
      <el-table-column width="120">
        <template #default="scope">
          <el-button type="primary" @click="editRoles(scope.row)" link>
            关联角色
          </el-button>
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
  <el-drawer
      v-model="data.drawer"
      size="40%"
      title="关联角色"
  >
    <el-transfer
        v-model="data.roleIds"
        filterable
        :filter-method="filterRole"
        :titles="['全部角色', '已关联角色']"
        filter-placeholder="输入关键字过滤"
        :data="data.allRoles"
    >

    </el-transfer>
    <div class="flex justify-center m-5">
      <el-button class="transfer-footer" type="primary" @click="save">保存</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {api} from "@/request";
import {PermissionInfoResponse} from "@/request/generator";
import {ElMessage} from "element-plus";

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
  tableData: {},
  currentPermission: {} as PermissionInfoResponse,
  drawer: false,
  roleIds: new Array<number>(),
  allRoles: new Array<Option>(),
  currentPage: 1,
  pageSize: 10,
  totalNumber: 0,
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
const getPermissionList = async () => {
  const tableData = (await api.AuthReadControllerApi.getPermissionList(data.currentPage - 1, data.pageSize)).data;
  data.tableData = tableData
  data.totalNumber = tableData.totalElements!
}

const getAllRoles = async () => {
  const roles = (await api.AuthReadControllerApi.getRoleList(0, 999)).data.content
  data.allRoles = roles!.map(x => {
    return {
      key: x.id!,
      label: x.name!,
      disabled: false
    }
  })
}

onMounted(async () => {
  await getPermissionList()
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
const editRoles = async (permission: PermissionInfoResponse) => {
  await getAllRoles()
  data.currentPermission = permission
  const roles = (await api.AuthReadControllerApi.getRoleListByPermissionId(permission.id!, 0, 999)).data.content
  data.roleIds = roles!.map(x => x.id!)
  data.drawer = true
}
const filterRole = (query: string, item: Option) => {
  return item.label!.toLowerCase().includes(query.toLowerCase())
}
const save = async () => {
  await api.AuthWriteControllerApi.updatePermissionRoleRelation(undefined, {
    permissionId: data.currentPermission.id!,
    roleIds: data.roleIds,
  })
  ElMessage.success('保存成功')
  data.drawer = false
}
const handlePageChange = async () => {
  await getPermissionList()
}

defineExpose({
  ...toRefs(data),
})

</script>
<style scoped lang='less'>
</style>
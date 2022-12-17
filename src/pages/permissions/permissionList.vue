<template>
  <div>
    <div class="flex justify-between">
      <el-select v-model="data.type" class="m-2" placeholder="Select" @change="handlePageChange">
        <el-option
            v-for="item in permissionTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <div class="flex justify-end">
        <el-button type="primary" @click="updateApiPermissions">
          更新接口权限
        </el-button>
        <el-button type="primary" @click="updateMenuPermissions">
          更新菜单权限
        </el-button>
      </div>
    </div>
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
import {DataItem, ElMessage} from "element-plus";
import {dynamicRoute} from "@/routes/routes";
import {PagePermissionInfoResponse, PermissionInfoResponse} from "@/request/generator/data-contracts";
import {Admin} from "@/request/generator/Admin";
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
interface Option {
  key: number
  label: string
  disabled: boolean
}

const data = reactive({
  tableData: {} as PagePermissionInfoResponse,
  currentPermission: {} as PermissionInfoResponse,
  drawer: false,
  roleIds: new Array<number>(),
  allRoles: new Array<Option>(),
  currentPage: 1,
  pageSize: 10,
  type: '',
  totalNumber: 0,
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
const getPermissionList = async () => {
  const tableData = (await api.Admin.getPermissionList({
    page: data.currentPage - 1,
    size: data.pageSize,
    type: data.type
  })).data;
  data.tableData = tableData
  data.totalNumber = tableData.totalElements!
}

const getAllRoles = async () => {
  const roles = (await api.Admin.getRoleList(0, 999)).data.content
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
  const roles = (await api.Admin.getRoleListByPermissionId(permission.id!, 0, 999)).data.content
  data.roleIds = roles!.map((x: { id: any; }) => x.id!)
  data.drawer = true
}
const filterRole = (query: string, item: DataItem) => {
  return item.label!.toLowerCase().includes(query.toLowerCase())
}
const save = async () => {
  await api.Admin.updatePermissionRoleRelation({
    permissionId: data.currentPermission.id!,
    roleIds: data.roleIds,
  })
  ElMessage.success('保存成功')
  data.drawer = false
}
const handlePageChange = async () => {
  await getPermissionList()
}

const updateApiPermissions = async () => {
  await api.Admin.updateApiPermissions()
  await getPermissionList()
}

const updateMenuPermissions = async () => {
  const routePaths = new Array<string>()
  dynamicRoute.forEach(v => {
    if (v.meta!.hideSideBar) {
      return
    }
    if (v.children) {
      v.children.forEach(v2 => {
        if (v2.meta!.hideSideBar) {
          return
        }
        routePaths.push(v2.meta!.configFullPath as string)
      })
    } else {
      routePaths.push(v.meta!.configFullPath as string)
    }
  })
  await api.Admin.updateManuPermissions(routePaths)
  await getPermissionList()
}

const permissionTypes = [
  {value: '', label: '全部'},
  {value: 'API', label: '接口'},
  {value: 'MENU', label: '菜单'},
  {value: 'CUSTOM', label: '自定义'},
]

defineExpose({
  ...toRefs(data),
})

</script>
<style scoped lang='less'>
</style>
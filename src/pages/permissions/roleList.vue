<template>
  <div>
    <div class="flex justify-end">
      <el-button type="primary" @click="addRole">
        添加角色
      </el-button>
    </div>
    <el-table :data="data.tableData.content" v-if="data.tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"/>
      <el-table-column prop="code" label="角色code"/>
      <el-table-column prop="name" label="角色名"/>
      <el-table-column min-width="320">
        <template #default="scope">
          <div class="flex justify-end">
            <el-button type="primary" @click="editPermissions(scope.row)" link>
              关联权限
            </el-button>
            <el-button type="primary" @click="editUsers(scope.row)" link>
              关联用户
            </el-button>
            <el-button type="primary" @click="editRole(scope.row)" link>
              编辑角色
            </el-button>
            <el-button type="danger" @click="deleteRole(scope.row)" link :disabled="scope.row.code === 'SUPER_ADMIN'">
              删除角色
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
  <el-drawer
      v-model="data.permissionDrawer"
      size="80%"
      title="关联权限"
  >
    <el-transfer
        v-model="data.permissionIds"
        filterable
        :filter-method="filterItem"
        :titles="['全部权限', '已关联权限']"
        filter-placeholder="输入关键字过滤"
        :data="data.allPermissions"
        class="role-permission-transfer"
    >
    </el-transfer>
    <div class="flex justify-center m-5">
      <el-button class="transfer-footer" type="primary" @click="savePermissions">保存</el-button>
    </div>
  </el-drawer>

  <el-drawer
      v-model="data.userDrawer"
      size="40%"
      title="关联用户"
  >
    <el-transfer
        v-model="data.userIds"
        filterable
        :filter-method="filterItem"
        :titles="['全部用户', '已关联用户']"
        filter-placeholder="输入关键字过滤"
        :data="data.allUsers"
    >
    </el-transfer>
    <div class="flex justify-center p-2">
      <el-button class="transfer-footer" type="primary" @click="saveUsers">保存</el-button>
    </div>
  </el-drawer>

  <el-dialog
      v-model="data.editRoleDialog"
      width="30%"
      :title="data.isAddRole ? '添加角色' : '编辑角色'"
  >

    <el-form :model="data.currentRole" ref="vForm" :rules="rules" label-position="right" label-width="80px"
             size="default" @submit.prevent>
      <el-form-item label="id" prop="id" class="required" v-show="!data.isAddRole">
        <el-input v-model="data.currentRole.id" disabled/>
      </el-form-item>
      <el-form-item label="code" prop="code" class="required">
        <el-input v-model="data.currentRole.code" :minlength="2" :maxlength="20" :disabled="!data.isAddRole"/>
      </el-form-item>
      <el-form-item label="角色名" prop="name" class="required">
        <el-input v-model="data.currentRole.name"
                  :minlength="2" :maxlength="20"></el-input>
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
import {PageRoleInfoResponse, RoleInfoResponse} from "@/request/generator";
import {DataItem, ElMessage, ElMessageBox} from "element-plus";

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
  tableData: {} as PageRoleInfoResponse,
  currentRole: {} as RoleInfoResponse,
  permissionDrawer: false,
  userDrawer: false,
  editRoleDialog: false,
  isAddRole: false,
  permissionIds: new Array<number>(),
  allPermissions: new Array<Option>(),
  userIds: new Array<number>(),
  allUsers: new Array<Option>(),
  currentPage: 1,
  pageSize: 10,
  totalNumber: 0,
})
const rules = {
  name: [{
    required: true,
    message: '角色名不能为空',
  }],
  code: [{
    required: true,
    message: '角色code不能为空',
  }],
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
const getRoleList = async () => {
  const tableData = (await api.Admin.getRoleList({
    page: data.currentPage - 1,
    size: data.pageSize
  })).data
  data.tableData = tableData
  data.totalNumber = tableData.totalElements!
}

const getAllPermissions = async () => {
  const allPermissions = (await api.Admin.getPermissionList({page: 0, size: 999})).data.content
  data.allPermissions = allPermissions!.map(x => {
    return {
      key: x.id!,
      label: x.type! + ' ' + x.value!,
      disabled: false
    }
  })
}

const getAllUsers = async () => {
  const allUsers = (await api.Admin.getUserList({pag: 0, size: 999})).data.content
  data.allUsers = allUsers!.map(x => {
    return {
      key: x.id!,
      label: x.nickName!,
      disabled: false
    }
  })
}

onMounted(async () => {
  await getRoleList()
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
const editPermissions = async (role: RoleInfoResponse) => {
  await getAllPermissions()
  data.currentRole = role
  const permissions = (await api.Admin.getPermissionListByRoleId(role.id!, {page: 0, size: 999})).data.content
  data.permissionIds = permissions!.map(x => x.id!)
  data.permissionDrawer = true
}

const editUsers = async (role: RoleInfoResponse) => {
  await getAllUsers()
  data.currentRole = role
  const users = (await api.Admin.getUserListByRoleId(role.id!, {page: 0, size: 999})).data.content
  data.userIds = users!.map(x => x.id!)
  data.userDrawer = true
}

const editRole = async (role: RoleInfoResponse) => {
  data.currentRole = role
  data.isAddRole = false
  data.editRoleDialog = true
}

const deleteRole = async (role: RoleInfoResponse) => {
  ElMessageBox.confirm(
      '删除角色后不可恢复，且会删除这个角色与用户或权限的关联关系，确定删除？',
      '警告',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await api.Admin.deleteRole(role.id!)
        ElMessage({
          type: 'success',
          message: '删除角色成功',
        })
        await getRoleList()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

const addRole = async () => {
  data.currentRole = {
    id: 0,
    code: '',
    name: ''
  }
  data.isAddRole = true
  data.editRoleDialog = true
}

const filterItem = (query: string, item: DataItem) => {
  return item.label!.toLowerCase().includes(query.toLowerCase())
}
const handlePageChange = async () => {
  await getRoleList()
}

const savePermissions = async () => {
  await api.Admin.updateRolePermissionRelation( {
    roleId: data.currentRole.id!,
    permissionIds: data.permissionIds,
  })
  ElMessage.success('保存成功')
  data.permissionDrawer = false
}

const saveUsers = async () => {
  await api.Admin.updateRoleUserRelation( {
    roleId: data.currentRole.id!,
    userIds: data.userIds,
  })
  ElMessage.success('保存成功')
  data.userDrawer = false
}

const instance = getCurrentInstance()

const submitForm = () => {
// @ts-ignore
  instance!.ctx.$refs['vForm'].validate(async valid => {
    if (!valid) return
    if (data.isAddRole) {
      await api.Admin.createRole( {
        code: data.currentRole.code!,
        name: data.currentRole.name!,
      })
    } else {
      await api.Admin.updateRole( {
            id: data.currentRole.id!,
            code: data.currentRole.code!,
            name: data.currentRole.name!,
          }
      );
    }
    ElMessage.success((data.isAddRole ? '添加' : '修改') + '角色成功！')
    data.editRoleDialog = false
    await getRoleList()
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
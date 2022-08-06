<template>
  <div>
    <div class="flex justify-end">
      <el-button type="primary" @click="addUser">
        添加用户
      </el-button>
    </div>
    <el-table :data="data.tableData.content" v-if="data.tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column min-width="320">
        <template #default="scope">
          <div class="flex justify-end">
            <el-button type="primary" @click="editRoles(scope.row)" link>
              关联角色
            </el-button>
            <el-button type="primary" @click="editUser(scope.row)" link>
              编辑用户
            </el-button>
            <el-button type="danger" @click="deleteUser(scope.row)" link>
              删除用户
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
      v-model="data.roleDrawer"
      size="40%"
      title="关联角色"
  >
    <el-transfer
        v-model="data.roleIds"
        filterable
        :filter-method="filterItem"
        :titles="['全部角色', '已关联角色']"
        filter-placeholder="请选择该用户关联的角色"
        :data="data.allRoles"
    >
      <template #left-footer>
        <div class="flex justify-end p-2">
          <el-button class="transfer-footer" type="primary" @click="addAllRoles">全部关联</el-button>
        </div>
      </template>
      <template #right-footer>
        <div class="flex justify-end p-2">
          <el-button class="transfer-footer" type="primary" @click="saveRoles">保存</el-button>
        </div>
      </template>
    </el-transfer>
  </el-drawer>

  <el-dialog
      v-model="data.editUserDialog"
      width="30%"
      title="编辑用户"
  >

    <el-form :model="data.currentUser" ref="vForm" :rules="rules" label-position="left" label-width="80px"
             size="default" @submit.prevent>
      <el-form-item label="id" prop="id" class="required" v-show="!data.isAddUser">
        <el-input v-model="data.currentUser.id" disabled/>
      </el-form-item>
      <el-form-item label="头像地址" prop="avatar" class="required">
        <el-input v-model="data.currentUser.avatar" :minlength="2" :maxlength="20" :disabled="!data.isAddUser"/>
      </el-form-item>
      <el-form-item label="用户名" prop="username" class="required">
        <el-input v-model="data.currentUser.username" :disabled="!data.isAddUser"
                  :minlength="2" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName" class="required">
        <el-input v-model="data.currentUser.nickName"
                  :minlength="2" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="初始密码" prop="password" class="required" type="password" v-show="data.isAddUser">
        <el-input v-model="data.currentUser.password"
                  :minlength="2" :maxlength="20"></el-input>
      </el-form-item>
      <div class="flex justify-center">
        <el-button type="primary" @click="submitForm(vForm)">提交</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, getCurrentInstance} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {api} from "@/request";
import {RoleInfoResponse, UserInfoResponse} from "@/request/generator";
import {ElMessage, ElMessageBox} from "element-plus";
import {extend} from "dayjs";
import {DEFAULT_AVATAR} from "@/types/constants";

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

interface EditUserInfo extends UserInfoResponse {
  password: string
}

const data = reactive({
  tableData: {},
  currentUser: {} as EditUserInfo,
  roleDrawer: false,
  editUserDialog: false,
  isAddUser: false,
  roleIds: new Array<number>(),
  allRoles: new Array<Option>(),
  currentPage: 1,
  pageSize: 10,
  totalNumber: 0,
})
const rules = {
  avatar: [{
    required: true,
    message: '头像不能为空',
  }],
  username: [{
    required: true,
    message: '用户不能为空',
  }],
  nickName: [{
    required: true,
    message: '用户昵称不能为空',
  }],
  password: [{
    required: true,
    message: '用户初始密码不能为空',
  }],
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
const getUserList = async () => {
  const tableData = (await api.AuthReadControllerApi.getUserList(data.currentPage - 1, data.pageSize)).data;
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
  await getUserList()
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }

const editRoles = async (user: EditUserInfo) => {
  await getAllRoles()
  data.currentUser = user
  const roles = (await api.AuthReadControllerApi.getRoleListByUserId(user.id!, 0, 999)).data.content
  data.roleIds = roles!.map(x => x.id!)
  data.roleDrawer = true
}

const editUser = async (user: EditUserInfo) => {
  data.currentUser = user
  data.isAddUser = false
  data.editUserDialog = true
}

const deleteUser = async (user: UserInfoResponse) => {
  ElMessageBox.confirm(
      '删除用户后不可恢复，且会删除这个用户与角色的关联关系，确定删除？',
      '警告',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await api.AuthWriteControllerApi.deleteUser(user.id!)
        ElMessage({
          type: 'success',
          message: '删除用户成功',
        })
        await getUserList()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

const addUser = async () => {
  data.currentUser = {
    id: 0,
    avatar: DEFAULT_AVATAR,
    username: '',
    nickName: '',
    password: ''
  }
  data.isAddUser = true
  data.editUserDialog = true
}

const filterItem = (query: string, item: Option) => {
  return item.label!.toLowerCase().includes(query.toLowerCase())
}
const handlePageChange = async () => {
  await getUserList()
}
const addAllRoles = () => {
  data.allRoles.filter(x => !data.roleIds.includes(x.key)).forEach(x => {
    data.roleIds.push(x.key)
  })
}
const saveRoles = async () => {
  await api.AuthWriteControllerApi.updateUserRoleRelation(undefined, {
    userId: data.currentUser.id!,
    roleIds: data.roleIds,
  })
  ElMessage.success('保存成功')
  data.roleDrawer = false
}

const instance = getCurrentInstance()

const submitForm = () => {
// @ts-ignore
  instance!.ctx.$refs['vForm'].validate(async valid => {
    if (!valid) return
    if (data.isAddUser) {
      await api.AuthWriteControllerApi.createUser(undefined, {
        avatar: data.currentUser.avatar!,
        username: data.currentUser.username!,
        password: data.currentUser.password!,
        nickName: data.currentUser.nickName!,
      })
    } else {
      await api.AuthWriteControllerApi.updateUser(undefined, {
            userId: data.currentUser.id!,
            avatar: data.currentUser.avatar!,
            nickName: data.currentUser.nickName!,
          }
      );
    }
    ElMessage.success((data.isAddUser ? '添加' : '修改') + '用户成功！')
    data.editUserDialog = false
    await getUserList()
  })
}

defineExpose({
  ...toRefs(data),
})

</script>
<style scoped lang='less'>
</style>
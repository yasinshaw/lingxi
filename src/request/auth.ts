import {Permission, Auth} from "@/types/auth";
import $axios from "@/request/index";
import {Page, PageRequest} from "@/types/common";

export function loginApi(username: string, password: string): Promise<Auth> {
    return $axios.post(`/admin/login`, {
        username: username,
        password: password
    })
}

export function currentUserInfoApi(): Promise<Auth> {
    return $axios.get(`/admin/currentUserInfo`, {})
}

export function changeCurrentUserInfoApi(nickName: string, avatar: string) {
    return $axios.post(`/admin/user/updateCurrentUserInfo`, {
        nickName: nickName,
        avatar: avatar
    })
}

export function changePasswordApi(oldPassword: string, newPassword: string) {
    return $axios.post(`/admin/user/changePassword`, {
        oldPassword: oldPassword,
        newPassword: newPassword
    })
}

export function getPermissionListApi(request: PageRequest): Promise<Page<Permission>> {
    return $axios.get(`/admin/permissions?page=${request.page}&size=${request.size}`)
}

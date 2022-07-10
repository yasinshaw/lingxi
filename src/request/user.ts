import {UserInfo} from "@/types/userInfo";
import $axios from "@/request/index";

export function loginApi(username: string, password: string): Promise<UserInfo> {
    return $axios.post(`/admin/login`, {
        username: username,
        password: password
    })
}

export function currentUserInfoApi(): Promise<UserInfo> {
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

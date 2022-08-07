import {defineStore} from 'pinia'
import {store} from '..'
import {storageLocal} from "@/utils/storage";
import {STORAGE_KEY_AUTHORIZATION, STORAGE_KEY_USER_INFO} from "@/types/constants";
import {UserInfoResponse} from "@/request/generator";


const useUserStoreFunc = defineStore('user', {
    state: () => {
        return {
            currentUser: storageLocal.getItemDefault<UserInfoResponse>(STORAGE_KEY_USER_INFO, {}),
            authorization: storageLocal.getItemDefault(STORAGE_KEY_AUTHORIZATION, ""),
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        setUserInfo(userInfo: UserInfoResponse) {
            this.currentUser = userInfo
            storageLocal.setItem(STORAGE_KEY_USER_INFO, this.currentUser)
        },
        updateInfo(nickName: string, avatar: string) {
            this.currentUser!.nickName = nickName
            this.currentUser!.avatar = avatar
        },
        setAuthorization(authorization: string) {
            this.authorization = authorization
            storageLocal.setItem(STORAGE_KEY_AUTHORIZATION, this.authorization)
        }
    },
})

export const userUserStore = useUserStoreFunc(store)
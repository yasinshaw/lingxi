import {defineStore} from 'pinia'
import {store} from '..'
import {storageLocal} from "@/utils/storage";
import {UserInfo} from "@/types/userInfo";
import {STORAGE_KEY_AUTHORIZATION, STORAGE_KEY_USER_INFO} from "@/types/constants";


const useUserStoreFunc = defineStore('user', {
    state: () => {
        return {
            currentUser: storageLocal.getItemDefault(STORAGE_KEY_USER_INFO, new UserInfo()),
            authorization: storageLocal.getItemDefault(STORAGE_KEY_AUTHORIZATION, ""),
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        setUserInfo(userInfo: UserInfo) {
            this.currentUser = userInfo
            storageLocal.setItem(STORAGE_KEY_USER_INFO, this.currentUser)
        },
        setAuthorization(authorization: string) {
            this.authorization = authorization
            storageLocal.setItem(STORAGE_KEY_AUTHORIZATION, this.authorization)
        }
    },
})

export const userUserStore = useUserStoreFunc(store)
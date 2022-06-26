import {defineStore} from 'pinia'
import {store} from '..'
import {storageLocal} from "@/utils/storage";
import {UserInfo} from "@/types/userInfo";
import {STORRAGE_KEY_USER_INFO} from "@/types/constants";


const useUserStoreFunc = defineStore('user', {
    state: () => {
        return {
            currentUser: storageLocal.getItemDefault(STORRAGE_KEY_USER_INFO, new UserInfo()),
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        loginUser(userInfo: UserInfo) {
            this.currentUser = userInfo
            storageLocal.setItem(STORRAGE_KEY_USER_INFO, this.currentUser)
        }
    },
})

export const userUserStore = useUserStoreFunc(store)
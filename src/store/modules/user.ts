import {defineStore} from 'pinia'
import {store} from '..'
import {RouteLocationNormalized} from 'vue-router'

class UserInfo {
    username: string = ""
    nickName: string = "默认昵称"
    avatar: string = "/avatar.png"
    token: string = ""

    constructor() {
    }
}

const useUserStoreFunc = defineStore('user', {
    state: () => {
        return {
            currentUser: new UserInfo(),
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        loginUser(username: string, nickName: string, avatar: string, token: string) {
            this.currentUser.username = username
            this.currentUser.nickName = nickName
            this.currentUser.avatar = avatar
            this.currentUser.token = token
        }
    },
})

export const userUserStore = useUserStoreFunc(store)
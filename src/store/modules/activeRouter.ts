import { defineStore } from 'pinia'
import { store } from '..'
import routes, { findByFullPath } from '@/routes/routes'
import { RouteLocationNormalized } from 'vue-router'
import { config } from 'process'

class EditableTab {
    constructor(public path: string, public label: string) { }
}
const useActiveRouterStoreFunc = defineStore('activeRouter', {
    state: () => {
        return {
            activeRouter: '/home',
            routerTabs: new Array<EditableTab>()
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        changeActiveRouter(to: RouteLocationNormalized) {
            const path = to.path
            const configPath = to.meta?.configFullPath as string
            this.activeRouter = configPath
            let index = this.routerTabs.findIndex((v) => v.path == configPath)
            if (index == -1) {
                // todo 要注意嵌套的场景
                this.routerTabs.push(new EditableTab(configPath, to.meta?.label as string))
            }
        },
        removeRouterTabs(path: string) {
            let index = this.routerTabs.findIndex((v) => v.path == path)
            if (index != -1) {
                this.routerTabs.splice(index, 1)
            }
        }
    },
})

export const useActiveRouterStore = useActiveRouterStoreFunc(store)
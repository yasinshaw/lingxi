import { defineStore } from 'pinia'
import { store } from '..'
import routes, { findByFullPath } from '@/routes/routes'

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
        changeActiveRouter(path: string) {
            this.activeRouter = path
            let index = this.routerTabs.findIndex((v) => v.path == path)
            if (index == -1) {
                // todo 要注意嵌套的场景
                const routeObj = findByFullPath(path, routes)
                this.routerTabs.push(new EditableTab(path, routeObj?.meta?.label as string))
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
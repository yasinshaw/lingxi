import {defineStore} from 'pinia'
import {store} from '..'
import {RouteLocationNormalized} from 'vue-router'

class EditableTab {
    constructor(public path: string, public label: string, public componentName: string) {
    }
}

const useActiveRouterStoreFunc = defineStore('activeRouter', {
    state: () => {
        return {
            activeRouter: '/home',
            activeTab: '/home',
            routerTabs: new Array<EditableTab>()
        }
    },
    getters: {
        activeIndex: (state) => state.routerTabs.findIndex(v => v.path == state.activeTab),
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        changeActiveRouter(from: RouteLocationNormalized, to: RouteLocationNormalized) {
            const titleName = to.meta?.label? to.meta.label as string + ' | ' : ''
            document.title = titleName + 'LingXi管理后台'
            if (to.meta?.hasNoTabs) {
                return;
            }
            const configPath = to.meta?.configFullPath as string;
            if (!configPath) {
                return
            }
            this.activeRouter = configPath
            this.activeTab = to.path
            // 只要路由不完全一样，就认为是两个标签页，哪怕是两个动态路由 /user/1和/user/2
            let index = this.routerTabs.findIndex((v) => v.path == to.path)
            if (index == -1) {
                // @ts-ignore
                let componentName = to.matched[to.matched.length - 1].components.default.__name;
                if (!componentName) {
                    // 使用Variant Form生成的组件，需要自己定义一下name
                    componentName = to.matched[to.matched.length - 1].components.default.name;
                }
                this.routerTabs.push(new EditableTab(to.path, to.meta?.label as string, componentName));
            }
        },
        removeRouterTabs(path: string) {
            let index = this.routerTabs.findIndex((v) => v.path == path)
            if (index != -1) {
                this.routerTabs.splice(index, 1)
            }
        },
        closeTabLeft() {
            this.routerTabs.splice(0, this.activeIndex)
        },
        closeTabRight() {
            this.routerTabs.length = this.activeIndex + 1
        },
        closeTabOthers() {
            this.closeTabLeft()
            this.closeTabRight()
        }
    },
})

export const useActiveRouterStore = useActiveRouterStoreFunc(store)
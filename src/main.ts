// main.ts
import {Component, createApp, defineComponent} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from './routes/routes'
import "tailwindcss/tailwind.css"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {setupStore} from "@/store"
import {useActiveRouterStore} from './store/modules/activeRouter'
import {userUserStore} from "@/store/modules/user";


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
setupStore(app)

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from, next) => {
    if (userUserStore.currentUser.username) {
        next()
        return true
    }
    // todo 目前认为没标签页的都是在登录态，这块后续看下是不是需要单独的字段来配置
    if (to.meta?.hasNoTabs) {
        next()
        return true
    } else {
        next('/login')
        return true
    }
})
router.afterEach((to, from) => {
    useActiveRouterStore.changeActiveRouter(from, to)
    return true;
})

app.use(ElementPlus)
app.use(router)
app.mount('#app')
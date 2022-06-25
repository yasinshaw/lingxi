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
router.afterEach((to, from) => {
    useActiveRouterStore.changeActiveRouter(from, to)
    if (from.matched.length > 1) {
        // @ts-ignore
        // console.log(from.matched[from.matched.length - 1].components.default.__name);
    }
    // @ts-ignore
    console.log(to.matched[to.matched.length - 1].components.default.__name);
    return true;
})

// 为自定义的选项 'myOption' 注入一个处理器。
app.mixin({
    // mounted() {
    //     defineComponent({
    //         name: this.$route.path
    //     })
    // },
    // activated() {
    //     console.log(this.$options)
    // },
    // deactivated() {
    //     console.log(this.$options.name);
    // }
})

app.use(ElementPlus)
app.use(router)
app.mount('#app')
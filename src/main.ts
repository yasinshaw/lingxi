// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from './routes/routes'
import "tailwindcss/tailwind.css"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'



const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)

const store  = createPinia()
app.use(store)
app.mount('#app')
import Layout from '../layout/layout.vue'
const routes = [
    { path: '/', component: Layout },
    { path: '/login', component: () => import('../pages/login.vue') },
]

export default routes
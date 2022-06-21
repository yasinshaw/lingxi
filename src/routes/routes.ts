import Layout from '../layout/layout.vue'
import { RouteRecordRaw } from 'vue-router'


const dynamicRoute: RouteRecordRaw[] = [
    {
        path: '/home',
        component: () => import('../pages/home.vue'),
        meta: {
            icon: 'home',
            label: '主页',
        },
    },
    {
        path: '/articles',
        meta: {
            icon: 'home',
            label: '文章管理',
        },
        component: () => import('@/components/routerView.vue'),
        redirect: '/articles/list',
        children: [
            {
                path: 'list',
                component: () => import('../pages/articles/articleList.vue'),
                meta: {
                    label: '文章列表'
                }
            },
            {
                path: 'edit',
                component: () => import('../pages/articles/editArticle.vue'),
                meta: {
                    label: '编辑文章'
                }
            },
            {
                path: 'add',
                component: () => import('../pages/articles/addArticle.vue'),
                meta: {
                    label: '添加文章'
                }
            },
        ]
    },
    {
        path: '/a',
        component: () => import('../pages/pageA.vue'),
        meta: {
            icon: 'home',
            label: '页面A',
        },
    },
    {
        path: '/b',
        component: () => import('../pages/pageB.vue'),
        meta: {
            icon: 'home',
            label: '页面B',
        },
    }
]

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        children: dynamicRoute,
    },
    {
        path: '/login',
        component: () => import('../pages/login.vue'),
    },
]


routes.concat(dynamicRoute)


export default routes
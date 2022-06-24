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
        redirect: '/home',
        children: dynamicRoute,
        meta: {}
    },
    {
        path: '/login',
        component: () => import('../pages/login.vue'),
        meta: {}
    },
]


routes.concat(dynamicRoute)
function addFullPath(parentPath: string, routes: RouteRecordRaw[]) {
    routes.forEach(v => {
        if (v.path.startsWith('/')) {
            v.meta!.fullPath = v.path
        } else {
            v.meta!.fullPath = parentPath + '/' + v.path
        }
        if (v.children) {
            addFullPath(v.meta!.fullPath as string, v.children)
        }
    })
}
addFullPath('/', routes)

export function findByFullPath(fullPath: string, arr: RouteRecordRaw[] | undefined): RouteRecordRaw | undefined {
    if (!arr || arr.length == 0) {
        return undefined
    }
    let obj = arr.find(v => v.meta!.fullPath == fullPath)
    if (obj) {
        return obj
    } else {
        // 如果没找到，遍历往下找
        // todo 这里可以优化一下性能
        obj = arr.find(v => findByFullPath(fullPath, v.children) != undefined)
        return findByFullPath(fullPath, obj?.children)
    }
}

export default routes
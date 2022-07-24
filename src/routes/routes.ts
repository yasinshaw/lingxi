import Layout from '../layout/layout.vue'
import {RouteRecordRaw} from 'vue-router'


const dynamicRoute: RouteRecordRaw[] = [
    {
        path: '/home',
        component: Layout,
        meta: {},
        redirect: '/home/index',
        children: [
            {
                path: 'index',
                component: () => import('../pages/home.vue'),
                meta: {
                    icon: 'HomeFilled',
                    label: '主页',
                }
            }
        ]
    },
    {
        path: '/articles',
        meta: {
            icon: 'Collection',
            label: '文章管理',
        },
        component: Layout,
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
                path: 'edit/:id',
                component: () => import('../pages/articles/editArticle.vue'),
                meta: {
                    label: '编辑文章',
                    hideSideBar: true
                }
            },
            {
                path: 'add',
                component: () => import('../pages/articles/addArticle.vue'),
                meta: {
                    label: '添加文章',
                }
            },
        ]
    },
    {
        path: '/a',
        component: Layout,
        redirect: '/a/index',
        meta: {},
        children: [
            {
                path: 'index',
                component: () => import('../pages/pageA/pageA.vue'),
                name: '/a/index',
                meta: {
                    icon: 'Moon',
                    label: '页面A',
                },
            }
        ]
    },
    {
        path: '/b',
        redirect: '/b/index',
        meta: {},
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('../pages/pageB/pageB.vue'),
                meta: {
                    icon: 'Mug',
                    label: '页面B',
                },
            }
        ]
    }
]

let routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home/index',
        meta: {}
    },
    {
        path: '/login',
        component: () => import('../pages/login.vue'),
        meta: {
            label: '登录',
            hasNoTabs: true
        }
    },
    {
        path: '/signin',
        component: () => import('../pages/signin.vue'),
        meta: {
            label: '注册',
            hasNoTabs: true
        }
    },
    {
        path: '/forgot',
        component: () => import('../pages/forgot.vue'),
        meta: {
            label: '忘记密码',
            hasNoTabs: true
        }
    },
    {
        path: '/currentUser',
        meta: {
            icon: 'Avatar',
            label: '用户中心',
        },
        component: Layout,
        redirect: '/currentUser/userInfo',
        children: [
            {
                path: 'userInfo',
                component: () => import('../pages/currentUser/userInfo.vue'),
                meta: {
                    label: '个人信息'
                }
            },
            {
                path: 'changePassword',
                component: () => import('../pages/currentUser/changePassword.vue'),
                meta: {
                    label: '修改密码',
                }
            },
        ]
    },
    {
        path: '/permissions',
        meta: {
            icon: 'Lock',
            label: '权限中心',
        },
        component: Layout,
        redirect: '/permissions/permissionList',
        children: [
            {
                path: 'permissionList',
                component: () => import('../pages/permissions/permissionList.vue'),
                meta: {
                    label: '权限管理'
                }
            },
            {
                path: 'roleList',
                component: () => import('../pages/permissions/roleList.vue'),
                meta: {
                    label: '角色管理',
                }
            },
            {
                path: 'userList',
                component: () => import('../pages/permissions/userList.vue'),
                meta: {
                    label: '用户管理',
                }
            },
        ]
    },
]


routes = dynamicRoute.concat(routes)

function addFullPath(parentPath: string, routes: RouteRecordRaw[]) {
    routes.forEach(v => {
        if (v.path.startsWith('/')) {
            v.meta!.configFullPath = v.path
        } else {
            v.meta!.configFullPath = parentPath + '/' + v.path
        }
        if (v.children) {
            addFullPath(v.meta!.configFullPath as string, v.children)
        }
    })
}

addFullPath('/', routes)

export default routes
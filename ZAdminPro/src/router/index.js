// 路由配置
// children 下的key字段为页面权限id 结合页面权限使用
const routes = {
    "index": { path: '/Index', key: 'Index', name: '首页', tab: true, active: true },  // 应用首页设置
    // 应用路由配置
    "data": [
        {
            path: '/',
            redirect: '/Login',
        },
        {
            path: '/Login',
            name: 'Login',
            component: () => import('@/pages/Login.vue'),
            meta: { keepAlive: false, name: '登录' },
        },
        {
            path: '/Home',
            name: 'Home',
            component: () => import('@/pages/Home.vue'),
            meta: { keepAlive: false, name: '主页' },
            children: [
                {
                    path: '/Index',
                    name: 'Index',
                    component: () => import('@/pages/Index/Index.vue'),
                    meta: { keepAlive: false, name: '首页', key: 'Index', tab: true }
                },
                {
                    path: '/SchoolList',
                    name: 'SchoolList',
                    component: () => import('@/pages/School/SchoolList.vue'),
                    meta: { keepAlive: true, name: '院校管理', key: 'SchoolList', tab: true }
                },
                {
                    path: '/SchoolList2',
                    name: 'SchoolList2',
                    component: () => import('@/pages/School/SchoolList2.vue'),
                    meta: { keepAlive: false, name: '院校管理（vue2写法）', key: 'SchoolList2', tab: true }
                },
                
                {
                    path: '/SchoolAdd',
                    name: 'SchoolAdd',
                    component: () => import('@/pages/School/SchoolAdd.vue'),
                    meta: { keepAlive: false, name: '新增院校', key: 'SchoolList', }
                },
                {
                    path: '/RoleSet',
                    name: 'RoleSet',
                    component: () => import('@/pages/System/RoleSet.vue'),
                    meta: { keepAlive: false, name: '权限设置', key: 'RoleSet', tab: true }
                },
                {
                    path: '/Charts',
                    name: 'Charts',
                    component: () => import('@/pages/Other/Charts.vue'),
                    meta: { keepAlive: false, name: '图表使用', key: 'Charts', tab: true }
                },
                {
                    path: '/Map',
                    name: 'Map',
                    component: () => import('@/pages/Other/Map.vue'),
                    meta: { keepAlive: false, name: '地图使用', key: 'Map', tab: true }
                },
                {
                    path: '/Editor',
                    name: 'Editor',
                    component: () => import('@/pages/Other/Editor.vue'),
                    meta: { keepAlive: false, name: '文本编辑器', key: 'Editor', tab: true }
                },
                {
                    path: '/Iframe',
                    name: 'Iframe',
                    component: () => import('@/pages/Other/Iframe.vue'),
                    meta: { keepAlive: false, name: '嵌套页面', key: 'Iframe', tab: true }
                },
                
            ]
        },
        {
            path: '/403',
            name: '403',
            component: () => import('@/pages/Error/403.vue'),
            meta: { keepAlive: false, name: '403' },
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/pages/Error/404.vue'),
            meta: { keepAlive: false, name: '404' },
        }
    ]
}
export default routes;
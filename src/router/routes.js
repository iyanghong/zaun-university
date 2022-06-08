import config from "@/config/router";

var routes = [
    {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('@/views/redirect/index'),
        hidden: true,
    },
    {
        path: '/error/access-denied.html',
        name: 'ErrorAccessDenied',
        component: () => import('@/views/ErrorPage/AccessDenied'),
        meta: {
            title: '无权限-' + config.baseBlogTitle,
            auth: false
        }
    },
    {
        path : '/',
        redirect:'/console'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login'),
        meta: {
            title: '登录-' + config.baseBlogTitle,
            auth: false
        }
    }
]
//导入路由集
const modulesFiles = require.context('./modules', true, /\.js$/)
modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    if (moduleName === 'test' && process.env.NODE_ENV === 'production') {
        return
    }
    const value = modulesFiles(modulePath).default;
    if (value) {
        if (value instanceof Array) {
            for (let item of value) {
                routes.push(item)
            }
            // routes = routes.concat(value)
        } else {
            routes.push(value);
        }
    }
}, {})
routes.push({
    path: '/404',
    component: () => import('@/views/ErrorPage/404'),
    meta: {
        title: '404',
        auth: false
    }
});
routes.push({
    path: '*',
    component: () => import('@/views/ErrorPage/404'),
    meta: {
        title: '404',
        auth: false
    }
});
export default routes;

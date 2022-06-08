import config from '@/config/router.js'

export default [
    {
        path: '/console',
        name: 'ConsoleLayout',
        group: '前端-控制台',
        component: () => import('@/views/Console/layout.vue'),
        meta: {
            title: config.baseBlogTitle
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                meta: {
                    title: '仪表盘',
                    lang: true
                },
                component: () => import('@/views/Console/Dashboard'),
            },
            {
                path: 'college',
                name: 'College',
                component: () => import('@/views/Console/College'),
                meta: {
                    title: '学院管理'
                }
            },
            {
                path: 'professional',
                name: 'Professional',
                component: () => import('@/views/Console/Professional'),
                meta: {
                    title: '专业管理'
                }
            },
            {
                path: 'class',
                name: 'ClassGrade',
                component: () => import('@/views/Console/ClassGrade'),
                meta: {
                    title: '班级管理'
                }
            },
            {
                path: 'class/:id',
                name: 'ClassDetail',
                component: () => import('@/views/Console/ClassDetail'),
                meta: {
                    title: '班级详情'
                }
            },
            {
                path: 'teacher',
                name: 'Teacher',
                component: () => import('@/views/Console/Teacher'),
                meta: {
                    title: '教师管理'
                }
            },
            {
                path: 'student',
                name: 'Student',
                component: () => import('@/views/Console/Student'),
                meta: {
                    title: '学生管理'
                }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/Console/Profile'),
                meta: {
                    title: '个人信息'
                },
            }
        ]
    }
]

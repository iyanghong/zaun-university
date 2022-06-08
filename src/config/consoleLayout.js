export default {
    //默认显示且固定的tags
    defaultTags: [
        // 'test/layout/admin/dataGenerate'

        '/console/dashboard'
    ],
    leftMenu: [
        {
            title: '仪表盘',
            view : '/console/dashboard',
            icon: 'el-icon-s-data'
        },
        {
            title: '学院管理',
            view: '/console/college',
            icon:'el-icon-s-platform',
            auth: [-1]
        },
        {
            title: '专业管理',
            view: '/console/professional',
            icon:'el-icon-menu',
            auth: [-1]
        },
        {
            title: '教师管理',
            view: '/console/teacher',
            icon: 'el-icon-s-custom',
            auth: [-1]
        },
        {
            title: '班级管理',
            view: '/console/class',
            icon:'el-icon-s-flag',
            auth: [-1, 1]
        },
        {
            title: '学生管理',
            view: '/console/student',
            icon: 'el-icon-user',
            auth: [-1, 1]
        }
    ]

}

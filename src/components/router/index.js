const router = [
    {
        title:"控制台",
        icon:"index",
        key:"/index"
    },
    {
        title:"用户管理",
        icon:"laptop",
        key:"/index/user",
        child:[
            {
                title:"用户列表",
                key:"/index/user/list",
                icon:""
            },
            {
                title:"添加用户",
                key:"/index/user/add",
                icon:""
            }
        ]
    },
    {
        title:"部门管理",
        icon:"bars",
        key:"/index/department",
        child:[
            {
                title:"部门列表",
                key:"/index/department/list",
                icon:""
            },
            {
                title:"添加部门",
                key:"/index/department/add",
                icon:""
            }
        ]
    },
    {
        title:"职位管理",
        icon:"edit",
        key:"/home/entry",
        child:[
            {
                title:"职位列表",
                key:"/home/entry/form/basic-form",
                icon:""
            },
            {
                title:"添加职位",
                key:"/home/entry/form/step-form",
                icon:""
            }
        ]
    },
    {
        title:"请假",
        icon:"info-circle-o",
        key:"/home/about1"
    },
    {
        title:"加班",
        icon:"info-circle-o",
        key:"/home/about"
    }
]

export default router;
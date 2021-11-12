let pages=
[
    {
        title:"主页",
        class:"menu-icon glyphicon glyphicon-home",
        src:"/System/Main"
    },
    {
        title:"用户数据",
        class:"menu-icon glyphicon glyphicon-user",
        sub_pages:
        [
            {
                src:"/user/list",
                title:"用户列表"
            },
            {
                src:"/user/loginregister",
                title:"注册登陆"
            }
        ]
    },
    {
        title:"产品数据",
        class:"menu-icon glyphicon glyphicon-question-sign",
        src:"/product/list"
    },
    {
        title:"订单统计",
        class:"menu-icon glyphicon glyphicon-question-sign",
        src:"/order/list"
    },
    // {
    //     title:"问题&反馈",
    //     class:"menu-icon glyphicon glyphicon-question-sign",
    //     src:"/qa/qalist"
    // },
    // {
    //     title:"微信公众号",
    //     class:"menu-icon glyphicon glyphicon-question-sign",
    //     src:"/qa/qalist"
    // },
    {
        title:"微信客服",
        class:"menu-icon glyphicon glyphicon-question-sign",
        src:"/wechat/OnlineInfo"
    }
]
// id字段为页面路由&页面权限id 
// 二级页面默认不配置icon
const Menu = {
    data: [
        {   title: '首页', id: 'Index', icon: 'bi-house' },
        {   title: '院校管理', icon: 'bi-building',
            children: [
                { title: '院校列表', id: 'SchoolList', },
                { title: '院校管理（vue2写法）', id: 'SchoolList2', },
            ]
            
        },
        {   title: '其他功能', icon: 'bi-bar-chart',
            children: [
                {   title: '图表/地图', 
                    children: [
                        { title: '图表使用', id: 'Charts', },
                        { title: '地图使用', id: 'Map', },
                    ]
                },
                { title: '文本编辑器', id: 'Editor', },
                { title: '嵌套页面', id: 'Iframe', },
            ]
        },
        {   title: '系统设置', icon: 'bi-nut',
            children: [
                { title: '权限设置', id: 'RoleSet', },
            ]
        },
        // 配置菜单权限后删除
        {   title: '异常页面', icon: 'bi-exclamation-diamond',
            children: [
                { title: '403', id: '403', },
                { title: '404', id: '404', },
            ]
        },
    ]
}
export default Menu
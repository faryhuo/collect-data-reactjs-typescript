import {PieChartOutlined } from '@ant-design/icons';

export interface MenuItem{
    text:string,
    link?:string,
    subItem?:Array<MenuItem> | null,
    icon?:any
}
export default (()=>{

    const menuItems:Array<MenuItem>=[{
        text:"Generate License File",
        link:"LicenseGenerator",
        icon: PieChartOutlined
    },{
        text:"Menu1",
        icon:PieChartOutlined,
        subItem:[
            {
                text:"Menu2",
                icon:PieChartOutlined,
                subItem:[
                    {
                        text:"Menu3",
                        icon:PieChartOutlined,
                        subItem:[
                            {
                                text:"Menu4",
                                link:"Menu4",
                                icon:PieChartOutlined}
                        ]
                    }
                ]
            }
        ]
    }];

return menuItems;
})();

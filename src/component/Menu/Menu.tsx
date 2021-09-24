import React, { ReactElement, ReactNode } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
}from '@ant-design/icons';
import './Menu.styl';
import {Link } from 'react-router-dom';
import {MenuItem} from 'common/MenuConfig';


export interface Props{
  menuItems:Array<MenuItem>
}
interface State{
  collapsed:boolean
}
const { SubMenu } = Menu;

class MenuList extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
          collapsed: true,
        }
    }
    
    toggleCollapsed():void{
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };

    getMenuItem(menuItems:Array<MenuItem>,key:number=0):Array<any>{
      let arr:Array<any>=[];
       
      for(let i=0;i<menuItems.length;i++){
        let menuItem:MenuItem=menuItems[i];
        let props:any={
          key:key
        };
        key++;
        let link:ReactNode;
        if(menuItem.link){
          link=<Link to={menuItem.link}>{menuItem.text}</Link>;
        }else{
          link=<span>{menuItem.text}</span>;
        }
        menuItem.icon && (props.icon=React.createElement(menuItem.icon,null,null));
        if(!menuItem.subItem){
          let element=(<Menu.Item {...props}>
                        {link}
                    </Menu.Item>);
          arr.push(element);
        }else{
          let element=(<SubMenu  {...props} title={menuItem.text} >
            {menuItem.subItem && 
            this.getMenuItem(menuItem.subItem,key)}
          </SubMenu>);
           arr.push(element);

        }
      }
      return arr;
    }

    render() :ReactElement{
        const menuItems=this.getMenuItem(this.props.menuItems);
        return (
            <div className="Menu" style={{ width: this.state.collapsed?80:256 }}>
            <Menu
              defaultSelectedKeys={['0']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              {menuItems}
            <Button type="primary" onClick={()=>{this.toggleCollapsed()}} style={{ marginBottom: 16 }}>
              {this.state.collapsed ? <MenuUnfoldOutlined></MenuUnfoldOutlined> : <MenuFoldOutlined></MenuFoldOutlined>}
            </Button>
            </Menu>
          </div>
        );
    }
}

export default MenuList;
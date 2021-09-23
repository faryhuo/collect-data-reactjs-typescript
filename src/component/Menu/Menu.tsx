import React, { ReactElement, ReactNode } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
}from '@ant-design/icons';
import './Menu.styl';
import {Link } from 'react-router-dom';

export interface MenuItem{
  text:string,
  link?:string,
  subItem?:any,
  icon?:any
}

export interface Props{
  menuItems:Array<MenuItem>
}
interface State{
  collapsed:boolean
}
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

    getMenuItem():Array<any>{
      let arr:Array<any>=[];
      for(let i=0;i<this.props.menuItems.length;i++){
        let menuItem:MenuItem=this.props.menuItems[i];
        let props:any={
          key:i
        };
        let link:ReactNode;
        if(menuItem.link){
          link=<Link to={menuItem.link}>{menuItem.text}</Link>;
        }else{
          link=<span>{menuItem.text}</span>;
        }
        menuItem.icon && (props.icon=menuItem.icon);
        let element=(<Menu.Item {...props}>
                      {link}
                  </Menu.Item>)
        arr.push(element)
      }
      return arr;
    }

    render() :ReactElement{
        const menuItems=this.getMenuItem();
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
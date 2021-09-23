import React, { ReactElement } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined
}from '@ant-design/icons';
import './Menu.styl';

export interface Props{

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

    render() :ReactElement{
        return (
            <div className="Menu" style={{ width: this.state.collapsed?80:256 }}>
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Generate License File
              </Menu.Item>
              <Button type="primary" onClick={()=>{this.toggleCollapsed()}} style={{ marginBottom: 16 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            </Menu>
          </div>
        );
    }
}

export default MenuList;
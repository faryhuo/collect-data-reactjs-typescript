import Avatar from 'component/Avatar/Avatar';
import React, { ChangeEvent, ReactElement } from 'react';
import {Menu } from 'antd';

import './Header.styl';
import SearchInput from 'component/SearchInput/SearchInput';
export interface Props{
  icon:React.ReactNode,
  username?:string,
  searchInput?:{
   onChange?:(e:ChangeEvent<HTMLInputElement>)=>void,
   value?:string
  }
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State{
  //
}

class Header extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }
    
    getActionMenu():ReactElement{
      return (<Menu><Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
              </a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
              </a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
              </a>
            </Menu.Item>
          </Menu>)
    }


    render():ReactElement {
        return (
          <div className="Header">
            <div className="header-icon">{this.props.icon}</div>
            <div className="header-content">
                {this.props.searchInput &&<div className="search">
                  <SearchInput {...this.props.searchInput}></SearchInput>
                </div>}
            </div>
            <div className="header-avatar"><Avatar menu={this.getActionMenu()} username={this.props.username || 'admin'}></Avatar></div>
          </div>
        );
    }
}

export default Header;
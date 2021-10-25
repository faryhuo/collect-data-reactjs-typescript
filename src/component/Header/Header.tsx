import Avatar from 'component/Avatar/Avatar';
import React, { ChangeEvent, ReactElement } from 'react';

import './Header.styl';
import SearchInput from 'component/SearchInput/SearchInput';
export interface Props{
  icon:React.ReactNode,
  username?:string,
  searchInput?:{
   onChange?:(e:ChangeEvent<HTMLInputElement>)=>void,
   value?:string
  },
  getActionMenu?:()=>ReactElement
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
    


    render():ReactElement {
      return (
        <div className="Header">
          <div className="header-icon">{this.props.icon}</div>
          <div className="header-content">
              {this.props.searchInput &&<div className="search">
                <SearchInput {...this.props.searchInput}></SearchInput>
              </div>}
          </div>
          <div className="header-avatar"><Avatar menu={this.props.getActionMenu?this.props.getActionMenu():undefined} username={this.props.username || 'admin'}></Avatar></div>
        </div>
      );
    }
}

export default Header;
import Avatar from 'component/Avatar/Avatar';
import React, { ReactElement } from 'react';
import './Header.styl';
export interface Props{
  icon:React.ReactNode,
  username?:string
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
            <div className="header-content"></div>
            <div className="header-avatar"><Avatar username={this.props.username || 'admin'}></Avatar></div>
          </div>
        );
    }
}

export default Header;
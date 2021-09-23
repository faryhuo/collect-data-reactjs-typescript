import React, { ReactElement } from 'react';
import './Header.styl';
export interface Props{
  title:React.ReactNode
}
interface State{
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

          </div>
        );
    }
}

export default Header;
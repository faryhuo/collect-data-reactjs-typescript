import React, { ReactElement } from 'react';
import './Split.styl';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props{
  height?:number
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State{
}

class Split extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }


    render():ReactElement {
        return (
          <div className="Split" style={{height:(this.props.height || 15)}}>

          </div>
        );
    }
}

export default Split;
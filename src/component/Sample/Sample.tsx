import React, { ReactElement } from 'react';
import './Header.styl';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props{
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State{
  //
}

class Sample extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }


    render(): ReactElement {
        return (
            <div className="Sample">

          </div>
        );
    }
}

export default Sample;
import { Spin } from 'antd';
import React, { ReactElement } from 'react';
import './Loading.styl';
export interface Props{
  display: boolean
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State{
}

class Loading extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }


    render():ReactElement {
        return (
            <div className="Loading">
                {this.props.display && <div className="loading">                
                    <Spin size="large" tip="Loading..."></Spin>
                </div>}
          </div>
        );
    }
}

export default Loading;
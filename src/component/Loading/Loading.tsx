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

    getProps(){
      return {
        size:"large" as "large" | "default" | "small" | undefined,
        tip:"Loading..."
      }
    }


    render():ReactElement {
      const props=this.getProps();
        return (
            <div className="Loading">
                {this.props.display && <div className="loading">                
                    <Spin size={props.size} tip={props.tip}></Spin>
                </div>}
          </div>
        );
    }
}

export default Loading;
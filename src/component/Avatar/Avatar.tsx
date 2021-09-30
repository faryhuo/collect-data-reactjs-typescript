import React, { ReactElement } from 'react';
import { Avatar as BaseAvatar } from 'antd';
import './Avatar.styl';

export interface Props{
  username:string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State{
  //
}

class Avatar extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }


    render(): ReactElement {
        return (
          <div className="Avatar">
            <BaseAvatar size="large" gap={1}>
              {this.props.username}
            </BaseAvatar>
          </div>
        );
    }
}

export default Avatar;
import React, { ReactElement } from 'react';
import { Avatar as BaseAvatar, Dropdown } from 'antd';
import './Avatar.styl';

export interface Props{
  username:string,
  menu?:React.ReactElement | (() => React.ReactElement);
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
      const userAvatar=(<BaseAvatar size="large" gap={1}>
                          {this.props.username}
                        </BaseAvatar>);
        return (
          <div className="Avatar">
            {this.props.menu && <Dropdown trigger={['click']} overlay={this.props.menu} placement="bottomLeft" arrow>
              {userAvatar}
            </Dropdown>}
            {!this.props.menu && userAvatar}
          </div>
        );
    }
}

export default Avatar;
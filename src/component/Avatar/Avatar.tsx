import React, { ReactElement } from 'react';
import { Avatar as BaseAvatar, Dropdown } from 'antd';
import './Avatar.styl';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';

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

    getProps(){
      return {
        size:"large" as AvatarSize | undefined,
        placement:"bottomLeft" as "bottomLeft" | "topLeft" | "topCenter" | "topRight" | "bottomCenter" | "bottomRight" | undefined,
        trigger:['click'] as ("click" | "hover" | "contextMenu")[],
        arrow:true
      }
    }
    


    render(): ReactElement {
      const props=this.getProps();
      const userAvatar=(
          <BaseAvatar size={props.size} gap={1}>
            {this.props.username}
          </BaseAvatar>
      );
      return (
        <div className="Avatar">
          {this.props.menu && <Dropdown trigger={props.trigger} overlay={this.props.menu} placement={props.placement} arrow={props.arrow}>
            {userAvatar}
          </Dropdown>}
          {!this.props.menu && userAvatar}
        </div>
      );
    }
}

export default Avatar;
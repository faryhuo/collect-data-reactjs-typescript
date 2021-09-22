import React from 'react';
import './PreviewHTML.styl';
import { Modal, Button } from 'antd';


export interface Props{
  visible:boolean,
  handleCancel:Function,
  title:React.ReactNode,
  children:any
}
interface State{
}

class PreviewHTML extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }



    render() {
        return (
            <div className="PreviewHTML"  >
               <Modal bodyStyle={{overflow:"auto",height:"500px"}} width="95%"
          visible={this.props.visible}
          title={this.props.title}
          onCancel={()=>{this.props.handleCancel()}}
          footer={[
            <Button key="back" onClick={()=>{this.props.handleCancel()}}>
              Cancel
            </Button>
          ]}
        >
          {<html  dangerouslySetInnerHTML={{__html: this.props.children}}></html>}
        </Modal>
            </div>
        );
    }
}

export default PreviewHTML;
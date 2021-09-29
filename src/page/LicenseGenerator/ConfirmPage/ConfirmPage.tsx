import React, { ReactElement, ReactNode } from 'react';
import { Button} from 'antd';
import {LicenseTable,Panel} from 'src/component';
import {LicenseInfoStore} from 'src/store'
import './ConfirmPage.styl';

export interface Props {
  showMessage:(msg:string | ReactNode,action:{onOk?:()=>void,onCancel?:()=>void}) => void,
  nextStep:()=>void,
  licenseInfoStore: LicenseInfoStore,
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
}
class ConfirmPage extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props);
    //react state
    this.state={
    }
  }


  render() :ReactElement{
    return (
        <div className="ConfirmPage">
          <Panel title="Confrim need upload file">
            <div className="data-list">
                <LicenseTable licenseInfoStore={this.props.licenseInfoStore} showMessage={this.props.showMessage}></LicenseTable>
            </div>
          </Panel> 
          <div  className="action-button">
            <Button type="primary" onClick={()=>{this.props.nextStep()}}>Next</Button>
          </div>
      </div>
    );
  }
}

export default ConfirmPage;
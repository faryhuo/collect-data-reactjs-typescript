import React, { ReactElement, ReactNode } from 'react';
import { Button} from 'antd';
import LicenseTable from 'component/LicenseTable/LicenseTable';
import './ConfirmPage.styl';
import Panel from 'component/Panel/Panel';
import {LicenseInfoStore} from 'store/LicenseInfoStore'
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
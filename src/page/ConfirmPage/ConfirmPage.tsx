import React from 'react';
import { Button} from 'antd';
import LicenseTable from 'component/LicenseTable/LicenseTable';
import './ConfirmPage.styl';
import Panel from 'component/Panel/Panel';
import {LicenseInfoStore} from 'store/LicenseInfoStore'
export interface Props {
  showMessage:Function,
  nextStep:Function,
  licenseInfoStore: LicenseInfoStore,
}
interface State {
  dataSource:any
}
class ConfirmPage extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
          dataSource:[]
        }
    }


    render() {
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
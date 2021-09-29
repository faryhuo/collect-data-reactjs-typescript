import React, { ReactElement, ReactNode } from 'react';
import { Button} from 'antd';
import {LicenseTable,Panel, Split} from 'src/component';
import {LicenseInfoStore,HomePageStore} from 'src/store';
import axios from 'axios';

import './ConfirmPage.styl';

export interface Props {
  showMessage:(msg:string | ReactNode,action:{onOk?:()=>void,onCancel?:()=>void}) => void,
  nextStep:()=>void,
  showErrorMessage:(errorMessage:string) => void,
  licenseInfoStore: LicenseInfoStore,
  homePageStore: HomePageStore,

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

  exportExcel():void{
    const self=this;
    self.props.homePageStore.showLoading();
    axios({
        url: '/api/exportReport',
        method: 'post',
        responseType: 'blob'})
        .then((res2) => { // 处理返回的文件流
          const content = res2.data;
          const blob = new Blob([content]);
          let fileName="upload license information.xlsx";
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else { // IE10+下载
            //navigator?.msSaveBlob(blob, fileName);
          }
          self.props.homePageStore.closeLoading();
      }).catch(function(error){
          console.log(error);
          self.props.showErrorMessage("Fail to export the data.");
          self.props.homePageStore.closeLoading();
      });
  }


  render() :ReactElement{
    return (
        <div className="ConfirmPage">
          <Panel title="Confrim need upload file">
            <div className="data-list">
                <LicenseTable licenseInfoStore={this.props.licenseInfoStore} showMessage={this.props.showMessage}></LicenseTable>
            </div>
            <Split></Split>
            <div  className="action-button">
              <Button type="primary" onClick={()=>{this.exportExcel()}}>Export Excel</Button>
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
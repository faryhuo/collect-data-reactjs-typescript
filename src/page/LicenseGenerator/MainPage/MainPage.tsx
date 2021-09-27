import React, { ReactElement, ReactNode } from 'react';
import './MainPage.styl';
import CollectData from 'page/LicenseGenerator/CollectData/CollectData';
import ExcelUploadPage from 'page/LicenseGenerator/ExcelUploadPage/ExcelUploadPage';
import FinishPage from 'page/LicenseGenerator/FinishPage/FinishPage';
import ConfirmPage from 'page/LicenseGenerator/ConfirmPage/ConfirmPage';
import { Steps} from 'antd';
import {LicenseInfoStore} from 'store/LicenseInfoStore'
import {HomePageStore} from 'store/HomePageStore'
const { Step} = Steps;

export interface Props{
  showMessage:(msg:string | ReactNode,action:{onOk?:()=>void,onCancel?:()=>void}) => void,
  showErrorMessage:(errorMessage:string | ReactNode,) => void,
  licenseInfoStore:LicenseInfoStore,
  homePageStore:HomePageStore
}
interface State{
  current:number,
  maxCurrent:number
}
enum StepStatus{
  Finish="finish",
  Process="process",
  Wait="wait"
}

class MainPage extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
          current: 0,
          maxCurrent:0
        }
        
    }

    nextStep(current:number):void{
      this.setState({ current:current,
      maxCurrent:current });
    }

    onChange(current:number):void{
      if(current<=this.state.maxCurrent && current!==this.state.current){
        this.setState({ current });
      }
    }

    getPageBycurrent():ReactNode{
      let propsAttr={
        showMessage:this.props.showMessage,
        showErrorMessage:this.props.showErrorMessage
      };
      switch(this.state.current){
        case 0:return <CollectData homePageStore={this.props.homePageStore} licenseInfoStore={this.props.licenseInfoStore}
         {...propsAttr} nextStep={()=>this.nextStep(1)}></CollectData>
        case 1:return <ConfirmPage licenseInfoStore={this.props.licenseInfoStore}
         {...propsAttr} nextStep={()=>this.nextStep(2)}></ConfirmPage>
        case 2:return <ExcelUploadPage homePageStore={this.props.homePageStore} licenseInfoStore={this.props.licenseInfoStore}
        {...propsAttr} nextStep={()=>this.nextStep(3)}></ExcelUploadPage>
        case 3:return <FinishPage nextStep={()=>this.nextStep(0)}></FinishPage>
        default:return <FinishPage nextStep={()=>this.nextStep(0)}></FinishPage>
      }
    }


    getStepStatus(current:number):StepStatus{
      if(current<this.state.maxCurrent){
        return StepStatus.Finish
      }else if(current===this.state.maxCurrent){
        return StepStatus.Process
      }else{
        return StepStatus.Wait;
      }
    }

    render() :ReactElement{
        return (
            <div className="MainPage">
              <div className="step-content">
                  {this.getPageBycurrent()}
              </div>
              <div className="step-wrapper">
                <Steps           
                type="navigation"
            current={this.state.current}
            onChange={(current)=>{this.onChange(current)}}
            className="site-navigation-steps">
                  <Step status={this.getStepStatus(0)} title="Upload license file"  />
                  <Step status={this.getStepStatus(1)}  title="Confirm license file"  />
                  <Step status={this.getStepStatus(2)} title="Upload excel file"  />
                  <Step status={this.getStepStatus(3)}  title="Done"  />
                </Steps>    
              </div>          
          </div>
        );
    }
}

export default MainPage;
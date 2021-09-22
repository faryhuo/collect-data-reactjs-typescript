import React from 'react';
import 'page/HomePage/HomePage.styl';
import MenuList from 'component/Menu/Menu';
import MainPage from 'page/MainPage/MainPage';
import { Spin,Modal} from 'antd';
import { observer } from 'mobx-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { HomePageStore } from 'store/HomePageStore';
import { LicenseInfoStore } from 'store/LicenseInfoStore';

import 'antd/dist/antd.css';

export interface Props{
    homePageStore:HomePageStore,
    licenseInfoStore:LicenseInfoStore
}

@observer
class HomePage extends React.Component<Props>{
    constructor(props:Props) {
        super(props);
        //react state
        this.state={

        }
    }

    destroyAll() {
        Modal.destroyAll();
    }
      
    showMessage(msg:any,action:{onOk?:Function,onCancel?:Function}) {
        const { confirm } = Modal;
        let self=this;
        var config={
            icon: <ExclamationCircleOutlined />,
            content: <div >{msg}</div>,
            onOk() {
                self.destroyAll()
            },
            onCancel() {
                self.destroyAll()
            },
        };
        if(action){
            if(action.onOk){
                config.onOk=()=>{
                    action?.onOk && action.onOk();
                    self.destroyAll()
                }
            }
            if(action.onCancel){
                config.onCancel=()=>{
                    action?.onCancel && action.onCancel();
                    self.destroyAll()
                }
            }
        }
        confirm(config);       
      }
    

    render() {
        return (
            <div className="HomePage" >
                <div className="menu-wrapper">
                     <MenuList></MenuList>                    
                </div>
                <div className="contain-wrapper">
                    <MainPage 
                    homePageStore={this.props.homePageStore} licenseInfoStore={this.props.licenseInfoStore}
                    showMessage={(msg:any,action:{onOk?:Function,onCancel?:Function})=>{this.showMessage(msg,action)}}></MainPage>
                </div>
                {this.props.homePageStore.loading && <div className="loading">                
                    <Spin size="large" tip="Loading..."></Spin>
                </div>}
            </div>
        );
    }
}

export default HomePage;
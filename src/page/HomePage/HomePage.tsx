import React, { ReactElement, ReactNode } from 'react';
import 'page/HomePage/HomePage.styl';
import MenuList from 'component/Menu/Menu';
import LicenseGenerator from 'page/LicenseGenerator';
import { Spin,Modal} from 'antd';
import { observer } from 'mobx-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { HomePageStore,LicenseInfoStore } from 'store/index';
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import menuItems from 'common/MenuConfig';
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

    showErrorMessage(msg:string | ReactNode):void{
        const { error } = Modal;
        let self=this;
        let config={
            content: <div >{msg}</div>,
            onOk() {
                self.destroyAll()
            }
        };
        error(config);
    }
      
    showMessage(msg:string | ReactNode,action:{onOk?:()=>void,onCancel?:()=>void}):void{
        const { confirm } = Modal;
        let self=this;
        let config={
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
    


    render() :ReactElement{
        const mainPage=(
            <LicenseGenerator 
                    homePageStore={this.props.homePageStore} licenseInfoStore={this.props.licenseInfoStore}
                    showMessage={this.showMessage.bind(this)}
                    showErrorMessage={this.showErrorMessage.bind(this)}
                    ></LicenseGenerator>);
        return (
            <div className="HomePage" >
                <Router>          
                <div className="menu-wrapper">
                     <MenuList menuItems={menuItems}></MenuList>                    
                </div>
                <div className="contain-wrapper">      
                 <Switch>   
                    <Route path="/LicenseGenerator" exact
                     render={()=>mainPage}
                    ></Route>
                    <Redirect to="/LicenseGenerator" from='/' /> 
                    </Switch>
                </div>
                {this.props.homePageStore.loading && <div className="loading">                
                    <Spin size="large" tip="Loading..."></Spin>
                </div>}
                </Router>
            </div>
        );
    }
}

export default HomePage;
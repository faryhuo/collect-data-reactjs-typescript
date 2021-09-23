import React, { ReactElement } from 'react';
import 'page/HomePage/HomePage.styl';
import MenuList,{MenuItem} from 'component/Menu/Menu';
import MainPage from 'page/MainPage/MainPage';
import { Spin,Modal} from 'antd';
import { observer } from 'mobx-react';
import { ExclamationCircleOutlined,PieChartOutlined } from '@ant-design/icons';
import { HomePageStore } from 'store/HomePageStore';
import { LicenseInfoStore } from 'store/LicenseInfoStore';
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

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
    
    getMenuItems():Array<MenuItem>{
        let menuItem:Array<MenuItem>=[{
            text:"Generate License File",
            link:"LicenseGenerator",
            icon:<PieChartOutlined></PieChartOutlined>
        }];


        return menuItem;
    }

    render() :ReactElement{
        const mainPage=(
            <MainPage 
                    homePageStore={this.props.homePageStore} licenseInfoStore={this.props.licenseInfoStore}
                    showMessage={this.showMessage.bind(this)}></MainPage>);
        return (
            <div className="HomePage" >
                <Router>          
                <div className="menu-wrapper">
                     <MenuList menuItems={this.getMenuItems()}></MenuList>                    
                </div>
                <div className="contain-wrapper">      
                 <Switch>   
                    <Route path="/LicenseGenerator" exact
                     render={()=>{return mainPage}}
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
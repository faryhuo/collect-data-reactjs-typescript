import React, { ReactElement, ReactNode } from 'react';
import {Menu,Loading, Header} from 'src/component';
import LicenseGenerator from 'page/LicenseGenerator';
import { Modal} from 'antd';
import { observer } from 'mobx-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { HomePageStore,LicenseInfoStore } from 'src/store';
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import menuItems from 'common/MenuConfig';
import 'page/HomePage/HomePage.styl';
import 'antd/dist/antd.css';
import logo from 'src/logo.svg';

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

    destroyAll():void {
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
        
    //   getActionMenu():ReactElement{
    //     return (<Menu><Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //               1st menu item
    //             </a>
    //           </Menu.Item>
    //           <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
    //               2nd menu item
    //             </a>
    //           </Menu.Item>
    //           <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
    //               3rd menu item
    //             </a>
    //           </Menu.Item>
    //         </Menu>)
    //   }


    render() :ReactElement{
        const licenseGenerator=(
            <LicenseGenerator 
                    homePageStore={this.props.homePageStore} licenseInfoStore={this.props.licenseInfoStore}
                    showMessage={this.showMessage.bind(this)}
                    showErrorMessage={this.showErrorMessage.bind(this)}
                    ></LicenseGenerator>);
        return (
            <div className="HomePage" >
                <Router>          
                    <div className="menu-wrapper">
                        <Menu icon={{img:logo,title:"Admin Tool"}} menuItems={menuItems}></Menu>                    
                    </div>
                    <div className="contain-wrapper">      
                    <Header searchInput={{value:"AAA"}} icon={<div>Admin tool</div>}></Header>
                    <Switch>   
                        <Route path="/LicenseGenerator" exact
                            render={()=>licenseGenerator}
                        ></Route>
                        <Redirect to="/LicenseGenerator" from='/' /> 
                    </Switch>
                    </div>
                    <Loading display={this.props.homePageStore.loading}></Loading>
                </Router>
            </div>
        );
    }
}

export default HomePage;
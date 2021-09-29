import React, { ReactElement, ReactNode } from 'react';
import {Button} from 'antd';
import {HtmlTable,Panel,DraggerUpload,Split} from 'src/component';
import {FileNew, LicenseInfoStore} from 'store/LicenseInfoStore'
import {HomePageStore} from 'store/HomePageStore'
import { observer } from 'mobx-react';
import axios from 'axios';
import './CollectData.styl';

export interface Props {
    licenseInfoStore: LicenseInfoStore,
    homePageStore: HomePageStore,
    showMessage:(msg:string | ReactNode,action:{onOk?:()=>void,onCancel?:()=>void}) => void,
    nextStep:()=>void,
    showErrorMessage:(msg:string | ReactNode)=>void
}
interface State {
    fileList:Array<any>,
    fileMap:any
}

interface UploadProps {
    accept:string,
    multiple: boolean,
    name:string,
    showUploadList:boolean,
    fileList:Array<any>,
    uploading:boolean,
    beforeUpload:(file:any)=>void,
    buttonText:string,
    hint:string
}

@observer
class CollectData extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        //react state
        this.state={
            fileList:this.props.licenseInfoStore.fileList,
            fileMap:this.props.licenseInfoStore.fileMap || {}
        }
    }

    getUploadProps():UploadProps{
        let self=this;
        return {
            accept:".htm,.html",
            buttonText:"Click or drag file to this area to upload",
            hint:`Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files`,
            multiple:true,
            name:"files",
            showUploadList:false,
            fileList:this.state.fileList,
            uploading: false,
            beforeUpload: (file: FileNew) => {
                let fileMap=self.state.fileMap;
                //file[]
                if(fileMap[file.name]){
                    if(fileMap[file.name].lastModifiedDate<file.lastModifiedDate){
                        fileMap[file.name]=file;
                        self.setState({
                            fileMap: fileMap
                        });
                    }
                }else{
                    fileMap[file.name]=file;
                    self.setState({
                        fileMap: fileMap
                    });
                }
                self.props.licenseInfoStore.addFile(file);
                self.setState((state) => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            }
        }
    }

    submit ():void{
        this.props.homePageStore.showLoading();
        const self=this;
        const formData = new FormData();
        const licenseInfoStore=this.props.licenseInfoStore;
        if(licenseInfoStore.fileList.length===0){
            this.props.homePageStore.closeLoading();
            this.props.showErrorMessage("Please confrim if upload the excel file and html file.");
            return;
        }
        for(let item in licenseInfoStore.fileList){
          let file=licenseInfoStore.fileList[item];  
          formData.append('files', file);
        }
        axios({
          url: '/api/checkLicenseFile',
          method: 'post',
          data: formData})
          .then((res) => { 
            console.log(res);
            self.props.homePageStore.closeLoading();
            if(res.data.status===0){
                licenseInfoStore.licenseInfoList=res.data.data;
                self.props.nextStep();
            }           
        }).catch(function(error){
            console.log(error);
            const errorMessage="Has internal server error, please check the log file.";
            self.props.showErrorMessage(errorMessage)
            self.props.homePageStore.closeLoading();
        });
        
    }


    render() :ReactElement{
        const uploadProps=this.getUploadProps();
        return (
            <div className="CollectData" >
                {/* <div style={{"textAlign":"center"}}>
                    <h2>Upload the license information file (html file)</h2>
                </div> */}
                <Panel title="Upload the license information file (html file)">
                    <DraggerUpload {...uploadProps}></DraggerUpload>
                </Panel>
                <Split></Split>
                <Panel title="Upload file information">
                    <div className="data-list">
                        <HtmlTable licenseInfoStore={this.props.licenseInfoStore} showMessage={this.props.showMessage}></HtmlTable>
                    </div>
                </Panel>
                <div  className="action-button">
                    <Button disabled={this.state.fileList.length>0?false:true} type="primary" onClick={()=>{this.submit()}}>Next</Button>
                </div>
            </div>
        );
    }
}

export default CollectData;
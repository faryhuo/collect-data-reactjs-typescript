import React, { ReactElement } from 'react';
import { Upload, Button,Modal,Alert } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './ExcelUploadPage.styl';
import axios from 'axios';
import { observer } from 'mobx-react';
import Panel from 'component/Panel/Panel';
import {LicenseInfoStore} from 'store/LicenseInfoStore';
import {HomePageStore} from 'store/HomePageStore';

const { Dragger } = Upload;

export interface Props {
    licenseInfoStore: LicenseInfoStore,
    homePageStore: HomePageStore,
    showMessage:Function,
    nextStep:Function
}

interface State {
    enableNext:boolean,
    name:string,
    errorMessage:any,
    excelFile:any,
    fileList:any
}

interface UploadProps {
    multiple: boolean,
    fileList:any,
    uploading:boolean,
    beforeUpload:any,
    showUploadList:any
}

@observer
class ExcelUploadPage extends React.Component<Props,State>{
    constructor(props:Props) {
        super(props);
        axios.defaults.timeout=30000000;
        //this.props.homePageStore.showLoading();
        //react state
        this.state={
            fileList:[],
            enableNext:this.props.licenseInfoStore.validExcelFile,
            name:"excelFile",
            errorMessage:"",
            excelFile:this.props.licenseInfoStore.excelFile
        }
        if(this.props.licenseInfoStore.excelFile && this.props.licenseInfoStore.validExcelFile){
            this.state.fileList.push(this.props.licenseInfoStore.excelFile)
        }
    }
    destroyAll():void {
        Modal.destroyAll();
    }
    getUploadProps():UploadProps{
        let self:ExcelUploadPage=this;
        return {
            multiple:false,
            showUploadList:{
                showDownloadIcon: false,
                showRemoveIcon: false
            },
            fileList:this.state.fileList,
            uploading: false,
            beforeUpload: (file:any) => {
                self.setState({
                    excelFile: file,
                    fileList:[file]
                },()=>{
                    self.props.licenseInfoStore.excelFile=file;
                    console.log(self.props.licenseInfoStore);
                    self.handleUpload();
                });
                return false;
            }
        }
    }

    handleUpload ():void{
        let self=this;
        const formData = new FormData();
        formData.append("excelFile",this.state.excelFile);
        axios({
          url: '/api/checkExcelFile',
          method: 'post',
          data: formData,
          responseType: 'json'})
          .then((res) => { 
            console.log(res);
            if(res.status===200 && res.data.status===0){
                self.setState({
                    enableNext:true,
                    errorMessage:""
                },()=>{
                    self.props.licenseInfoStore.validExcelFile=true;
                });
                
            }else{
                self.setState({
                    enableNext:false
                },()=>{
                    self.props.licenseInfoStore.validExcelFile=false;
                });
                if(res.data.message){
                    let message=<pre>{res.data.message}</pre>;
                    self.setState({
                        errorMessage:message
                    });
                }
            }
        }).catch(function(error){
            console.log(error);
            self.setState({
                enableNext:false,
                errorMessage:"Has internal server error, please check the log file."
            },()=>{
                self.props.licenseInfoStore.validExcelFile=false;
            });
            //self.props.showMessage("Has internal server error, please check the log file.");
        });
    }

    downloadFile():void{
        const licenseInfoStore=this.props.licenseInfoStore;
        const self=this;
        axios({
            url: '/api/downloadFile',
            method: 'post',
            responseType: 'blob'})
            .then((res2) => { // 处理返回的文件流
              const content = res2.data;
              const blob = new Blob([content]);
              let fileName=licenseInfoStore.fileName;
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
              self.props.homePageStore.closeLoading();
          });
    }

    submit ():void{
        this.props.homePageStore.showLoading();
        const self=this;
        const formData = new FormData();
        const licenseInfoStore=this.props.licenseInfoStore;
        if(licenseInfoStore.licenseInfoList.length===0 || !licenseInfoStore.excelFile){
            this.props.homePageStore.closeLoading();
            this.props.showMessage("Please confrim if upload the excel file and html file.");
            return;
        }
        var arr=[];
        for(let item in licenseInfoStore.licenseInfoList){
          let licenseInfo=licenseInfoStore.licenseInfoList[item];  
          arr.push(licenseInfo);
        }
        formData.append('computerInfoListStr', JSON.stringify(arr));

        formData.append("excelFile",licenseInfoStore.excelFile);
        axios({
          url: '/api/download',
          method: 'post',
          data: formData})
          .then((res) => { 
            console.log(res);
            self.downloadFile();
            self.props.nextStep(3);
        }).catch(function(error){
            console.log(error);
            const errorMessage="Has internal server error, please check the log file.";
            self.props.showMessage(errorMessage)
            self.props.homePageStore.closeLoading();
        });
        
    }






    render() :ReactElement{
        const uploadProps=this.getUploadProps();
        return (
            <div className="ExcelUploadPage" >
                <Panel title="Upload the excel file">
                    <Dragger {...uploadProps} accept=".xls,.xlsx">
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                        </p>
                    </Dragger>
                    <div className="split"></div>
                    <div>
                        {  this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" />}
                    </div>  
                </Panel>
                <div  className="action-button">
                    <Button disabled={!this.state.enableNext} type="primary" onClick={()=>{this.submit()}}>Next</Button>
                </div>
            </div>
        );
    }
}

export default ExcelUploadPage;
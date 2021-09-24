import {observable, action,makeObservable,computed } from 'mobx';
import _ from 'lodash';

export interface FileNew extends File{
  lastModifiedDate:Date,
  key?:number
}
export interface FileInfo{
  lastModifiedDate?:Date,
  size?:number,
  name?:string,
  file?:File,
  key?:number
}
export class LicenseInfoStore {
  constructor() {
    makeObservable (this,{
      fileList:observable,
      licenseInfoList:observable,
      addFile:action.bound,
      clear:action.bound,
      remove:action.bound,
      htmlFileDataSource:computed,
      licenseInfoDataSource:computed,
      removeLicenseInfo:action.bound
    });
  }
  fileList:Array<FileNew> =[];
  key:number=0;
  licenseInfoList:any=[];
  fileMap={};
  excelFile:FileNew | null=null;
  readonly fileName:string="Company Software License.xlsx";
  validExcelFile:boolean=false;

  get licenseInfoDataSource():Array<object>{
    let dataSource:Array<object>=[];
    for(let i=0;i<this.licenseInfoList.length;i++){
        let obj=this.licenseInfoList[i];
        if(obj.key===null || obj.key===undefined){
          obj.key=i;
        }
        dataSource.push(obj);
    } 
    return dataSource;
  };

  get htmlFileDataSource():Array<FileInfo>{
    let dataSource: Array<FileInfo>=[];
    for(let i=0;i<this.fileList.length;i++){
        let file=this.fileList[i];
        let fileInfo:FileInfo={};
        fileInfo.lastModifiedDate=file.lastModifiedDate;
        fileInfo.size=file.size;
        fileInfo.name=file.name;
        fileInfo.file=file;
        fileInfo.key=file.key;
        dataSource.push(fileInfo);
    } 
    return dataSource;
  };
  
  addFile(file:FileNew):void{
    this.key++;
    file.key=this.key;
    this.fileList.push(file);
  }
  remove(selectedKeys:Array<number>):void{
    for(let i=this.fileList.length-1;i>=0;i--){
      let file=this.fileList[i];
      if(_.indexOf(selectedKeys,file.key)>=0){
        (this.fileList as any).remove(file);
      }
    }
  }

  removeLicenseInfo(selectedKeys:Array<number>):void{
    for(let i=this.licenseInfoList.length-1;i>=0;i--){
      let licenseInfo=this.licenseInfoList[i];
      if(_.indexOf(selectedKeys,licenseInfo.key)>=0){
        this.licenseInfoList.remove(licenseInfo);
      }
    }
  }
  
  clear():void{
    (this.fileList as any).clear();
  }

  

}
const licenseInfoStore=new LicenseInfoStore();
export default licenseInfoStore;
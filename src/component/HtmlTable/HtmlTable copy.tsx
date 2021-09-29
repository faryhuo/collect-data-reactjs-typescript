/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, ReactNode } from 'react';
import { Button } from 'antd';
import { observer} from 'mobx-react';
import _ from 'lodash';
import './HtmlTable.styl';
import PreviewHTML from 'component/PreviewHTML/PreviewHTML';
import { LicenseInfoStore } from 'store/LicenseInfoStore';
import BaseTable,{} from 'component/BaseTable/BaseTable';
import { ColumnType} from 'antd/lib/table';
import { SortOrder } from 'antd/lib/table/interface';

export interface Props{
  licenseInfoStore:LicenseInfoStore,
  showMessage:(msg:string | ReactNode,action:{onOk?:()=>void,onCancel?:()=>void}) => void
}


interface State{
  preview:boolean,
  currentFileName:string,
  loading: boolean,
  fileContent:string | null,
  selectedRowKeys:number[],
  filteredInfo:any,
  sortedInfo:any
}

declare interface IrecordType{
  size:number,
  lastModifiedDate:Date | null,
  name:string,
  file:any
}

@observer
class HtmlTable extends React.Component<Props,State>   {
  constructor(props:Props) {
    super(props);
    // react state
    this.state = {
      fileContent: null,
      filteredInfo: null,
      sortedInfo: null,
      preview: false,
      currentFileName: "",
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    }
  }


  getSortOrder(field:string):SortOrder | undefined {
    let sortedInfo = this?.state?.sortedInfo;
    if(sortedInfo){
      return sortedInfo.field === field && sortedInfo.order; 
    }else{
      return undefined;
    }
  }

  order(record1:any,record2:any):number{
    if(!this.state.sortedInfo){
      return 0;
    }
    let field=this.state.sortedInfo.field;
    if(record1[field] ===record2[field] ){
      return 0;
    }else{
      return  record1[field] > record2[field]?1:-1;
    }
  }



  remove():void{
    if(this.state.selectedRowKeys.length===0){
      return;
    }
    const message="Do you want to delete the record?";
    const self=this;
    const action={
      onOk:() => {
        self.props.licenseInfoStore.remove(self.state.selectedRowKeys);
        self.setState({ selectedRowKeys:[]});
      }
    }
    this.props.showMessage(message,action)
  }

  removeAll():void{
    if(this.props.licenseInfoStore.htmlFileDataSource.length===0){
      return;
    }
    const message="Do you want to delete all record?";
    const self = this;
    const action = {
      onOk:() => {
        self.props.licenseInfoStore.clear();
        self.setState({ selectedRowKeys:[]});
      }
    }
    this.props.showMessage(message,action)
  }

  onSelectChange(selectedRowKeys:Array<number>):void{
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  getTableProps(){
    return {
      columns:this.getColumns(),
      dataSource:this.props.licenseInfoStore.htmlFileDataSource,
      onChange:this.handleChange.bind(this),
      onSelectChange:this.onSelectChange.bind(this),
      selectedRowKeys:this.state.selectedRowKeys
    }
  }

  getColumns():ColumnType<IrecordType>[] {
    return [{
          title: 'File Name',
          dataIndex: 'name',
          key:"name",
          sorter:this.order.bind(this),
          sortOrder: this.getSortOrder.call(this,"name")
        },{
          title:"Size",
          dataIndex:"size",
          render: (size:number) =>{
            let text=_.round(size/1024, 2) +" kb";
            return <span>{text}</span>;
          },
          sorter:this.order.bind(this),
          sortOrder: this.getSortOrder.call(this,"size")
        },{
          title:"last Modified Date",
          dataIndex:"lastModifiedDate",
          render:(lastModifiedDate:Date) => <span>{lastModifiedDate && lastModifiedDate.toDateString()}</span>,
          sorter:this.order.bind(this),
          sortOrder: this.getSortOrder.call(this,"lastModifiedDate")
        },{
          title:"Action",
          dataIndex:"file",
          render: (file:any) => <Button type="link" onClick={()=>{this.review(file)}}>review</Button>,
        }];
    }

    review(file:any):void{
      let reader = new FileReader();
      reader.readAsText(file);
      let self=this;
      reader.onload = function(event:any) {        
        let result=event.target.result;
        console.log(result);
        self.setState({
          preview:true,
          fileContent:result,
          currentFileName:file.name
        })
      }
    }

    handleCancel():void{
      this.setState({ preview: false });
    }

    handleChange(pagination:any, filters:any, sorter:any):void {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      });
    }

    render():ReactElement{
      const tableProps=this.getTableProps();
        return (
            <div className="HtmlTable">
              {this.state.preview && <PreviewHTML title={this.state.currentFileName} handleCancel={()=>{this.handleCancel()}} visible={this.state.preview}>
                {this.state.fileContent}
                </PreviewHTML>}
              <div className="action-button-list" >
                <Button danger onClick={()=>{this.remove()}}> 
                  Remove
                </Button>
                <Button danger onClick={()=>{this.removeAll()}}> 
                  Remove All
                </Button>
              </div>
              <BaseTable {...(tableProps as any)}></BaseTable>
          </div>
        );
    }
}

export default HtmlTable;
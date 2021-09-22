import React from 'react';
import { Table, Button } from 'antd';
import { observer} from 'mobx-react';
import _ from 'lodash';
import './HtmlTable.styl';
import PreviewHTML from 'component/PreviewHTML/PreviewHTML';
import { LicenseInfoStore } from 'store/LicenseInfoStore';

export interface Props{
  licenseInfoStore:LicenseInfoStore,
  showMessage:Function
}

interface State{
  filteredInfo: any,
  sortedInfo: any,
  preview:boolean,
  currentFileName:string,
  selectedRowKeys: Array<number>, // Check here to configure the default column
  loading: boolean,
  fileContent:any
}

@observer
class HtmlTable extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
          fileContent:null,
          filteredInfo: null,
          sortedInfo: null,
          preview:false,
          currentFileName:"",
          selectedRowKeys: [], // Check here to configure the default column
          loading: false          
        }
  }
  

  getSortOrder(field:string){
    let sortedInfo=this?.state?.sortedInfo;
    if(sortedInfo){
      return sortedInfo.field===field && sortedInfo.order; 
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

  onSelectChange(selectedRowKeys:Array<number>){
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  remove(){
    if(this.state.selectedRowKeys.length===0){
      return false;
    }
    const message="Do you want to delete the record?";
    const self=this;
    const action={
      onOk:()=>{
        self.props.licenseInfoStore.remove(self.state.selectedRowKeys);
        self.setState({ selectedRowKeys:[]});
      }
    }
    this.props.showMessage(message,action)
  }

  removeAll(){
    if(this.state.selectedRowKeys.length===0){
      return false;
    }
    const message="Do you want to delete all record?";
    const self=this;
    const action={
      onOk:()=>{
        self.props.licenseInfoStore.clear();
        self.setState({ selectedRowKeys:[]});
      }
    }
    this.props.showMessage(message,action)
  }

  handleChange(pagination:any, filters:any, sorter:any){
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

    getColumns(){
      return [{
            title: 'File Name',
            dataIndex: 'name',
            key:"name",
            sorter:(a:any, b:any) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"name")
          },{
            title:"Size",
            dataIndex:"size",
            render: (size:number) =>{
              let text=_.round(size/1024, 2) +" kb";
              return <span>{text}</span>;
            },
            sorter:(a:any, b:any) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"size")
          },{
            title:"ModifiedDate",
            dataIndex:"modifiedDate",
            render:(modifiedDate:Date) => <span>{modifiedDate.toDateString()}</span>,
            sorter:(a:any, b:any) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"modifiedDate")
          },{
            title:"Action",
            dataIndex:"file",
            render: (file:any) => <span><a href="#" onClick={()=>{this.review(file)}}>review</a></span>,
          }];
    }

    review(file:any){
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
      };
    }

    handleCancel(){
      this.setState({ preview: false });
    };
    render() {
      const rowSelection = {
        selectedRowKeys:this.state.selectedRowKeys,
        onChange:(selectedRowKeys:any)=>{
           this.onSelectChange(selectedRowKeys)
        }
     }
      const columns=this.getColumns();
        return (
            <div className="HtmlTable">
                  {this.state.preview && <PreviewHTML title={this.state.currentFileName} handleCancel={()=>{this.handleCancel()}} visible={this.state.preview}>
                    {this.state.fileContent}
                    </PreviewHTML>}
                  <div className="action-button-list" >
                    <Button type="primary" onClick={()=>{this.remove()}}> 
                      Remove
                    </Button>
                    <Button type="primary" onClick={()=>{this.removeAll()}}> 
                      Remove All
                    </Button>
                  </div>
                  <Table pagination={{ position: ["bottomLeft"],showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`}}
                  onChange={(pagination, filters, sorter)=>{this.handleChange(pagination, filters, sorter)}} rowSelection={rowSelection} size="small" bordered columns={columns} dataSource={[...this.props.licenseInfoStore.htmlFileDataSource]} />
          </div>
        );
    }
}

export default HtmlTable;
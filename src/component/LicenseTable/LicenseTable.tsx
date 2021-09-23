import React from 'react';
import { Table, Button,Alert  } from 'antd';
import { observer} from 'mobx-react';
import './LicenseTable.styl';


import { LicenseInfoStore } from 'store/LicenseInfoStore';

export interface Props{
  licenseInfoStore:LicenseInfoStore,
  showMessage:Function
}

interface State{
  filteredInfo: any,
  sortedInfo: any,
  selectedRowKeys: Array<number>, 
  loading: boolean
}

@observer
class LicenseTable extends React.Component <Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
          filteredInfo: null,
          sortedInfo: {field:"convert",order:"ascend"},
          selectedRowKeys: [], // Check here to configure the default column
          loading: false          
        }
  }

  getSortOrder(field:any):boolean | string{
    let sortedInfo=this?.state?.sortedInfo;
    if(sortedInfo){
      return sortedInfo.field===field && sortedInfo.order; 
    }else{
      return false;
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

  onSelectChange(selectedRowKeys:Array<number>):void{
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  remove():void{
    if(this.state.selectedRowKeys.length===0){
      return;
    }
    const message="Do you want to deleted the record?";
    const self=this;
    const action={
      onOk:()=>{
        self.props.licenseInfoStore.removeLicenseInfo(self.state.selectedRowKeys);
        self.setState({ selectedRowKeys:[]});
      }
    }
    this.props.showMessage(message,action)
  }

  handleChange(pagination:any, filters:any, sorter:any):void{
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  
    getColumns():Array<any>{
      return [{
            title: 'File Name',
            dataIndex: 'fileName',
            key:"fileName",
            sorter:this.order.bind(this),
            sortOrder: this.getSortOrder.call(this,"fileName")
          },{
            title:"Machine Name",
            dataIndex:"computerName",
            sorter:this.order.bind(this),
            sortOrder: this.getSortOrder.call(this,"computerName")
          },{
            title:"User",
            dataIndex:"windowLogon",
            sorter:this.order.bind(this),
            sortOrder: this.getSortOrder.call(this,"windowLogon")
          },{
            title:"Status",
            dataIndex:"convert",
            sorter:this.order.bind(this),
            render: (convert:boolean) => <div>{convert? <Alert type="success" message="Success" banner />:<Alert type="error" message="Error" banner />}</div>,
            sortOrder: this.getSortOrder.call(this,"convert")
          },{
            title:"Message",
            dataIndex:"message",
            render: (message:string) => <pre>{message}</pre>,
            sorter:this.order.bind(this),
            sortOrder: this.getSortOrder.call(this,"message")
          }];
    }

    render() {
      const rowSelection = {
        selectedRowKeys:this.state.selectedRowKeys,
        onChange:(selectedRowKeys:any)=>{
           this.onSelectChange(selectedRowKeys)
        }
      }
      const columns=this.getColumns();
        return (
            <div className="LicenseTable">
                  <div className="action-button-list" >
                    <Button disabled={this.props.licenseInfoStore.licenseInfoDataSource.length?false:true} type="primary" onClick={()=>{this.remove()}}> 
                      Remove
                    </Button>
                  </div>
                  <Table pagination={{ position: ["bottomLeft"],showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`}}
                   onChange={(pagination, filters, sorter)=>{this.handleChange(pagination, filters, sorter)}} rowSelection={rowSelection} size="small" bordered columns={columns} dataSource={[...this.props.licenseInfoStore.licenseInfoDataSource]} />
          </div>
        );
    }
}

export default LicenseTable;
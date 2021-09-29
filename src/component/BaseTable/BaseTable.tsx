import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { ReactElement } from 'react';
import './BaseTable.styl';

export interface otherProps<T,V extends keyof T>{
  columns:ColumnType<T>[],
  selectAble?:boolean,
  dataSource:T[],
  selectedRowKeys?: Array<V>,
  onSelectChange:(selectedRowKeys:Array<V>)=> void
}




// eslint-disable-next-line @typescript-eslint/ban-types
class BaseTable<T extends object,V extends keyof T> extends React.Component<otherProps<T,V> & TableProps<T>>{
  constructor(props:otherProps<T,V> & TableProps<T>) {
        super(props);
        //react state
        this.state={
        }
    }
    selectAble=this.props.selectAble || true;

    getDefaultProps():TableProps<T>{
      const {bordered,pagination,size,rowSelection} =this.props;
      const defaultRowSelection :any= this.selectAble?{
        selectedRowKeys:this.props.selectedRowKeys,
        onChange:(selectedRowKeys:Array<V>)=>{
           this.props.onSelectChange(selectedRowKeys)
        }
      }:undefined;
      const props={
        bordered:bordered || true,
        pagination:pagination || { 
          position: ["bottomLeft"],
          showTotal:(total:number, range:any) => `${range[0]}-${range[1]} of ${total} items`
        },
        size:size || "small",
        rowSelection:rowSelection || defaultRowSelection,
        columns:this.props.columns
      }
      return props;
    }





    render():ReactElement {
      const props=this.getDefaultProps();
        return (
            <div className="BaseTable">
            <Table {...props} dataSource={[...this.props.dataSource as any]}/>
          </div>
        );
    }
}

export default BaseTable;
import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { ReactElement } from 'react';
import _ from 'lodash';
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

    getTableProps():TableProps<T>{
      const defaultRowSelection :any= this.selectAble?{
        selectedRowKeys:this.props.selectedRowKeys,
        onChange:(selectedRowKeys:Array<V>)=>{
           this.props.onSelectChange(selectedRowKeys)
        }
      }:undefined;
      const props:any={
        bordered:true,
        pagination:{ 
          position: ["bottomLeft"],
          showTotal:(total:number, range:any) => `${range[0]}-${range[1]} of ${total} items`
        },
        size:"small",
        rowSelection: defaultRowSelection,
      }
      const excludeFiled=["dataSource","selectedRowKeys","onSelectChange","selectAble"];
      for(const key in this.props){
        if(_.indexOf(excludeFiled,key)===-1){
          if(this.isValidKey(key,this.props)){
              props[key]=this.props[key];            
          }
        }
      }
      return props;
    }

    isValidKey(key: string  , object:TableProps<T>): key is keyof typeof object {
      return key in object;
    }



    render():ReactElement {
      const props=this.getTableProps();
        return (
            <div className="BaseTable">
            <Table {...props} dataSource={[...this.props.dataSource as any]}/>
          </div>
        );
    }
}

export default BaseTable;
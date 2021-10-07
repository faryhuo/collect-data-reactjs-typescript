import { Button, Input, Tooltip } from 'antd';
import React, { ChangeEvent, ReactElement } from 'react';
import classnames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import './SearchInput.styl';

export interface Props{
  onChange?:(event:ChangeEvent<HTMLInputElement>)=>void,
  onSearch?:(value:string,event:any)=>void,
  value?:string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State{
  display:boolean
}

class SearchInput extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
          display:false
        }
    }

    search():void{
      if(this.state.display===false){
        this.setState({
          display:true
        });
      }
    }


    render(): ReactElement {
        return (
          <div className={classnames("SearchInput",this.state.display?"slow":"hide")}>
            {!this.state.display &&     <Tooltip title="search">
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={this.search.bind(this)}/>
          </Tooltip>}
            {this.state.display && <Input.Search bordered={false} onSearch={this.props.onSearch} onChange={this.props.onChange} allowClear className="search-input"  
            value={this.props.value} />}
          </div>
        );
    }
}

export default SearchInput;
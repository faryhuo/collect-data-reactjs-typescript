import React, { ReactElement, ReactNode } from 'react';
import { Card } from 'antd';
import { CaretUpOutlined,CaretDownOutlined,ShrinkOutlined,ArrowsAltOutlined} from '@ant-design/icons';
import './Panel.styl';

export interface Props{
  title: ReactNode | string,
  display?:boolean,
  onChange?:()=>void
  actions?:Array<'max' | 'display'>
}
interface State{
  display: boolean
  isMax:boolean
}

class Panel extends React.Component<Props,State> {
  constructor(props: Props) {
        super(props);
        //react state
        this.state={
          display:props.display!=null? props.display:true,
          isMax:false
        }
    }

    showOrHideContent(): void{
      if(this.props.onChange){
        this.props.onChange();
      }else{
        this.setState({
          display:!this.state.display
        });
      }
    }

    maxContent(): void{
      this.setState({
        isMax:!this.state.isMax
      });      
    }

    getMaxButton(key:number):ReactElement{
      return (
        <div key={key} className="panel-action-button">
          <span  onClick={()=>{this.maxContent()}}>{this.state.isMax?<ShrinkOutlined />:<ArrowsAltOutlined />}</span>
      </div>
      );
    }

    getShowHideButton(key:number):ReactElement{
      return (
        <div  key={key}  className="panel-action-button">
          <span onClick={()=>{this.showOrHideContent()}}>{this.isDisplay()?<CaretUpOutlined />:<CaretDownOutlined />}</span>
        </div>
        );
    }

    getActionButton():ReactElement{
      const actionButtons=this.props.actions?this.props.actions:['max','display'];
      let buttonList: ReactElement[]=[];
      let key=0;
      actionButtons.forEach((value)=>{
        switch(value){
          case 'max': buttonList.push(this.getMaxButton(key));break;
          case 'display': buttonList.push(this.getShowHideButton(key));break;
          default:break;
        }
        key++;
      });
      return (
        <div className="panel-button-list">
          {buttonList.map((button)=>(button))}
        </div>
      );
    }

    isDisplay():boolean{
      let isDisplay=this.state.display;
      if(this.props.display){
        isDisplay=this.props.display;
      }
      return isDisplay;
    }


    render(): ReactElement {
      // const childrenWithProps = React.Children.map((children, child) => React.cloneElement(child));
      // let supportedInputTypes:any=[];
      // let newChildren = React.Children.map(this.props.children,function(child:any) {
      //   if (_.indexOf(child.type.displayName,supportedInputTypes)>=0) {
      //     var extraChildProps = {
      //     }
      //     return React.cloneElement(child,extraChildProps);
      //   } else {
      //     return child;
      //   }
      // });
      return (
        <div className="Panel">
            <Card title={this.props.title}  extra={this.getActionButton()} bordered={false} >
                {this.isDisplay() && this.props.children}
            </Card>
            {this.state.isMax && <div className="max-modal-wrapper">
              <Card title={this.props.title}  extra={this.getMaxButton(1)} bordered={false} >
                  {this.props.children}
              </Card>
            </div>}
        </div>
      );
    }
}

export default Panel;
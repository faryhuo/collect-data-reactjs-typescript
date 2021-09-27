import React, { ReactElement } from 'react';
import './FinishPage.styl';
import { Result, Button } from 'antd';

export interface Props{
  nextStep:() => void
} 

class FinishPage extends React.Component<Props> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }


    render():ReactElement {
        return (
            <div className="FinishPage">
            <Result
                status="success"
                title="Successfully upload license information file. Please check the excel if can be download!"
                subTitle="Download file need takes 1-5 minutes, please wait."
                extra={[
                  <Button key={1} type="primary" onClick={()=>{this.props.nextStep()}}>
                    Go Home
                  </Button>,
                ]}
              />
          </div>
        );
    }
}

export default FinishPage;
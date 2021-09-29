import { DraggerProps } from 'antd/lib/upload';
import React, { ReactElement } from 'react';
import { Upload} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './DraggerUpload.styl';

interface otherProps{
  buttonText:string,
  hint:string
}

type Props=DraggerProps & otherProps;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State{
  
}

const { Dragger } = Upload;
class DraggerUpload extends React.Component<Props,State> {
  constructor(props:Props) {
        super(props);
        //react state
        this.state={
        }
    }


    render():ReactElement {
      const {buttonText,hint,...uploadProps} =this.props;
        return (
            <div className="DraggerUpload">
              <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">{buttonText}</p>
                  <p className="ant-upload-hint">
                  {hint}
                  </p>
              </Dragger>
          </div>
        );
    }
}

export default DraggerUpload;
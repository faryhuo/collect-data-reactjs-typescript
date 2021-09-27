import React, { ReactElement } from 'react';
import HomePage from './page/HomePage/HomePage';
import { observer,inject } from 'mobx-react';
import {LicenseInfoStore} from 'store/LicenseInfoStore';
import {HomePageStore} from 'store/HomePageStore';

export interface Props{
  licenseInfoStore: LicenseInfoStore,
  homePageStore: HomePageStore
}

@inject('licenseInfoStore', 'homePageStore')
@observer
class App extends React.Component<Props> {
  render():ReactElement {
    const stores = {
      licenseInfoStore: this.props.licenseInfoStore,
      homePageStore: this.props.homePageStore
    }
    return (
      <div id="App_Conponent" className="Application">
        <HomePage {...stores}></HomePage>
      </div>
    );
  }
}

export default App;

import {observable, action,makeObservable} from 'mobx';
import { Modal} from 'antd';

export class HomePageStore {

  loading=false;

  constructor() {
    // 添加makeObservable
    makeObservable(this,{
      loading:observable,
      showLoading:action.bound,
      closeLoading:action.bound
    })
  }

  showLoading():void{
    this.loading=true;
  }

  closeLoading():void{
    this.loading=false;
  }




  
}
const homePageStore = new HomePageStore();

export default homePageStore;
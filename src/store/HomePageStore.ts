import {observable, action,makeObservable} from 'mobx';
import { Modal} from 'antd';

export class HomePageStore {

  loading:boolean=false;

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

  destroyAll() {
    Modal.destroyAll();
  }


  
}
const homePageStore = new HomePageStore();

export default homePageStore;
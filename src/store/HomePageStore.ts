import {observable, action,makeObservable} from 'mobx';

export class HomePageStore {
  @observable 
  loading:boolean=false;

  constructor() {
    // 添加makeObservable
    makeObservable(this)
  }
  @action 
  showLoading(){
    this.loading=true;
  }

  @action 
  closeLoading(){
    this.loading=false;
  }
}
const homePageStore = new HomePageStore();

export default homePageStore;
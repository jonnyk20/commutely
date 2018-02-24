import { observable } from 'mobx';
import FetchResource from '../Resources/FetchResource';

class ModoStore {
  car_list = {};
  nearby = {};
  cost = {};
  isLoading = true;

  getCarList() {
    return new Promise(resolve => {
      FetchResource.callModo('car_list')
        .then(res => {
          this.car_list = res.Response;
          this.isLoading = false;
          resolve();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}

const store = new ModoStore();
export default store;

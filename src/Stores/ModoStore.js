import FetchResource from '../Resources/FetchResource';

class ModoStore {
  nearby = {};
  car_list = {};
  availability = {};
  cost = {};
  isLoading = true;

  getNearby(lat, lng) {
    return new Promise(resolve => {
      this.isLoading = true;
      FetchResource.callModo(`nearby?lat=${lat}&long=${lng}`)
        .then(res => {
          this.nearby = res.Response;
          this.isLoading = false;
          resolve();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  getCars() {
    return new Promise(resolve => {
      this.isLoading = true;
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

  getAvailability() {
    return new Promise(resolve => {
      this.isLoading = true;
      FetchResource.callModo('availability')
        .then(res => {
          this.availability = res.Response;
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

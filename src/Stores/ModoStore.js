import FetchResource from '../Resources/FetchResource';

class ModoStore {
  nearby = [];
  nearbyCars = [];
  locations = [];
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
          this.isLoading = false;
          this.getLocations().then(() => {
            resolve(res.Response['Cars']);
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  getLocations() {
    return new Promise(resolve => {
      this.isLoading = true;
      FetchResource.callModo('location_list')
        .then(res => {
          this.locations = res.Response['Locations'];
          this.isLoading = false;
          resolve();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  getAvailability(id) {
    return new Promise(resolve => {
      FetchResource.callModo(`availability?car_id=${id}`).then(res => {
        if (res.Response['Availability'].length !== 0) {
          resolve(res.Response);
        } else {
          return;
        }
      });
    });
  }

  findLocationAndAvailability = id => {
    return new Promise(resolve => {
      const locations = this.locations;
      let result = false;

      this.getAvailability(id).then(() => {
        for (let key in locations) {
          if (locations[key]['ID'] === id) {
            result = {
              lat: locations[key]['Latitude'],
              lng: locations[key]['Longitude'],
              id: id
            };
            break;
          }
        }
        resolve(result);
      });
      return false;
    });
  };

  findCarsFromLocation = () => {
    return new Promise(resolve => {
      if (this.nearby['Locations'].length > 0) {
        this.getCars().then(cars => {
          if (cars instanceof Object) {
            const locations = this.nearby['Locations'];
            Object.keys(cars).forEach(key => {
              locations.forEach(location => {
                if (
                  cars[key]['Location'][0]['LocationID'] ===
                  location['LocationID']
                ) {
                  this.findLocationAndAvailability(
                    cars[key]['Location'][0]['LocationID']
                  ).then(res => {
                    if (res !== false) {
                      const obj = {
                        id: cars[key]['ID'],
                        make: cars[key]['Make'],
                        model: cars[key]['Model'],
                        category: cars[key]['Category'],
                        year: cars[key]['Year'],
                        seats: cars[key]['Seats'],
                        location_id: cars[key]['Location'][0]['LocationID'],
                        lat: res.lat,
                        lng: res.lng
                      };
                      this.nearbyCars.push(obj);
                    }
                  });
                }
              });
            });
          }
        });
      }
      resolve(this.nearbyCars);
    });
  };
}

const store = new ModoStore();
export default store;

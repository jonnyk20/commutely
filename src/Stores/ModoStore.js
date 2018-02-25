import FetchResource from '../Resources/FetchResource';

class ModoStore {
  nearby = [];
  nearbyCars = [];
  locations = [];
  availability = [];
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

  findLocation = id => {
    const locations = this.locations;
    let result = {};

    for (let key in locations) {
      if (locations[key]['ID'] === id) {
        result = {
          lat: locations[key]['Latitude'],
          lng: locations[key]['Longitude']
        };
        break;
      }
    }

    return result;
  };

  findCarsFromLocation = () => {
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
                const cords = this.findLocation(
                  cars[key]['Location'][0]['LocationID']
                );
                const obj = {
                  id: cars[key]['ID'],
                  make: cars[key]['Make'],
                  model: cars[key]['Model'],
                  category: cars[key]['Category'],
                  year: cars[key]['Year'],
                  seats: cars[key]['Seats'],
                  location_id: cars[key]['Location'][0]['LocationID'],
                  lat: cords.lat,
                  lng: cords.lng
                };
                this.nearbyCars.push(obj);
              }
            });
          });
        }
      });
    }
  };
}

const store = new ModoStore();
export default store;

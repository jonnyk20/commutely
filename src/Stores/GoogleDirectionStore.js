/* global google */


class GoogleDirectionStore {
  constructor() {
    this.DirectionsService = new google.maps.DirectionsService();
    console.log('constructed yay')
  }
  getDirections = (origin, destination, mode = 'TRANSIT') => {
    return new Promise((resolve, reject) => {
      this.DirectionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode[mode]
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            console.error(`error fetching directions ${result}`);
            reject(result);
          }
        }
      );
    });
  }
}


const store = new GoogleDirectionStore();
console.log('store', store)
export default store;

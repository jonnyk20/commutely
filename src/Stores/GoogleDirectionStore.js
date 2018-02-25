/* global google */

class GoogleDirectionStore {
  constructor() {
    this.DirectionsService = new google.maps.DirectionsService();
    //always default to transit
    this.mode = 'TRANSIT';
  }
  getDirections = (origin, destination) => {
    return new Promise((resolve, reject) => {
      this.DirectionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode[this.mode]
        },
        (result, status) => {
          console.log(this.mode);
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            console.error(`error fetching directions ${result}`);
            reject(result);
          }
        }
      );
    });
  };
}

const store = new GoogleDirectionStore();
export default store;

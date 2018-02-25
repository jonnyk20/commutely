/* global google */

class GoogleDirectionStore {
  DirectionsService = new google.maps.DirectionsService();
  getDirction(origin, destination, mode = 'TRANSIT') {
    return new Promise((resolve, reject) => {
      DirectionsService.route(
        {
          origin: origin,
          destination: destination.position,
          travelMode: google.maps.TravelMode[mode]
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            console.error(`error fetching directions ${result}`);
            reject(result);
          }
          refs.map.fitBounds(bounds);
        }
      );
    });
  }
}

const store = new GoogleDirectionStore();
export default store;

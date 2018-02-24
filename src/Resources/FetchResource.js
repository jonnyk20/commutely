export default class FetchResource {
  static callModo(query) {
    return new Promise((resolve, reject) => {
      fetch(`https://bookit.modo.coop/api/v2/${query}`, {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
    }).then(response => {
      if (response.status === 'Success') {
        response.json().then(data => {
          resolve(data);
        });
      } else if (response.status === 'Failure') {
        response.json().then(err => {
          reject(err);
        });
      }
    });
  }
}

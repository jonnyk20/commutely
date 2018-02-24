export default class FetchResource {
  static callModo(query) {
    return new Promise((resolve, reject) => {
      fetch(`https://bookit.modo.coop/api/v2/${query}`, {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
    }).then(response => {
      if (response.status === 'Success') {
        resolve(response);
      } else if (response.status === 'Failure') {
        reject(response.errors);
      }
    });
  }
}

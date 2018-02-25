export default class FetchResource {
  static callModo(query) {
    return new Promise((resolve, reject) => {
      fetch(`https://bookit.modo.coop/api/v2/${query}`, { method: 'GET' })
        .then(response => {
          response.json().then(data => {
            if (data.Status === 'Success') {
              resolve(data);
            }
          });
        })
        .catch(response => {
          response.json().then(data => {
            if (data.Status === 'Failure') {
              reject(data.errors);
            }
          });
        });
    });
  }
}
